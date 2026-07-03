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
exports.VendorProductsPage = VendorProductsPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var productAPI_1 = require("../../services/productAPI");
var button_1 = require("../ui/button");
var input_1 = require("../ui/input");
var card_1 = require("../ui/card");
var alert_1 = require("../ui/alert");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
function VendorProductsPage() {
    var _this = this;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var getImageUrl = function (path) {
        if (!path) return '';
        if (path.startsWith('http://') || path.startsWith('https://')) return path;
        var apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        var serverRoot = apiBase.endsWith('/api') ? apiBase.slice(0, -4) : apiBase;
        var cleanPath = path.startsWith('/') ? path : '/' + path;
        return serverRoot + cleanPath;
    };
    var _a = (0, react_1.useState)([]), products = _a[0], setProducts = _a[1];
    var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(null), isDeleting = _c[0], setIsDeleting = _c[1];
    var _d = (0, react_1.useState)(null), error = _d[0], setError = _d[1];
    var _e = (0, react_1.useState)(''), searchTerm = _e[0], setSearchTerm = _e[1];
    var _f = (0, react_1.useState)(''), categoryFilter = _f[0], setCategoryFilter = _f[1];
    var _g = (0, react_1.useState)(1), currentPage = _g[0], setCurrentPage = _g[1];
    var _h = (0, react_1.useState)(1), totalPages = _h[0], setTotalPages = _h[1];
    var loadProducts = (0, react_1.useCallback)(function () { return __awaiter(_this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setIsLoading(true);
                    setError(null);
                    return [4 /*yield*/, productAPI_1.productAPI.getVendorProducts({
                            page: currentPage,
                            limit: 12,
                            category: categoryFilter || undefined,
                            search: searchTerm || undefined
                        })];
                case 1:
                    response = _a.sent();
                    if (response.success && response.data) {
                        setProducts(response.data.products);
                        setTotalPages(response.data.pagination.totalPages);
                    }
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    console.error('Load products error:', error_1);
                    setError('Failed to load products');
                    return [3 /*break*/, 4];
                case 3:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [currentPage, searchTerm, categoryFilter]);
    (0, react_1.useEffect)(function () {
        loadProducts();
    }, [loadProducts]);
    var handleDeleteProduct = function (productId) { return __awaiter(_this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.confirm('Are you sure you want to delete this product?')) {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setIsDeleting(productId);
                    return [4 /*yield*/, productAPI_1.productAPI.deleteProduct(productId)];
                case 2:
                    response = _a.sent();
                    if (response.success) {
                        sonner_1.toast.success('Product deleted successfully!');
                        loadProducts(); // Reload the list
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    console.error('Delete product error:', error_2);
                    sonner_1.toast.error('Failed to delete product');
                    return [3 /*break*/, 5];
                case 4:
                    setIsDeleting(null);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var formatCurrency = function (amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };
    var formatDate = function (dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
    var categories = [
        'clothing',
        'accessories',
        'footwear',
        'jewelry',
        'home',
        'other'
    ];
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-8 font-body text-[var(--lt-charcoal)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl md:text-4xl font-bold font-display tracking-tight text-[var(--lt-charcoal)]", children: "My Products" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-[var(--lt-muted)] mt-1", children: "Manage and curate your boutique's product catalog" })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return navigate('/vendor/products/add'); }, className: "bg-[var(--lt-charcoal)] hover:bg-[var(--lt-amber)] text-white font-bold font-display rounded-xl tracking-wider text-xs px-6 py-4.5 cursor-pointer shadow-lt-sm transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4" }), " Add Product"] })] }), error && ((0, jsx_runtime_1.jsx)(alert_1.Alert, { className: "border-red-200 bg-red-50 text-red-700 rounded-xl", children: (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: error }) })), (0, jsx_runtime_1.jsx)(card_1.Card, { className: "border-[var(--lt-border)] shadow-lt-sm rounded-2xl bg-white", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row gap-4 items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full md:flex-1 relative", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--lt-muted)]" }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "Search catalog by name...", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); }, className: "pl-11 py-3 bg-[var(--lt-cream)] border-[var(--lt-border)] focus:ring-[var(--lt-amber)] focus:border-[var(--lt-amber)] rounded-xl font-body text-sm text-[var(--lt-charcoal)] placeholder-[var(--lt-muted)]" })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full md:w-auto", children: (0, jsx_runtime_1.jsxs)("select", { value: categoryFilter, onChange: function (e) { return setCategoryFilter(e.target.value); }, className: "w-full px-4 py-3 bg-[var(--lt-cream)] border border-[var(--lt-border)] rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[var(--lt-amber)] focus:border-[var(--lt-amber)] cursor-pointer font-display text-[var(--lt-charcoal)]", children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "All Categories" }), categories.map(function (category) { return ((0, jsx_runtime_1.jsx)("option", { value: category, children: category.charAt(0).toUpperCase() + category.slice(1) }, category)); })] }) })] }) }) }), isLoading ? ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center min-h-[300px]", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-8 w-8 animate-spin text-[var(--lt-amber)]" }) })) : products.length === 0 ? ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "border-[var(--lt-border)] shadow-lt-sm rounded-2xl bg-white p-8", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-0 text-center py-12", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Package, { className: "h-12 w-12 text-[var(--lt-muted)] mx-auto mb-4" }), (0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-bold font-display text-[var(--lt-charcoal)] mb-2", children: "No products found" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-[var(--lt-muted)] max-w-sm mx-auto mb-6", children: searchTerm || categoryFilter
                                ? 'Try adjusting your search query or choosing another category filter.'
                                : 'Start showcasing your products by listing your first apparel piece.' }), !searchTerm && !categoryFilter && ((0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return navigate('/vendor/products/add'); }, className: "bg-[var(--lt-charcoal)] hover:bg-[var(--lt-amber)] text-white font-bold font-display rounded-xl tracking-wider text-xs px-6 py-3 cursor-pointer", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "mr-2 h-4 w-4" }), " Add Your First Product"] }))] }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6", children: products.map(function (product) {
                    var isLowStock = product.stock <= 5;
                    var images = product.images || [];
                    var displayImage = getImageUrl(product.imageUrl || product.image || product.thumbnail || (images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600'));
                    var prodId = product.id || product._id;
                    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "overflow-hidden border-[var(--lt-border)] shadow-lt-sm hover:shadow-lt-md rounded-2xl bg-white transition-all duration-300 group flex flex-col h-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: "aspect-square relative overflow-hidden bg-slate-50 shrink-0", children: [(0, jsx_runtime_1.jsx)("img", { src: displayImage, alt: product.name, className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute top-3 left-3", children: (0, jsx_runtime_1.jsx)("span", { className: "px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-full shadow-lt-sm border ".concat(product.isActive
                                                ? 'bg-green-50 text-green-700 border-green-200'
                                                : 'bg-slate-100 text-slate-600 border-slate-200'), children: product.isActive ? 'Active' : 'Draft' }) }), isLowStock && ((0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-3 left-3", children: (0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold bg-red-50 text-red-600 rounded-full border border-red-200 shadow-lt-sm", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { size: 10 }), " Low Stock"] }) }))] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-5 flex flex-col flex-1 justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-1.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-[10px] font-bold font-display uppercase tracking-wider text-[var(--lt-amber)] bg-[var(--lt-amber-pale)] px-2 py-0.5 rounded-md border border-[var(--lt-amber-light)]/40", children: product.category }), (0, jsx_runtime_1.jsx)("span", { className: "text-[10px] text-[var(--lt-muted)] font-mono", children: formatDate(product.createdAt) })] }), (0, jsx_runtime_1.jsx)("h3", { className: "font-bold text-base text-[var(--lt-charcoal)] font-display truncate", title: product.name, children: product.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-[var(--lt-muted)] line-clamp-2 h-8 leading-relaxed font-body", children: product.description || 'No description provided.' }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between pt-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-bold text-base text-[var(--lt-charcoal)] font-display", children: formatCurrency(product.price) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold font-display flex items-center gap-1 ".concat(isLowStock ? 'text-red-500' : 'text-emerald-600'), children: isLowStock ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Only ", product.stock, " left"] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, { size: 12 }), " ", product.stock, " in stock"] })) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 pt-5 mt-auto border-t border-slate-50", children: [(0, jsx_runtime_1.jsxs)("button", { onClick: function () { return navigate("/vendor/products/edit/".concat(prodId)); }, className: "flex-1 inline-flex items-center justify-center gap-1 h-9 rounded-xl border border-[var(--lt-border)] hover:border-[var(--lt-muted)] text-xs font-bold font-display uppercase tracking-wider text-[var(--lt-charcoal)] bg-white hover:bg-[var(--lt-cream)] transition-all cursor-pointer", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "h-3 w-3" }), " Edit"] }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return navigate("/product/".concat(prodId)); }, className: "inline-flex items-center justify-center w-9 h-9 rounded-xl border border-[var(--lt-border)] hover:border-[var(--lt-muted)] text-[var(--lt-charcoal)] bg-white hover:bg-[var(--lt-cream)] transition-all cursor-pointer", title: "View public product page", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-3.5 w-3.5" }) }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return handleDeleteProduct(prodId); }, disabled: isDeleting === prodId, className: "inline-flex items-center justify-center w-9 h-9 rounded-xl border border-red-200 hover:border-red-400 text-red-500 hover:text-red-600 bg-white hover:bg-red-50/50 transition-all cursor-pointer disabled:opacity-50", title: "Delete Product", children: isDeleting === prodId ? ((0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-3 w-3 animate-spin" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-3.5 w-3.5" })) })] })] })] }, prodId));
                }) })), totalPages > 1 && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center gap-3 pt-6 border-t border-[var(--lt-border)]", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", onClick: function () { return setCurrentPage(function (prev) { return Math.max(1, prev - 1); }); }, disabled: currentPage === 1, className: "border-[var(--lt-border)] hover:bg-[var(--lt-cream-dark)] rounded-xl font-bold font-display text-xs", children: "Previous" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-bold font-display text-[var(--lt-muted)]", children: ["Page ", currentPage, " of ", totalPages] }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", onClick: function () { return setCurrentPage(function (prev) { return Math.min(totalPages, prev + 1); }); }, disabled: currentPage === totalPages, className: "border-[var(--lt-border)] hover:bg-[var(--lt-cream-dark)] rounded-xl font-bold font-display text-xs", children: "Next" })] }))] }));
}
