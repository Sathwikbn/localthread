package com.localthread.dao;

import com.localthread.model.Product;
import java.util.List;

public interface WishlistDao {
    void add(Long userId, Long productId);
    void remove(Long userId, Long productId);
    List<Product> findByUserId(Long userId);
    boolean exists(Long userId, Long productId);
}
