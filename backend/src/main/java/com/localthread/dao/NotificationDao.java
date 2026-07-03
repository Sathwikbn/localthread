package com.localthread.dao;

import com.localthread.model.Notification;
import java.util.List;
import java.util.Optional;

public interface NotificationDao {
    Notification save(Notification notification);
    Optional<Notification> findById(Long id);
    List<Notification> findByUserId(Long userId);
    int countUnreadByUserId(Long userId);
    void markAsRead(Long id);
    void markAllAsRead(Long userId);
    void deleteById(Long id);
}
