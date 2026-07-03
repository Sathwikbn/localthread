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
exports.CheckoutPage = CheckoutPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var card_1 = require("./ui/card");
var lucide_react_1 = require("lucide-react");
var button_1 = require("./ui/button");
var input_1 = require("./ui/input");
var label_1 = require("./ui/label");
var select_1 = require("./ui/select");
var checkbox_1 = require("./ui/checkbox");
var cartSlice_1 = require("../store/cartSlice");
var products_1 = require("../data/products");
var sonner_1 = require("sonner");
var customerAPI_1 = require("../services/customerAPI");
var breadcrumb_1 = require("./ui/breadcrumb");
var api_1 = require("../services/api");
function CheckoutPage() {
    var _this = this;
    var dispatch = (0, react_redux_1.useDispatch)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    var cartItems = (0, react_redux_1.useSelector)(function (state) { return state.cart.items; });
    var totalItems = (0, react_redux_1.useSelector)(function (state) { return state.cart.totalItems; });
    var isAuthenticated = (0, react_redux_1.useSelector)(function (state) { return state.auth.isAuthenticated; });
    var _a = (0, react_1.useState)({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India',
        paymentMethod: 'card',
        saveInfo: false
    }), formData = _a[0], setFormData = _a[1];
    var _b = (0, react_1.useState)("Tomorrow (10:00 AM - 1:00 PM)"), pickupSlot = _b[0], setPickupSlot = _b[1];
    var _c = (0, react_1.useState)(''), couponInput = _c[0], setCouponInput = _c[1];
    var _d = (0, react_1.useState)(''), appliedCoupon = _d[0], setAppliedCoupon = _d[1];
    var _e = (0, react_1.useState)(0), couponDiscount = _e[0], setCouponDiscount = _e[1];

    var handleApplyCoupon = function (e) {
        e.preventDefault();
        if (!couponInput.trim()) return;
        (0, api_1.apiRequest)("/coupons/validate", {
            method: "POST",
            body: JSON.stringify({ code: couponInput.trim(), orderAmount: subtotal })
        }).then(function (res) {
            if (res.valid) {
                setAppliedCoupon(res.code);
                setCouponDiscount(Number(res.discount));
                sonner_1.toast.success(res.message);
            } else {
                sonner_1.toast.error(res.message || "Invalid coupon code");
            }
        }).catch(function (err) {
            sonner_1.toast.error("Failed to validate coupon");
        });
    };
    (0, react_1.useEffect)(function () {
        if (!isAuthenticated) {
            sonner_1.toast.error("Please login to proceed with checkout.");
            navigate('/auth?redirect=/checkout');
        }
    }, [isAuthenticated, navigate]);
    var detailedCartItems = cartItems.map(function (cartItem) {
        var product = products_1.featuredProducts.find(function (p) { return p.id === cartItem.productId; });
        return {
            id: cartItem.productId,
            name: cartItem.name || (product === null || product === void 0 ? void 0 : product.name) || 'Product',
            price: cartItem.price || (product === null || product === void 0 ? void 0 : product.price) || 0,
            image: cartItem.image || (product === null || product === void 0 ? void 0 : product.image) || '',
            quantity: cartItem.quantity,
            vendorId: (product === null || product === void 0 ? void 0 : product.vendorId) || '1',
            size: cartItem.size,
            color: cartItem.color,
        };
    });
    var subtotal = detailedCartItems.reduce(function (sum, item) { return sum + item.price * item.quantity; }, 0);
    var shippingFee = formData.paymentMethod === 'reserve' ? 0 : (subtotal > 0 ? 49 : 0);
    var discount = couponDiscount;
    var grandTotal = subtotal + shippingFee - discount;
    var handleInputChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value, type = _a.type, checked = _a.checked;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = type === 'checkbox' ? checked : value, _a)));
        });
    };
    var handleSelectChange = function (name, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    if (!isAuthenticated) {
                        sonner_1.toast.error("Please login to proceed with checkout.");
                        navigate('/auth');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, customerAPI_1.customerAPI.createOrder({
                            items: detailedCartItems.map(function (item) { return ({ productId: item.id, quantity: item.quantity }); }),
                            shippingAddress: formData.paymentMethod === 'reserve' ? {
                                street: 'In-Store Pickup at Indiranagar Boutique',
                                city: 'Bengaluru',
                                state: 'Karnataka',
                                zipCode: '560038',
                                country: 'India',
                            } : {
                                street: formData.address,
                                city: formData.city,
                                state: formData.state,
                                zipCode: formData.zipCode,
                                country: formData.country,
                            },
                            paymentMethod: formData.paymentMethod,
                            pickupTime: formData.paymentMethod === 'reserve' ? pickupSlot : undefined,
                            couponCode: appliedCoupon || undefined,
                        })];
                case 2:
                    response = _a.sent();
                    if (response.success && response.data) {
                        sonner_1.toast.success('Order placed successfully!');
                        dispatch((0, cartSlice_1.clearCart)());
                        localStorage.setItem('lastCreatedOrderId', (response.data.order._id || response.data.order.id).toString());
                        localStorage.setItem('lastCreatedOrderAmount', response.data.order.totalAmount.toString());
                        if (formData.paymentMethod === 'cod' || formData.paymentMethod === 'reserve') {
                            navigate('/confirmation');
                        }
                        else {
                            navigate('/payment');
                        }
                    }
                    else {
                        sonner_1.toast.error(response.message || 'Failed to place order.');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error('Checkout submit error:', err_1);
                    sonner_1.toast.error(err_1.message || 'Checkout failed.');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-background", children: (0, jsx_runtime_1.jsxs)("main", { className: "container mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [(0, jsx_runtime_1.jsx)(breadcrumb_1.Breadcrumb, { className: "mb-8", children: (0, jsx_runtime_1.jsxs)(breadcrumb_1.BreadcrumbList, { children: [(0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbItem, { children: (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbLink, { href: "/cart", children: "Cart" }) }), (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbSeparator, {}), (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbItem, { children: (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbPage, { children: "Checkout" }) }), (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbSeparator, {}), (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbItem, { children: (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbLink, { href: "/payment", children: "Payment" }) }), (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbSeparator, {}), (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbItem, { children: (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbLink, { href: "/confirmation", children: "Confirmation" }) })] }) }), (0, jsx_runtime_1.jsx)("h1", { className: "text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center", children: "Checkout" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12", children: [(0, jsx_runtime_1.jsxs)("div", { className: "lg:col-span-2 space-y-8", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-xl font-semibold", children: "Contact & Shipping Information" }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "firstName", children: "First Name" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "firstName", name: "firstName", value: formData.firstName, onChange: handleInputChange, required: true })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "lastName", children: "Last Name" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "lastName", name: "lastName", value: formData.lastName, onChange: handleInputChange, required: true })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "email", children: "Email" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "email", name: "email", type: "email", value: formData.email, onChange: handleInputChange, required: true })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "phone", children: "Phone" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "phone", name: "phone", value: formData.phone, onChange: handleInputChange, required: true })] })] }), formData.paymentMethod !== 'reserve' ? ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4 pt-4 border-t border-slate-100", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "address", children: "Address" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "address", name: "address", value: formData.address, onChange: handleInputChange, required: formData.paymentMethod !== 'reserve' })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "city", children: "City" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "city", name: "city", value: formData.city, onChange: handleInputChange, required: formData.paymentMethod !== 'reserve' })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "state", children: "State" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "state", name: "state", value: formData.state, onChange: handleInputChange, required: formData.paymentMethod !== 'reserve' })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "zipCode", children: "ZIP Code" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "zipCode", name: "zipCode", value: formData.zipCode, onChange: handleInputChange, required: formData.paymentMethod !== 'reserve' })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "country", children: "Country" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: formData.country, onValueChange: function (value) { return handleSelectChange('country', value); }, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {}) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "India", children: "India" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "United States", children: "United States" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "Canada", children: "Canada" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "United Kingdom", children: "United Kingdom" })] })] })] })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6 pt-4 border-t border-slate-100", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-[var(--lt-cream)] border border-[var(--lt-border)] p-4 rounded-xl space-y-2 text-sm", children: [(0, jsx_runtime_1.jsxs)("p", { className: "font-bold text-[var(--lt-charcoal)] flex items-center gap-2 font-display", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Store, { className: "h-4 w-4 text-[var(--lt-amber)]" }), "Indiranagar LocalThread Boutique Partner"] }), (0, jsx_runtime_1.jsx)("p", { className: "text-[var(--lt-muted)]", children: "123 Boutique Lane, Indiranagar, Bengaluru, Karnataka - 560038" }), (0, jsx_runtime_1.jsx)("p", { className: "text-[var(--lt-muted)] font-semibold", children: "Pickup Hours: 10:00 AM - 8:30 PM (Daily)" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "pickupSlot", className: "font-bold text-sm", children: "Select Pickup Day & Time slot" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: pickupSlot, onValueChange: setPickupSlot, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "w-full h-11 rounded-xl border-slate-200", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Choose a time slot" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "Tomorrow (10:00 AM - 1:00 PM)", children: "Tomorrow (10:00 AM - 1:00 PM)" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "Tomorrow (2:00 PM - 5:00 PM)", children: "Tomorrow (2:00 PM - 5:00 PM)" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "Tomorrow (6:00 PM - 8:00 PM)", children: "Tomorrow (6:00 PM - 8:00 PM)" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "Day after Tomorrow (10:00 AM - 1:00 PM)", children: "Day after Tomorrow (10:00 AM - 1:00 PM)" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "Day after Tomorrow (2:00 PM - 5:00 PM)", children: "Day after Tomorrow (2:00 PM - 5:00 PM)" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "Day after Tomorrow (6:00 PM - 8:00 PM)", children: "Day after Tomorrow (6:00 PM - 8:00 PM)" })] })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-[var(--lt-muted)] leading-relaxed mt-1", children: "Your items will be reserved at the boutique for up to 48 hours. Show your reservation code at the store to try on and purchase." })] })] }))] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-xl font-semibold", children: "Fulfillment & Payment Method" }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "space-y-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", id: "reserve", name: "paymentMethod", value: "reserve", checked: formData.paymentMethod === 'reserve', onChange: handleInputChange, className: "w-4 h-4 text-blue-600" }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "reserve", className: "font-semibold text-gray-900", children: "Reserve & Try in Store (Pay Offline)" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2 pt-2 border-t border-slate-100", children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", id: "card", name: "paymentMethod", value: "card", checked: formData.paymentMethod === 'card', onChange: handleInputChange, className: "w-4 h-4 text-blue-600" }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "card", children: "Credit/Debit Card (Ship to Address)" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", id: "upi", name: "paymentMethod", value: "upi", checked: formData.paymentMethod === 'upi', onChange: handleInputChange, className: "w-4 h-4 text-blue-600" }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "upi", children: "UPI (Ship to Address)" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", id: "cod", name: "paymentMethod", value: "cod", checked: formData.paymentMethod === 'cod', onChange: handleInputChange, className: "w-4 h-4 text-blue-600" }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "cod", children: "Cash on Delivery (Ship to Address)" })] })] }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-xl font-semibold", children: "Additional Options" }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, { id: "saveInfo", name: "saveInfo", checked: formData.saveInfo, onCheckedChange: function (checked) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { saveInfo: !!checked })); }); } }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "saveInfo", children: "Save billing/shipping details for future purchases" })] }) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "lg:col-span-1", children: (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "sticky top-8", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-xl font-semibold", children: "Order Summary" }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("div", { children: detailedCartItems.map(function (item, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: item.name }), (0, jsx_runtime_1.jsxs)("p", { className: "text-gray-500", children: ["Qty: ", item.quantity] })] }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u20B9", (item.price * item.quantity).toFixed(2)] })] }, "".concat(item.id, "-").concat(item.size, "-").concat(item.color, "-").concat(index))); }) }), 
                                (0, jsx_runtime_1.jsxs)("div", {
                                    className: "border-t border-b py-4 my-4 space-y-2",
                                    children: [
                                        (0, jsx_runtime_1.jsx)("p", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider", children: "Have a Coupon?" }),
                                        (0, jsx_runtime_1.jsxs)("div", {
                                            className: "flex gap-2",
                                            children: [
                                                (0, jsx_runtime_1.jsx)(input_1.Input, {
                                                    type: "text",
                                                    placeholder: "e.g. WELCOME10",
                                                    value: couponInput,
                                                    onChange: function (e) { return setCouponInput(e.target.value); },
                                                    className: "uppercase h-9 rounded-lg"
                                                }),
                                                (0, jsx_runtime_1.jsx)(button_1.Button, {
                                                    type: "button",
                                                    onClick: handleApplyCoupon,
                                                    size: "sm",
                                                    className: "bg-slate-900 text-white font-bold h-9 rounded-lg px-4",
                                                    children: "Apply"
                                                })
                                            ]
                                        }),
                                        appliedCoupon && (0, jsx_runtime_1.jsxs)("p", {
                                            className: "text-xs text-green-600 font-semibold flex items-center gap-1",
                                            children: [
                                                (0, jsx_runtime_1.jsx)(lucide_react_1.Check, { size: 12 }),
                                                "Coupon ",
                                                (0, jsx_runtime_1.jsx)("span", { className: "font-mono font-bold uppercase", children: appliedCoupon }),
                                                " applied!"
                                            ]
                                        })
                                    ]
                                }),
                                (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 pt-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm", children: [(0, jsx_runtime_1.jsxs)("span", { children: ["Subtotal (", totalItems, " items)"] }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u20B9", subtotal.toFixed(2)] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm", children: [(0, jsx_runtime_1.jsx)("span", { children: "Shipping" }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u20B9", shippingFee.toFixed(2)] })] }), discount > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm text-green-600", children: [(0, jsx_runtime_1.jsx)("span", { children: "Discount" }), (0, jsx_runtime_1.jsxs)("span", { children: ["-\u20B9", discount.toFixed(2)] })] })), (0, jsx_runtime_1.jsx)("div", { className: "border-t pt-2", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between font-semibold text-lg", children: [(0, jsx_runtime_1.jsx)("span", { children: "Total" }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u20B9", grandTotal.toFixed(2)] })] }) })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", className: "w-full", size: "lg", disabled: detailedCartItems.length === 0, children: formData.paymentMethod === 'reserve' ? 'Confirm In-Store Booking' : 'Place Order' })] })] }) })] })] }) }));
}
