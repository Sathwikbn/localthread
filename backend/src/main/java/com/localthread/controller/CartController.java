package com.localthread.controller;

import com.localthread.dao.CartDao;
import com.localthread.dao.UserDao;
import com.localthread.model.CartItem;
import com.localthread.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartDao cartDao;
    private final UserDao userDao;

    public CartController(CartDao cartDao, UserDao userDao) {
        this.cartDao = cartDao;
        this.userDao = userDao;
    }

    @GetMapping
    public ResponseEntity<?> getCart(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        List<CartItem> items = cartDao.findByUserId(user.getId());
        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", Map.of("items", items)
        ));
    }

    @PostMapping("/items")
    public ResponseEntity<?> addToCart(@AuthenticationPrincipal UserDetails userDetails,
                                       @RequestBody Map<String, Object> body) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        CartItem item = new CartItem();
        item.setUserId(user.getId());
        item.setProductId(Long.parseLong(body.get("productId").toString()));
        item.setQuantity(body.get("quantity") != null ? Integer.parseInt(body.get("quantity").toString()) : 1);
        cartDao.save(item);

        List<CartItem> items = cartDao.findByUserId(user.getId());
        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", Map.of("items", items)
        ));
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<?> updateCartItem(@AuthenticationPrincipal UserDetails userDetails,
                                            @PathVariable Long id,
                                            @RequestBody Map<String, Integer> body) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        cartDao.updateQuantity(id, body.get("quantity"));

        List<CartItem> items = cartDao.findByUserId(user.getId());
        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", Map.of("items", items)
        ));
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<?> removeFromCart(@AuthenticationPrincipal UserDetails userDetails,
                                           @PathVariable Long id) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        cartDao.deleteById(id);

        List<CartItem> items = cartDao.findByUserId(user.getId());
        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", Map.of("items", items)
        ));
    }

    @DeleteMapping
    public ResponseEntity<?> clearCart(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        cartDao.deleteAllByUserId(user.getId());
        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", Map.of("items", List.of())
        ));
    }
}
