package com.localthread.dao.impl;

import com.localthread.dao.CouponDao;
import com.localthread.model.Coupon;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
public class CouponDaoImpl implements CouponDao {

    private final JdbcTemplate jdbcTemplate;

    public CouponDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Coupon> rowMapper = (rs, rowNum) -> {
        Coupon c = new Coupon();
        c.setId(rs.getLong("id"));
        c.setCode(rs.getString("code"));
        c.setDiscountType(rs.getString("discount_type"));
        c.setDiscountValue(rs.getBigDecimal("discount_value"));
        c.setMinOrderAmount(rs.getBigDecimal("min_order_amount"));
        c.setMaxDiscountAmount(rs.getBigDecimal("max_discount_amount"));
        Timestamp exp = rs.getTimestamp("expiration_date");
        if (exp != null) {
            c.setExpirationDate(exp.toLocalDateTime());
        }
        c.setActive(rs.getBoolean("is_active"));
        Timestamp created = rs.getTimestamp("created_at");
        if (created != null) {
            c.setCreatedAt(created.toLocalDateTime());
        }
        return c;
    };

    @Override
    public Coupon save(Coupon c) {
        String sql = "INSERT INTO coupons (code, discount_type, discount_value, min_order_amount, max_discount_amount, expiration_date, is_active) VALUES (?,?,?,?,?,?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, c.getCode());
            ps.setString(2, c.getDiscountType());
            ps.setBigDecimal(3, c.getDiscountValue());
            ps.setBigDecimal(4, c.getMinOrderAmount());
            ps.setBigDecimal(5, c.getMaxDiscountAmount());
            ps.setTimestamp(6, c.getExpirationDate() != null ? Timestamp.valueOf(c.getExpirationDate()) : null);
            ps.setBoolean(7, c.isActive());
            return ps;
        }, keyHolder);
        c.setId(keyHolder.getKey().longValue());
        return c;
    }

    @Override
    public Optional<Coupon> findByCode(String code) {
        List<Coupon> list = jdbcTemplate.query("SELECT * FROM coupons WHERE UPPER(code)=UPPER(?) AND is_active=TRUE", rowMapper, code);
        return list.isEmpty() ? Optional.empty() : Optional.of(list.get(0));
    }

    @Override
    public List<Coupon> findAllActive() {
        return jdbcTemplate.query("SELECT * FROM coupons WHERE is_active=TRUE ORDER BY code ASC", rowMapper);
    }

    @Override
    public void deleteById(Long id) {
        jdbcTemplate.update("DELETE FROM coupons WHERE id=?", id);
    }
}
