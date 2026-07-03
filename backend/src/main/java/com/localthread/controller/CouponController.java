package com.localthread.controller;

import com.localthread.dao.CouponDao;
import com.localthread.model.Coupon;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/coupons")
public class CouponController {

    private final CouponDao couponDao;

    public CouponController(CouponDao couponDao) {
        this.couponDao = couponDao;
    }

    @GetMapping
    public ResponseEntity<?> getActiveCoupons() {
        List<Coupon> activeCoupons = couponDao.findAllActive();
        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", activeCoupons
        ));
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateCoupon(@RequestBody Map<String, Object> body) {
        String code = (String) body.get("code");
        if (code == null || code.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Coupon code is required"));
        }

        BigDecimal orderAmount;
        try {
            orderAmount = new BigDecimal(body.get("orderAmount").toString());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Valid order amount is required"));
        }

        Optional<Coupon> couponOpt = couponDao.findByCode(code.trim());
        if (couponOpt.isEmpty()) {
            return ResponseEntity.ok(Map.of("valid", false, "message", "Invalid or inactive coupon code"));
        }

        Coupon coupon = couponOpt.get();

        // Check expiration
        if (coupon.getExpirationDate() != null && coupon.getExpirationDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.ok(Map.of("valid", false, "message", "This coupon has expired"));
        }

        // Check minimum order amount
        if (coupon.getMinOrderAmount() != null && orderAmount.compareTo(coupon.getMinOrderAmount()) < 0) {
            return ResponseEntity.ok(Map.of(
                "valid", false, 
                "message", "Minimum order amount of ₹" + coupon.getMinOrderAmount() + " is required to use this coupon"
            ));
        }

        BigDecimal discount = BigDecimal.ZERO;
        if ("PERCENTAGE".equalsIgnoreCase(coupon.getDiscountType())) {
            BigDecimal percentage = coupon.getDiscountValue().divide(new BigDecimal("100"), 4, RoundingMode.HALF_UP);
            discount = orderAmount.multiply(percentage).setScale(2, RoundingMode.HALF_UP);
            
            // Cap at max discount if defined
            if (coupon.getMaxDiscountAmount() != null && discount.compareTo(coupon.getMaxDiscountAmount()) > 0) {
                discount = coupon.getMaxDiscountAmount();
            }
        } else if ("FIXED".equalsIgnoreCase(coupon.getDiscountType())) {
            discount = coupon.getDiscountValue();
            if (discount.compareTo(orderAmount) > 0) {
                discount = orderAmount;
            }
        }

        return ResponseEntity.ok(Map.of(
            "valid", true,
            "discount", discount,
            "code", coupon.getCode(),
            "discountType", coupon.getDiscountType(),
            "discountValue", coupon.getDiscountValue(),
            "message", "Coupon applied successfully! You saved ₹" + discount
        ));
    }
}
