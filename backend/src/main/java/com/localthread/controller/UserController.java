package com.localthread.controller;

import com.localthread.dao.UserDao;
import com.localthread.model.User;
import com.localthread.service.AuthService;
import com.localthread.service.FileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserDao userDao;
    private final AuthService authService;
    private final FileService fileService;
    private final PasswordEncoder passwordEncoder;
    private final JdbcTemplate jdbcTemplate;

    public UserController(UserDao userDao, AuthService authService,
                          FileService fileService, PasswordEncoder passwordEncoder,
                          JdbcTemplate jdbcTemplate) {
        this.userDao = userDao;
        this.authService = authService;
        this.fileService = fileService;
        this.passwordEncoder = passwordEncoder;
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        return userDao.findByEmail(userDetails.getUsername())
                .map(u -> ResponseEntity.ok(authService.safeUser(u)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal UserDetails userDetails,
                                           @RequestBody Map<String, String> body) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        if (body.containsKey("name")) user.setName(body.get("name"));
        if (body.containsKey("phone")) user.setPhone(body.get("phone"));
        userDao.update(user);
        return ResponseEntity.ok(authService.safeUser(user));
    }

    @PutMapping("/avatar")
    public ResponseEntity<?> uploadAvatar(@AuthenticationPrincipal UserDetails userDetails,
                                          @RequestParam("avatar") MultipartFile file) {
        try {
            User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
            String url = fileService.saveFile(file, "avatars");
            userDao.updateAvatar(user.getId(), url);
            return ResponseEntity.ok(Map.of("avatarUrl", url, "message", "Avatar updated"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/store-image")
    public ResponseEntity<?> uploadStoreImage(@AuthenticationPrincipal UserDetails userDetails,
                                              @RequestParam("storeImage") MultipartFile file) {
        try {
            User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
            String url = fileService.saveFile(file, "store-images");
            userDao.updateStoreImage(user.getId(), url);
            return ResponseEntity.ok(Map.of("storeImageUrl", url, "message", "Store image updated"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/password")
    public ResponseEntity<?> changePassword(@AuthenticationPrincipal UserDetails userDetails,
                                            @RequestBody Map<String, String> body) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        if (!passwordEncoder.matches(body.get("currentPassword"), user.getPassword())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Current password is incorrect"));
        }
        userDao.updatePassword(user.getId(), passwordEncoder.encode(body.get("newPassword")));
        return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
    }

    @DeleteMapping("/account")
    public ResponseEntity<?> deactivateAccount(@AuthenticationPrincipal UserDetails userDetails,
                                               @RequestBody Map<String, String> body) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        if (!passwordEncoder.matches(body.get("password"), user.getPassword())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Password is incorrect"));
        }
        userDao.toggleActive(user.getId(), false);
        return ResponseEntity.ok(Map.of("message", "Account deactivated"));
    }

    @GetMapping("/vendors")
    public ResponseEntity<?> getVendors(@RequestParam(defaultValue = "1") int page,
                                        @RequestParam(defaultValue = "10") int limit,
                                        @RequestParam(required = false) String search) {
        Map<String, Object> response = new HashMap<>();
        response.put("vendors", userDao.findVendors(page, limit, search));
        response.put("total", userDao.countVendors(search));
        response.put("page", page);
        response.put("limit", limit);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/vendors/{id}")
    public ResponseEntity<?> getVendorById(@PathVariable Long id) {
        return userDao.findById(id)
                .filter(u -> "VENDOR".equals(u.getRole()))
                .map(u -> ResponseEntity.ok(authService.safeUser(u)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/subscription")
    public ResponseEntity<?> updateSubscription(@AuthenticationPrincipal UserDetails userDetails,
                                                @RequestBody Map<String, String> body) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        String tier = body.get("tier");
        if (tier == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Subscription tier is required"));
        }
        jdbcTemplate.update("UPDATE users SET subscription_tier = ? WHERE id = ?", tier.toUpperCase(), user.getId());
        user.setSubscriptionTier(tier.toUpperCase());
        return ResponseEntity.ok(Map.of("success", true, "user", authService.safeUser(user)));
    }
}
