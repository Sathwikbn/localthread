package com.localthread.dao;

import com.localthread.model.Review;
import java.util.List;
import java.util.Optional;

public interface ReviewDao {
    Review save(Review review);
    Optional<Review> findById(Long id);
    List<Review> findPending(int page, int limit);
    int countPending();
    void updateStatus(Long id, String status);
}
