package com.localthread.dao;

import com.localthread.model.User;
import java.util.List;
import java.util.Optional;

public interface UserDao {
    User save(User user);
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);
    List<User> findAll(int page, int limit, String search, String role);
    int countAll(String search, String role);
    void update(User user);
    void updatePassword(Long id, String encodedPassword);
    void updateAvatar(Long id, String avatarUrl);
    void updateStoreImage(Long id, String storeImageUrl);
    void toggleActive(Long id, boolean isActive);
    void deleteById(Long id);
    List<User> findVendors(int page, int limit, String search);
    int countVendors(String search);
}
