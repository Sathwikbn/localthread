package com.localthread.service;

import com.localthread.dao.UserDao;
import com.localthread.model.User;
import com.localthread.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(UserDao userDao, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public Map<String, Object> register(String name, String email, String password, String role) {
        if (userDao.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role != null ? role.toUpperCase() : "CUSTOMER");
        User saved = userDao.save(user);

        String token = jwtTokenProvider.generateToken(saved.getId(), saved.getEmail(), saved.getRole());
        return buildAuthResponse(saved, token);
    }

    public Map<String, Object> login(String email, String password) {
        User user = userDao.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        if (!user.getIsActive()) {
            throw new RuntimeException("Account is suspended");
        }

        String token = jwtTokenProvider.generateToken(user.getId(), user.getEmail(), user.getRole());
        return buildAuthResponse(user, token);
    }

    public Map<String, Object> getCurrentUser(String email) {
        User user = userDao.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Map<String, Object> response = new HashMap<>();
        response.put("user", safeUser(user));
        return response;
    }

    private Map<String, Object> buildAuthResponse(User user, String token) {
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", safeUser(user));
        return response;
    }

    public Map<String, Object> safeUser(User user) {
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
        u.put("subscriptionTier", user.getSubscriptionTier() != null ? user.getSubscriptionTier() : "BASIC");
        return u;
    }
}
