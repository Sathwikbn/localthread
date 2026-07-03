package com.localthread.dao;

import com.localthread.model.CartItem;
import java.util.List;
import java.util.Optional;

public interface CartDao {
    CartItem save(CartItem item);
    Optional<CartItem> findById(Long id);
    Optional<CartItem> findByUserAndProduct(Long userId, Long productId);
    List<CartItem> findByUserId(Long userId);
    void updateQuantity(Long id, int quantity);
    void deleteById(Long id);
    void deleteAllByUserId(Long userId);
}
