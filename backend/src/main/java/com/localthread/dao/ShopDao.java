package com.localthread.dao;

import com.localthread.model.Shop;
import java.util.List;
import java.util.Optional;

public interface ShopDao {
    Shop save(Shop shop);
    Optional<Shop> findById(Long id);
    Optional<Shop> findByOwnerId(Long ownerId);
    List<Shop> findAll(int page, int limit, String search, String category);
    int countAll(String search, String category);
    void update(Shop shop);
    void updateLogo(Long id, String logoUrl);
    void updateBanner(Long id, String bannerUrl);
    void verify(Long id);
    void deleteById(Long id);
}
