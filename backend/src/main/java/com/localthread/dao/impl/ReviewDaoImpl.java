package com.localthread.dao.impl;

import com.localthread.dao.ReviewDao;
import com.localthread.model.Review;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

@Repository
public class ReviewDaoImpl implements ReviewDao {

    private final JdbcTemplate jdbcTemplate;

    public ReviewDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Review> rowMapper = (rs, rowNum) -> {
        Review r = new Review();
        r.setId(rs.getLong("id"));
        r.setProductId(rs.getObject("product_id") != null ? rs.getLong("product_id") : null);
        r.setUserId(rs.getObject("user_id") != null ? rs.getLong("user_id") : null);
        r.setRating(rs.getInt("rating"));
        r.setComment(rs.getString("comment"));
        r.setStatus(rs.getString("status"));
        r.setCreatedAt(rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at").toLocalDateTime() : null);
        try { r.setUserName(rs.getString("user_name")); } catch (Exception ignored) {}
        return r;
    };

    @Override
    public Review save(Review review) {
        String sql = "INSERT INTO reviews (product_id, user_id, rating, comment, status) VALUES (?,?,?,?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setObject(1, review.getProductId());
            ps.setObject(2, review.getUserId());
            ps.setInt(3, review.getRating());
            ps.setString(4, review.getComment());
            ps.setString(5, "PENDING");
            return ps;
        }, keyHolder);
        review.setId(keyHolder.getKey().longValue());
        return review;
    }

    @Override
    public Optional<Review> findById(Long id) {
        List<Review> reviews = jdbcTemplate.query(
            "SELECT r.*, u.name AS user_name FROM reviews r LEFT JOIN users u ON r.user_id=u.id WHERE r.id=?",
            rowMapper, id
        );
        return reviews.isEmpty() ? Optional.empty() : Optional.of(reviews.get(0));
    }

    @Override
    public List<Review> findPending(int page, int limit) {
        return jdbcTemplate.query(
            "SELECT r.*, u.name AS user_name FROM reviews r LEFT JOIN users u ON r.user_id=u.id WHERE r.status='PENDING' ORDER BY r.created_at DESC LIMIT ? OFFSET ?",
            rowMapper, limit, (page - 1) * limit
        );
    }

    @Override
    public int countPending() {
        return jdbcTemplate.queryForObject("SELECT COUNT(*) FROM reviews WHERE status='PENDING'", Integer.class);
    }

    @Override
    public void updateStatus(Long id, String status) {
        jdbcTemplate.update("UPDATE reviews SET status=? WHERE id=?", status, id);
    }
}
