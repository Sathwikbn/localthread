package com.localthread.dao;

import com.localthread.model.Coupon;
import java.util.List;
import java.util.Optional;

public interface CouponDao {
    Coupon save(Coupon coupon);
    Optional<Coupon> findByCode(String code);
    List<Coupon> findAllActive();
    void deleteById(Long id);
}
