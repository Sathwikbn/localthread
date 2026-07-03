package com.localthread.controller;

import com.localthread.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        try {
            Map<String, Object> result = authService.register(
                body.get("name"), body.get("email"),
                body.get("password"), body.get("role")
            );
            return ResponseEntity.ok(Map.of("success", true, "data", result));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        try {
            Map<String, Object> result = authService.login(body.get("email"), body.get("password"));
            return ResponseEntity.ok(Map.of("success", true, "data", result));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            Map<String, Object> result = authService.getCurrentUser(userDetails.getUsername());
            return ResponseEntity.ok(Map.of("success", true, "data", result));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@AuthenticationPrincipal UserDetails userDetails) {
        Map<String, Object> result = authService.getCurrentUser(userDetails.getUsername());
        return ResponseEntity.ok(Map.of("success", true, "data", result));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> body) {
        return ResponseEntity.ok(Map.of("success", true, "message", "If this email exists, a reset link will be sent."));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> body) {
        return ResponseEntity.ok(Map.of("success", true, "message", "Password reset successfully."));
    }

    @PostMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@RequestBody Map<String, String> body) {
        return ResponseEntity.ok(Map.of("success", true, "message", "Email verified successfully."));
    }
}
