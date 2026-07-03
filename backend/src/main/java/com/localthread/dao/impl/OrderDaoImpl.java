package com.localthread.dao.impl;

import com.localthread.dao.OrderDao;
import com.localthread.model.Order;
import com.localthread.model.OrderItem;
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
public class OrderDaoImpl implements OrderDao {

    private final JdbcTemplate jdbcTemplate;

    public OrderDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Order> orderRowMapper = (rs, rowNum) -> {
        Order o = new Order();
        o.setId(rs.getLong("id"));
        o.setCustomerId(rs.getLong("customer_id"));
        o.setVendorId(rs.getObject("vendor_id") != null ? rs.getLong("vendor_id") : null);
        o.setTotal(rs.getBigDecimal("total"));
        o.setStatus(rs.getString("status"));
        o.setReservationCode(rs.getString("reservation_code"));
        o.setAddress(rs.getString("address"));
        o.setCreatedAt(rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at").toLocalDateTime() : null);
        o.setCouponCode(rs.getString("coupon_code"));
        o.setDiscount(rs.getBigDecimal("discount"));
        o.setPaymentMethod(rs.getString("payment_method"));
        return o;
    };

    private final RowMapper<OrderItem> itemRowMapper = (rs, rowNum) -> {
        OrderItem i = new OrderItem();
        i.setId(rs.getLong("id"));
        i.setOrderId(rs.getLong("order_id"));
        i.setProductId(rs.getLong("product_id"));
        i.setQuantity(rs.getInt("quantity"));
        i.setPrice(rs.getBigDecimal("price"));
        try { i.setProductName(rs.getString("name")); } catch (Exception ignored) {}
        return i;
    };

    @Override
    public Order save(Order order) {
        String sql = "INSERT INTO orders (customer_id, vendor_id, total, status, reservation_code, address, coupon_code, discount, payment_method) VALUES (?,?,?,?,?,?,?,?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, order.getCustomerId());
            if (order.getVendorId() != null) ps.setLong(2, order.getVendorId()); else ps.setNull(2, java.sql.Types.BIGINT);
            ps.setBigDecimal(3, order.getTotal());
            ps.setString(4, order.getStatus() != null ? order.getStatus() : "PENDING");
            ps.setString(5, order.getReservationCode());
            ps.setString(6, order.getAddress());
            ps.setString(7, order.getCouponCode());
            ps.setBigDecimal(8, order.getDiscount() != null ? order.getDiscount() : java.math.BigDecimal.ZERO);
            ps.setString(9, order.getPaymentMethod() != null ? order.getPaymentMethod() : "card");
            return ps;
        }, keyHolder);
        order.setId(keyHolder.getKey().longValue());
        return order;
    }

    @Override
    public void saveItems(Long orderId, List<OrderItem> items) {
        for (OrderItem item : items) {
            jdbcTemplate.update(
                "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?,?,?,?)",
                orderId, item.getProductId(), item.getQuantity(), item.getPrice()
            );
        }
    }

    @Override
    public Optional<Order> findById(Long id) {
        List<Order> orders = jdbcTemplate.query("SELECT * FROM orders WHERE id=?", orderRowMapper, id);
        return orders.isEmpty() ? Optional.empty() : Optional.of(orders.get(0));
    }

    @Override
    public Optional<Order> findByReservationCode(String code) {
        List<Order> orders = jdbcTemplate.query("SELECT * FROM orders WHERE reservation_code=?", orderRowMapper, code);
        return orders.isEmpty() ? Optional.empty() : Optional.of(orders.get(0));
    }

    @Override
    public List<Order> findByCustomerId(Long customerId, int page, int limit) {
        return jdbcTemplate.query(
            "SELECT * FROM orders WHERE customer_id=? ORDER BY created_at DESC LIMIT ? OFFSET ?",
            orderRowMapper, customerId, limit, (page - 1) * limit
        );
    }

    @Override
    public List<Order> findByVendorId(Long vendorId, int page, int limit) {
        return jdbcTemplate.query(
            "SELECT * FROM orders WHERE vendor_id=? ORDER BY created_at DESC LIMIT ? OFFSET ?",
            orderRowMapper, vendorId, limit, (page - 1) * limit
        );
    }

    @Override
    public int countByVendorId(Long vendorId) {
        return jdbcTemplate.queryForObject("SELECT COUNT(*) FROM orders WHERE vendor_id=?", Integer.class, vendorId);
    }

    @Override
    public int countByCustomerId(Long customerId) {
        return jdbcTemplate.queryForObject("SELECT COUNT(*) FROM orders WHERE customer_id=?", Integer.class, customerId);
    }

    @Override
    public List<OrderItem> findItemsByOrderId(Long orderId) {
        return jdbcTemplate.query(
            "SELECT oi.*, p.name FROM order_items oi JOIN products p ON oi.product_id=p.id WHERE oi.order_id=?",
            itemRowMapper, orderId
        );
    }

    @Override
    public void updateStatus(Long id, String status) {
        jdbcTemplate.update("UPDATE orders SET status=? WHERE id=?", status, id);
    }
}
