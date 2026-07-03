package com.localthread.dao.impl;

import com.localthread.dao.WishlistDao;
import com.localthread.model.Product;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class WishlistDaoImpl implements WishlistDao {

    private final JdbcTemplate jdbcTemplate;

    public WishlistDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Product> productRowMapper = (rs, rowNum) -> {
        Product p = new Product();
        p.setId(rs.getLong("id"));
        p.setName(rs.getString("name"));
        p.setDescription(rs.getString("description"));
        p.setPrice(rs.getBigDecimal("price"));
        p.setCategory(rs.getString("category"));
        p.setImageUrl(rs.getString("image_url"));
        p.setStock(rs.getInt("stock"));
        p.setStatus(rs.getString("status"));
        return p;
    };

    @Override
    public void add(Long userId, Long productId) {
        jdbcTemplate.update(
            "INSERT IGNORE INTO wishlist (user_id, product_id) VALUES (?,?)",
            userId, productId
        );
    }

    @Override
    public void remove(Long userId, Long productId) {
        jdbcTemplate.update("DELETE FROM wishlist WHERE user_id=? AND product_id=?", userId, productId);
    }

    @Override
    public List<Product> findByUserId(Long userId) {
        return jdbcTemplate.query(
            "SELECT p.* FROM products p JOIN wishlist w ON p.id=w.product_id WHERE w.user_id=?",
            productRowMapper, userId
        );
    }

    @Override
    public boolean exists(Long userId, Long productId) {
        Integer count = jdbcTemplate.queryForObject(
            "SELECT COUNT(*) FROM wishlist WHERE user_id=? AND product_id=?",
            Integer.class, userId, productId
        );
        return count != null && count > 0;
    }
}
