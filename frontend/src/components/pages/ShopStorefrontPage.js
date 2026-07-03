"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopStorefrontPage = ShopStorefrontPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var shopAPI_1 = require("../../services/shopAPI");
var shops_1 = require("../../data/shops");
var products_1 = require("../../data/products");
var BoutiqueChatBubble_1 = require("../BoutiqueChatBubble");
/* ── Mock data (replace with real API) ── */
var MOCK_SHOP = {
    id: 1, name: "Ritu's Boutique",
    description: "Ritu's Boutique has been bringing the finest hand-crafted ethnic wear to Bengaluru since 2015. Every piece is sourced directly from artisans across Rajasthan, Gujarat, and Lucknow — blending rich tradition with a contemporary sensibility.",
    street: '12 Gandhi Nagar', city: 'Bengaluru', state: 'Karnataka', zipCode: '560001',
    latitude: 12.9716, longitude: 77.5946, phone: '+91 98765 43210', email: 'ritu@example.com',
    ratingAverage: 4.6, ratingCount: 128, categories: ['Women', 'Ethnic Wear', 'Salwar Suits', 'Dupattas', 'Kurtis'],
    isVerified: true, establishedYear: 2015, businessType: 'Boutique', followersCount: 340, isActive: true,
};
var MOCK_PRODUCTS = [
    { id: 1, name: 'Block Print Kurta', price: 899, originalPrice: 1299, image: 'https://images.unsplash.com/photo-1583391733975-5413bcd79b4e?auto=format&fit=crop&w=400&q=80', category: 'Kurtis', sizes: ['XS', 'S', 'M', 'L'], rating: 4.5 },
    { id: 2, name: 'Banarasi Silk Dupatta', price: 1299, originalPrice: 1800, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80', category: 'Dupattas', sizes: ['Free Size'], rating: 4.8 },
    { id: 3, name: 'Mirror Work Salwar Set', price: 2499, originalPrice: 3200, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=400&q=80', category: 'Salwar Suits', sizes: ['S', 'M', 'L', 'XL'], rating: 4.6 },
    { id: 4, name: 'Anarkali Suit', price: 3199, image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80', category: 'Salwar Suits', sizes: ['XS', 'S', 'M', 'L', 'XL'], rating: 4.4 },
    { id: 5, name: 'Cotton Printed Kurti', price: 599, originalPrice: 799, image: 'https://images.unsplash.com/photo-1602293289424-e1b261b41a4a?auto=format&fit=crop&w=400&q=80', category: 'Kurtis', sizes: ['S', 'M', 'L'], rating: 4.2 },
    { id: 6, name: 'Phulkari Dupatta', price: 699, image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=400&q=80', category: 'Dupattas', sizes: ['Free Size'], rating: 4.7 },
];
var MOCK_REVIEWS = [
    { id: 1, name: 'Priya M.', rating: 5, date: '12 May 2025', text: 'Absolutely love the kurtas here! The fabric quality is outstanding and the prints are unique. Will definitely be back.' },
    { id: 2, name: 'Anjali S.', rating: 4, date: '3 Apr 2025', text: 'Great collection and very helpful staff. The salwar set I bought fits perfectly. Delivery was quick too.' },
    { id: 3, name: 'Meera K.', rating: 5, date: '18 Mar 2025', text: 'Found the most beautiful Banarasi dupatta here at a very reasonable price. The shop itself is so well-curated.' },
];
var ALL_CATEGORIES_LABEL = 'All';
function ShopStorefrontPage() {
    var _this = this;
    var _a, _b, _c;
    var id = (0, react_router_dom_1.useParams)().id;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _d = (0, react_1.useState)(null), shop = _d[0], setShop = _d[1];
    var _e = (0, react_1.useState)([]), products = _e[0], setProducts = _e[1];
    var _f = (0, react_1.useState)(true), loading = _f[0], setLoading = _f[1];
    var _g = (0, react_1.useState)(ALL_CATEGORIES_LABEL), activeCategory = _g[0], setActiveCategory = _g[1];
    var _h = (0, react_1.useState)(false), following = _h[0], setFollowing = _h[1];
    var _j = (0, react_1.useState)('products'), activeTab = _j[0], setActiveTab = _j[1];
    (0, react_1.useEffect)(function () {
        var load = function () { return __awaiter(_this, void 0, void 0, function () {
            var cleanId, targetId, isNumericId, shopRes, shopData_1, fallback, prodRes, realProducts_1, fallbackProds, fallback, fallbackProds, _a, fallback, fallbackProds;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        setLoading(true);
                        cleanId = id ? id.toString().replace('vendor', '') : '';
                        targetId = 'vendor' + cleanId;
                        isNumericId = id ? !isNaN(Number(cleanId)) : false;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, 7, 8]);
                        if (!isNumericId) return [3 /*break*/, 4];
                        return [4 /*yield*/, shopAPI_1.shopAPI.getShopById(Number(cleanId))];
                    case 2:
                        shopRes = _e.sent();
                        shopData_1 = (shopRes && shopRes.data && shopRes.data.shop) || (shopRes && shopRes.id ? shopRes : null);
                        if (shopData_1) {
                            setShop(shopData_1);
                            setFollowing((shopRes.data && shopRes.data.isFollowing) ? true : false);
                        }
                        else {
                            fallback = shops_1.shops.find(function (s) { return s.id.toString() === id || s.id.toString() === targetId || s.id.toString() === cleanId; }) || shops_1.shops[0];
                            setShop(fallback);
                        }
                        return [4 /*yield*/, shopAPI_1.shopAPI.getShopProducts(Number(cleanId), { limit: 20 })];
                    case 3:
                        prodRes = _e.sent();
                        realProducts_1 = (prodRes && prodRes.data && prodRes.data.products) || (prodRes && prodRes.products) || [];
                        if (realProducts_1.length > 0) {
                            setProducts(realProducts_1.map(function (p) { return ({
                                id: (p.id || p._id).toString(),
                                name: p.name,
                                price: p.price,
                                originalPrice: p.originalPrice,
                                image: getImageUrl(p.imageUrl || p.image || p.thumbnail || (p.images && p.images.length > 0 ? p.images[0] : '')),
                                category: p.category,
                                sizes: p.sizes || ['XS', 'S', 'M', 'L'],
                                rating: p.rating || 4.5
                            }); }));
                        }
                        else {
                            fallbackProds = products_1.products.filter(function (p) { return p.vendorId.toString() === id || p.vendorId.toString() === targetId || p.vendorId.toString() === cleanId; });
                            if (fallbackProds.length > 0) {
                                setProducts(fallbackProds.map(function (p) { return ({
                                    id: (p.id || p._id).toString(),
                                    name: p.name,
                                    price: p.price,
                                    originalPrice: p.originalPrice,
                                    image: getImageUrl(p.image || p.imageUrl || p.thumbnail || (p.images && p.images.length > 0 ? p.images[0] : '')),
                                    category: p.category,
                                    sizes: p.sizes,
                                    rating: p.rating
                                }); }));
                            }
                            else {
                                setProducts(MOCK_PRODUCTS);
                            }
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        fallback = shops_1.shops.find(function (s) { return s.id.toString() === id || s.id.toString() === targetId || s.id.toString() === cleanId; }) || shops_1.shops[0];
                        setShop(fallback);
                        fallbackProds = products_1.products.filter(function (p) { return p.vendorId.toString() === id || p.vendorId.toString() === targetId || p.vendorId.toString() === cleanId; });
                        if (fallbackProds.length > 0) {
                            setProducts(fallbackProds.map(function (p) { return ({
                                id: (p.id || p._id).toString(),
                                name: p.name,
                                price: p.price,
                                originalPrice: p.originalPrice,
                                image: getImageUrl(p.image || p.imageUrl || p.thumbnail || (p.images && p.images.length > 0 ? p.images[0] : '')),
                                category: p.category,
                                sizes: p.sizes,
                                rating: p.rating
                            }); }));
                        }
                        else {
                            setProducts(MOCK_PRODUCTS);
                        }
                        _e.label = 5;
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        _a = _e.sent();
                        fallback = shops_1.shops.find(function (s) { return s.id.toString() === id || s.id.toString() === targetId || s.id.toString() === cleanId; }) || shops_1.shops[0];
                        setShop(fallback);
                        fallbackProds = products_1.products.filter(function (p) { return p.vendorId.toString() === id || p.vendorId.toString() === targetId || p.vendorId.toString() === cleanId; });
                        if (fallbackProds.length > 0) {
                            setProducts(fallbackProds.map(function (p) { return ({
                                id: (p.id || p._id).toString(),
                                name: p.name,
                                price: p.price,
                                originalPrice: p.originalPrice,
                                image: getImageUrl(p.image || p.imageUrl || p.thumbnail || (p.images && p.images.length > 0 ? p.images[0] : '')),
                                category: p.category,
                                sizes: p.sizes,
                                rating: p.rating
                            }); }));
                        }
                        else {
                            setProducts(MOCK_PRODUCTS);
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        load();
    }, [id]);
    var categoryTabs = shop
        ? __spreadArray([ALL_CATEGORIES_LABEL], ((_a = shop.categories) !== null && _a !== void 0 ? _a : []), true) : [ALL_CATEGORIES_LABEL];
    var visibleProducts = activeCategory === ALL_CATEGORIES_LABEL
        ? products
        : products.filter(function (p) { return p.category === activeCategory; });
    var getImageUrl = function (path) {
        if (!path) return '';
        if (path.startsWith('http://') || path.startsWith('https://')) return path;
        var apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        var serverRoot = apiBase.endsWith('/api') ? apiBase.slice(0, -4) : apiBase;
        var cleanPath = path.startsWith('/') ? path : '/' + path;
        return serverRoot + cleanPath;
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-[var(--lt-cream)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "shimmer w-full", style: { height: '300px' } }), (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto px-6 py-8 space-y-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "shimmer h-10 w-72 rounded-xl" }), (0, jsx_runtime_1.jsx)("div", { className: "shimmer h-5 w-48 rounded-lg" }), (0, jsx_runtime_1.jsx)("div", { className: "shimmer h-4 w-full max-w-lg rounded-lg" })] })] }));
    }
    if (!shop) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-[var(--lt-cream)] flex items-center justify-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-4xl mb-3", children: "\uD83C\uDFEA" }), (0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold mb-2", style: { fontFamily: 'var(--lt-font-display)' }, children: "Shop not found" }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return navigate('/shops'); }, className: "text-sm font-semibold", style: { color: 'var(--lt-amber)' }, children: "\u2190 Back to shops" })] }) }));
    }
    var rating = (_b = shop.ratingAverage) !== null && _b !== void 0 ? _b : 0;
    var productsContent = activeTab === 'products' && (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {
        children: visibleProducts.length === 0
            ? (0, jsx_runtime_1.jsxs)("div", { className: "text-center py-20", children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Package, { size: 40, className: "mx-auto mb-3 opacity-20" }),
                (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium", style: { color: 'var(--lt-muted)' }, children: "No products in this category yet" })
            ] })
            : (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 pb-16", children: visibleProducts.map(function (product, i) {
                return (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                    to: "/product/".concat(product.id),
                    className: "group block fade-up",
                    style: { animationDelay: "".concat(i * 40, "ms"), textDecoration: 'none' },
                    children: (0, jsx_runtime_1.jsxs)("div", { className: "rounded-xl overflow-hidden border border-[var(--lt-border)] bg-white card-lift shadow-lt-sm", children: [
                        (0, jsx_runtime_1.jsxs)("div", { className: "relative overflow-hidden", style: { aspectRatio: '3/4' }, children: [
                            (0, jsx_runtime_1.jsx)("img", { src: product.image, alt: product.name, className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" }),
                            product.originalPrice && (0, jsx_runtime_1.jsxs)("span", { className: "absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full text-white", style: { background: 'var(--lt-amber)' }, children: [Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100), "% OFF"] }),
                            (0, jsx_runtime_1.jsx)("button", { className: "absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity", onClick: function (e) { e.preventDefault(); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Heart, { size: 14, style: { color: 'var(--lt-amber)' } }) }),
                            (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0", children: (0, jsx_runtime_1.jsxs)("button", { className: "w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold text-white", style: { background: 'var(--lt-charcoal)' }, onClick: function (e) { return e.preventDefault(); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShoppingBag, { size: 12 }), " Add to Cart"] }) })
                        ] }),
                        (0, jsx_runtime_1.jsxs)("div", { className: "p-3", children: [
                            (0, jsx_runtime_1.jsx)("p", { className: "text-xs mb-1", style: { color: 'var(--lt-muted)' }, children: product.category }),
                            (0, jsx_runtime_1.jsx)("h4", { className: "text-sm font-bold leading-tight mb-1 line-clamp-1", style: { fontFamily: 'var(--lt-font-display)', color: 'var(--lt-charcoal)' }, children: product.name }),
                            (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [
                                (0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-bold", style: { color: 'var(--lt-charcoal)' }, children: ["\u20B9", product.price.toLocaleString()] }),
                                product.originalPrice && (0, jsx_runtime_1.jsxs)("span", { className: "text-xs line-through", style: { color: 'var(--lt-muted)' }, children: ["\u20B9", product.originalPrice.toLocaleString()] })
                            ] }),
                            product.rating > 0 && (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1 mt-1", children: [
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Star, { size: 10, className: "fill-amber-400 text-amber-400" }),
                                (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-medium", style: { color: 'var(--lt-muted)' }, children: product.rating })
                            ] })
                        ] })
                    ] })
                }, product.id);
            }) })
    });
    var aboutContent = activeTab === 'about' && (0, jsx_runtime_1.jsxs)("div", { className: "max-w-2xl pb-16 fade-up", children: [
        (0, jsx_runtime_1.jsxs)("div", { className: "p-6 rounded-2xl mb-6", style: { background: 'white', border: '1px solid var(--lt-border)' }, children: [
            (0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-bold mb-3", style: { fontFamily: 'var(--lt-font-display)', color: 'var(--lt-charcoal)' }, children: "About the shop" }),
            (0, jsx_runtime_1.jsx)("p", { className: "text-sm leading-relaxed", style: { color: 'var(--lt-muted)', lineHeight: '1.8' }, children: (_c = shop.description) !== null && _c !== void 0 ? _c : 'No description available.' })
        ] }),
        (0, jsx_runtime_1.jsxs)("div", { className: "p-6 rounded-2xl space-y-4", style: { background: 'white', border: '1px solid var(--lt-border)' }, children: [
            (0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-bold mb-1", style: { fontFamily: 'var(--lt-font-display)', color: 'var(--lt-charcoal)' }, children: "Contact" }),
            shop.phone && (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 text-sm", style: { color: 'var(--lt-muted)' }, children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Phone, { size: 15, style: { color: 'var(--lt-amber)' } }),
                shop.phone
            ] }),
            shop.email && (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 text-sm", style: { color: 'var(--lt-muted)' }, children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Mail, { size: 15, style: { color: 'var(--lt-amber)' } }),
                shop.email
            ] }),
            shop.street && (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2", children: [
                (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-3 text-sm", style: { color: 'var(--lt-muted)' }, children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { size: 15, style: { color: 'var(--lt-amber)', flexShrink: 0, marginTop: 2 } }),
                    (0, jsx_runtime_1.jsxs)("span", { children: [shop.street, ", ", shop.city, ", ", shop.state, " \u2014 ", shop.zipCode] })
                ] }),
                (0, jsx_runtime_1.jsx)("div", { className: "pl-6", children: (0, jsx_runtime_1.jsxs)("a", { href: "https://www.google.com/maps/dir/?api=1&destination=".concat(encodeURIComponent(shop.name + ', ' + shop.street + ', ' + shop.city + ', ' + shop.state)), target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border border-[var(--lt-border)] bg-[var(--lt-cream)] hover:bg-[var(--lt-cream-dark)] transition-colors", style: { color: 'var(--lt-amber)' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { size: 12 }), " Get Directions (Google Maps)"] }) })
            ] })
        ] })
    ] });
    var reviewsContent = activeTab === 'reviews' && (0, jsx_runtime_1.jsxs)("div", { className: "max-w-2xl pb-16 space-y-4 fade-up", children: [
        (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-6 p-6 rounded-2xl mb-2", style: { background: 'white', border: '1px solid var(--lt-border)' }, children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [
            (0, jsx_runtime_1.jsx)("p", { className: "text-5xl font-bold", style: { fontFamily: 'var(--lt-font-display)', color: 'var(--lt-charcoal)' }, children: rating.toFixed(1) }),
            (0, jsx_runtime_1.jsx)("div", { className: "flex gap-0.5 mt-1 justify-center", children: Array.from({ length: 5 }).map(function (_, i) {
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Star, { size: 14, className: i < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200' }, i);
            }) }),
            (0, jsx_runtime_1.jsxs)("p", { className: "text-xs mt-1", style: { color: 'var(--lt-muted)' }, children: [shop.ratingCount, " reviews"] })
        ] }) }),
        MOCK_REVIEWS.map(function (review) {
            return (0, jsx_runtime_1.jsxs)("div", { className: "p-5 rounded-2xl", style: { background: 'white', border: '1px solid var(--lt-border)' }, children: [
                (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-2", children: [
                    (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [
                        (0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white", style: { background: 'var(--lt-amber)' }, children: review.name[0] }),
                        (0, jsx_runtime_1.jsxs)("div", { children: [
                            (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-bold", style: { color: 'var(--lt-charcoal)' }, children: review.name }),
                            (0, jsx_runtime_1.jsx)("p", { className: "text-xs", style: { color: 'var(--lt-muted)' }, children: review.date })
                        ] })
                    ] }),
                    (0, jsx_runtime_1.jsx)("div", { className: "flex gap-0.5", children: Array.from({ length: 5 }).map(function (_, i) {
                        return (0, jsx_runtime_1.jsx)(lucide_react_1.Star, { size: 11, className: i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200' }, i);
                    }) })
                ] }),
                (0, jsx_runtime_1.jsx)("p", { className: "text-sm leading-relaxed", style: { color: 'var(--lt-muted)' }, children: review.text })
            ] }, review.id);
        })
    ] });

    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-[var(--lt-cream)]", style: { fontFamily: 'var(--lt-font-body)' }, children: [
        (0, jsx_runtime_1.jsxs)("div", { className: "relative w-full overflow-hidden bg-[var(--lt-cream-dark)]", style: { height: '300px' }, children: [
            (shop.bannerUrl || shop.banner) ? ((0, jsx_runtime_1.jsx)("img", { src: getImageUrl(shop.bannerUrl || shop.banner), alt: "".concat(shop.name, " banner"), className: "w-full h-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-full", style: { background: 'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 40%, #FDBA74 70%, #FB923C 100%)' } })),
            (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0", style: { background: 'linear-gradient(to top, rgba(15,23,42,0.55) 0%, transparent 60%)' } }),
            (0, jsx_runtime_1.jsxs)("button", { onClick: function () { return navigate(-1); }, className: "absolute top-5 left-6 flex items-center gap-2 text-sm font-semibold text-white bg-white/20 backdrop-blur-sm rounded-full px-3 py-2 hover:bg-white/30 transition-colors", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, { size: 14 }), " Back"] }),
            (0, jsx_runtime_1.jsx)("button", { className: "absolute top-5 right-6 text-white bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Share2, { size: 16 }) })
        ] }),
        (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto px-6", children: [
            (0, jsx_runtime_1.jsxs)("div", { className: "relative -mt-10 mb-8 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-end gap-4 fade-up", style: { background: 'white', border: '1px solid var(--lt-border)', boxShadow: 'var(--lt-shadow-md)' }, children: [
                (0, jsx_runtime_1.jsx)("div", { className: "w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center border-2 overflow-hidden", style: { background: 'var(--lt-amber-pale)', borderColor: 'var(--lt-amber-light)', boxShadow: 'var(--lt-shadow-sm)' }, children: (shop.logoUrl || shop.logo) ? ((0, jsx_runtime_1.jsx)("img", { src: getImageUrl(shop.logoUrl || shop.logo), alt: shop.name, className: "w-full h-full object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-bold", style: { color: 'var(--lt-amber)', fontFamily: 'var(--lt-font-display)' }, children: shop.name.split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase() })) }),
                (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 min-w-0", children: [
                    (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
                        (0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold", style: { fontFamily: 'var(--lt-font-display)', color: 'var(--lt-charcoal)' }, children: shop.name }),
                        shop.isVerified && ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.BadgeCheck, { size: 11 }), " Verified"] }))
                    ] }),
                    (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-4 text-sm", style: { color: 'var(--lt-muted)' }, children: [
                        (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { size: 13, style: { color: 'var(--lt-amber)' } }), shop.city, ", ", shop.state] }),
                        rating > 0 && ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Star, { size: 13, className: "fill-amber-400 text-amber-400" }), (0, jsx_runtime_1.jsx)("strong", { style: { color: 'var(--lt-charcoal)' }, children: rating.toFixed(1) }), "(", shop.ratingCount, " reviews)"] })),
                        shop.followersCount != null && ((0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("strong", { style: { color: 'var(--lt-charcoal)' }, children: shop.followersCount }), " followers"] })),
                        shop.establishedYear && ((0, jsx_runtime_1.jsxs)("span", { children: ["Est. ", shop.establishedYear] }))
                    ] })
                ] }),
                (0, jsx_runtime_1.jsx)("div", { className: "flex gap-3 flex-shrink-0", children: (0, jsx_runtime_1.jsxs)("button", { onClick: function () { return setFollowing(!following); }, className: "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all", style: {
                                background: following ? 'var(--lt-amber)' : 'transparent',
                                color: following ? 'white' : 'var(--lt-charcoal)',
                                border: "2px solid ".concat(following ? 'var(--lt-amber)' : 'var(--lt-border)'),
                            }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Heart, { size: 14, className: following ? 'fill-white' : '' }), following ? 'Following' : 'Follow'] }) })
            ] }),
            (0, jsx_runtime_1.jsx)("div", { className: "flex gap-2 overflow-x-auto pb-1 mb-6 scrollbar-hide fade-up", children: categoryTabs.map(function (cat) { return ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return setActiveCategory(cat); }, className: "flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all", style: {
                                background: activeCategory === cat ? 'var(--lt-charcoal)' : 'white',
                                color: activeCategory === cat ? 'white' : 'var(--lt-charcoal)',
                                border: "1.5px solid ".concat(activeCategory === cat ? 'var(--lt-charcoal)' : 'var(--lt-border)'),
                                boxShadow: 'var(--lt-shadow-sm)',
                            }, children: cat }, cat)); }) }),
            (0, jsx_runtime_1.jsx)("div", { className: "flex gap-1 mb-8 p-1 rounded-xl w-fit", style: { background: 'var(--lt-cream-dark)' }, children: ['products', 'about', 'reviews'].map(function (tab) { return ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return setActiveTab(tab); }, className: "px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all", style: {
                                background: activeTab === tab ? 'white' : 'transparent',
                                color: activeTab === tab ? 'var(--lt-charcoal)' : 'var(--lt-muted)',
                                boxShadow: activeTab === tab ? 'var(--lt-shadow-sm)' : 'none'
                            }, children: tab }, tab)); }) }),
            productsContent,
            aboutContent,
            reviewsContent,
            shop && (0, jsx_runtime_1.jsx)(BoutiqueChatBubble_1.BoutiqueChatBubble, {
                vendorId: shop.ownerId || shop.vendorId || shop.id,
                shopName: shop.name
            })
        ] })
    ] }));
}
