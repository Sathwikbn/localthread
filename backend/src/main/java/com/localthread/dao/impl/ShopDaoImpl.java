package com.localthread.dao.impl;

import com.localthread.dao.ShopDao;
import com.localthread.model.Shop;
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
public class ShopDaoImpl implements ShopDao {

    private final JdbcTemplate jdbcTemplate;

    public ShopDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Shop> rowMapper = (rs, rowNum) -> {
        Shop s = new Shop();
        s.setId(rs.getLong("id"));
        s.setOwnerId(rs.getLong("owner_id"));
        s.setName(rs.getString("name"));
        s.setDescription(rs.getString("description"));
        s.setCategory(rs.getString("category"));
        s.setLocation(rs.getString("location"));
        s.setLatitude(rs.getDouble("latitude"));
        s.setLongitude(rs.getDouble("longitude"));
        s.setDistance(rs.getDouble("distance"));
        s.setLogoUrl(rs.getString("logo_url"));
        s.setBannerUrl(rs.getString("banner_url"));
        s.setIsVerified(rs.getBoolean("is_verified"));
        s.setIsActive(rs.getBoolean("is_active"));
        s.setCreatedAt(rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at").toLocalDateTime() : null);
        return s;
    };

    @Override
    public Shop save(Shop shop) {
        String sql = "INSERT INTO shops (owner_id, name, description, category, location, latitude, longitude) VALUES (?,?,?,?,?,?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, shop.getOwnerId());
            ps.setString(2, shop.getName());
            ps.setString(3, shop.getDescription());
            ps.setString(4, shop.getCategory());
            ps.setString(5, shop.getLocation());
            ps.setDouble(6, shop.getLatitude() != null ? shop.getLatitude() : 0);
            ps.setDouble(7, shop.getLongitude() != null ? shop.getLongitude() : 0);
            return ps;
        }, keyHolder);
        shop.setId(keyHolder.getKey().longValue());
        return shop;
    }

    @Override
    public Optional<Shop> findById(Long id) {
        List<Shop> shops = jdbcTemplate.query("SELECT * FROM shops WHERE id=?", rowMapper, id);
        return shops.isEmpty() ? Optional.empty() : Optional.of(shops.get(0));
    }

    @Override
    public Optional<Shop> findByOwnerId(Long ownerId) {
        List<Shop> shops = jdbcTemplate.query("SELECT * FROM shops WHERE owner_id=? AND is_active=TRUE", rowMapper, ownerId);
        return shops.isEmpty() ? Optional.empty() : Optional.of(shops.get(0));
    }

    @Override
    public List<Shop> findAll(int page, int limit, String search, String category) {
        StringBuilder sql = new StringBuilder("SELECT * FROM shops WHERE is_active=TRUE");
        List<Object> params = new ArrayList<>();
        if (search != null && !search.isEmpty()) {
            sql.append(" AND (name LIKE ? OR description LIKE ?)");
            params.add("%" + search + "%");
            params.add("%" + search + "%");
        }
        if (category != null && !category.isEmpty()) {
            sql.append(" AND category = ?");
            params.add(category);
        }
        sql.append(" ORDER BY created_at DESC LIMIT ? OFFSET ?");
        params.add(limit);
        params.add((page - 1) * limit);
        return jdbcTemplate.query(sql.toString(), rowMapper, params.toArray());
    }

    @Override
    public int countAll(String search, String category) {
        StringBuilder sql = new StringBuilder("SELECT COUNT(*) FROM shops WHERE is_active=TRUE");
        List<Object> params = new ArrayList<>();
        if (search != null && !search.isEmpty()) {
            sql.append(" AND (name LIKE ? OR description LIKE ?)");
            params.add("%" + search + "%");
            params.add("%" + search + "%");
        }
        if (category != null && !category.isEmpty()) {
            sql.append(" AND category = ?");
            params.add(category);
        }
        return jdbcTemplate.queryForObject(sql.toString(), Integer.class, params.toArray());
    }

    @Override
    public void update(Shop shop) {
        jdbcTemplate.update(
            "UPDATE shops SET name=?, description=?, category=?, location=?, latitude=?, longitude=? WHERE id=?",
            shop.getName(), shop.getDescription(), shop.getCategory(),
            shop.getLocation(), shop.getLatitude(), shop.getLongitude(), shop.getId()
        );
    }

    @Override
    public void updateLogo(Long id, String logoUrl) {
        jdbcTemplate.update("UPDATE shops SET logo_url=? WHERE id=?", logoUrl, id);
    }

    @Override
    public void updateBanner(Long id, String bannerUrl) {
        jdbcTemplate.update("UPDATE shops SET banner_url=? WHERE id=?", bannerUrl, id);
    }

    @Override
    public void verify(Long id) {
        jdbcTemplate.update("UPDATE shops SET is_verified=TRUE WHERE id=?", id);
    }

    @Override
    public void deleteById(Long id) {
        jdbcTemplate.update("UPDATE shops SET is_active=FALSE WHERE id=?", id);
    }
}
