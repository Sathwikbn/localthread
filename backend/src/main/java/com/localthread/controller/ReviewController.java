package com.localthread.controller;

import com.localthread.dao.ReviewDao;
import com.localthread.dao.UserDao;
import com.localthread.model.Review;
import com.localthread.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewDao reviewDao;
    private final UserDao userDao;
    private final JdbcTemplate jdbcTemplate;

    public ReviewController(ReviewDao reviewDao, UserDao userDao, JdbcTemplate jdbcTemplate) {
        this.reviewDao = reviewDao;
        this.userDao = userDao;
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<?> getProductReviews(@PathVariable Long productId) {
        List<Map<String, Object>> reviews = jdbcTemplate.query(
            "SELECT r.*, u.name AS user_name FROM reviews r LEFT JOIN users u ON r.user_id = u.id WHERE r.product_id = ? AND r.status = 'APPROVED' ORDER BY r.created_at DESC",
            (rs, rowNum) -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", rs.getLong("id"));
                map.put("productId", rs.getLong("product_id"));
                map.put("rating", rs.getInt("rating"));
                map.put("comment", rs.getString("comment"));
                map.put("userName", rs.getString("user_name"));
                map.put("createdAt", rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at").toLocalDateTime().toString() : "");
                map.put("likes", 0);
                return map;
            },
            productId
        );
        return ResponseEntity.ok(Map.of("success", true, "data", Map.of("reviews", reviews)));
    }

    @PostMapping("/products/{productId}")
    public ResponseEntity<?> createProductReview(@AuthenticationPrincipal UserDetails userDetails,
                                                 @PathVariable Long productId,
                                                 @RequestBody Map<String, Object> body) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        Review review = new Review();
        review.setProductId(productId);
        review.setUserId(user.getId());
        review.setRating(Integer.parseInt(body.get("rating").toString()));
        review.setComment((String) body.get("comment"));
        review.setStatus("APPROVED");
        Review saved = reviewDao.save(review);
        reviewDao.updateStatus(saved.getId(), "APPROVED");
        return ResponseEntity.ok(Map.of("success", true, "data", Map.of("review", saved)));
    }

    @GetMapping("/shops/{shopId}")
    public ResponseEntity<?> getShopReviews(@PathVariable Long shopId) {
        List<Map<String, Object>> reviews = jdbcTemplate.query(
            "SELECT r.*, u.name AS user_name FROM reviews r LEFT JOIN users u ON r.user_id = u.id WHERE r.shop_id = ? AND r.status = 'APPROVED' ORDER BY r.created_at DESC",
            (rs, rowNum) -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", rs.getLong("id"));
                map.put("shopId", rs.getLong("shop_id"));
                map.put("rating", rs.getInt("rating"));
                map.put("comment", rs.getString("comment"));
                map.put("userName", rs.getString("user_name"));
                map.put("createdAt", rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at").toLocalDateTime().toString() : "");
                map.put("likes", 0);
                return map;
            },
            shopId
        );
        return ResponseEntity.ok(Map.of("success", true, "data", Map.of("reviews", reviews)));
    }

    @PostMapping("/shops/{shopId}")
    public ResponseEntity<?> createShopReview(@AuthenticationPrincipal UserDetails userDetails,
                                              @PathVariable Long shopId,
                                              @RequestBody Map<String, Object> body) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        Review review = new Review();
        review.setUserId(user.getId());
        review.setRating(Integer.parseInt(body.get("rating").toString()));
        review.setComment((String) body.get("comment"));
        review.setStatus("APPROVED");
        
        // Save using raw SQL since ReviewDao has no shop_id mapping
        jdbcTemplate.update(
            "INSERT INTO reviews (shop_id, user_id, rating, comment, status) VALUES (?,?,?,?,?)",
            shopId, user.getId(), review.getRating(), review.getComment(), "APPROVED"
        );
        return ResponseEntity.ok(Map.of("success", true, "message", "Shop review submitted successfully"));
    }
}
