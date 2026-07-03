package com.localthread.dao;

import com.localthread.model.Order;
import com.localthread.model.OrderItem;
import java.util.List;
import java.util.Optional;

public interface OrderDao {
    Order save(Order order);
    void saveItems(Long orderId, List<OrderItem> items);
    Optional<Order> findById(Long id);
    Optional<Order> findByReservationCode(String code);
    List<Order> findByCustomerId(Long customerId, int page, int limit);
    List<Order> findByVendorId(Long vendorId, int page, int limit);
    int countByVendorId(Long vendorId);
    int countByCustomerId(Long customerId);
    List<OrderItem> findItemsByOrderId(Long orderId);
    void updateStatus(Long id, String status);
}
