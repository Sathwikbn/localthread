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
exports.VendorOrdersPage = VendorOrdersPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("../ui/card");
var button_1 = require("../ui/button");
var select_1 = require("../ui/select");
var badge_1 = require("../ui/badge");
var lucide_react_1 = require("lucide-react");
var vendorAPI_1 = require("../../services/vendorAPI");
var sonner_1 = require("sonner");
function VendorOrdersPage() {
    var _this = this;
    var _a = (0, react_1.useState)([]), orders = _a[0], setOrders = _a[1];
    var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(''), searchTerm = _c[0], setSearchTerm = _c[1];
    var _d = (0, react_1.useState)(1), currentPage = _d[0], setCurrentPage = _d[1];
    var _e = (0, react_1.useState)(1), totalPages = _e[0], setTotalPages = _e[1];
    var _f = (0, react_1.useState)(''), verificationCode = _f[0], setVerificationCode = _f[1];
    var _g = (0, react_1.useState)(false), isVerifying = _g[0], setIsVerifying = _g[1];
    var loadOrders = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, mapped, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setIsLoading(true);
                    return [4 /*yield*/, vendorAPI_1.vendorAPI.getOrders({ page: currentPage, limit: 10 })];
                case 1:
                    response = _a.sent();
                    if (response.success && response.data) {
                        mapped = response.data.orders.map(function (o) {
                            var _a, _b, _c;
                            var customerName = 'Guest';
                            var productName = 'Multiple Items';
                            try {
                                var addr = JSON.parse(o.shippingAddressJson);
                                customerName = addr.name || ((_a = o.customer) === null || _a === void 0 ? void 0 : _a.name) || 'Customer';
                            }
                            catch (e) {
                                customerName = ((_b = o.customer) === null || _b === void 0 ? void 0 : _b.name) || 'Customer';
                            }
                            if (o.items && o.items.length > 0) {
                                try {
                                    var snap = JSON.parse(o.items[0].productSnapshot);
                                    productName = snap.name || 'Product';
                                    if (o.items.length > 1) {
                                        productName += " + ".concat(o.items.length - 1, " more");
                                    }
                                }
                                catch (e) {
                                    productName = ((_c = o.items[0].product) === null || _c === void 0 ? void 0 : _c.name) || 'Product';
                                }
                            }
                            return {
                                id: o.orderNumber || "ORD-".concat(o.id),
                                dbId: o.id.toString(),
                                customer: customerName,
                                product: productName,
                                amount: o.totalAmount,
                                status: o.status,
                                date: new Date(o.createdAt).toLocaleDateString('en-IN')
                            };
                        });
                        setOrders(mapped);
                        setTotalPages(response.data.pagination.totalPages);
                    }
                    return [3 /*break*/, 4];
                case 2:
                    err_1 = _a.sent();
                    console.error('Load orders error:', err_1);
                    return [3 /*break*/, 4];
                case 3:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        loadOrders();
    }, [currentPage]);
    var handleVerifyReservation = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!verificationCode.trim())
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setIsVerifying(true);
                    return [4 /*yield*/, vendorAPI_1.vendorAPI.verifyReservation(verificationCode.trim().toUpperCase())];
                case 2:
                    response = _a.sent();
                    if (response.success) {
                        sonner_1.toast.success('Reservation verified and offline sale logged successfully!');
                        setVerificationCode('');
                        loadOrders();
                    }
                    else {
                        sonner_1.toast.error(response.message || 'Failed to verify reservation code.');
                    }
                    return [3 /*break*/, 5];
                case 3:
                    err_2 = _a.sent();
                    console.error('Verify reservation error:', err_2);
                    sonner_1.toast.error(err_2.message || 'Verification failed.');
                    return [3 /*break*/, 5];
                case 4:
                    setIsVerifying(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleStatusChange = function (orderDbId, newStatus) { return __awaiter(_this, void 0, void 0, function () {
        var response, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, vendorAPI_1.vendorAPI.updateOrderStatus(orderDbId, newStatus.toUpperCase())];
                case 1:
                    response = _a.sent();
                    if (response.success) {
                        sonner_1.toast.success('Order status updated!');
                        loadOrders();
                    }
                    else {
                        sonner_1.toast.error(response.message || 'Failed to update order status');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    console.error('Update status error:', err_3);
                    sonner_1.toast.error(err_3.message || 'Failed to update order status');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var capitalizeWord = function (s) {
        if (!s)
            return 'Pending';
        return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    };
    var filteredOrders = orders.filter(function (order) {
        return order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase());
    });
    if (isLoading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center min-h-[400px]", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-8 w-8 animate-spin text-primary" }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-gray-900", children: "Orders & Reservations" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "Manage, verify, and track your boutique orders and customer reservations" })] }), (0, jsx_runtime_1.jsx)(card_1.Card, { className: "border-[var(--lt-border)] shadow-lt-sm rounded-2xl bg-white overflow-hidden", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-6", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-sm font-bold uppercase tracking-wider text-[var(--lt-muted)] font-display mb-3", children: "Verify Reservation Code" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row gap-3", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Enter 6-character Code (e.g. RES-XXXXXX)", value: verificationCode, onChange: function (e) { return setVerificationCode(e.target.value.toUpperCase()); }, className: "flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono" }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: handleVerifyReservation, disabled: isVerifying || !verificationCode, className: "bg-[var(--lt-charcoal)] hover:bg-[var(--lt-amber)] text-white font-bold h-10 px-6 rounded-lg transition-all duration-300 cursor-pointer", children: [isVerifying ? (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-4 w-4 animate-spin mr-2" }) : null, "Verify & Log Offline Sale"] })] })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col sm:flex-row gap-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative flex-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Search orders by customer name or order ID...", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); }, className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "bg-white rounded-lg shadow", children: (0, jsx_runtime_1.jsx)("div", { className: "overflow-x-auto", children: (0, jsx_runtime_1.jsxs)("table", { className: "min-w-full divide-y divide-gray-200", children: [(0, jsx_runtime_1.jsx)("thead", { className: "bg-gray-50", children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Order" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Customer" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Products" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Total" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Date" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { className: "bg-white divide-y divide-gray-200", children: filteredOrders.map(function (order) { return ((0, jsx_runtime_1.jsxs)("tr", { className: "hover:bg-gray-50", children: [(0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4 whitespace-nowrap", children: (0, jsx_runtime_1.jsx)("div", { className: "text-sm font-medium text-gray-900", children: order.id }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4 whitespace-nowrap", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm font-medium text-gray-900", children: order.customer }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-500", children: order.product })] }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-900", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Package, { className: "h-4 w-4 text-gray-400" }), (0, jsx_runtime_1.jsx)("span", { children: order.product })] }) }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4 whitespace-nowrap", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-sm font-medium text-gray-900", children: ["\u20B9", order.amount.toFixed(2)] }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4 whitespace-nowrap", children: (0, jsx_runtime_1.jsxs)(select_1.Select, { value: (order.status || '').toUpperCase(), onValueChange: function (value) { return handleStatusChange(order.dbId, value); }, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "w-36", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {}) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "PENDING", children: "Pending" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "PROCESSING", children: "Processing" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "SHIPPED", children: "Shipped" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "DELIVERED", children: "Delivered" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "CANCELLED", children: "Cancelled" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "RESERVED", children: "Reserved" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "EXPIRED", children: "Expired" })] })] }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: order.date }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium", children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4" }) }) })] }, order.id)); }) })] }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [(0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShoppingCart, { className: "h-8 w-8 text-blue-600" }), (0, jsx_runtime_1.jsxs)("div", { className: "ml-4", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-gray-600", children: "Total Orders" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-gray-900", children: orders.length })] })] }) }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "bg-yellow-100 text-yellow-800", children: "Reserved" }), (0, jsx_runtime_1.jsxs)("div", { className: "ml-4", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-gray-600", children: "Active Reserves" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-gray-900", children: orders.filter(function (o) { return o.status === 'RESERVED' || o.status === 'Reserved'; }).length })] })] }) }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "bg-blue-100 text-blue-800", children: "Shipped" }), (0, jsx_runtime_1.jsxs)("div", { className: "ml-4", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-gray-600", children: "Shipped" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-gray-900", children: orders.filter(function (o) { return o.status === 'SHIPPED' || o.status === 'Shipped'; }).length })] })] }) }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "bg-green-100 text-green-800", children: "Delivered" }), (0, jsx_runtime_1.jsxs)("div", { className: "ml-4", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-gray-600", children: "Delivered" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-gray-900", children: orders.filter(function (o) { return o.status === 'DELIVERED' || o.status === 'Delivered'; }).length })] })] }) }) })] })] }));
}
