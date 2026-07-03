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
exports.AdminDashboard = AdminDashboard;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var AdminRoute_1 = require("../auth/AdminRoute");
var card_1 = require("../ui/card");
var button_1 = require("../ui/button");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var adminAPI_1 = require("../../services/adminAPI");
var sonner_1 = require("sonner");
function AdminDashboard() {
    var _this = this;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)(null), stats = _a[0], setStats = _a[1];
    var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
    (0, react_1.useEffect)(function () {
        var fetchStats = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        setIsLoading(true);
                        return [4 /*yield*/, adminAPI_1.adminAPI.getStats()];
                    case 1:
                        response = _a.sent();
                        if (response.success && response.data) {
                            setStats(response.data);
                        }
                        else {
                            sonner_1.toast.error(response.message || 'Failed to load platform statistics');
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        err_1 = _a.sent();
                        console.error('Error fetching admin stats:', err_1);
                        sonner_1.toast.error('Failed to load platform statistics');
                        return [3 /*break*/, 4];
                    case 3:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchStats();
    }, []);
    if (isLoading) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center min-h-[400px] space-y-4", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-8 w-8 animate-spin text-indigo-600" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-gray-500 animate-pulse", children: "Retrieving platform stats..." })] }));
    }
    return ((0, jsx_runtime_1.jsx)(AdminRoute_1.AdminRoute, { children: (0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto px-4 py-8 space-y-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-2", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-extrabold text-gray-900 tracking-tight", children: "Admin Dashboard" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500 mt-1", children: "Platform management, moderation queues, and environment controls" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { className: "border-indigo-100 shadow-sm hover:shadow-md transition-shadow", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "pb-2", children: [(0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2 text-base font-bold text-gray-800", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-5 w-5 text-indigo-600" }), "User Profiles"] }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { className: "text-xs", children: "Customers and administrator accounts" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-3xl font-black text-gray-900", children: (stats === null || stats === void 0 ? void 0 : stats.totalUsers) || 0 }), (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-gray-500 mt-1", children: [(stats === null || stats === void 0 ? void 0 : stats.totalCustomers) || 0, " Customers | ", (stats === null || stats === void 0 ? void 0 : stats.totalUsers) ? (stats.totalUsers - stats.totalCustomers - stats.totalVendors) : 0, " Admins"] }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", className: "mt-4 w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50", onClick: function () { return navigate('/admin/users'); }, children: "Manage Users" })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "border-green-100 shadow-sm hover:shadow-md transition-shadow", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "pb-2", children: [(0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2 text-base font-bold text-gray-800", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Package, { className: "h-5 w-5 text-green-600" }), "Product Directory"] }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { className: "text-xs", children: "Approved and pending listings" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-3xl font-black text-gray-900", children: (stats === null || stats === void 0 ? void 0 : stats.totalProducts) || 0 }), (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-green-700 font-semibold mt-1 flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CheckSquare, { className: "h-3 w-3" }), (stats === null || stats === void 0 ? void 0 : stats.pendingApprovals) || 0, " pending review"] }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", className: "mt-4 w-full border-green-200 text-green-700 hover:bg-green-50", onClick: function () { return navigate('/admin/products'); }, children: "View Moderation" })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "border-amber-100 shadow-sm hover:shadow-md transition-shadow", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "pb-2", children: [(0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2 text-base font-bold text-gray-800", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.DollarSign, { className: "h-5 w-5 text-amber-600" }), "Marketplace Revenue"] }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { className: "text-xs", children: "Cumulative verified checkout sales" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-3xl font-black text-gray-900", children: ["\u20B9", ((stats === null || stats === void 0 ? void 0 : stats.totalRevenue) || 0).toFixed(2)] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-gray-500 mt-1", children: [(stats === null || stats === void 0 ? void 0 : stats.totalOrders) || 0, " completed orders"] }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", className: "mt-4 w-full border-amber-200 text-amber-700 hover:bg-amber-50", onClick: function () { return navigate('/admin/revenue'); }, children: "View Revenue Ledger" })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "border-slate-200 shadow-sm hover:shadow-md transition-shadow", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "pb-2", children: [(0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2 text-base font-bold text-gray-800", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-5 w-5 text-purple-600" }), "Active Stores"] }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { className: "text-xs", children: "Onboarded vendor shops" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-3xl font-black text-gray-900", children: (stats === null || stats === void 0 ? void 0 : stats.totalShops) || 0 }), (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-purple-700 font-semibold mt-1", children: [(stats === null || stats === void 0 ? void 0 : stats.totalVendors) || 0, " registered vendor accounts"] }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", className: "mt-4 w-full border-slate-200 text-slate-700 hover:bg-slate-50", onClick: function () { return navigate('/admin/vendors'); }, children: "Manage Vendors" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { className: "lg:col-span-2 shadow-sm border-slate-200", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg font-bold text-gray-900", children: "Moderate Pending Reviews" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Content guidelines checks for recent customer ratings" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (stats === null || stats === void 0 ? void 0 : stats.pendingReviews) && stats.pendingReviews > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "p-4 border border-yellow-100 rounded-lg bg-yellow-50/30 flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Star, { className: "h-5 w-5 text-amber-500 fill-amber-500 animate-spin" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("p", { className: "font-semibold text-gray-800", children: [stats.pendingReviews, " reviews awaiting approval"] }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500", children: "Unmoderated comments will not display on product profiles" })] })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: "sm", className: "bg-amber-600 hover:bg-amber-700 text-white", onClick: function () { return navigate('/admin/reports'); }, children: "Moderate Now" })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "p-8 border border-dashed rounded-lg text-center text-gray-500", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Star, { className: "h-8 w-8 mx-auto text-gray-300 mb-2" }), (0, jsx_runtime_1.jsx)("p", { className: "font-medium text-gray-700", children: "All customer reviews are moderated" }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500 mt-0.5", children: "Nice job! There are no items in the review approval queue" })] })) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "shadow-sm border-slate-200", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "border-b pb-4", children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg font-bold text-gray-900", children: "Quick Configuration Actions" }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "pt-6 space-y-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { className: "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold", onClick: function () { return navigate('/admin/users/add'); }, children: "Add New User Manually" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", className: "w-full border-slate-200 text-gray-700", onClick: function () { return navigate('/admin/settings'); }, children: "Platform System Settings" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", className: "w-full border-slate-200 text-gray-700", onClick: function () { return navigate('/admin/security'); }, children: "Security Logs & Firewall" }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", className: "w-full border-slate-200 text-gray-700 flex items-center justify-center gap-2", onClick: function () { return navigate('/admin/backups'); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Shield, { className: "h-4 w-4 text-emerald-600" }), "Data Backup Utility"] })] })] })] })] }) }));
}
