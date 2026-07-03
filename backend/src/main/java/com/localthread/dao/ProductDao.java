package com.localthread.dao;

import com.localthread.model.Product;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ProductDao {
    Product save(Product product);
    Optional<Product> findById(Long id);
    List<Product> findAll(int page, int limit, String category, String search,
                          Long vendorId, BigDecimal minPrice, BigDecimal maxPrice,
                          String sortBy, String sortOrder);
    int countAll(String category, String search, Long vendorId,
                 BigDecimal minPrice, BigDecimal maxPrice);
    List<Product> findByVendorId(Long vendorId, int page, int limit,
                                  String category, String search);
    int countByVendorId(Long vendorId, String category, String search);
    List<Product> findByShopId(Long shopId, int page, int limit);
    int countByShopId(Long shopId);
    List<Product> findByShopIdOrVendorId(Long shopId, Long vendorId, int page, int limit);
    int countByShopIdOrVendorId(Long shopId, Long vendorId);
    List<Product> findPending(int page, int limit);
    int countPending();
    void update(Product product);
    void updateStatus(Long id, String status);
    void updateImageUrl(Long id, String imageUrl);
    void deleteById(Long id);
}
