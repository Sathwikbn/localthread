package com.localthread.dao.impl;

import com.localthread.dao.OrderStatusHistoryDao;
import com.localthread.model.OrderStatusHistory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.List;

@Repository
public class OrderStatusHistoryDaoImpl implements OrderStatusHistoryDao {

    private final JdbcTemplate jdbcTemplate;

    public OrderStatusHistoryDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<OrderStatusHistory> rowMapper = (rs, rowNum) -> {
        OrderStatusHistory h = new OrderStatusHistory();
        h.setId(rs.getLong("id"));
        h.setOrderId(rs.getLong("order_id"));
        h.setStatus(rs.getString("status"));
        h.setNote(rs.getString("note"));
        Timestamp ts = rs.getTimestamp("created_at");
        if (ts != null) {
            h.setCreatedAt(ts.toLocalDateTime());
        }
        return h;
    };

    @Override
    public OrderStatusHistory save(OrderStatusHistory h) {
        String sql = "INSERT INTO order_status_history (order_id, status, note) VALUES (?,?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, h.getOrderId());
            ps.setString(2, h.getStatus());
            ps.setString(3, h.getNote());
            return ps;
        }, keyHolder);
        h.setId(keyHolder.getKey().longValue());
        return h;
    }

    @Override
    public List<OrderStatusHistory> findByOrderId(Long orderId) {
        return jdbcTemplate.query("SELECT * FROM order_status_history WHERE order_id=? ORDER BY created_at ASC", rowMapper, orderId);
    }
}
