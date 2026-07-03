package com.localthread.controller;

import com.localthread.dao.ShopDao;
import com.localthread.dao.UserDao;
import com.localthread.model.Shop;
import com.localthread.model.User;
import com.localthread.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import java.math.BigDecimal;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/vendors")
public class VendorController {

    private final UserDao userDao;
    private final ShopDao shopDao;
    private final AuthService authService;
    private final JdbcTemplate jdbcTemplate;

    public VendorController(UserDao userDao, ShopDao shopDao, AuthService authService, JdbcTemplate jdbcTemplate) {
        this.userDao = userDao;
        this.shopDao = shopDao;
        this.authService = authService;
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getVendorProfile(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        Map<String, Object> vendorMap = new HashMap<>(authService.safeUser(user));
        
        // Map Shop properties into the flat vendor fields expected by the frontend
        shopDao.findByOwnerId(user.getId()).ifPresent(shop -> {
            vendorMap.put("storeName", shop.getName());
            vendorMap.put("storeDescription", shop.getDescription());
            vendorMap.put("storeLocation", shop.getLocation());
            vendorMap.put("isVerified", shop.getIsVerified());
            vendorMap.put("verificationDate", shop.getCreatedAt());

            // Try to parse street, city, state, zipCode from location string
            // Stored format: "Street Address|City|State|ZipCode"
            String location = shop.getLocation() != null ? shop.getLocation() : "";
            String[] parts = location.split("\\|", -1);
            Map<String, String> addrMap = new HashMap<>();
            addrMap.put("street", parts.length > 0 ? parts[0] : "");
            addrMap.put("city", parts.length > 1 ? parts[1] : "");
            addrMap.put("state", parts.length > 2 ? parts[2] : "");
            addrMap.put("zipCode", parts.length > 3 ? parts[3] : "");
            vendorMap.put("address", addrMap);
            // Fallback for storeLocation display
            vendorMap.put("storeLocation", parts.length > 0 ? parts[0] : "");
        });

        return ResponseEntity.ok(Map.of("success", true, "data", Map.of("vendor", vendorMap)));
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateVendorProfile(@AuthenticationPrincipal UserDetails userDetails,
                                                 @RequestBody Map<String, Object> body) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        if (body.get("name") != null) user.setName((String) body.get("name"));
        if (body.get("phone") != null) user.setPhone((String) body.get("phone"));
        userDao.update(user);

        // Extract and format the address from the nested map
        String formattedLocation = "";
        if (body.containsKey("address") && body.get("address") instanceof Map) {
            Map<?, ?> addr = (Map<?, ?>) body.get("address");
            String street = addr.get("street") != null ? (String) addr.get("street") : "";
            String city = addr.get("city") != null ? (String) addr.get("city") : "";
            String state = addr.get("state") != null ? (String) addr.get("state") : "";
            String zipCode = addr.get("zipCode") != null ? (String) addr.get("zipCode") : "";
            formattedLocation = street + "|" + city + "|" + state + "|" + zipCode;
        } else if (body.containsKey("storeLocation")) {
            formattedLocation = (String) body.get("storeLocation");
        }

        // Update or Create the vendor's Shop details
        final String finalLocation = formattedLocation;
        if (body.containsKey("storeName") || body.containsKey("storeDescription") || body.containsKey("address") || body.containsKey("storeLocation")) {
            java.util.Optional<Shop> existingShop = shopDao.findByOwnerId(user.getId());
            if (existingShop.isPresent()) {
                Shop shop = existingShop.get();
                if (body.get("storeName") != null) shop.setName((String) body.get("storeName"));
                if (body.get("storeDescription") != null) shop.setDescription((String) body.get("storeDescription"));
                if (!finalLocation.isEmpty()) shop.setLocation(finalLocation);
                shopDao.update(shop);
            } else {
                Shop shop = new Shop();
                shop.setOwnerId(user.getId());
                shop.setName(body.get("storeName") != null ? (String) body.get("storeName") : "My Store");
                shop.setDescription(body.get("storeDescription") != null ? (String) body.get("storeDescription") : "");
                shop.setLocation(finalLocation.isEmpty() ? "My Address" : finalLocation);
                shop.setCategory("Boutique");
                shop.setLatitude(0.0);
                shop.setLongitude(0.0);
                shop.setIsVerified(false);
                shop.setIsActive(true);
                shopDao.save(shop);
            }
        }

        // Return updated values
        Map<String, Object> vendorMap = new HashMap<>(authService.safeUser(user));
        shopDao.findByOwnerId(user.getId()).ifPresent(shop -> {
            vendorMap.put("storeName", shop.getName());
            vendorMap.put("storeDescription", shop.getDescription());
            vendorMap.put("isVerified", shop.getIsVerified());
            vendorMap.put("verificationDate", shop.getCreatedAt());

            // Stored format: "Street Address|City|State|ZipCode"
            String location = shop.getLocation() != null ? shop.getLocation() : "";
            String[] parts = location.split("\\|", -1);
            Map<String, String> addrMap = new HashMap<>();
            addrMap.put("street", parts.length > 0 ? parts[0] : "");
            addrMap.put("city", parts.length > 1 ? parts[1] : "");
            addrMap.put("state", parts.length > 2 ? parts[2] : "");
            addrMap.put("zipCode", parts.length > 3 ? parts[3] : "");
            vendorMap.put("address", addrMap);
            vendorMap.put("storeLocation", parts.length > 0 ? parts[0] : "");
        });

        return ResponseEntity.ok(Map.of("success", true, "data", Map.of("vendor", vendorMap)));
    }

    @GetMapping("/{vendorId}/stats")
    public ResponseEntity<?> getVendorStats(@PathVariable Long vendorId) {
        Map<String, Object> stats = new HashMap<>();
        stats.put("vendorId", vendorId);
        stats.put("totalShops", shopDao.findByOwnerId(vendorId).isPresent() ? 1 : 0);

        Integer totalOrders = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM orders WHERE vendor_id=?", Integer.class, vendorId);
        stats.put("totalOrders", totalOrders != null ? totalOrders : 0);

        BigDecimal totalRevenue = jdbcTemplate.queryForObject("SELECT COALESCE(SUM(total), 0) FROM orders WHERE vendor_id=? AND status<>'CANCELLED'", BigDecimal.class, vendorId);
        stats.put("totalRevenue", totalRevenue != null ? totalRevenue : BigDecimal.ZERO);

        // Fetch monthly stats (last 6 months)
        List<Map<String, Object>> monthlyStats = jdbcTemplate.query(
            "SELECT FORMATDATETIME(created_at, 'yyyy-MM') AS month, COUNT(*) AS orders, SUM(total) AS revenue FROM orders WHERE vendor_id=? AND status<>'CANCELLED' GROUP BY FORMATDATETIME(created_at, 'yyyy-MM') ORDER BY month DESC LIMIT 6",
            (rs, rowNum) -> {
                Map<String, Object> m = new HashMap<>();
                m.put("month", rs.getString("month"));
                m.put("orders", rs.getInt("orders"));
                m.put("revenue", rs.getBigDecimal("revenue"));
                return m;
            },
            vendorId
        );
        stats.put("monthlyStats", monthlyStats);

        // Fetch top selling products
        List<Map<String, Object>> topSelling = jdbcTemplate.query(
            "SELECT oi.product_id, p.name, p.price, SUM(oi.quantity) AS qty, SUM(oi.price * oi.quantity) AS rev FROM order_items oi JOIN orders o ON oi.order_id=o.id JOIN products p ON oi.product_id=p.id WHERE o.vendor_id=? AND o.status<>'CANCELLED' GROUP BY oi.product_id, p.name, p.price ORDER BY qty DESC LIMIT 5",
            (rs, rowNum) -> {
                Map<String, Object> item = new HashMap<>();
                item.put("quantity", rs.getInt("qty"));
                item.put("revenue", rs.getBigDecimal("rev"));
                item.put("product", Map.of(
                    "_id", rs.getLong("product_id"),
                    "name", rs.getString("name"),
                    "price", rs.getBigDecimal("price")
                ));
                return item;
            },
            vendorId
        );
        stats.put("topSellingProducts", topSelling);

        return ResponseEntity.ok(Map.of("success", true, "data", stats));
    }

    @GetMapping
    public ResponseEntity<?> getAllVendors(@RequestParam(defaultValue = "1") int page,
                                           @RequestParam(defaultValue = "10") int limit,
                                           @RequestParam(required = false) String search) {
        List<User> vendors = userDao.findVendors(page, limit, search);
        Map<String, Object> response = new HashMap<>();
        response.put("vendors", vendors.stream().map(authService::safeUser).toList());
        response.put("total", userDao.countVendors(search));
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{vendorId}/verify")
    public ResponseEntity<?> verifyVendor(@PathVariable Long vendorId) {
        shopDao.findByOwnerId(vendorId).ifPresent(shop -> shopDao.verify(shop.getId()));
        return ResponseEntity.ok(Map.of("message", "Vendor verified"));
    }

    @GetMapping("/{vendorId}/offline-analytics")
    public ResponseEntity<?> getOfflineAnalytics(@PathVariable Long vendorId) {
        // Query products for this vendor and count reservations vs actual delivered offline orders
        List<Map<String, Object>> products = jdbcTemplate.query(
            "SELECT id, name, category, stock FROM products WHERE vendor_id=?",
            (rs, rowNum) -> {
                Map<String, Object> p = new HashMap<>();
                p.put("productId", rs.getLong("id"));
                p.put("productName", rs.getString("name"));
                p.put("category", rs.getString("category"));
                p.put("stock", rs.getInt("stock"));
                return p;
            },
            vendorId
        );

        List<Map<String, Object>> analytics = new ArrayList<>();
        for (Map<String, Object> p : products) {
            Long productId = (Long) p.get("productId");
            
            // Count try-in-store reservations
            Integer reservations = jdbcTemplate.queryForObject(
                "SELECT COUNT(DISTINCT o.id) FROM orders o JOIN order_items oi ON oi.order_id=o.id WHERE o.vendor_id=? AND oi.product_id=? AND o.payment_method='reserve'",
                Integer.class,
                vendorId,
                productId
            );
            int resCount = reservations != null ? reservations : 0;

            // Count completed offline purchases
            Integer purchases = jdbcTemplate.queryForObject(
                "SELECT COUNT(DISTINCT o.id) FROM orders o JOIN order_items oi ON oi.order_id=o.id WHERE o.vendor_id=? AND oi.product_id=? AND o.payment_method='reserve' AND o.status='DELIVERED'",
                Integer.class,
                vendorId,
                productId
            );
            int purCount = purchases != null ? purchases : 0;

            // Calculate simulated product views (views > reservations)
            int stock = (int) p.get("stock");
            int viewCount = resCount * 5 + stock * 10 + 25;

            // Calculate rates
            double irc = viewCount > 0 ? ((double) resCount / viewCount) * 100.0 : 0.0;
            double asc = resCount > 0 ? ((double) purCount / resCount) * 100.0 : 0.0;

            Map<String, Object> metric = new HashMap<>();
            metric.put("productId", productId);
            metric.put("productName", p.get("productName"));
            metric.put("category", p.get("category"));
            metric.put("viewCount", viewCount);
            metric.put("reservationsCount", resCount);
            metric.put("purchasesCount", purCount);
            metric.put("irc", irc);
            metric.put("asc", asc);
            analytics.add(metric);
        }

        return ResponseEntity.ok(Map.of("success", true, "data", analytics));
    }
}
