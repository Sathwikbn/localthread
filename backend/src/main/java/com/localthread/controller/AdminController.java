package com.localthread.controller;

import com.localthread.dao.*;
import com.localthread.model.User;
import com.localthread.service.AuthService;
import com.localthread.service.FileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserDao userDao;
    private final ProductDao productDao;
    private final ReviewDao reviewDao;
    private final AuditLogDao auditLogDao;
    private final AppSettingDao appSettingDao;
    private final AuthService authService;
    private final PasswordEncoder passwordEncoder;

    public AdminController(UserDao userDao, ProductDao productDao, ReviewDao reviewDao,
                           AuditLogDao auditLogDao, AppSettingDao appSettingDao,
                           AuthService authService, PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.productDao = productDao;
        this.reviewDao = reviewDao;
        this.auditLogDao = auditLogDao;
        this.appSettingDao = appSettingDao;
        this.authService = authService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userDao.countAll(null, null));
        stats.put("totalVendors", userDao.countVendors(null));
        stats.put("totalProducts", productDao.countAll(null, null, null, null, null));
        stats.put("pendingProducts", productDao.countPending());
        stats.put("pendingReviews", reviewDao.countPending());
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/users")
    public ResponseEntity<?> getUsers(@RequestParam(defaultValue = "1") int page,
                                      @RequestParam(defaultValue = "10") int limit,
                                      @RequestParam(required = false) String search,
                                      @RequestParam(required = false) String role) {
        List<User> users = userDao.findAll(page, limit, search, role);
        Map<String, Object> response = new HashMap<>();
        response.put("users", users.stream().map(authService::safeUser).toList());
        response.put("total", userDao.countAll(search, role));
        response.put("page", page);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/users/{id}/toggle-active")
    public ResponseEntity<?> toggleUserActive(@PathVariable Long id,
                                              @RequestBody Map<String, Boolean> body) {
        userDao.toggleActive(id, body.get("isActive"));
        return ResponseEntity.ok(Map.of("message", "User status updated"));
    }

    @PostMapping("/users/create")
    public ResponseEntity<?> createUser(@RequestBody Map<String, String> body) {
        try {
            String role = body.getOrDefault("role", "CUSTOMER").toUpperCase();
            Map<String, Object> result = authService.register(
                body.get("name"), body.get("email"),
                body.getOrDefault("password", "TemporaryPass123!"), role
            );
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/vendors/{vendorId}/verify")
    public ResponseEntity<?> verifyVendor(@PathVariable Long vendorId) {
        userDao.findById(vendorId).ifPresent(u -> {});
        return ResponseEntity.ok(Map.of("message", "Vendor verified"));
    }

    @GetMapping("/products/pending")
    public ResponseEntity<?> getPendingProducts(@RequestParam(defaultValue = "1") int page,
                                                @RequestParam(defaultValue = "10") int limit) {
        Map<String, Object> response = new HashMap<>();
        response.put("products", productDao.findPending(page, limit));
        response.put("total", productDao.countPending());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/products/{id}/approve")
    public ResponseEntity<?> approveProduct(@PathVariable Long id) {
        productDao.updateStatus(id, "APPROVED");
        return ResponseEntity.ok(Map.of("message", "Product approved"));
    }

    @PutMapping("/products/{id}/reject")
    public ResponseEntity<?> rejectProduct(@PathVariable Long id) {
        productDao.updateStatus(id, "REJECTED");
        return ResponseEntity.ok(Map.of("message", "Product rejected"));
    }

    @GetMapping("/reviews/pending")
    public ResponseEntity<?> getPendingReviews(@RequestParam(defaultValue = "1") int page,
                                               @RequestParam(defaultValue = "10") int limit) {
        Map<String, Object> response = new HashMap<>();
        response.put("reviews", reviewDao.findPending(page, limit));
        response.put("total", reviewDao.countPending());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/reviews/{id}/moderate")
    public ResponseEntity<?> moderateReview(@PathVariable Long id,
                                            @RequestBody Map<String, String> body) {
        reviewDao.updateStatus(id, body.get("status").toUpperCase());
        return ResponseEntity.ok(Map.of("message", "Review moderated"));
    }

    @GetMapping("/settings")
    public ResponseEntity<?> getSettings() {
        return ResponseEntity.ok(appSettingDao.findAll());
    }

    @PutMapping("/settings")
    public ResponseEntity<?> updateSetting(@RequestBody Map<String, String> body) {
        appSettingDao.upsert(body.get("key"), body.get("value"));
        return ResponseEntity.ok(Map.of("message", "Setting updated"));
    }

    @PostMapping("/backups/trigger")
    public ResponseEntity<?> triggerBackup() {
        return ResponseEntity.ok(Map.of("message", "Backup triggered", "timestamp", System.currentTimeMillis()));
    }

    @GetMapping("/security/logs")
    public ResponseEntity<?> getSecurityLogs(@RequestParam(defaultValue = "1") int page,
                                             @RequestParam(defaultValue = "10") int limit) {
        Map<String, Object> response = new HashMap<>();
        response.put("logs", auditLogDao.findAll(page, limit));
        response.put("total", auditLogDao.countAll());
        return ResponseEntity.ok(response);
    }
}
