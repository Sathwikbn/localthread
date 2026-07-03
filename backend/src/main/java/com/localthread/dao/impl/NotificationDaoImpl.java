package com.localthread.dao.impl;

import com.localthread.dao.NotificationDao;
import com.localthread.model.Notification;
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
public class NotificationDaoImpl implements NotificationDao {

    private final JdbcTemplate jdbcTemplate;

    public NotificationDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Notification> rowMapper = (rs, rowNum) -> {
        Notification n = new Notification();
        n.setId(rs.getLong("id"));
        n.setUserId(rs.getLong("user_id"));
        n.setType(rs.getString("type"));
        n.setTitle(rs.getString("title"));
        n.setMessage(rs.getString("message"));
        n.setRead(rs.getBoolean("is_read"));
        n.setReferenceId(rs.getString("reference_id"));
        n.setReferenceType(rs.getString("reference_type"));
        Timestamp ts = rs.getTimestamp("created_at");
        if (ts != null) {
            n.setCreatedAt(ts.toLocalDateTime());
        }
        return n;
    };

    @Override
    public Notification save(Notification n) {
        String sql = "INSERT INTO notifications (user_id, type, title, message, is_read, reference_id, reference_type) VALUES (?,?,?,?,?,?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, n.getUserId());
            ps.setString(2, n.getType());
            ps.setString(3, n.getTitle());
            ps.setString(4, n.getMessage());
            ps.setBoolean(5, n.isRead());
            ps.setString(6, n.getReferenceId());
            ps.setString(7, n.getReferenceType());
            return ps;
        }, keyHolder);
        n.setId(keyHolder.getKey().longValue());
        return n;
    }

    @Override
    public Optional<Notification> findById(Long id) {
        List<Notification> list = jdbcTemplate.query("SELECT * FROM notifications WHERE id=?", rowMapper, id);
        return list.isEmpty() ? Optional.empty() : Optional.of(list.get(0));
    }

    @Override
    public List<Notification> findByUserId(Long userId) {
        return jdbcTemplate.query("SELECT * FROM notifications WHERE user_id=? ORDER BY created_at DESC", rowMapper, userId);
    }

    @Override
    public int countUnreadByUserId(Long userId) {
        Integer count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM notifications WHERE user_id=? AND is_read=FALSE", Integer.class, userId);
        return count != null ? count : 0;
    }

    @Override
    public void markAsRead(Long id) {
        jdbcTemplate.update("UPDATE notifications SET is_read=TRUE WHERE id=?", id);
    }

    @Override
    public void markAllAsRead(Long userId) {
        jdbcTemplate.update("UPDATE notifications SET is_read=TRUE WHERE user_id=?", userId);
    }

    @Override
    public void deleteById(Long id) {
        jdbcTemplate.update("DELETE FROM notifications WHERE id=?", id);
    }
}
