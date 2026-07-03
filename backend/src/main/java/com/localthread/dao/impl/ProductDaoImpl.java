package com.localthread.dao.impl;

import com.localthread.dao.ProductDao;
import com.localthread.model.Product;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class ProductDaoImpl implements ProductDao {

    private final JdbcTemplate jdbcTemplate;

    public ProductDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Product> rowMapper = (rs, rowNum) -> {
        Product p = new Product();
        p.setId(rs.getLong("id"));
        p.setVendorId(rs.getLong("vendor_id"));
        p.setShopId(rs.getObject("shop_id") != null ? rs.getLong("shop_id") : null);
        p.setName(rs.getString("name"));
        p.setDescription(rs.getString("description"));
        p.setPrice(rs.getBigDecimal("price"));
        p.setCategory(rs.getString("category"));
        p.setImageUrl(rs.getString("image_url"));
        p.setStock(rs.getInt("stock"));
        p.setStatus(rs.getString("status"));
        p.setCreatedAt(rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at").toLocalDateTime() : null);
        p.setUpdatedAt(rs.getTimestamp("updated_at") != null ? rs.getTimestamp("updated_at").toLocalDateTime() : null);
        p.setColors(rs.getString("colors"));
        p.setSizes(rs.getString("sizes"));
        return p;
    };

    @Override
    public Product save(Product product) {
        String sql = "INSERT INTO products (vendor_id, shop_id, name, description, price, category, image_url, stock, status, colors, sizes) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, product.getVendorId());
            if (product.getShopId() != null) ps.setLong(2, product.getShopId()); else ps.setNull(2, java.sql.Types.BIGINT);
            ps.setString(3, product.getName());
            ps.setString(4, product.getDescription());
            ps.setBigDecimal(5, product.getPrice());
            ps.setString(6, product.getCategory());
            ps.setString(7, product.getImageUrl());
            ps.setInt(8, product.getStock() != null ? product.getStock() : 0);
            ps.setString(9, "PENDING");
            ps.setString(10, product.getColors() != null ? product.getColors() : "Black,White,Navy");
            ps.setString(11, product.getSizes() != null ? product.getSizes() : "S,M,L,XL");
            return ps;
        }, keyHolder);
        product.setId(keyHolder.getKey().longValue());
        return product;
    }

    @Override
    public Optional<Product> findById(Long id) {
        List<Product> products = jdbcTemplate.query("SELECT * FROM products WHERE id=?", rowMapper, id);
        return products.isEmpty() ? Optional.empty() : Optional.of(products.get(0));
    }

    @Override
    public List<Product> findAll(int page, int limit, String category, String search,
                                  Long vendorId, BigDecimal minPrice, BigDecimal maxPrice,
                                  String sortBy, String sortOrder) {
        StringBuilder sql = new StringBuilder("SELECT * FROM products WHERE status='APPROVED'");
        List<Object> params = new ArrayList<>();
        appendFilters(sql, params, category, search, vendorId, minPrice, maxPrice);
        String order = buildOrder(sortBy, sortOrder);
        sql.append(order).append(" LIMIT ? OFFSET ?");
        params.add(limit);
        params.add((page - 1) * limit);
        return jdbcTemplate.query(sql.toString(), rowMapper, params.toArray());
    }

    @Override
    public int countAll(String category, String search, Long vendorId, BigDecimal minPrice, BigDecimal maxPrice) {
        StringBuilder sql = new StringBuilder("SELECT COUNT(*) FROM products WHERE status='APPROVED'");
        List<Object> params = new ArrayList<>();
        appendFilters(sql, params, category, search, vendorId, minPrice, maxPrice);
        return jdbcTemplate.queryForObject(sql.toString(), Integer.class, params.toArray());
    }

    private void appendFilters(StringBuilder sql, List<Object> params, String category, String search,
                                Long vendorId, BigDecimal minPrice, BigDecimal maxPrice) {
        if (category != null && !category.isEmpty()) { sql.append(" AND category=?"); params.add(category); }
        if (search != null && !search.isEmpty()) { sql.append(" AND name LIKE ?"); params.add("%" + search + "%"); }
        if (vendorId != null) { sql.append(" AND vendor_id=?"); params.add(vendorId); }
        if (minPrice != null) { sql.append(" AND price >= ?"); params.add(minPrice); }
        if (maxPrice != null) { sql.append(" AND price <= ?"); params.add(maxPrice); }
    }

    private String buildOrder(String sortBy, String sortOrder) {
        String col = "created_at";
        if ("price".equalsIgnoreCase(sortBy)) col = "price";
        else if ("name".equalsIgnoreCase(sortBy)) col = "name";
        String dir = "DESC".equalsIgnoreCase(sortOrder) ? "DESC" : "ASC";
        return " ORDER BY " + col + " " + dir;
    }

    @Override
    public List<Product> findByVendorId(Long vendorId, int page, int limit, String category, String search) {
        StringBuilder sql = new StringBuilder("SELECT * FROM products WHERE vendor_id=?");
        List<Object> params = new ArrayList<>();
        params.add(vendorId);
        if (category != null && !category.isEmpty()) { sql.append(" AND category=?"); params.add(category); }
        if (search != null && !search.isEmpty()) { sql.append(" AND name LIKE ?"); params.add("%" + search + "%"); }
        sql.append(" ORDER BY created_at DESC LIMIT ? OFFSET ?");
        params.add(limit);
        params.add((page - 1) * limit);
        return jdbcTemplate.query(sql.toString(), rowMapper, params.toArray());
    }

    @Override
    public int countByVendorId(Long vendorId, String category, String search) {
        StringBuilder sql = new StringBuilder("SELECT COUNT(*) FROM products WHERE vendor_id=?");
        List<Object> params = new ArrayList<>();
        params.add(vendorId);
        if (category != null && !category.isEmpty()) { sql.append(" AND category=?"); params.add(category); }
        if (search != null && !search.isEmpty()) { sql.append(" AND name LIKE ?"); params.add("%" + search + "%"); }
        return jdbcTemplate.queryForObject(sql.toString(), Integer.class, params.toArray());
    }

    @Override
    public List<Product> findByShopId(Long shopId, int page, int limit) {
        return jdbcTemplate.query(
            "SELECT * FROM products WHERE shop_id=? AND status='APPROVED' ORDER BY created_at DESC LIMIT ? OFFSET ?",
            rowMapper, shopId, limit, (page - 1) * limit
        );
    }

    @Override
    public int countByShopId(Long shopId) {
        return jdbcTemplate.queryForObject("SELECT COUNT(*) FROM products WHERE shop_id=? AND status='APPROVED'", Integer.class, shopId);
    }

    @Override
    public List<Product> findByShopIdOrVendorId(Long shopId, Long vendorId, int page, int limit) {
        return jdbcTemplate.query(
            "SELECT * FROM products WHERE (shop_id=? OR vendor_id=?) ORDER BY created_at DESC LIMIT ? OFFSET ?",
            rowMapper, shopId, vendorId, limit, (page - 1) * limit
        );
    }

    @Override
    public int countByShopIdOrVendorId(Long shopId, Long vendorId) {
        return jdbcTemplate.queryForObject("SELECT COUNT(*) FROM products WHERE (shop_id=? OR vendor_id=?)", Integer.class, shopId, vendorId);
    }

    @Override
    public List<Product> findPending(int page, int limit) {
        return jdbcTemplate.query(
            "SELECT * FROM products WHERE status='PENDING' ORDER BY created_at DESC LIMIT ? OFFSET ?",
            rowMapper, limit, (page - 1) * limit
        );
    }

    @Override
    public int countPending() {
        return jdbcTemplate.queryForObject("SELECT COUNT(*) FROM products WHERE status='PENDING'", Integer.class);
    }

    @Override
    public void update(Product product) {
        jdbcTemplate.update(
            "UPDATE products SET name=?, description=?, price=?, category=?, stock=?, image_url=?, colors=?, sizes=?, updated_at=NOW() WHERE id=?",
            product.getName(), product.getDescription(), product.getPrice(),
            product.getCategory(), product.getStock(), product.getImageUrl(),
            product.getColors(), product.getSizes(), product.getId()
        );
    }

    @Override
    public void updateStatus(Long id, String status) {
        jdbcTemplate.update("UPDATE products SET status=?, updated_at=NOW() WHERE id=?", status, id);
    }

    @Override
    public void updateImageUrl(Long id, String imageUrl) {
        jdbcTemplate.update("UPDATE products SET image_url=?, updated_at=NOW() WHERE id=?", imageUrl, id);
    }

    @Override
    public void deleteById(Long id) {
        jdbcTemplate.update("DELETE FROM products WHERE id=?", id);
    }
}
