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
exports.PaymentPage = PaymentPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var card_1 = require("./ui/card");
var button_1 = require("./ui/button");
var sonner_1 = require("sonner");
var lucide_react_1 = require("lucide-react");
var customerAPI_1 = require("../services/customerAPI");
var api_1 = require("../services/api");
var breadcrumb_1 = require("./ui/breadcrumb");
function PaymentPage() {
    var _this = this;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)(null), order = _a[0], setOrder = _a[1];
    var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(false), isProcessing = _c[0], setIsProcessing = _c[1];
    (0, react_1.useEffect)(function () {
        // Dynamically load Razorpay Checkout Script
        var script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        return function () {
            document.body.removeChild(script);
        };
    }, []);
    (0, react_1.useEffect)(function () {
        var orderId = localStorage.getItem('lastCreatedOrderId');
        if (!orderId) {
            sonner_1.toast.error('No pending order found. Please place an order first.');
            navigate('/cart');
            return;
        }
        var fetchOrder = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        setIsLoading(true);
                        return [4 /*yield*/, customerAPI_1.customerAPI.getOrder(orderId)];
                    case 1:
                        response = _a.sent();
                        if (response.success && response.data) {
                            setOrder(response.data.order);
                        }
                        else {
                            sonner_1.toast.error(response.message || 'Failed to load order details');
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        err_1 = _a.sent();
                        console.error('Error fetching order:', err_1);
                        sonner_1.toast.error('Failed to load order details');
                        return [3 /*break*/, 4];
                    case 3:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchOrder();
    }, [navigate]);
    var handlePay = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var res, _a, keyId, amount, currency, razorpayOrderId, options, rzp, err_2;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    e.preventDefault();
                    if (!order)
                        return [2 /*return*/];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    setIsProcessing(true);
                    return [4 /*yield*/, (0, api_1.apiRequest)('/payments/create-order', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ orderId: order.id }),
                        })];
                case 2:
                    res = _d.sent();
                    if (!res.success || !res.data) {
                        sonner_1.toast.error(res.message || 'Failed to initialize payment gateway.');
                        setIsProcessing(false);
                        return [2 /*return*/];
                    }
                    _a = res.data, keyId = _a.keyId, amount = _a.amount, currency = _a.currency, razorpayOrderId = _a.orderId;
                    options = {
                        key: keyId,
                        amount: amount,
                        currency: currency,
                        name: 'LocalThread Marketplace',
                        description: "Payment for Order #".concat(order.orderNumber),
                        order_id: razorpayOrderId,
                        handler: function (response) {
                            return __awaiter(this, void 0, void 0, function () {
                                var verifyRes, err_3;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, 3, 4]);
                                            setIsProcessing(true);
                                            sonner_1.toast.loading('Verifying transaction...', { id: 'payment-verifying' });
                                            return [4 /*yield*/, (0, api_1.apiRequest)('/payments/verify', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({
                                                        razorpay_order_id: response.razorpay_order_id,
                                                        razorpay_payment_id: response.razorpay_payment_id,
                                                        razorpay_signature: response.razorpay_signature,
                                                    }),
                                                })];
                                        case 1:
                                            verifyRes = _a.sent();
                                            sonner_1.toast.dismiss('payment-verifying');
                                            if (verifyRes.success) {
                                                sonner_1.toast.success('Payment verified and order confirmed!');
                                                navigate('/confirmation');
                                            }
                                            else {
                                                sonner_1.toast.error(verifyRes.message || 'Payment verification failed.');
                                            }
                                            return [3 /*break*/, 4];
                                        case 2:
                                            err_3 = _a.sent();
                                            sonner_1.toast.dismiss('payment-verifying');
                                            console.error('Verification error:', err_3);
                                            sonner_1.toast.error(err_3.message || 'Verification failed.');
                                            return [3 /*break*/, 4];
                                        case 3:
                                            setIsProcessing(false);
                                            return [7 /*endfinally*/];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            });
                        },
                        prefill: {
                            name: ((_b = order.customer) === null || _b === void 0 ? void 0 : _b.name) || '',
                            email: ((_c = order.customer) === null || _c === void 0 ? void 0 : _c.email) || '',
                        },
                        theme: {
                            color: '#4f46e5', // Indigo-600 premium brand accent
                        },
                        modal: {
                            ondismiss: function () {
                                setIsProcessing(false);
                                sonner_1.toast.warning('Payment cancelled.');
                            }
                        }
                    };
                    rzp = new window.Razorpay(options);
                    rzp.open();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _d.sent();
                    console.error('Payment error:', err_2);
                    sonner_1.toast.error(err_2.message || 'Failed to start payment processing.');
                    setIsProcessing(false);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    if (isLoading) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center min-h-[400px] space-y-4", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-10 w-10 animate-spin text-indigo-600" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-500 font-medium animate-pulse", children: "Loading secure checkout details..." })] }));
    }
    if (!order) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto px-4 py-8 text-center", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-red-500 font-semibold mb-4", children: "No order could be loaded." }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return navigate('/cart'); }, children: "Back to Cart" })] }));
    }
    var subtotal = order.items.reduce(function (sum, item) { return sum + (item.price * item.quantity); }, 0);
    var shippingFee = order.shippingFee || (subtotal > 0 ? 49 : 0);
    var discount = order.discountAmount || 0;
    var grandTotal = order.totalAmount;
    var parsedAddress = {};
    try {
        parsedAddress = JSON.parse(order.shippingAddressJson);
    }
    catch (e) {
        parsedAddress = {};
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-slate-50/50", children: (0, jsx_runtime_1.jsxs)("main", { className: "container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-5xl", children: [(0, jsx_runtime_1.jsx)(breadcrumb_1.Breadcrumb, { className: "mb-8", children: (0, jsx_runtime_1.jsxs)(breadcrumb_1.BreadcrumbList, { children: [(0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbItem, { children: (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbLink, { href: "/cart", children: "Cart" }) }), (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbSeparator, {}), (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbItem, { children: (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbLink, { href: "/checkout", children: "Checkout" }) }), (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbSeparator, {}), (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbItem, { children: (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbPage, { children: "Payment" }) }), (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbSeparator, {}), (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbItem, { children: (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbLink, { href: "/confirmation", children: "Confirmation" }) })] }) }), (0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-tight", children: "Secure Payment Portal" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [(0, jsx_runtime_1.jsx)("div", { className: "lg:col-span-2 space-y-6", children: (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "border-indigo-100 shadow-sm", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "bg-indigo-50/40 border-b border-indigo-50", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "p-2 bg-indigo-600 rounded-lg text-white", children: (0, jsx_runtime_1.jsx)(lucide_react_1.CreditCard, { className: "h-5 w-5" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg font-bold text-gray-900", children: "Razorpay Secure Checkout" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { className: "text-xs text-indigo-700 font-semibold mt-0.5", children: "Accepts Credit/Debit Cards, UPI, Netbanking, and Wallets" })] })] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "pt-6 space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "border border-slate-200 rounded-lg p-6 bg-slate-50/30 flex flex-col items-center text-center space-y-4", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, { className: "h-14 w-14 text-indigo-600" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "font-semibold text-gray-800 text-lg", children: "100% Encrypted Transactions" }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500 mt-1 max-w-sm", children: "Your credentials are safe with us. We partner with Razorpay to provide secure PCI-DSS compliant credit card processing." })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-slate-50 p-4 rounded-lg space-y-2 border border-slate-100", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-500", children: "Order Reference:" }), (0, jsx_runtime_1.jsxs)("span", { className: "font-mono font-semibold text-gray-900", children: ["#", order.orderNumber] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-500", children: "Shipping To:" }), (0, jsx_runtime_1.jsxs)("span", { className: "font-medium text-gray-900", children: [parsedAddress.street || 'Default Street', ", ", parsedAddress.city || 'City'] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-500", children: "Payment Status:" }), (0, jsx_runtime_1.jsx)("span", { className: "font-semibold text-yellow-600 uppercase tracking-wider text-xs", children: order.paymentStatus })] })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handlePay, disabled: isProcessing, className: "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 rounded-lg text-base shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2", children: isProcessing ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-5 w-5 animate-spin" }), "Processing gateway transaction..."] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Lock, { className: "h-4 w-4" }), "Pay Securely \u20B9", grandTotal.toFixed(2)] })) })] })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "lg:col-span-1", children: (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "sticky top-8 border-slate-200/80 shadow-sm", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "border-b pb-4", children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg font-bold text-gray-900", children: "Order Details" }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "pt-6 space-y-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "space-y-3 max-h-[220px] overflow-y-auto pr-1", children: order.items.map(function (item, index) {
                                                    var _a;
                                                    var name = ((_a = item.product) === null || _a === void 0 ? void 0 : _a.name) || 'Product';
                                                    try {
                                                        var snap = JSON.parse(item.productSnapshot);
                                                        if (snap.name)
                                                            name = snap.name;
                                                    }
                                                    catch (e) { }
                                                    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "max-w-[70%]", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-medium text-gray-800 truncate", children: name }), (0, jsx_runtime_1.jsxs)("p", { className: "text-gray-500 text-xs mt-0.5", children: ["Qty: ", item.quantity, " ", item.size ? "| Size: ".concat(item.size) : ''] })] }), (0, jsx_runtime_1.jsxs)("span", { className: "font-semibold text-gray-700", children: ["\u20B9", (item.price * item.quantity).toFixed(2)] })] }, "".concat(item.id, "-").concat(index)));
                                                }) }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 border-t pt-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm text-gray-600", children: [(0, jsx_runtime_1.jsx)("span", { children: "Subtotal" }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u20B9", subtotal.toFixed(2)] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm text-gray-600", children: [(0, jsx_runtime_1.jsx)("span", { children: "Shipping Fee" }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u20B9", shippingFee.toFixed(2)] })] }), discount > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm text-emerald-600", children: [(0, jsx_runtime_1.jsx)("span", { children: "Discount" }), (0, jsx_runtime_1.jsxs)("span", { children: ["-\u20B9", discount.toFixed(2)] })] })), (0, jsx_runtime_1.jsx)("div", { className: "border-t pt-3 mt-1", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between font-bold text-lg text-gray-900", children: [(0, jsx_runtime_1.jsx)("span", { children: "Total Amount" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-indigo-600", children: ["\u20B9", grandTotal.toFixed(2)] })] }) })] })] })] }) })] })] }) }));
}
