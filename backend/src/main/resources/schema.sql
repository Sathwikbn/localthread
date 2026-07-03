CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('CUSTOMER','VENDOR','ADMIN') NOT NULL DEFAULT 'CUSTOMER',
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    avatar_url VARCHAR(500),
    store_image_url VARCHAR(500),
    phone VARCHAR(20),
    subscription_tier VARCHAR(50) DEFAULT 'BASIC',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS shops (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    owner_id BIGINT NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    location VARCHAR(300),
    latitude DOUBLE DEFAULT 0,
    longitude DOUBLE DEFAULT 0,
    distance DOUBLE DEFAULT 0,
    logo_url VARCHAR(500),
    banner_url VARCHAR(500),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    vendor_id BIGINT NOT NULL,
    shop_id BIGINT,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    image_url VARCHAR(500),
    stock INT DEFAULT 0,
    status ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
    colors VARCHAR(255) DEFAULT 'Black,White,Navy',
    sizes VARCHAR(255) DEFAULT 'S,M,L,XL',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vendor_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS cart_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_cart (user_id, product_id)
);

CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    vendor_id BIGINT,
    total DECIMAL(10,2),
    status ENUM('PENDING','CONFIRMED','SHIPPED','DELIVERED','CANCELLED') DEFAULT 'PENDING',
    reservation_code VARCHAR(20) UNIQUE,
    address TEXT,
    coupon_code VARCHAR(50),
    discount DECIMAL(10,2) DEFAULT 0.00,
    payment_method VARCHAR(50) DEFAULT 'card',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT,
    user_id BIGINT,
    shop_id BIGINT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    status ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_id BIGINT NOT NULL,
    receiver_id BIGINT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    action VARCHAR(200),
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS app_settings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS addresses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    label VARCHAR(50),
    line1 VARCHAR(200),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    is_default BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS wishlist (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_wishlist (user_id, product_id)
);

CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    reference_id VARCHAR(100),
    reference_type VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_status_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    status VARCHAR(50) NOT NULL,
    note VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

INSERT IGNORE INTO users (name, email, password, role, is_active, is_verified)
VALUES ('Admin', 'admin@localthread.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6O5RO', 'ADMIN', TRUE, TRUE);

CREATE TABLE IF NOT EXISTS coupons (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type VARCHAR(20) NOT NULL,
    discount_value DECIMAL(10,2) NOT NULL,
    min_order_amount DECIMAL(10,2) DEFAULT 0.00,
    max_discount_amount DECIMAL(10,2),
    expiration_date TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE orders ADD COLUMN coupon_code VARCHAR(50);
ALTER TABLE orders ADD COLUMN discount DECIMAL(10,2) DEFAULT 0.00;
ALTER TABLE orders ADD COLUMN payment_method VARCHAR(50) DEFAULT 'card';

ALTER TABLE products ADD COLUMN colors VARCHAR(255) DEFAULT 'Black,White,Navy';
ALTER TABLE products ADD COLUMN sizes VARCHAR(255) DEFAULT 'S,M,L,XL';

ALTER TABLE reviews ADD COLUMN shop_id BIGINT;

ALTER TABLE users ADD COLUMN subscription_tier VARCHAR(50) DEFAULT 'BASIC';


INSERT IGNORE INTO coupons (code, discount_type, discount_value, min_order_amount, max_discount_amount, is_active)
VALUES ('WELCOME10', 'PERCENTAGE', 10.00, 50.00, 100.00, TRUE);
INSERT IGNORE INTO coupons (code, discount_type, discount_value, min_order_amount, max_discount_amount, is_active)
VALUES ('FLAT50', 'FIXED', 50.00, 200.00, 50.00, TRUE);
INSERT IGNORE INTO coupons (code, discount_type, discount_value, min_order_amount, max_discount_amount, is_active)
VALUES ('FESTIVE25', 'PERCENTAGE', 25.00, 100.00, 500.00, TRUE);

