package com.localthread.controller;

import com.localthread.dao.ProductDao;
import com.localthread.dao.UserDao;
import com.localthread.dao.ShopDao;
import com.localthread.model.Product;
import com.localthread.model.User;
import com.localthread.service.FileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductDao productDao;
    private final UserDao userDao;
    private final FileService fileService;
    private final ShopDao shopDao;

    public ProductController(ProductDao productDao, UserDao userDao, FileService fileService, ShopDao shopDao) {
        this.productDao = productDao;
        this.userDao = userDao;
        this.fileService = fileService;
        this.shopDao = shopDao;
    }

    @GetMapping
    public ResponseEntity<?> getAllProducts(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Long vendorId,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortOrder) {

        Map<String, Object> response = new HashMap<>();
        response.put("products", productDao.findAll(page, limit, category, search, vendorId, minPrice, maxPrice, sortBy, sortOrder));
        response.put("total", productDao.countAll(category, search, vendorId, minPrice, maxPrice));
        response.put("page", page);
        response.put("limit", limit);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProduct(@PathVariable Long id) {
        return productDao.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/vendor")
    public ResponseEntity<?> getVendorProducts(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {

        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        Map<String, Object> pagination = new HashMap<>();
        pagination.put("totalProducts", productDao.countByVendorId(user.getId(), category, search));
        pagination.put("page", page);
        pagination.put("limit", limit);
        Map<String, Object> data = new HashMap<>();
        data.put("products", productDao.findByVendorId(user.getId(), page, limit, category, search));
        data.put("pagination", pagination);
        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@AuthenticationPrincipal UserDetails userDetails,
                                           @RequestBody Map<String, Object> body) {
        System.out.println("DEBUG createProduct request body: " + body);
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        
        int count = productDao.countByVendorId(user.getId(), null, null);
        String tier = user.getSubscriptionTier() != null ? user.getSubscriptionTier() : "BASIC";
        if ("BASIC".equalsIgnoreCase(tier) && count >= 5) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Product limit reached (5 products max on Free Basic Plan). Please upgrade your subscription."));
        }
        Product product = new Product();
        product.setVendorId(user.getId());
        product.setName((String) body.get("name"));
        product.setDescription((String) body.get("description"));
        product.setPrice(new BigDecimal(body.get("price").toString()));
        product.setCategory((String) body.get("category"));
        
        // Support both single imageUrl and images list formats
        if (body.get("imageUrl") != null) {
            product.setImageUrl((String) body.get("imageUrl"));
        } else if (body.get("images") != null && body.get("images") instanceof java.util.List) {
            java.util.List<?> images = (java.util.List<?>) body.get("images");
            if (!images.isEmpty()) {
                product.setImageUrl((String) images.get(0));
            }
        }
        System.out.println("DEBUG createProduct final imageUrl: " + product.getImageUrl());
        
        product.setStock(body.get("stock") != null ? Integer.parseInt(body.get("stock").toString()) : 0);
        if (body.get("shopId") != null) {
            product.setShopId(Long.parseLong(body.get("shopId").toString()));
        } else {
            shopDao.findByOwnerId(user.getId()).ifPresent(shop -> product.setShopId(shop.getId()));
        }
        if (body.get("colors") != null) {
            product.setColors(body.get("colors").toString());
        }
        if (body.get("sizes") != null) {
            product.setSizes(body.get("sizes").toString());
        }
        Product saved = productDao.save(product);
        return ResponseEntity.ok(Map.of("success", true, "data", Map.of("product", saved)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@AuthenticationPrincipal UserDetails userDetails,
                                           @PathVariable Long id,
                                           @RequestBody Map<String, Object> body) {
        System.out.println("DEBUG updateProduct request body: " + body);
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        Product product = productDao.findById(id).orElse(null);
        if (product == null) return ResponseEntity.notFound().build();
        if (!product.getVendorId().equals(user.getId()) && !"ADMIN".equals(user.getRole())) {
            return ResponseEntity.status(403).body(Map.of("message", "Forbidden"));
        }
        if (body.get("name") != null) product.setName((String) body.get("name"));
        if (body.get("description") != null) product.setDescription((String) body.get("description"));
        if (body.get("price") != null) product.setPrice(new BigDecimal(body.get("price").toString()));
        if (body.get("category") != null) product.setCategory((String) body.get("category"));
        if (body.get("stock") != null) product.setStock(Integer.parseInt(body.get("stock").toString()));
        if (body.get("colors") != null) product.setColors((String) body.get("colors"));
        if (body.get("sizes") != null) product.setSizes((String) body.get("sizes"));
        
        // Support both single imageUrl and images list formats in update
        if (body.get("imageUrl") != null) {
            product.setImageUrl((String) body.get("imageUrl"));
        } else if (body.get("images") != null && body.get("images") instanceof java.util.List) {
            java.util.List<?> images = (java.util.List<?>) body.get("images");
            if (!images.isEmpty()) {
                product.setImageUrl((String) images.get(0));
            }
        }
        System.out.println("DEBUG updateProduct final imageUrl: " + product.getImageUrl());
        
        productDao.update(product);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@AuthenticationPrincipal UserDetails userDetails,
                                           @PathVariable Long id) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        Product product = productDao.findById(id).orElse(null);
        if (product == null) return ResponseEntity.notFound().build();
        if (!product.getVendorId().equals(user.getId()) && !"ADMIN".equals(user.getRole())) {
            return ResponseEntity.status(403).body(Map.of("message", "Forbidden"));
        }
        productDao.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Product deleted"));
    }

    @PostMapping("/upload-image")
    public ResponseEntity<?> uploadImage(@AuthenticationPrincipal UserDetails userDetails,
                                         @RequestParam("image") MultipartFile file) {
        try {
            String url = fileService.saveFile(file, "products");
            return ResponseEntity.ok(Map.of("success", true, "data", Map.of("imageUrl", url)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @PostMapping("/test-upload")
    public ResponseEntity<?> testUpload(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(Map.of("message", "Upload endpoint reachable", "authenticated", userDetails != null));
    }
}
