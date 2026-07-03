package com.localthread.controller;

import com.localthread.dao.AddressDao;
import com.localthread.dao.OrderDao;
import com.localthread.dao.UserDao;
import com.localthread.dao.WishlistDao;
import com.localthread.model.Address;
import com.localthread.model.Order;
import com.localthread.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final UserDao userDao;
    private final OrderDao orderDao;
    private final AddressDao addressDao;
    private final WishlistDao wishlistDao;

    public CustomerController(UserDao userDao, OrderDao orderDao,
                              AddressDao addressDao, WishlistDao wishlistDao) {
        this.userDao = userDao;
        this.orderDao = orderDao;
        this.addressDao = addressDao;
        this.wishlistDao = wishlistDao;
    }

    // ── Profile ──────────────────────────────────
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        return userDao.findByEmail(userDetails.getUsername())
                .map(u -> {
                    int orderCount = orderDao.countByCustomerId(u.getId());
                    return ResponseEntity.ok(Map.of(
                        "success", true,
                        "data", Map.of(
                            "customer", safeUser(u),
                            "orderCount", orderCount
                        )
                    ));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal UserDetails userDetails,
                                           @RequestBody Map<String, Object> body) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        if (body.containsKey("name")) user.setName((String) body.get("name"));
        if (body.containsKey("phone")) user.setPhone((String) body.get("phone"));
        userDao.update(user);

        // Also update default address if provided
        if (body.containsKey("address") && body.get("address") instanceof Map) {
            Map<?, ?> addrMap = (Map<?, ?>) body.get("address");
            List<Address> addresses = addressDao.findByUserId(user.getId());
            Address defaultAddr = addresses.stream()
                    .filter(a -> Boolean.TRUE.equals(a.getIsDefault()))
                    .findFirst()
                    .orElse(addresses.isEmpty() ? null : addresses.get(0));

            if (defaultAddr != null) {
                defaultAddr.setLine1((String) addrMap.get("street"));
                defaultAddr.setCity((String) addrMap.get("city"));
                defaultAddr.setState((String) addrMap.get("state"));
                defaultAddr.setPincode((String) addrMap.get("zipCode"));
                addressDao.update(defaultAddr);
            } else {
                Address a = new Address();
                a.setUserId(user.getId());
                a.setLine1((String) addrMap.get("street"));
                a.setCity((String) addrMap.get("city"));
                a.setState((String) addrMap.get("state"));
                a.setPincode((String) addrMap.get("zipCode"));
                a.setIsDefault(true);
                addressDao.save(a);
            }
        }

        return ResponseEntity.ok(Map.of("success", true, "data", Map.of("customer", safeUser(user))));
    }

    private Map<String, Object> safeUser(User user) {
        Map<String, Object> u = new HashMap<>();
        u.put("id", user.getId());
        u.put("name", user.getName());
        u.put("email", user.getEmail());
        u.put("role", user.getRole());
        u.put("isActive", user.getIsActive());
        u.put("isVerified", user.getIsVerified());
        u.put("avatarUrl", user.getAvatarUrl());
        u.put("storeImageUrl", user.getStoreImageUrl());
        u.put("phone", user.getPhone());
        u.put("createdAt", user.getCreatedAt());

        // Map default address for frontend profile usage
        List<Address> addresses = addressDao.findByUserId(user.getId());
        Address defaultAddr = addresses.stream()
                .filter(a -> Boolean.TRUE.equals(a.getIsDefault()))
                .findFirst()
                .orElse(addresses.isEmpty() ? null : addresses.get(0));

        if (defaultAddr != null) {
            Map<String, String> addrMap = new HashMap<>();
            addrMap.put("street", defaultAddr.getLine1());
            addrMap.put("city", defaultAddr.getCity());
            addrMap.put("state", defaultAddr.getState());
            addrMap.put("zipCode", defaultAddr.getPincode());
            addrMap.put("country", "India");
            u.put("address", addrMap);
        } else {
            u.put("address", null);
        }

        return u;
    }

    // ── Orders ──────────────────────────────────
    @GetMapping("/orders")
    public ResponseEntity<?> getCustomerOrders(@AuthenticationPrincipal UserDetails userDetails,
                                               @RequestParam(defaultValue = "1") int page,
                                               @RequestParam(defaultValue = "10") int limit) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        List<Order> orders = orderDao.findByCustomerId(user.getId(), page, limit);
        orders.forEach(o -> o.setItems(orderDao.findItemsByOrderId(o.getId())));
        Map<String, Object> response = new HashMap<>();
        response.put("orders", orders);
        response.put("total", orderDao.countByCustomerId(user.getId()));
        return ResponseEntity.ok(response);
    }

    // ── Addresses ───────────────────────────────
    @GetMapping("/addresses")
    public ResponseEntity<?> getAddresses(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        return ResponseEntity.ok(addressDao.findByUserId(user.getId()));
    }

    @PostMapping("/addresses")
    public ResponseEntity<?> addAddress(@AuthenticationPrincipal UserDetails userDetails,
                                        @RequestBody Map<String, Object> body) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        Address address = mapToAddress(body);
        address.setUserId(user.getId());
        if (Boolean.TRUE.equals(address.getIsDefault())) {
            addressDao.clearDefault(user.getId());
        }
        Address saved = addressDao.save(address);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/addresses/{id}")
    public ResponseEntity<?> updateAddress(@AuthenticationPrincipal UserDetails userDetails,
                                           @PathVariable Long id,
                                           @RequestBody Map<String, Object> body) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        Address address = mapToAddress(body);
        address.setId(id);
        address.setUserId(user.getId());
        if (Boolean.TRUE.equals(address.getIsDefault())) {
            addressDao.clearDefault(user.getId());
        }
        addressDao.update(address);
        return ResponseEntity.ok(address);
    }

    @DeleteMapping("/addresses/{id}")
    public ResponseEntity<?> deleteAddress(@PathVariable Long id) {
        addressDao.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Address deleted"));
    }

    // ── Wishlist ─────────────────────────────────
    @GetMapping("/wishlist")
    public ResponseEntity<?> getWishlist(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", Map.of("wishlist", wishlistDao.findByUserId(user.getId()))
        ));
    }

    @PostMapping("/wishlist")
    public ResponseEntity<?> addToWishlist(@AuthenticationPrincipal UserDetails userDetails,
                                           @RequestBody Map<String, Object> body) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        Long productId = Long.parseLong(body.get("productId").toString());
        wishlistDao.add(user.getId(), productId);
        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", Map.of("wishlist", wishlistDao.findByUserId(user.getId()))
        ));
    }

    @DeleteMapping("/wishlist/{productId}")
    public ResponseEntity<?> removeFromWishlist(@AuthenticationPrincipal UserDetails userDetails,
                                               @PathVariable Long productId) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        wishlistDao.remove(user.getId(), productId);
        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", Map.of("wishlist", wishlistDao.findByUserId(user.getId()))
        ));
    }

    private Address mapToAddress(Map<String, Object> body) {
        Address a = new Address();
        a.setLabel((String) body.get("label"));
        a.setLine1((String) body.get("line1"));
        a.setCity((String) body.get("city"));
        a.setState((String) body.get("state"));
        a.setPincode((String) body.get("pincode"));
        a.setIsDefault(body.get("isDefault") != null && Boolean.parseBoolean(body.get("isDefault").toString()));
        return a;
    }
}
