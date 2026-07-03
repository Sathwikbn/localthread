package com.localthread.controller;

import com.localthread.dao.*;
import com.localthread.model.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderDao orderDao;
    private final UserDao userDao;
    private final ProductDao productDao;
    private final CartDao cartDao;
    private final OrderStatusHistoryDao orderStatusHistoryDao;
    private final NotificationDao notificationDao;
    private final CouponDao couponDao;
    private final com.localthread.service.EmailService emailService;

    public OrderController(OrderDao orderDao, UserDao userDao, ProductDao productDao,
                           CartDao cartDao, OrderStatusHistoryDao orderStatusHistoryDao,
                           NotificationDao notificationDao, CouponDao couponDao,
                           com.localthread.service.EmailService emailService) {
        this.orderDao = orderDao;
        this.userDao = userDao;
        this.productDao = productDao;
        this.cartDao = cartDao;
        this.orderStatusHistoryDao = orderStatusHistoryDao;
        this.notificationDao = notificationDao;
        this.couponDao = couponDao;
        this.emailService = emailService;
    }

    @GetMapping("/vendor")
    public ResponseEntity<?> getVendorOrders(@AuthenticationPrincipal UserDetails userDetails,
                                             @RequestParam(defaultValue = "1") int page,
                                             @RequestParam(defaultValue = "10") int limit) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        List<Order> orders = orderDao.findByVendorId(user.getId(), page, limit);
        orders.forEach(o -> o.setItems(orderDao.findItemsByOrderId(o.getId())));
        return ResponseEntity.ok(Map.of(
            "orders", orders,
            "total", orderDao.countByVendorId(user.getId()),
            "page", page
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        Order order = orderDao.findById(id).orElse(null);
        if (order == null) {
            return ResponseEntity.status(404).body(Map.of("message", "Order not found"));
        }
        // Verify customer owns the order or vendor manages the order
        if (!order.getCustomerId().equals(user.getId()) && !user.getId().equals(order.getVendorId())) {
            return ResponseEntity.status(403).body(Map.of("message", "Access Denied"));
        }
        order.setItems(orderDao.findItemsByOrderId(order.getId()));
        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", Map.of("order", order)
        ));
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@AuthenticationPrincipal UserDetails userDetails,
                                         @RequestBody Map<String, Object> body) {
        User user = userDao.findByEmail(userDetails.getUsername()).orElseThrow();
        
        List<?> itemsRaw = (List<?>) body.get("items");
        Map<?, ?> addressMap = (Map<?, ?>) body.get("shippingAddress");
        String paymentMethod = (String) body.get("paymentMethod");
        String pickupTime = (String) body.get("pickupTime");

        // Parse items
        List<OrderItem> items = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;
        Long vendorId = null;

        for (Object itemObj : itemsRaw) {
            Map<?, ?> itemMap = (Map<?, ?>) itemObj;
            Long productId = Long.parseLong(itemMap.get("productId").toString());
            int quantity = Integer.parseInt(itemMap.get("quantity").toString());

            Product product = productDao.findById(productId).orElseThrow();
            BigDecimal itemTotal = product.getPrice().multiply(new BigDecimal(quantity));
            total = total.add(itemTotal);

            OrderItem orderItem = new OrderItem();
            orderItem.setProductId(productId);
            orderItem.setQuantity(quantity);
            orderItem.setPrice(product.getPrice());
            orderItem.setProductName(product.getName());
            items.add(orderItem);

            if (vendorId == null) {
                vendorId = product.getVendorId();
            }
        }

        // Format shipping address
        String addressString = "";
        if (addressMap != null) {
            addressString = String.format("%s, %s, %s, %s, %s",
                addressMap.get("street"),
                addressMap.get("city"),
                addressMap.get("state"),
                addressMap.get("zipCode"),
                addressMap.get("country")
            );
        }

        // Generate reservation code
        String reservationCode = "LT-" + (int)(Math.random() * 90000 + 10000);

        // Process coupon
        String couponCode = (String) body.get("couponCode");
        BigDecimal discount = BigDecimal.ZERO;
        if (couponCode != null && !couponCode.trim().isEmpty()) {
            Optional<Coupon> couponOpt = couponDao.findByCode(couponCode.trim());
            if (couponOpt.isPresent()) {
                Coupon coupon = couponOpt.get();
                boolean valid = true;
                if (coupon.getExpirationDate() != null && coupon.getExpirationDate().isBefore(java.time.LocalDateTime.now())) {
                    valid = false;
                }
                if (coupon.getMinOrderAmount() != null && total.compareTo(coupon.getMinOrderAmount()) < 0) {
                    valid = false;
                }
                if (valid) {
                    if ("PERCENTAGE".equalsIgnoreCase(coupon.getDiscountType())) {
                        BigDecimal pct = coupon.getDiscountValue().divide(new BigDecimal("100"), 4, java.math.RoundingMode.HALF_UP);
                        discount = total.multiply(pct).setScale(2, java.math.RoundingMode.HALF_UP);
                        if (coupon.getMaxDiscountAmount() != null && discount.compareTo(coupon.getMaxDiscountAmount()) > 0) {
                            discount = coupon.getMaxDiscountAmount();
                        }
                    } else if ("FIXED".equalsIgnoreCase(coupon.getDiscountType())) {
                        discount = coupon.getDiscountValue();
                    }
                    if (discount.compareTo(total) > 0) {
                        discount = total;
                    }
                }
            }
        }

        BigDecimal finalTotal = total.subtract(discount);

        Order order = new Order();
        order.setCustomerId(user.getId());
        order.setVendorId(vendorId);
        order.setTotal(finalTotal);
        order.setStatus("PENDING");
        order.setReservationCode(reservationCode);
        order.setAddress(addressString);
        order.setCouponCode(couponCode);
        order.setDiscount(discount);
        order.setPaymentMethod(paymentMethod);

        Order savedOrder = orderDao.save(order);
        orderDao.saveItems(savedOrder.getId(), items);

        // Send confirmation email
        try {
            emailService.sendEmail(user.getEmail(), "Order Confirmation - LocalThread",
                "Hi " + user.getName() + ",\n\nYour order #" + savedOrder.getId() + " has been placed successfully!\n" +
                "Total Amount: ₹" + savedOrder.getTotal() + "\n" +
                "Fulfillment: " + (savedOrder.getReservationCode() != null ? "Try & Buy (Code: " + savedOrder.getReservationCode() + ")" : "Ship to Address") + "\n\n" +
                "Thank you for supporting your local boutique!");
        } catch (Exception e) {
            System.err.println("Failed to send order placement email: " + e.getMessage());
        }

        // Save order status history
        OrderStatusHistory history = new OrderStatusHistory();
        history.setOrderId(savedOrder.getId());
        history.setStatus("PENDING");
        history.setNote("Order placed successfully via " + paymentMethod.toUpperCase());
        orderStatusHistoryDao.save(history);

        // Create notification for customer
        Notification custNotification = new Notification();
        custNotification.setUserId(user.getId());
        custNotification.setType("ORDER_UPDATE");
        custNotification.setTitle("Order Placed Successfully");
        custNotification.setMessage("Your order of " + items.size() + " item(s) has been placed. Reservation Code: " + reservationCode);
        custNotification.setRead(false);
        custNotification.setReferenceId(savedOrder.getId().toString());
        custNotification.setReferenceType("ORDER");
        notificationDao.save(custNotification);

        // Create notification for vendor
        if (vendorId != null) {
            Notification vendorNotification = new Notification();
            vendorNotification.setUserId(vendorId);
            vendorNotification.setType("NEW_ORDER");
            vendorNotification.setTitle("New Order Received");
            vendorNotification.setMessage("You have received a new order for ₹" + total + ". Reservation Code: " + reservationCode);
            vendorNotification.setRead(false);
            vendorNotification.setReferenceId(savedOrder.getId().toString());
            vendorNotification.setReferenceType("ORDER");
            notificationDao.save(vendorNotification);
        }

        // Clear user's cart in db
        cartDao.deleteAllByUserId(user.getId());

        // Return expected format
        Map<String, Object> orderResponse = new HashMap<>();
        orderResponse.put("id", savedOrder.getId());
        orderResponse.put("_id", savedOrder.getId());
        orderResponse.put("totalAmount", finalTotal);
        orderResponse.put("discount", discount);
        orderResponse.put("couponCode", couponCode);
        orderResponse.put("status", "PENDING");
        orderResponse.put("reservationCode", reservationCode);
        orderResponse.put("address", addressString);

        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", Map.of("order", orderResponse)
        ));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id,
                                               @RequestBody Map<String, String> body) {
        String newStatus = body.get("status");
        String note = body.get("note") != null ? body.get("note") : "Order status updated to " + newStatus;
        
        orderDao.updateStatus(id, newStatus);

        // Add history log
        OrderStatusHistory history = new OrderStatusHistory();
        history.setOrderId(id);
        history.setStatus(newStatus);
        history.setNote(note);
        orderStatusHistoryDao.save(history);

        // Trigger notification for customer
        Order order = orderDao.findById(id).orElse(null);
        if (order != null) {
            Notification customerNotification = new Notification();
            customerNotification.setUserId(order.getCustomerId());
            customerNotification.setType("ORDER_UPDATE");
            customerNotification.setTitle("Order Status Updated");
            customerNotification.setMessage("Your order status has been updated to " + newStatus + ". " + note);
            customerNotification.setRead(false);
            customerNotification.setReferenceId(id.toString());
            customerNotification.setReferenceType("ORDER");
            notificationDao.save(customerNotification);

            // Send status update email
            User customer = userDao.findById(order.getCustomerId()).orElse(null);
            if (customer != null) {
                try {
                    emailService.sendEmail(customer.getEmail(), "Order Status Updated - LocalThread",
                        "Hi " + customer.getName() + ",\n\nYour order #" + order.getId() + " status has been updated to: " + newStatus + ".\n\n" +
                        "Note: " + note + "\n\n" +
                        "Track your order journey timeline directly in your customer dashboard!");
                } catch (Exception e) {
                    System.err.println("Failed to send status update email: " + e.getMessage());
                }
            }
        }

        return ResponseEntity.ok(Map.of("message", "Order status updated"));
    }

    @GetMapping("/{id}/timeline")
    public ResponseEntity<?> getOrderTimeline(@PathVariable Long id) {
        List<OrderStatusHistory> timeline = orderStatusHistoryDao.findByOrderId(id);
        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", Map.of("timeline", timeline)
        ));
    }

    @PostMapping("/verify-reservation")
    public ResponseEntity<?> verifyReservation(@RequestBody Map<String, String> body) {
        return orderDao.findByReservationCode(body.get("reservationCode"))
                .map(o -> ResponseEntity.ok((Object) o))
                .orElse(ResponseEntity.status(404).body(Map.of("message", "Reservation code not found")));
    }
}
