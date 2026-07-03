package com.localthread.dao.impl;

import com.localthread.dao.AuditLogDao;
import com.localthread.model.AuditLog;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class AuditLogDaoImpl implements AuditLogDao {

    private final JdbcTemplate jdbcTemplate;

    public AuditLogDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<AuditLog> rowMapper = (rs, rowNum) -> {
        AuditLog log = new AuditLog();
        log.setId(rs.getLong("id"));
        log.setUserId(rs.getObject("user_id") != null ? rs.getLong("user_id") : null);
        log.setAction(rs.getString("action"));
        log.setIpAddress(rs.getString("ip_address"));
        log.setCreatedAt(rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at").toLocalDateTime() : null);
        try { log.setUserName(rs.getString("user_name")); } catch (Exception ignored) {}
        return log;
    };

    @Override
    public void save(AuditLog log) {
        jdbcTemplate.update(
            "INSERT INTO audit_logs (user_id, action, ip_address) VALUES (?,?,?)",
            log.getUserId(), log.getAction(), log.getIpAddress()
        );
    }

    @Override
    public List<AuditLog> findAll(int page, int limit) {
        return jdbcTemplate.query(
            "SELECT a.*, u.name AS user_name FROM audit_logs a LEFT JOIN users u ON a.user_id=u.id ORDER BY a.created_at DESC LIMIT ? OFFSET ?",
            rowMapper, limit, (page - 1) * limit
        );
    }

    @Override
    public int countAll() {
        return jdbcTemplate.queryForObject("SELECT COUNT(*) FROM audit_logs", Integer.class);
    }
}
