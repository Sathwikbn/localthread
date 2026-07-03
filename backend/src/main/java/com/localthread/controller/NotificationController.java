package com.localthread.controller;

import com.localthread.dao.NotificationDao;
import com.localthread.dao.UserDao;
import com.localthread.model.Notification;
import com.localthread.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationDao notificationDao;
    private final UserDao userDao;

    public NotificationController(NotificationDao notificationDao, UserDao userDao) {
        this.notificationDao = notificationDao;
        this.userDao = userDao;
    }

    @GetMapping
    public ResponseEntity<?> getNotifications(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        List<Notification> list = notificationDao.findByUserId(user.getId());
        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", Map.of("notifications", list)
        ));
    }

    @GetMapping("/unread-count")
    public ResponseEntity<?> getUnreadCount(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        int count = notificationDao.countUnreadByUserId(user.getId());
        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", Map.of("count", count)
        ));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        // verify notification belongs to user
        Notification notification = notificationDao.findById(id).orElse(null);
        if (notification != null && notification.getUserId().equals(user.getId())) {
            notificationDao.markAsRead(id);
        }
        return ResponseEntity.ok(Map.of(
            "success", true
        ));
    }

    @PutMapping("/read-all")
    public ResponseEntity<?> markAllAsRead(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        notificationDao.markAllAsRead(user.getId());
        return ResponseEntity.ok(Map.of(
            "success", true
        ));
    }
}
