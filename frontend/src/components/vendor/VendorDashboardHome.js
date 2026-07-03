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
exports.VendorDashboardHome = VendorDashboardHome;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var vendorAPI_1 = require("../../services/vendorAPI");
var productAPI_1 = require("../../services/productAPI");
var card_1 = require("../ui/card");
var alert_1 = require("../ui/alert");
var recharts_1 = require("recharts");
var lucide_react_1 = require("lucide-react");
var button_1 = require("../ui/button");
var react_router_dom_1 = require("react-router-dom");
function VendorDashboardHome() {
    var _this = this;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var user = (0, react_redux_1.useSelector)(function (state) { return state.auth; }).user;
    var _a = (0, react_1.useState)(null), stats = _a[0], setStats = _a[1];
    var _b = (0, react_1.useState)(0), productCount = _b[0], setProductCount = _b[1];
    var _c = (0, react_1.useState)([]), offlineMetrics = _c[0], setOfflineMetrics = _c[1];
    var _d = (0, react_1.useState)(true), isLoading = _d[0], setIsLoading = _d[1];
    var _e = (0, react_1.useState)(null), error = _e[0], setError = _e[1];
    var loadDashboardData = (0, react_1.useCallback)(function () { return __awaiter(_this, void 0, void 0, function () {
        var userId, statsResponse, productsResponse, analyticsResponse, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = (user === null || user === void 0 ? void 0 : user.id) || (user === null || user === void 0 ? void 0 : user._id);
                    if (!userId) {
                        setIsLoading(false);
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    setIsLoading(true);
                    setError(null);
                    return [4 /*yield*/, vendorAPI_1.vendorAPI.getStats(userId)];
                case 2:
                    statsResponse = _a.sent();
                    return [4 /*yield*/, productAPI_1.productAPI.getVendorProducts({ limit: 1 })];
                case 3:
                    productsResponse = _a.sent();
                    return [4 /*yield*/, vendorAPI_1.vendorAPI.getOfflineAnalytics(userId)];
                case 4:
                    analyticsResponse = _a.sent();
                    if (statsResponse.success && statsResponse.data) {
                        setStats(statsResponse.data);
                    }
                    if (productsResponse.success && productsResponse.data) {
                        setProductCount(productsResponse.data.pagination.totalProducts);
                    }
                    if (analyticsResponse.success && analyticsResponse.data) {
                        setOfflineMetrics(analyticsResponse.data);
                    }
                    return [3 /*break*/, 7];
                case 5:
                    error_1 = _a.sent();
                    console.error('VendorDashboardHome - Load data error:', error_1);
                    setError('Failed to load dashboard data. Please try refreshing the page.');
                    return [3 /*break*/, 7];
                case 6:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); }, [user]);
    (0, react_1.useEffect)(function () {
        var userId = (user === null || user === void 0 ? void 0 : user.id) || (user === null || user === void 0 ? void 0 : user._id);
        if (userId) {
            loadDashboardData();
        }
        else {
            setIsLoading(false);
        }
    }, [user, loadDashboardData]);
    var formatCurrency = function (amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };
    if (isLoading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center min-h-[400px]", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-8 w-8 animate-spin mx-auto mb-4 text-[var(--lt-amber)]" }), (0, jsx_runtime_1.jsx)("p", { className: "text-[var(--lt-muted)] font-medium font-body", children: "Loading your dashboard..." })] }) }));
    }
    if (!user) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "text-center py-8", children: (0, jsx_runtime_1.jsx)(alert_1.Alert, { className: "border-red-200 bg-red-50 text-red-700 rounded-xl", children: (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: "User information not available. Please log in again." }) }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-8 font-body text-[var(--lt-charcoal)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl md:text-4xl font-bold font-display text-[var(--lt-charcoal)] tracking-tight", children: "Dashboard" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-[var(--lt-muted)] mt-1", children: ["Welcome back, ", (0, jsx_runtime_1.jsx)("span", { className: "font-bold text-[var(--lt-charcoal)]", children: user.name }), "! Here's your boutique overview."] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { asChild: true, className: "bg-[var(--lt-charcoal)] hover:bg-[var(--lt-amber)] text-white font-bold font-display rounded-xl tracking-wider text-xs px-6 py-3 cursor-pointer transition-all duration-300", children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/vendor/products/add", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4 mr-2" }), " Add Product"] }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", onClick: function () { return loadDashboardData(); }, className: "border-[var(--lt-border)] hover:bg-[var(--lt-cream-dark)] font-bold font-display rounded-xl text-xs px-6 py-3 transition-all duration-300", children: "Refresh" })] })] }), error && ((0, jsx_runtime_1.jsx)(alert_1.Alert, { className: "border-red-200 bg-red-50 text-red-700 rounded-xl", children: (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: error }) })), (0, jsx_runtime_1.jsx)(card_1.Card, { className: "border-[var(--lt-border)] shadow-lt-sm rounded-2xl bg-white overflow-hidden", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6 md:p-8", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-[var(--lt-amber-pale)] border border-[var(--lt-amber-light)] rounded-xl p-5 md:p-6 flex flex-col md:flex-row md:items-start gap-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 rounded-xl bg-white border border-[var(--lt-amber-light)] flex items-center justify-center text-[var(--lt-amber)] shrink-0 shadow-lt-sm", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Store, { size: 20 }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 space-y-1", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-base font-bold font-display text-[var(--lt-charcoal)]", children: "Boutique Profile Completion" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-[var(--lt-muted)] leading-relaxed", children: ["Ensure your location, custom banners, and dispatch information are up to date. Vetted local profiles see up to ", (0, jsx_runtime_1.jsx)("span", { className: "text-[var(--lt-amber)] font-bold", children: "40% more" }), " storefront visits in their neighborhood."] }), (0, jsx_runtime_1.jsx)("div", { className: "pt-3", children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: "bg-[var(--lt-charcoal)] hover:bg-[var(--lt-amber)] text-white font-bold font-display rounded-xl text-xs px-5 py-2.5 transition-all duration-300 cursor-pointer", onClick: function () { return navigate('/vendor/shop-setup'); }, children: "Configure Boutique Details" }) })] })] }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { className: "border-[var(--lt-border)] shadow-lt-sm rounded-2xl bg-white hover:shadow-lt-md transition-all duration-300 relative overflow-hidden group", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 w-1 h-full bg-[var(--lt-amber)] group-hover:w-1.5 transition-all" }), (0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-xs font-bold uppercase tracking-wider text-[var(--lt-muted)] font-display", children: "Total Orders" }), (0, jsx_runtime_1.jsx)(lucide_react_1.Package, { className: "h-4 w-4 text-[var(--lt-muted)]" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "pt-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-3xl font-bold font-display text-[var(--lt-charcoal)]", children: (stats === null || stats === void 0 ? void 0 : stats.totalOrders) || 0 }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-[var(--lt-muted)] mt-1.5 flex items-center gap-1", children: "All time transactions" })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "border-[var(--lt-border)] shadow-lt-sm rounded-2xl bg-white hover:shadow-lt-md transition-all duration-300 relative overflow-hidden group", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 w-1 h-full bg-[var(--lt-amber)] group-hover:w-1.5 transition-all" }), (0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-xs font-bold uppercase tracking-wider text-[var(--lt-muted)] font-display", children: "Total Revenue" }), (0, jsx_runtime_1.jsx)(lucide_react_1.DollarSign, { className: "h-4 w-4 text-[var(--lt-muted)]" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "pt-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-3xl font-bold font-display text-[var(--lt-charcoal)]", children: formatCurrency((stats === null || stats === void 0 ? void 0 : stats.totalRevenue) || 0) }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-[var(--lt-muted)] mt-1.5", children: "All time earnings" })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "border-[var(--lt-border)] shadow-lt-sm rounded-2xl bg-white hover:shadow-lt-md transition-all duration-300 relative overflow-hidden group", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 w-1 h-full bg-[var(--lt-amber)] group-hover:w-1.5 transition-all" }), (0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-xs font-bold uppercase tracking-wider text-[var(--lt-muted)] font-display", children: "Total Products" }), (0, jsx_runtime_1.jsx)(lucide_react_1.ShoppingBag, { className: "h-4 w-4 text-[var(--lt-muted)]" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "pt-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-3xl font-bold font-display text-[var(--lt-charcoal)]", children: productCount || 0 }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-[var(--lt-muted)] mt-1.5", children: "Active listings" })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "border-[var(--lt-border)] shadow-lt-sm rounded-2xl bg-white hover:shadow-lt-md transition-all duration-300 relative overflow-hidden group", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 w-1 h-full bg-[var(--lt-amber)] group-hover:w-1.5 transition-all" }), (0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-xs font-bold uppercase tracking-wider text-[var(--lt-muted)] font-display", children: "Avg Order Value" }), (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, { className: "h-4 w-4 text-[var(--lt-muted)]" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "pt-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-3xl font-bold font-display text-[var(--lt-charcoal)]", children: stats && stats.totalOrders > 0
                                            ? formatCurrency(stats.totalRevenue / stats.totalOrders)
                                            : formatCurrency(0) }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-[var(--lt-muted)] mt-1.5", children: "Per order average" })] })] })] }), offlineMetrics && offlineMetrics.length > 0 && ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "border-[var(--lt-border)] shadow-lt-sm rounded-2xl bg-white overflow-hidden", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "border-b border-slate-50 pb-4", children: [(0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2 text-lg font-bold font-display text-[var(--lt-charcoal)]", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.BarChart3, { className: "h-5 w-5 text-[var(--lt-amber)]" }), "O2O \"Try & Buy\" Conversion Analytics"] }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { className: "text-xs text-[var(--lt-muted)]", children: "Digital Interest vs. In-Store Reserves vs. Actual Offline Purchases" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-6 space-y-8", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-80 w-full", children: (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: "100%", children: (0, jsx_runtime_1.jsxs)(recharts_1.BarChart, { data: offlineMetrics, margin: { top: 10, right: 30, left: 0, bottom: 0 }, children: [(0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, { strokeDasharray: "3 3", vertical: false }), (0, jsx_runtime_1.jsx)(recharts_1.XAxis, { dataKey: "productName", tick: { fontSize: 11 } }), (0, jsx_runtime_1.jsx)(recharts_1.YAxis, { tick: { fontSize: 11 } }), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}), (0, jsx_runtime_1.jsx)(recharts_1.Legend, { wrapperStyle: { fontSize: 12 } }), (0, jsx_runtime_1.jsx)(recharts_1.Bar, { dataKey: "viewCount", name: "Online Views (DIR)", fill: "#3B82F6", radius: [4, 4, 0, 0] }), (0, jsx_runtime_1.jsx)(recharts_1.Bar, { dataKey: "reservationsCount", name: "Try-in-Store Bookings (IRC)", fill: "#F59E0B", radius: [4, 4, 0, 0] }), (0, jsx_runtime_1.jsx)(recharts_1.Bar, { dataKey: "purchasesCount", name: "Completed Offline Sales (ASC)", fill: "#10B981", radius: [4, 4, 0, 0] })] }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "overflow-x-auto border border-slate-100 rounded-xl", children: (0, jsx_runtime_1.jsxs)("table", { className: "min-w-full divide-y divide-slate-100 text-sm", children: [(0, jsx_runtime_1.jsx)("thead", { className: "bg-slate-50 text-slate-500 font-semibold", children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-left", children: "Product" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-center", children: "Category" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-center", children: "Online Views" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-center", children: "In-Store Reservations" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-center", children: "Completed Purchases" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-center bg-blue-50/50 text-blue-700", children: "DIR (Views)" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-center bg-amber-50/50 text-amber-700", children: "IRC (View \u2794 Reserve)" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-center bg-emerald-50/50 text-emerald-700", children: "ASC (Reserve \u2794 Buy)" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { className: "divide-y divide-slate-100 text-slate-700", children: offlineMetrics.map(function (item) { return ((0, jsx_runtime_1.jsxs)("tr", { className: "hover:bg-slate-50/50", children: [(0, jsx_runtime_1.jsx)("td", { className: "px-4 py-3 font-semibold text-slate-900", children: item.productName }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-3 text-center text-xs text-[var(--lt-muted)] capitalize", children: item.category }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-3 text-center", children: item.viewCount }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-3 text-center", children: item.reservationsCount }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-3 text-center", children: item.purchasesCount }), (0, jsx_runtime_1.jsxs)("td", { className: "px-4 py-3 text-center font-bold bg-blue-50/20 text-blue-600", children: [item.viewCount, " Views"] }), (0, jsx_runtime_1.jsxs)("td", { className: "px-4 py-3 text-center font-bold bg-amber-50/20 text-amber-600", children: [item.irc.toFixed(1), "%"] }), (0, jsx_runtime_1.jsxs)("td", { className: "px-4 py-3 text-center font-bold bg-emerald-50/20 text-emerald-600", children: [item.asc.toFixed(1), "%"] })] }, item.productId)); }) })] }) })] })] })), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [(0, jsx_runtime_1.jsx)("div", { className: "lg:col-span-6 space-y-6", children: (stats === null || stats === void 0 ? void 0 : stats.monthlyStats) && stats.monthlyStats.length > 0 && ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "border-[var(--lt-border)] shadow-lt-sm rounded-2xl bg-white", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "border-b border-slate-50 pb-4", children: [(0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2 text-lg font-bold font-display text-[var(--lt-charcoal)]", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.BarChart3, { className: "h-5 w-5 text-[var(--lt-amber)]" }), "Monthly Performance"] }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { className: "text-xs text-[var(--lt-muted)]", children: "Your sales performance over the last 6 months" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsx)("div", { className: "space-y-5", children: stats.monthlyStats.map(function (month) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between border-b border-slate-50 last:border-0 pb-4 last:pb-0", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-9 w-9 rounded-lg bg-[var(--lt-cream)] flex items-center justify-center text-[var(--lt-charcoal)] border border-[var(--lt-border)]", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "font-bold text-sm font-display block", children: new Date(month.month + '-01').toLocaleDateString('en-US', {
                                                                        month: 'long',
                                                                        year: 'numeric'
                                                                    }) }), (0, jsx_runtime_1.jsxs)("span", { className: "text-[10px] uppercase font-bold text-[var(--lt-muted)] tracking-wider", children: [month.orders, " orders placed"] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "text-right", children: (0, jsx_runtime_1.jsx)("div", { className: "text-sm font-bold font-display text-[var(--lt-amber)]", children: formatCurrency(month.revenue) }) })] }, month.month)); }) }) })] })) }), (0, jsx_runtime_1.jsx)("div", { className: "lg:col-span-6 space-y-6", children: (stats === null || stats === void 0 ? void 0 : stats.topSellingProducts) && stats.topSellingProducts.length > 0 && ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "border-[var(--lt-border)] shadow-lt-sm rounded-2xl bg-white", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "border-b border-slate-50 pb-4", children: [(0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2 text-lg font-bold font-display text-[var(--lt-charcoal)]", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Star, { className: "h-5 w-5 text-[var(--lt-amber)]" }), "Best Sellers"] }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { className: "text-xs text-[var(--lt-muted)]", children: "Your top performing boutique apparel" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsx)("div", { className: "space-y-5", children: stats.topSellingProducts.map(function (item, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between border-b border-slate-50 last:border-0 pb-4 last:pb-0", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-8 h-8 rounded-full bg-[var(--lt-amber-pale)] text-[var(--lt-amber)] flex items-center justify-center text-xs font-bold font-display border border-[var(--lt-amber-light)] shrink-0", children: ["#", index + 1] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "font-bold text-sm font-display text-[var(--lt-charcoal)] truncate max-w-[200px]", children: item.product.name }), (0, jsx_runtime_1.jsxs)("div", { className: "text-xs text-[var(--lt-muted)]", children: [formatCurrency(item.product.price), " unit price"] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-right", children: [(0, jsx_runtime_1.jsxs)("div", { className: "font-bold text-sm font-display text-[var(--lt-charcoal)]", children: [item.quantity, " sold"] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-xs text-[var(--lt-muted)]", children: [formatCurrency(item.revenue), " total"] })] })] }, item.product._id)); }) }) })] })) })] }), (!stats || (stats.totalOrders === 0 && stats.totalProducts === 0)) && ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "border-[var(--lt-border)] shadow-lt-sm rounded-2xl bg-white", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "font-display font-bold", children: "Welcome to LocalThread!" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Start by listing products to receive local neighborhood traffic." })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-8 text-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShoppingBag, { className: "h-12 w-12 text-[var(--lt-muted)] mx-auto mb-4" }), (0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-bold font-display text-[var(--lt-charcoal)] mb-2", children: "No products found" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-[var(--lt-muted)] max-w-sm mx-auto mb-6", children: "Create your very first boutique listing to start tracking metrics, analytics, and sales." }), (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "bg-[var(--lt-charcoal)] hover:bg-[var(--lt-amber)] text-white font-bold font-display rounded-xl tracking-wider text-xs px-6 py-3 cursor-pointer", onClick: function () { return navigate('/vendor/products/add'); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4 mr-2" }), " Add Your First Product"] })] })] }))] }));
}
