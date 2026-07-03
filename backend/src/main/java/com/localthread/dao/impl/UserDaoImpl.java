package com.localthread.dao.impl;

import com.localthread.dao.UserDao;
import com.localthread.model.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class UserDaoImpl implements UserDao {

    private final JdbcTemplate jdbcTemplate;

    public UserDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<User> userRowMapper = (rs, rowNum) -> {
        User u = new User();
        u.setId(rs.getLong("id"));
        u.setName(rs.getString("name"));
        u.setEmail(rs.getString("email"));
        u.setPassword(rs.getString("password"));
        u.setRole(rs.getString("role"));
        u.setIsActive(rs.getBoolean("is_active"));
        u.setIsVerified(rs.getBoolean("is_verified"));
        u.setAvatarUrl(rs.getString("avatar_url"));
        u.setStoreImageUrl(rs.getString("store_image_url"));
        u.setPhone(rs.getString("phone"));
        u.setCreatedAt(rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at").toLocalDateTime() : null);
        u.setUpdatedAt(rs.getTimestamp("updated_at") != null ? rs.getTimestamp("updated_at").toLocalDateTime() : null);
        u.setSubscriptionTier(rs.getString("subscription_tier"));
        return u;
    };

    @Override
    public User save(User user) {
        String sql = "INSERT INTO users (name, email, password, role, is_active, is_verified, phone, subscription_tier) VALUES (?,?,?,?,?,?,?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getName());
            ps.setString(2, user.getEmail());
            ps.setString(3, user.getPassword());
            ps.setString(4, user.getRole() != null ? user.getRole() : "CUSTOMER");
            ps.setBoolean(5, true);
            ps.setBoolean(6, false);
            ps.setString(7, user.getPhone());
            ps.setString(8, user.getSubscriptionTier() != null ? user.getSubscriptionTier() : "BASIC");
            return ps;
        }, keyHolder);
        user.setId(keyHolder.getKey().longValue());
        return user;
    }

    @Override
    public Optional<User> findById(Long id) {
        List<User> users = jdbcTemplate.query("SELECT * FROM users WHERE id = ?", userRowMapper, id);
        return users.isEmpty() ? Optional.empty() : Optional.of(users.get(0));
    }

    @Override
    public Optional<User> findByEmail(String email) {
        List<User> users = jdbcTemplate.query("SELECT * FROM users WHERE email = ?", userRowMapper, email);
        return users.isEmpty() ? Optional.empty() : Optional.of(users.get(0));
    }

    @Override
    public List<User> findAll(int page, int limit, String search, String role) {
        StringBuilder sql = new StringBuilder("SELECT * FROM users WHERE 1=1");
        List<Object> params = new ArrayList<>();
        if (search != null && !search.isEmpty()) {
            sql.append(" AND (name LIKE ? OR email LIKE ?)");
            params.add("%" + search + "%");
            params.add("%" + search + "%");
        }
        if (role != null && !role.isEmpty()) {
            sql.append(" AND role = ?");
            params.add(role.toUpperCase());
        }
        sql.append(" ORDER BY created_at DESC LIMIT ? OFFSET ?");
        params.add(limit);
        params.add((page - 1) * limit);
        return jdbcTemplate.query(sql.toString(), userRowMapper, params.toArray());
    }

    @Override
    public int countAll(String search, String role) {
        StringBuilder sql = new StringBuilder("SELECT COUNT(*) FROM users WHERE 1=1");
        List<Object> params = new ArrayList<>();
        if (search != null && !search.isEmpty()) {
            sql.append(" AND (name LIKE ? OR email LIKE ?)");
            params.add("%" + search + "%");
            params.add("%" + search + "%");
        }
        if (role != null && !role.isEmpty()) {
            sql.append(" AND role = ?");
            params.add(role.toUpperCase());
        }
        return jdbcTemplate.queryForObject(sql.toString(), Integer.class, params.toArray());
    }

    @Override
    public void update(User user) {
        jdbcTemplate.update(
            "UPDATE users SET name=?, phone=?, updated_at=NOW() WHERE id=?",
            user.getName(), user.getPhone(), user.getId()
        );
    }

    @Override
    public void updatePassword(Long id, String encodedPassword) {
        jdbcTemplate.update("UPDATE users SET password=?, updated_at=NOW() WHERE id=?", encodedPassword, id);
    }

    @Override
    public void updateAvatar(Long id, String avatarUrl) {
        jdbcTemplate.update("UPDATE users SET avatar_url=?, updated_at=NOW() WHERE id=?", avatarUrl, id);
    }

    @Override
    public void updateStoreImage(Long id, String storeImageUrl) {
        jdbcTemplate.update("UPDATE users SET store_image_url=?, updated_at=NOW() WHERE id=?", storeImageUrl, id);
    }

    @Override
    public void toggleActive(Long id, boolean isActive) {
        jdbcTemplate.update("UPDATE users SET is_active=?, updated_at=NOW() WHERE id=?", isActive, id);
    }

    @Override
    public void deleteById(Long id) {
        jdbcTemplate.update("DELETE FROM users WHERE id=?", id);
    }

    @Override
    public List<User> findVendors(int page, int limit, String search) {
        StringBuilder sql = new StringBuilder("SELECT * FROM users WHERE role='VENDOR'");
        List<Object> params = new ArrayList<>();
        if (search != null && !search.isEmpty()) {
            sql.append(" AND (name LIKE ? OR email LIKE ?)");
            params.add("%" + search + "%");
            params.add("%" + search + "%");
        }
        sql.append(" ORDER BY created_at DESC LIMIT ? OFFSET ?");
        params.add(limit);
        params.add((page - 1) * limit);
        return jdbcTemplate.query(sql.toString(), userRowMapper, params.toArray());
    }

    @Override
    public int countVendors(String search) {
        StringBuilder sql = new StringBuilder("SELECT COUNT(*) FROM users WHERE role='VENDOR'");
        List<Object> params = new ArrayList<>();
        if (search != null && !search.isEmpty()) {
            sql.append(" AND (name LIKE ? OR email LIKE ?)");
            params.add("%" + search + "%");
            params.add("%" + search + "%");
        }
        return jdbcTemplate.queryForObject(sql.toString(), Integer.class, params.toArray());
    }
}
