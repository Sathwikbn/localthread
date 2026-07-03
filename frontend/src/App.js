"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var framer_motion_1 = require("framer-motion");
var react_redux_1 = require("react-redux");
var toolkit_1 = require("@reduxjs/toolkit");
var sonner_1 = require("sonner");
var BackToTop_1 = require("./components/ui/BackToTop");
var RecentlyViewedCarousel_1 = require("./components/RecentlyViewedCarousel");
var AboutPage_1 = require("./components/pages/AboutPage");
var react_redux_2 = require("react-redux");
// Redux slices
var cartSlice_1 = __importDefault(require("./store/cartSlice"));
var wishlistSlice_1 = __importDefault(require("./store/wishlistSlice"));
var authSlice_1 = __importDefault(require("./store/authSlice"));
var filterSlice_1 = __importDefault(require("./store/filterSlice"));
// Components
var Header_1 = require("./components/Header");
var Footer_1 = require("./components/Footer");
var HeroSection_1 = require("./components/HeroSection");
var ProductGrid_1 = require("./components/ProductGrid");
var ProductListingPage_1 = require("./components/pages/ProductListingPage");
var ShopsPage_1 = require("./components/pages/ShopsPage");
var ShopStorefrontPage_1 = require("./components/pages/ShopStorefrontPage");
var ProductDetailsPage_1 = require("./components/ProductDetailsPage");
var CartPage_1 = require("./components/CartPage");
var WishlistPage_1 = require("./components/WishlistPage");
var CheckoutPage_1 = require("./components/CheckoutPage");
var PaymentPage_1 = require("./components/PaymentPage");
var ConfirmationPage_1 = require("./components/ConfirmationPage");
var AdminDashboard_1 = require("./components/pages/AdminDashboard");
var AccessDeniedPage_1 = require("./components/AccessDeniedPage");
// Auth Components
var UnifiedAuthPage_1 = require("./components/auth/UnifiedAuthPage");
var CustomerRoute_1 = __importDefault(require("./components/auth/CustomerRoute"));
var AdminRoute_1 = require("./components/auth/AdminRoute");
var VendorRoute_1 = require("./components/auth/VendorRoute");
// Vendor Components
var VendorDashboardHome_1 = require("./components/vendor/VendorDashboardHome");
var VendorProductsPage_1 = require("./components/vendor/VendorProductsPage");
var AddEditProductForm_1 = require("./components/vendor/AddEditProductForm");
var VendorOrdersPage_1 = require("./components/vendor/VendorOrdersPage");
var VendorMessagesPage_1 = require("./components/vendor/VendorMessagesPage");
var VendorProfilePage_1 = require("./components/vendor/VendorProfilePage");
var VendorShopSetupPage_1 = require("./components/vendor/VendorShopSetupPage");
var VendorManagementPage_1 = require("./components/admin/VendorManagementPage");
var AdminUsersPage_1 = require("./components/admin/AdminUsersPage");
var AdminAddUserPage_1 = require("./components/admin/AdminAddUserPage");
var AdminProductsPage_1 = require("./components/admin/AdminProductsPage");
var AdminRevenuePage_1 = require("./components/admin/AdminRevenuePage");
var AdminSecurityPage_1 = require("./components/admin/AdminSecurityPage");
var AdminReportsPage_1 = require("./components/admin/AdminReportsPage");
var AdminSettingsPage_1 = require("./components/admin/AdminSettingsPage");
var AdminBackupsPage_1 = require("./components/admin/AdminBackupsPage");
// Customer Components
var CustomerDashboardLayout_1 = __importDefault(require("./components/customer/CustomerDashboardLayout"));
var CustomerProfilePage_1 = __importDefault(require("./components/customer/CustomerProfilePage"));
var CustomerOrdersPage_1 = __importDefault(require("./components/customer/CustomerOrdersPage"));
var CustomerAddressesPage_1 = __importDefault(require("./components/customer/CustomerAddressesPage"));
var CustomerWishlistPage_1 = __importDefault(require("./components/customer/CustomerWishlistPage"));
// Data
var products_1 = require("./data/products");
var shops_1 = require("./data/shops");
var shopAPI_1 = require("./services/shopAPI");
var productAPI_1 = require("./services/productAPI");
var ShopCard_1 = require("./components/ShopCard");
var react_router_dom_2 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
// Redux actions
var cartSlice_2 = require("./store/cartSlice");
var wishlistSlice_2 = require("./store/wishlistSlice");
var notificationSlice_1 = __importDefault(require("./store/notificationSlice"));
// Configure Redux store
var store = (0, toolkit_1.configureStore)({
    reducer: {
        cart: cartSlice_1.default,
        wishlist: wishlistSlice_1.default,
        auth: authSlice_1.default,
        filter: filterSlice_1.default,
        notifications: notificationSlice_1.default,
    }
});
// HomePage component
function HomePage() {
    var dispatch = (0, react_redux_2.useDispatch)();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var wishlistItems = (0, react_redux_2.useSelector)(function (state) { return state.wishlist.items; });
    var _a = react_1.default.useState('shops'), activeTab = _a[0], setActiveTab = _a[1];
    var _b = react_1.default.useState('all'), categoryFilter = _b[0], setCategoryFilter = _b[1];
    var _c = react_1.default.useState('all'), priceFilter = _c[0], setPriceFilter = _c[1];
    var _d = react_1.default.useState('all'), distanceFilter = _d[0], setDistanceFilter = _d[1];
    var _e = react_1.default.useState([]), dbShops = _e[0], setDbShops = _e[1];
    var _f = react_1.default.useState([]), dbProducts = _f[0], setDbProducts = _f[1];
    var getImageUrl = function (path) {
        if (!path)
            return '';
        if (path.startsWith('http://') || path.startsWith('https://'))
            return path;
        var API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        var serverHost = API_BASE_URL.replace('/api', '');
        return "".concat(serverHost).concat(path);
    };
    react_1.default.useEffect(function () {
        var fetchDbShops = function () {
            shopAPI_1.shopAPI.getAllShops({ limit: 6 })
                .then(function (res) {
                    var shopsList = null;
                    if (res) {
                        if (res.success && res.data && res.data.shops) {
                            shopsList = res.data.shops;
                        } else if (res.shops) {
                            shopsList = res.shops;
                        } else if (Array.isArray(res)) {
                            shopsList = res;
                        } else if (res.data && Array.isArray(res.data)) {
                            shopsList = res.data;
                        }
                    }
                    if (shopsList && shopsList.length > 0) {
                        var mapped = shopsList.map(function (s) {
                            return {
                                id: s.id,
                                name: s.name,
                                description: s.description,
                                street: s.street || s.location || '',
                                city: s.city || '',
                                state: s.state || '',
                                zipCode: s.zipCode || '',
                                latitude: s.latitude || 0,
                                longitude: s.longitude || 0,
                                phone: s.phone || '',
                                email: s.email || '',
                                ratingAverage: s.ratingAverage || 4.5,
                                ratingCount: s.ratingCount || 10,
                                categories: s.categories || (s.category ? [s.category] : []),
                                isVerified: s.isVerified || false,
                                establishedYear: s.establishedYear || 2024,
                                isActive: s.isActive !== false,
                                distance: s.distance || 0,
                                logo: s.logoUrl ? getImageUrl(s.logoUrl) : null,
                                banner: s.bannerUrl ? getImageUrl(s.bannerUrl) : null
                            };
                        });
                        setDbShops(mapped);
                    }
                })
                .catch(function (err) {
                    console.error("Failed to fetch shops on home page", err);
                });
        };
        fetchDbShops();
    }, []);
    react_1.default.useEffect(function () {
        var fetchDbProducts = function () {
            productAPI_1.productAPI.getAllProducts({ limit: 12 })
                .then(function (res) {
                    var productsList = null;
                    if (res) {
                        if (res.success && res.data && res.data.products) {
                            productsList = res.data.products;
                        } else if (res.products) {
                            productsList = res.products;
                        } else if (Array.isArray(res)) {
                            productsList = res;
                        } else if (res.data && Array.isArray(res.data)) {
                            productsList = res.data;
                        }
                    }
                    if (productsList && productsList.length > 0) {
                        var mapped = productsList.map(function (p) {
                            var shop = dbShops.find(function (s) { return s.id.toString() === (p.shopId || p.vendorId || '').toString(); });
                            return {
                                id: (p.id || p._id).toString(),
                                name: p.name,
                                price: Number(p.price),
                                originalPrice: p.originalPrice ? Number(p.originalPrice) : Math.round(Number(p.price) * 1.3),
                                image: getImageUrl(p.imageUrl || p.image || p.thumbnail || (p.images && p.images.length > 0 ? p.images[0] : '')),
                                category: p.category,
                                rating: p.ratingAverage || 4.5,
                                vendorId: p.vendorId ? p.vendorId.toString() : '',
                                shopId: p.shopId ? p.shopId.toString() : '',
                                distance: shop ? shop.distance : 1.2
                            };
                        });
                        setDbProducts(mapped);
                    }
                })
                .catch(function (err) {
                    console.error("Failed to fetch products on home page", err);
                });
        };
        fetchDbProducts();
    }, [dbShops]);
    var handleAddToCart = function (productId) {
        dispatch((0, cartSlice_2.addToCart)({ productId: productId }));
    };
    var handleToggleWishlist = function (productId) {
        dispatch((0, wishlistSlice_2.toggleWishlist)(productId));
    };
    var filteredProducts = react_1.default.useMemo(function () {
        var productsList = dbProducts.length > 0 ? dbProducts : products_1.products;
        return productsList.filter(function (product) {
            // 1. Category filter
            if (categoryFilter !== 'all' && product.category.toLowerCase() !== categoryFilter.toLowerCase()) {
                return false;
            }
            // 2. Price filter
            if (priceFilter !== 'all') {
                if (priceFilter === 'under50' && product.price >= 50)
                    return false;
                if (priceFilter === '50to100' && (product.price < 50 || product.price > 100))
                    return false;
                if (priceFilter === 'over100' && product.price <= 100)
                    return false;
            }
            // 3. Distance filter
            if (distanceFilter !== 'all') {
                var shop = (dbShops.length > 0 ? dbShops : shops_1.shops).find(function (s) { return s.id === product.vendorId; });
                var maxDist = parseFloat(distanceFilter);
                if (shop && shop.distance > maxDist)
                    return false;
            }
            return true;
        });
    }, [categoryFilter, priceFilter, distanceFilter, dbProducts, dbShops]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-background", children: [(0, jsx_runtime_1.jsx)(HeroSection_1.HeroSection, {}), (0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto px-6 sm:px-8 py-12", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-center mb-12", children: (0, jsx_runtime_1.jsxs)("div", { className: "inline-flex p-1.5 bg-[var(--lt-cream-dark)] rounded-2xl border border-[var(--lt-border)]", children: [(0, jsx_runtime_1.jsx)("button", { onClick: function () { return setActiveTab('shops'); }, className: "px-8 py-3 rounded-xl font-display text-sm font-bold transition-all duration-300 ".concat(activeTab === 'shops'
                                        ? 'bg-white text-[var(--lt-charcoal)] shadow-lt-md border-0'
                                        : 'text-[var(--lt-muted)] hover:text-[var(--lt-charcoal)] bg-transparent border-0'), children: "Shops Near You" }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return setActiveTab('products'); }, className: "px-8 py-3 rounded-xl font-display text-sm font-bold transition-all duration-300 ".concat(activeTab === 'products'
                                        ? 'bg-white text-[var(--lt-charcoal)] shadow-lt-md border-0'
                                        : 'text-[var(--lt-muted)] hover:text-[var(--lt-charcoal)] bg-transparent border-0'), children: "Trending Products" })] }) }), activeTab === 'shops' ? ((0, jsx_runtime_1.jsxs)("div", { className: "fade-up", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold font-display text-[var(--lt-charcoal)]", children: "Neighborhood Boutiques" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-[var(--lt-muted)] font-body mt-1", children: "Showing verified clothing stores within 10km radius" })] }), (0, jsx_runtime_1.jsxs)(react_router_dom_2.Link, { to: "/shops", className: "text-xs font-bold text-[var(--lt-amber)] hover:underline flex items-center gap-1", children: ["View All Shops ", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { size: 14 })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: (dbShops.length > 0 ? dbShops : shops_1.shops).map(function (shop) { return ((0, jsx_runtime_1.jsx)(ShopCard_1.ShopCard, { shop: shop, distanceKm: shop.distance }, shop.id)); }) })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "fade-up", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold font-display text-[var(--lt-charcoal)]", children: "Trending Wear" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-[var(--lt-muted)] font-body mt-1", children: "Discover items currently hot in nearby shops" })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-4 items-center justify-between mb-8 pb-6 border-b border-[var(--lt-border)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none max-w-full", children: ['all', 't-shirts', 'hoodies', 'shirts', 'jeans', 'dresses', 'ethnic', 'accessories', 'footwear'].map(function (cat) { return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { onClick: function () { return setCategoryFilter(cat); }, whileHover: { scale: 1.03 }, whileTap: { scale: 0.95 }, className: "px-4 py-2 rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all border cursor-pointer ".concat(categoryFilter === cat
                                                ? 'bg-[var(--lt-charcoal)] text-white border-[var(--lt-charcoal)]'
                                                : 'bg-white text-[var(--lt-muted)] border-[var(--lt-border)] hover:border-[var(--lt-muted)]'), children: cat === 'all' ? 'All Wear' : cat }, cat)); }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3 items-center", children: [(0, jsx_runtime_1.jsxs)("select", { value: distanceFilter, onChange: function (e) { return setDistanceFilter(e.target.value); }, className: "bg-white border border-[var(--lt-border)] text-xs font-semibold rounded-xl px-3 py-2 text-[var(--lt-charcoal)] focus:outline-none focus:ring-1 focus:ring-[var(--lt-amber)] cursor-pointer", children: [(0, jsx_runtime_1.jsx)("option", { value: "all", children: "Any Distance" }), (0, jsx_runtime_1.jsx)("option", { value: "3", children: "Within 3 km" }), (0, jsx_runtime_1.jsx)("option", { value: "5", children: "Within 5 km" }), (0, jsx_runtime_1.jsx)("option", { value: "10", children: "Within 10 km" })] }), (0, jsx_runtime_1.jsxs)("select", { value: priceFilter, onChange: function (e) { return setPriceFilter(e.target.value); }, className: "bg-white border border-[var(--lt-border)] text-xs font-semibold rounded-xl px-3 py-2 text-[var(--lt-charcoal)] focus:outline-none focus:ring-1 focus:ring-[var(--lt-amber)] cursor-pointer", children: [(0, jsx_runtime_1.jsx)("option", { value: "all", children: "Any Price" }), (0, jsx_runtime_1.jsx)("option", { value: "under50", children: "Under \u20B950" }), (0, jsx_runtime_1.jsx)("option", { value: "50to100", children: "\u20B950 - \u20B9100" }), (0, jsx_runtime_1.jsx)("option", { value: "over100", children: "Over \u20B9100" })] })] })] }), filteredProducts.length > 0 ? ((0, jsx_runtime_1.jsx)(ProductGrid_1.ProductGrid, { products: filteredProducts, onAddToCart: handleAddToCart, onToggleWishlist: handleToggleWishlist })) : ((0, jsx_runtime_1.jsxs)("div", { className: "text-center py-20 bg-white rounded-2xl border border-[var(--lt-border)]", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.SlidersHorizontal, { className: "h-10 w-10 text-[var(--lt-muted)] mx-auto mb-4" }), (0, jsx_runtime_1.jsx)("h3", { className: "font-bold text-lg text-[var(--lt-charcoal)] font-display", children: "No Products Found" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-[var(--lt-muted)] font-body mt-1", children: "Try adjusting your category, price, or distance filters." })] }))] }))] }), (0, jsx_runtime_1.jsx)(RecentlyViewedCarousel_1.RecentlyViewedCarousel, {})] }));
}
var PublicRoute = function (_a) {
    var children = _a.children;
    var _b = (0, react_redux_2.useSelector)(function (state) { return state.auth; }), user = _b.user, isAuthenticated = _b.isAuthenticated;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var isVendor = isAuthenticated && user && (user.role || '').toLowerCase() === 'vendor';
    react_1.default.useEffect(function () {
        if (isVendor) {
            navigate("/vendor/dashboard", { replace: true });
        }
    }, [isVendor, navigate]);
    if (isVendor) {
        return null;
    }
    return children;
};
function AppContent() {
    var _a = (0, react_redux_2.useSelector)(function (state) { return state.auth; }), user = _a.user, isAuthenticated = _a.isAuthenticated;
    var location = (0, react_router_dom_1.useLocation)();
    // Debug logging
    console.log('App - Authentication state:', { isAuthenticated: isAuthenticated, user: user === null || user === void 0 ? void 0 : user.name, userRole: user === null || user === void 0 ? void 0 : user.role });
    var isDashboardPath = location.pathname.startsWith('/vendor') || location.pathname.startsWith('/admin');
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-white text-gray-900 flex flex-col", children: [!isDashboardPath && (0, jsx_runtime_1.jsx)(Header_1.Header, {}), (0, jsx_runtime_1.jsx)("main", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { mode: "wait", children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -15 }, transition: { duration: 0.25, ease: 'easeInOut' }, children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { location: location, children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(PublicRoute, { children: (0, jsx_runtime_1.jsx)(HomePage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/shops", element: (0, jsx_runtime_1.jsx)(PublicRoute, { children: (0, jsx_runtime_1.jsx)(ShopsPage_1.ShopsPage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/shop/:id", element: (0, jsx_runtime_1.jsx)(PublicRoute, { children: (0, jsx_runtime_1.jsx)(ShopStorefrontPage_1.ShopStorefrontPage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/products", element: (0, jsx_runtime_1.jsx)(PublicRoute, { children: (0, jsx_runtime_1.jsx)(ProductListingPage_1.ProductListingPage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/product/:id", element: (0, jsx_runtime_1.jsx)(PublicRoute, { children: (0, jsx_runtime_1.jsx)(ProductDetailsPage_1.ProductDetailsPage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/cart", element: (0, jsx_runtime_1.jsx)(PublicRoute, { children: (0, jsx_runtime_1.jsx)(CartPage_1.CartPage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/wishlist", element: (0, jsx_runtime_1.jsx)(PublicRoute, { children: (0, jsx_runtime_1.jsx)(WishlistPage_1.WishlistPage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/checkout", element: (0, jsx_runtime_1.jsx)(PublicRoute, { children: (0, jsx_runtime_1.jsx)(CheckoutPage_1.CheckoutPage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/payment", element: (0, jsx_runtime_1.jsx)(PublicRoute, { children: (0, jsx_runtime_1.jsx)(PaymentPage_1.PaymentPage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/confirmation", element: (0, jsx_runtime_1.jsx)(PublicRoute, { children: (0, jsx_runtime_1.jsx)(ConfirmationPage_1.ConfirmationPage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/about", element: (0, jsx_runtime_1.jsx)(PublicRoute, { children: (0, jsx_runtime_1.jsx)(AboutPage_1.AboutPage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/auth", element: (0, jsx_runtime_1.jsx)(PublicRoute, { children: (0, jsx_runtime_1.jsx)(UnifiedAuthPage_1.UnifiedAuthPage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/access-denied", element: (0, jsx_runtime_1.jsx)(AccessDeniedPage_1.AccessDeniedPage, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/admin/dashboard", element: (0, jsx_runtime_1.jsx)(AdminRoute_1.AdminRoute, { children: (0, jsx_runtime_1.jsx)(AdminDashboard_1.AdminDashboard, {}) }) }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Route, { path: "/customer", element: (0, jsx_runtime_1.jsx)(CustomerRoute_1.default, { children: (0, jsx_runtime_1.jsx)(CustomerDashboardLayout_1.default, {}) }), children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "profile", element: (0, jsx_runtime_1.jsx)(CustomerProfilePage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "orders", element: (0, jsx_runtime_1.jsx)(CustomerOrdersPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "addresses", element: (0, jsx_runtime_1.jsx)(CustomerAddressesPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "wishlist", element: (0, jsx_runtime_1.jsx)(CustomerWishlistPage_1.default, {}) })] }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/vendor/dashboard", element: (0, jsx_runtime_1.jsx)(VendorRoute_1.VendorRoute, { children: (0, jsx_runtime_1.jsx)(VendorDashboardHome_1.VendorDashboardHome, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/vendor/products", element: (0, jsx_runtime_1.jsx)(VendorRoute_1.VendorRoute, { children: (0, jsx_runtime_1.jsx)(VendorProductsPage_1.VendorProductsPage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/vendor/products/add", element: (0, jsx_runtime_1.jsx)(VendorRoute_1.VendorRoute, { children: (0, jsx_runtime_1.jsx)(AddEditProductForm_1.AddEditProductForm, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/vendor/products/edit/:productId", element: (0, jsx_runtime_1.jsx)(VendorRoute_1.VendorRoute, { children: (0, jsx_runtime_1.jsx)(AddEditProductForm_1.AddEditProductForm, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/vendor/orders", element: (0, jsx_runtime_1.jsx)(VendorRoute_1.VendorRoute, { children: (0, jsx_runtime_1.jsx)(VendorOrdersPage_1.VendorOrdersPage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/vendor/messages", element: (0, jsx_runtime_1.jsx)(VendorRoute_1.VendorRoute, { children: (0, jsx_runtime_1.jsx)(VendorMessagesPage_1.VendorMessagesPage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/vendor/profile", element: (0, jsx_runtime_1.jsx)(VendorRoute_1.VendorRoute, { children: (0, jsx_runtime_1.jsx)(VendorProfilePage_1.VendorProfilePage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/vendor/shop-setup", element: (0, jsx_runtime_1.jsx)(VendorRoute_1.VendorRoute, { children: (0, jsx_runtime_1.jsx)(VendorShopSetupPage_1.VendorShopSetupPage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/admin/vendors", element: (0, jsx_runtime_1.jsx)(AdminRoute_1.AdminRoute, { children: (0, jsx_runtime_1.jsx)(VendorManagementPage_1.VendorManagementPage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/admin/users", element: (0, jsx_runtime_1.jsx)(AdminRoute_1.AdminRoute, { children: (0, jsx_runtime_1.jsx)(AdminUsersPage_1.AdminUsersPage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/admin/users/add", element: (0, jsx_runtime_1.jsx)(AdminRoute_1.AdminRoute, { children: (0, jsx_runtime_1.jsx)(AdminAddUserPage_1.AdminAddUserPage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/admin/products", element: (0, jsx_runtime_1.jsx)(AdminRoute_1.AdminRoute, { children: (0, jsx_runtime_1.jsx)(AdminProductsPage_1.AdminProductsPage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/admin/revenue", element: (0, jsx_runtime_1.jsx)(AdminRoute_1.AdminRoute, { children: (0, jsx_runtime_1.jsx)(AdminRevenuePage_1.AdminRevenuePage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/admin/security", element: (0, jsx_runtime_1.jsx)(AdminRoute_1.AdminRoute, { children: (0, jsx_runtime_1.jsx)(AdminSecurityPage_1.AdminSecurityPage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/admin/reports", element: (0, jsx_runtime_1.jsx)(AdminRoute_1.AdminRoute, { children: (0, jsx_runtime_1.jsx)(AdminReportsPage_1.AdminReportsPage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/admin/settings", element: (0, jsx_runtime_1.jsx)(AdminRoute_1.AdminRoute, { children: (0, jsx_runtime_1.jsx)(AdminSettingsPage_1.AdminSettingsPage, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/admin/backups", element: (0, jsx_runtime_1.jsx)(AdminRoute_1.AdminRoute, { children: (0, jsx_runtime_1.jsx)(AdminBackupsPage_1.AdminBackupsPage, {}) }) })] }) }, location.pathname) }) }), !isDashboardPath && (0, jsx_runtime_1.jsx)(Footer_1.Footer, {}), (0, jsx_runtime_1.jsx)(BackToTop_1.BackToTop, {}), (0, jsx_runtime_1.jsx)(sonner_1.Toaster, { position: "top-right" })] }));
}
function App() {
    return ((0, jsx_runtime_1.jsx)(react_redux_1.Provider, { store: store, children: (0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsx)(AppContent, {}) }) }));
}
exports.default = App;
