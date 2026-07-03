package com.localthread.dao;

import com.localthread.model.OrderStatusHistory;
import java.util.List;

public interface OrderStatusHistoryDao {
    OrderStatusHistory save(OrderStatusHistory history);
    List<OrderStatusHistory> findByOrderId(Long orderId);
}
