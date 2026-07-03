package com.localthread.controller;

import com.localthread.dao.UserDao;
import com.localthread.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final UserDao userDao;
    private final JdbcTemplate jdbcTemplate;

    public MessageController(UserDao userDao, JdbcTemplate jdbcTemplate) {
        this.userDao = userDao;
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/thread/{otherUserId}")
    public ResponseEntity<?> getConversationThread(@AuthenticationPrincipal UserDetails userDetails,
                                                    @PathVariable Long otherUserId) {
        User loggedInUser = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        Long myId = loggedInUser.getId();

        List<Map<String, Object>> messages = jdbcTemplate.query(
            "SELECT m.*, u.name AS sender_name FROM messages m JOIN users u ON m.sender_id = u.id WHERE (m.sender_id = ? AND m.receiver_id = ?) OR (m.sender_id = ? AND m.receiver_id = ?) ORDER BY m.created_at ASC",
            (rs, rowNum) -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", rs.getLong("id"));
                map.put("senderId", rs.getLong("sender_id"));
                map.put("receiverId", rs.getLong("receiver_id"));
                map.put("message", rs.getString("message"));
                map.put("senderName", rs.getString("sender_name"));
                map.put("createdAt", rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at").toLocalDateTime().toString() : "");
                return map;
            },
            myId, otherUserId, otherUserId, myId
        );
        return ResponseEntity.ok(Map.of("success", true, "data", Map.of("messages", messages)));
    }

    @GetMapping("/threads")
    public ResponseEntity<?> getActiveThreads(@AuthenticationPrincipal UserDetails userDetails) {
        User loggedInUser = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        Long myId = loggedInUser.getId();

        // Get unique users with whom loggedInUser has chatted
        List<Map<String, Object>> threads = jdbcTemplate.query(
            "SELECT DISTINCT u.id, u.name, u.email, u.role FROM messages m JOIN users u ON (m.sender_id = u.id OR m.receiver_id = u.id) WHERE (m.sender_id = ? OR m.receiver_id = ?) AND u.id <> ?",
            (rs, rowNum) -> {
                Map<String, Object> t = new HashMap<>();
                t.put("userId", rs.getLong("id"));
                t.put("name", rs.getString("name"));
                t.put("email", rs.getString("email"));
                t.put("role", rs.getString("role"));

                // Get last message in this thread
                Long otherId = rs.getLong("id");
                List<Map<String, Object>> lastMsg = jdbcTemplate.query(
                    "SELECT message, created_at FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY created_at DESC LIMIT 1",
                    (rs2, rNum) -> {
                        Map<String, Object> m = new HashMap<>();
                        m.put("message", rs2.getString("message"));
                        m.put("createdAt", rs2.getTimestamp("created_at") != null ? rs2.getTimestamp("created_at").toLocalDateTime().toString() : "");
                        return m;
                    },
                    myId, otherId, otherId, myId
                );
                if (!lastMsg.isEmpty()) {
                    t.put("lastMessage", lastMsg.get(0).get("message"));
                    t.put("lastMessageTime", lastMsg.get(0).get("createdAt"));
                }
                return t;
            },
            myId, myId, myId
        );
        return ResponseEntity.ok(Map.of("success", true, "data", Map.of("threads", threads)));
    }

    @PostMapping
    public ResponseEntity<?> sendMessage(@AuthenticationPrincipal UserDetails userDetails,
                                         @RequestBody Map<String, Object> body) {
        User loggedInUser = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        Long myId = loggedInUser.getId();

        Long receiverId = Long.parseLong(body.get("receiverId").toString());
        String msgContent = (String) body.get("message");

        jdbcTemplate.update(
            "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?,?,?)",
            myId, receiverId, msgContent
        );

        return ResponseEntity.ok(Map.of("success", true, "message", "Message sent successfully"));
    }
}
