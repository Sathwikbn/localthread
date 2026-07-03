"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var button_1 = require("../ui/button");
var card_1 = require("../ui/card");
var badge_1 = require("../ui/badge");
var select_1 = require("../ui/select");
var lucide_react_1 = require("lucide-react");
var customerAPI_1 = require("../../services/customerAPI");
var sonner_1 = require("sonner");
var date_fns_1 = require("date-fns");
var OrderTimeline_1 = require("../OrderTimeline");
var CustomerOrdersPage = function () {
    var _a = (0, react_1.useState)([]), orders = _a[0], setOrders = _a[1];
    var _b = (0, react_1.useState)({
        currentPage: 1,
        totalPages: 1,
        totalOrders: 0,
        hasNextPage: false,
        hasPrevPage: false
    }), pagination = _b[0], setPagination = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)('all'), statusFilter = _d[0], setStatusFilter = _d[1];
    var _e = (0, react_1.useState)(null), selectedOrder = _e[0], setSelectedOrder = _e[1];
    var loadOrders = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    return [4 /*yield*/, customerAPI_1.customerAPI.getOrders({
                            page: pagination.currentPage,
                            limit: 10,
                            status: statusFilter === 'all' ? undefined : statusFilter
                        })];
                case 1:
                    response = _a.sent();
                    if (response.success && response.data) {
                        setOrders(response.data.orders);
                        setPagination(response.data.pagination);
                    }
                    else {
                        sonner_1.toast.error('Failed to load orders');
                    }
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error loading orders:', error_1);
                    sonner_1.toast.error('Failed to load orders');
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [pagination.currentPage, statusFilter]);
    (0, react_1.useEffect)(function () {
        loadOrders();
    }, [loadOrders]);
    var handleCancelOrder = function (orderId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.confirm('Are you sure you want to cancel this order?')) {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, customerAPI_1.customerAPI.cancelOrder(orderId)];
                case 2:
                    response = _a.sent();
                    if (response.success) {
                        sonner_1.toast.success('Order cancelled successfully');
                        loadOrders(); // Reload orders
                    }
                    else {
                        sonner_1.toast.error(response.message || 'Failed to cancel order');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error cancelling order:', error_2);
                    sonner_1.toast.error('Failed to cancel order');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var getStatusColor = function (status) {
        var s = (status || '').toLowerCase();
        switch (s) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'confirmed':
                return 'bg-blue-100 text-blue-800';
            case 'processing':
                return 'bg-purple-100 text-purple-800';
            case 'shipped':
                return 'bg-indigo-100 text-indigo-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'reserved':
                return 'bg-amber-100 text-amber-800';
            case 'expired':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    var getStatusIcon = function (status) {
        var s = (status || '').toLowerCase();
        switch (s) {
            case 'pending':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Package, { className: "h-4 w-4" });
            case 'confirmed':
            case 'processing':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-4 w-4" });
            case 'shipped':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Truck, { className: "h-4 w-4" });
            case 'delivered':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Package, { className: "h-4 w-4" });
            case 'cancelled':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4" });
            case 'reserved':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-4 w-4" });
            case 'expired':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4" });
            default:
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Package, { className: "h-4 w-4" });
        }
    };
    var formatDate = function (dateString) {
        return (0, date_fns_1.format)(new Date(dateString), 'MMM dd, yyyy');
    };
    var formatPrice = function (price) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(price);
    };
    if (loading && orders.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center h-64", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-gray-600", children: "Loading orders..." })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-gray-900", children: "Order History" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "View and manage your orders" })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-4", children: (0, jsx_runtime_1.jsxs)(select_1.Select, { value: statusFilter, onValueChange: setStatusFilter, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "w-48", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Filter by status" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "all", children: "All Orders" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "pending", children: "Pending" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "confirmed", children: "Confirmed" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "processing", children: "Processing" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "shipped", children: "Shipped" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "delivered", children: "Delivered" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "cancelled", children: "Cancelled" })] })] }) })] }), orders.length === 0 ? ((0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-12 text-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Package, { className: "h-12 w-12 text-gray-400 mx-auto mb-4" }), (0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "No orders found" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: statusFilter !== 'all' ? "No orders with status \"".concat(statusFilter, "\"") : 'You haven\'t placed any orders yet.' })] }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: orders.map(function (order) { return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "hover:shadow-md transition-shadow", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsxs)("h3", { className: "text-lg font-semibold text-gray-900", children: ["Order #", order._id.slice(-8).toUpperCase()] }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: getStatusColor(order.status), children: (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", children: [getStatusIcon(order.status), order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase()] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-right", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: formatDate(order.createdAt) }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-gray-900", children: formatPrice(order.totalAmount) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-3 mb-4", children: order.items.map(function (item, index) {
                                                var _a, _b, _c, _d;
                                                var product = (item.product || item.productId);
                                                var productName = (product === null || product === void 0 ? void 0 : product.name) || 'Apparel';
                                                var productImage = ((_a = product === null || product === void 0 ? void 0 : product.images) === null || _a === void 0 ? void 0 : _a[0]) || (product === null || product === void 0 ? void 0 : product.thumbnail) || '/placeholder-product.jpg';
                                                var storeName = ((_b = product === null || product === void 0 ? void 0 : product.vendor) === null || _b === void 0 ? void 0 : _b.storeName) || ((_c = product === null || product === void 0 ? void 0 : product.vendorId) === null || _c === void 0 ? void 0 : _c.storeName) || ((_d = item.vendor) === null || _d === void 0 ? void 0 : _d.storeName) || 'Unknown Store';
                                                return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4 p-3 bg-gray-50 rounded-lg", children: [(0, jsx_runtime_1.jsx)("img", { src: productImage, alt: productName, className: "w-16 h-16 object-cover rounded-md" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-medium text-gray-900", children: productName }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: storeName }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-500", children: ["Qty: ", item.quantity, " \u00D7 ", formatPrice(item.price)] })] }), (0, jsx_runtime_1.jsx)("div", { className: "text-right", children: (0, jsx_runtime_1.jsx)("p", { className: "font-medium text-gray-900", children: formatPrice(item.price * item.quantity) }) })] }, index));
                                            }) }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: "h-4 w-4 text-gray-400" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: "Shipping Address" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-gray-600", children: [order.shippingAddress.street, ", ", order.shippingAddress.city] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CreditCard, { className: "h-4 w-4 text-gray-400" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: "Payment Method" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 capitalize", children: order.paymentMethod })] })] }), order.trackingNumber && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Truck, { className: "h-4 w-4 text-gray-400" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: "Tracking Number" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: order.trackingNumber })] })] }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2 ml-4", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", onClick: function () { return setSelectedOrder(order); }, className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4" }), "View Details"] }), (order.status.toLowerCase() === 'pending' || order.status.toLowerCase() === 'reserved') && ((0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", onClick: function () { return handleCancelOrder(order._id); }, className: "flex items-center gap-2 text-red-600 hover:text-red-700", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4" }), order.status.toLowerCase() === 'reserved' ? 'Cancel Reservation' : 'Cancel Order'] }))] })] }) }) }, order._id)); }) })), pagination.totalPages > 1 && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-600", children: ["Showing page ", pagination.currentPage, " of ", pagination.totalPages, "(", pagination.totalOrders, " total orders)"] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "sm", onClick: function () { return setPagination(function (prev) { return (__assign(__assign({}, prev), { currentPage: prev.currentPage - 1 })); }); }, disabled: !pagination.hasPrevPage, children: "Previous" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "sm", onClick: function () { return setPagination(function (prev) { return (__assign(__assign({}, prev), { currentPage: prev.currentPage + 1 })); }); }, disabled: !pagination.hasNextPage, children: "Next" })] })] })), selectedOrder && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto", children: (0, jsx_runtime_1.jsxs)("div", { className: "p-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-4", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold", children: "Order Details" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: function () { return setSelectedOrder(null); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: "Order ID" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: selectedOrder._id })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: "Order Date" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: formatDate(selectedOrder.createdAt) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: "Status" }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: getStatusColor(selectedOrder.status), children: selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1).toLowerCase() })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: "Total Amount" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 font-bold", children: formatPrice(selectedOrder.totalAmount) })] })] }), selectedOrder.notes && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: "Notes" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: selectedOrder.notes })] })), (0, jsx_runtime_1.jsx)(OrderTimeline_1.OrderTimeline, { orderId: selectedOrder.id || selectedOrder._id })] })] }) }) }))] }));
};
exports.default = CustomerOrdersPage;
