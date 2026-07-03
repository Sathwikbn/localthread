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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var button_1 = require("../ui/button");
var card_1 = require("../ui/card");
var badge_1 = require("../ui/badge");
var lucide_react_1 = require("lucide-react");
var customerAPI_1 = require("../../services/customerAPI");
var cartSlice_1 = require("../../store/cartSlice");
var sonner_1 = require("sonner");
var CustomerWishlistPage = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var dispatch = (0, react_redux_1.useDispatch)();
    var getImageUrl = function (path) {
        if (!path) return '';
        if (path.startsWith('http://') || path.startsWith('https://')) return path;
        var apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        var serverRoot = apiBase.endsWith('/api') ? apiBase.slice(0, -4) : apiBase;
        var cleanPath = path.startsWith('/') ? path : '/' + path;
        return serverRoot + cleanPath;
    };
    var _a = (0, react_1.useState)([]), wishlist = _a[0], setWishlist = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    (0, react_1.useEffect)(function () {
        loadWishlist();
    }, []);
    var loadWishlist = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, wishlistList, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    return [4 /*yield*/, customerAPI_1.customerAPI.getWishlist()];
                case 1:
                    response = _a.sent();
                    wishlistList = [];
                    if (response) {
                        if (response.success && response.data && response.data.wishlist) {
                            wishlistList = response.data.wishlist;
                        }
                        else if (response.items) {
                            wishlistList = response.items;
                        }
                        else if (Array.isArray(response)) {
                            wishlistList = response;
                        }
                    }
                    setWishlist(wishlistList);
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error loading wishlist:', error_1);
                    sonner_1.toast.error('Failed to load wishlist');
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleRemoveFromWishlist = function (productId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, customerAPI_1.customerAPI.removeFromWishlist(productId)];
                case 1:
                    response = _a.sent();
                    sonner_1.toast.success('Product removed from wishlist');
                    loadWishlist();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error removing from wishlist:', error_2);
                    sonner_1.toast.error('Failed to remove from wishlist');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleAddToCart = function (product) { return __awaiter(void 0, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, dispatch((0, cartSlice_1.addToCartAsync)({ productId: product.id || product._id, quantity: 1 })).unwrap()];
                case 1:
                    _a.sent();
                    sonner_1.toast.success("".concat(product.name, " added to cart!"));
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    sonner_1.toast.error(error_3 || 'Failed to add item to cart');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleViewProduct = function (product) {
        navigate("/product/".concat(product.id || product._id));
    };
    var formatPrice = function (price) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(price);
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center h-64", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-gray-600", children: "Loading wishlist..." })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-gray-900", children: "Wishlist" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "Your saved products" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Heart, { className: "h-5 w-5 text-red-500" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-gray-600", children: [wishlist.length, " ", wishlist.length === 1 ? 'item' : 'items'] })] })] }), wishlist.length === 0 ? ((0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-12 text-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Heart, { className: "h-12 w-12 text-gray-400 mx-auto mb-4" }), (0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "Your wishlist is empty" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 mb-4", children: "Start browsing products and save your favorites for later." }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return window.history.back(); }, children: "Continue Shopping" })] }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: wishlist.map(function (product) {
                    var prodId = product.id || product._id;
                    var displayImage = getImageUrl(product.imageUrl || product.image || (product.images && product.images[0]) || '/placeholder-product.jpg');
                    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "group hover:shadow-lg transition-shadow", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "aspect-square overflow-hidden rounded-t-lg", children: (0, jsx_runtime_1.jsx)("img", { src: displayImage, alt: product.name, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: function () { return handleRemoveFromWishlist(prodId); }, className: "absolute top-2 right-2 bg-white/80 hover:bg-white text-red-600 hover:text-red-700", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsx)("div", { className: "absolute top-2 left-2", children: (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "secondary", className: "bg-white/80 text-gray-700", children: product.category }) })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-gray-900 line-clamp-2", children: product.name }), product.vendorId && ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-600", children: ["by ", product.vendorId.storeName] })), (0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-gray-900", children: formatPrice(product.price) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 mt-4", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", onClick: function () { return handleViewProduct(product); }, className: "flex-1 flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4" }), "View Details"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", onClick: function () { return handleAddToCart(product); }, className: "flex-1 flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShoppingCart, { className: "h-4 w-4" }), "Add to Cart"] })] })] })] }, prodId)); }) })), wishlist.length > 0 && ((0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "Quick Actions" }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-4", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: function () {
                                        var addAll = function () { return __awaiter(void 0, void 0, void 0, function () {
                                            var _i, wishlist_1, item, error_4;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        _a.trys.push([0, 5, , 6]);
                                                        sonner_1.toast.loading('Adding all items to cart...', { id: 'add-all' });
                                                        _i = 0, wishlist_1 = wishlist;
                                                        _a.label = 1;
                                                    case 1:
                                                        if (!(_i < wishlist_1.length)) return [3 /*break*/, 4];
                                                        item = wishlist_1[_i];
                                                        return [4 /*yield*/, dispatch((0, cartSlice_1.addToCartAsync)({ productId: item.id || item._id, quantity: 1 })).unwrap()];
                                                    case 2:
                                                        _a.sent();
                                                        _a.label = 3;
                                                    case 3:
                                                        _i++;
                                                        return [3 /*break*/, 1];
                                                    case 4:
                                                        sonner_1.toast.success('All items added to cart!', { id: 'add-all' });
                                                        return [3 /*break*/, 6];
                                                    case 5:
                                                        error_4 = _a.sent();
                                                        sonner_1.toast.error('Failed to add some items to cart', { id: 'add-all' });
                                                        return [3 /*break*/, 6];
                                                    case 6: return [2 /*return*/];
                                                }
                                            });
                                        }); };
                                        addAll();
                                    }, className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShoppingCart, { className: "h-4 w-4" }), "Add All to Cart"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: function () {
                                        if (window.confirm('Are you sure you want to clear your wishlist?')) {
                                            var clearAll = function () { return __awaiter(void 0, void 0, void 0, function () {
                                                var _i, wishlist_2, item, error_5;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            _a.trys.push([0, 5, , 6]);
                                                            sonner_1.toast.loading('Clearing wishlist...', { id: 'clear-wishlist' });
                                                            _i = 0, wishlist_2 = wishlist;
                                                            _a.label = 1;
                                                        case 1:
                                                            if (!(_i < wishlist_2.length)) return [3 /*break*/, 4];
                                                            item = wishlist_2[_i];
                                                            return [4 /*yield*/, customerAPI_1.customerAPI.removeFromWishlist(item.id || item._id)];
                                                        case 2:
                                                            _a.sent();
                                                            _a.label = 3;
                                                        case 3:
                                                            _i++;
                                                            return [3 /*break*/, 1];
                                                        case 4:
                                                            setWishlist([]);
                                                            sonner_1.toast.success('Wishlist cleared!', { id: 'clear-wishlist' });
                                                            return [3 /*break*/, 6];
                                                        case 5:
                                                            error_5 = _a.sent();
                                                            sonner_1.toast.error('Failed to clear wishlist', { id: 'clear-wishlist' });
                                                            return [3 /*break*/, 6];
                                                        case 6: return [2 /*return*/];
                                                    }
                                                });
                                            }); };
                                            clearAll();
                                        }
                                    }, className: "flex items-center gap-2 text-red-600 hover:text-red-700", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-4 w-4" }), "Clear Wishlist"] })] }) })] }))] }));
};
exports.default = CustomerWishlistPage;
