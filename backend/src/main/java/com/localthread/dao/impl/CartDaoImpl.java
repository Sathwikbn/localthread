package com.localthread.dao.impl;

import com.localthread.dao.CartDao;
import com.localthread.model.CartItem;
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
public class CartDaoImpl implements CartDao {

    private final JdbcTemplate jdbcTemplate;

    public CartDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<CartItem> rowMapper = (rs, rowNum) -> {
        CartItem c = new CartItem();
        c.setId(rs.getLong("id"));
        c.setUserId(rs.getLong("user_id"));
        c.setProductId(rs.getLong("product_id"));
        c.setQuantity(rs.getInt("quantity"));
        try { c.setProductName(rs.getString("name")); } catch (Exception ignored) {}
        try { c.setProductImageUrl(rs.getString("image_url")); } catch (Exception ignored) {}
        try { c.setProductPrice(rs.getBigDecimal("price")); } catch (Exception ignored) {}
        return c;
    };

    @Override
    public CartItem save(CartItem item) {
        String sql = "INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?,?,?) ON DUPLICATE KEY UPDATE quantity=quantity+VALUES(quantity)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, item.getUserId());
            ps.setLong(2, item.getProductId());
            ps.setInt(3, item.getQuantity() != null ? item.getQuantity() : 1);
            return ps;
        }, keyHolder);
        if (keyHolder.getKey() != null) item.setId(keyHolder.getKey().longValue());
        return item;
    }

    @Override
    public Optional<CartItem> findById(Long id) {
        List<CartItem> items = jdbcTemplate.query(
            "SELECT c.*, p.name, p.image_url, p.price FROM cart_items c JOIN products p ON c.product_id=p.id WHERE c.id=?",
            rowMapper, id
        );
        return items.isEmpty() ? Optional.empty() : Optional.of(items.get(0));
    }

    @Override
    public Optional<CartItem> findByUserAndProduct(Long userId, Long productId) {
        List<CartItem> items = jdbcTemplate.query(
            "SELECT c.*, p.name, p.image_url, p.price FROM cart_items c JOIN products p ON c.product_id=p.id WHERE c.user_id=? AND c.product_id=?",
            rowMapper, userId, productId
        );
        return items.isEmpty() ? Optional.empty() : Optional.of(items.get(0));
    }

    @Override
    public List<CartItem> findByUserId(Long userId) {
        return jdbcTemplate.query(
            "SELECT c.*, p.name, p.image_url, p.price FROM cart_items c JOIN products p ON c.product_id=p.id WHERE c.user_id=?",
            rowMapper, userId
        );
    }

    @Override
    public void updateQuantity(Long id, int quantity) {
        jdbcTemplate.update("UPDATE cart_items SET quantity=? WHERE id=?", quantity, id);
    }

    @Override
    public void deleteById(Long id) {
        jdbcTemplate.update("DELETE FROM cart_items WHERE id=?", id);
    }

    @Override
    public void deleteAllByUserId(Long userId) {
        jdbcTemplate.update("DELETE FROM cart_items WHERE user_id=?", userId);
    }
}
