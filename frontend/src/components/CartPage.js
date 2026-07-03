"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartPage = CartPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var button_1 = require("./ui/button");
var card_1 = require("./ui/card");
var ImageWithFallback_1 = require("./figma/ImageWithFallback");
var cartSlice_1 = require("../store/cartSlice");
var products_1 = require("../data/products");
var sonner_1 = require("sonner");
var breadcrumb_1 = require("./ui/breadcrumb");
function CartPage() {
    var dispatch = (0, react_redux_1.useDispatch)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    var cartItems = (0, react_redux_1.useSelector)(function (state) { return state.cart.items; });
    var totalItems = (0, react_redux_1.useSelector)(function (state) { return state.cart.totalItems; });
    var isAuthenticated = (0, react_redux_1.useSelector)(function (state) { return state.auth.isAuthenticated; });
    var getImageUrl = function (path) {
        if (!path) return '';
        if (path.startsWith('http://') || path.startsWith('https://')) return path;
        var apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        var serverRoot = apiBase.endsWith('/api') ? apiBase.slice(0, -4) : apiBase;
        var cleanPath = path.startsWith('/') ? path : '/' + path;
        return serverRoot + cleanPath;
    };
    (0, react_1.useEffect)(function () {
        if (isAuthenticated) {
            dispatch((0, cartSlice_1.fetchCart)());
        }
    }, [dispatch, isAuthenticated]);
    var detailedCartItems = cartItems.map(function (cartItem) {
        var product = products_1.featuredProducts.find(function (p) { return p.id === cartItem.productId; });
        return {
            id: cartItem.productId,
            name: cartItem.name || (product === null || product === void 0 ? void 0 : product.name) || 'Product',
            price: cartItem.price || (product === null || product === void 0 ? void 0 : product.price) || 0,
            image: getImageUrl(cartItem.image || (product === null || product === void 0 ? void 0 : product.image) || ''),
            originalPrice: product === null || product === void 0 ? void 0 : product.originalPrice,
            quantity: cartItem.quantity,
            size: cartItem.size,
            color: cartItem.color,
            backendItemId: cartItem.id,
        };
    });
    var subtotal = detailedCartItems.reduce(function (sum, item) { return sum + item.price * item.quantity; }, 0);
    var shippingFee = subtotal > 0 ? 49 : 0;
    var discount = 0; // Placeholder for discount logic
    var grandTotal = subtotal + shippingFee - discount;
    var handleRemoveFromCart = function (productId, size, color, backendItemId) {
        if (isAuthenticated && backendItemId) {
            dispatch((0, cartSlice_1.removeFromCartAsync)(backendItemId));
            sonner_1.toast.info("Item removed from cart.");
        }
        else {
            dispatch((0, cartSlice_1.removeFromCart)({ productId: productId, size: size, color: color }));
            sonner_1.toast.info("Item removed from cart.");
        }
    };
    var handleUpdateQuantity = function (productId, newQuantity, size, color, backendItemId) {
        if (newQuantity < 1) {
            handleRemoveFromCart(productId, size, color, backendItemId);
        }
        else {
            if (isAuthenticated && backendItemId) {
                dispatch((0, cartSlice_1.updateCartItemAsync)({ itemId: backendItemId, quantity: newQuantity }));
            }
            else {
                dispatch((0, cartSlice_1.updateCartItemQuantity)({ productId: productId, quantity: newQuantity, size: size, color: color }));
            }
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-background", children: (0, jsx_runtime_1.jsxs)("main", { className: "container mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [(0, jsx_runtime_1.jsx)(breadcrumb_1.Breadcrumb, { className: "mb-8", children: (0, jsx_runtime_1.jsxs)(breadcrumb_1.BreadcrumbList, { children: [(0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbItem, { children: (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbPage, { children: "Cart" }) }), (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbSeparator, {}), (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbItem, { children: (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbLink, { href: "/checkout", children: "Checkout" }) }), (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbSeparator, {}), (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbItem, { children: (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbLink, { href: "/payment", children: "Payment" }) }), (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbSeparator, {}), (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbItem, { children: (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbLink, { href: "/confirmation", children: "Confirmation" }) })] }) }), (0, jsx_runtime_1.jsx)("h1", { className: "text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center", children: "Your Shopping Cart" }), detailedCartItems.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "text-center py-20", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShoppingBag, { className: "mx-auto h-24 w-24 text-gray-400 mb-6" }), (0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-semibold text-gray-700 mb-2", children: "Your cart is empty." }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-500 mb-6", children: "Looks like you haven't added anything to your cart yet." }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return window.history.back(); }, size: "lg", children: "Continue Shopping" })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12", children: [(0, jsx_runtime_1.jsx)("div", { className: "lg:col-span-2 space-y-4", children: detailedCartItems.map(function (item, index) { return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "flex items-center p-4 transition-shadow hover:shadow-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden mr-4", children: (0, jsx_runtime_1.jsx)(ImageWithFallback_1.ImageWithFallback, { src: item.image, alt: item.name, className: "w-full h-full object-cover" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "md:col-span-2", children: [(0, jsx_runtime_1.jsx)("h2", { className: "font-semibold text-lg text-gray-800", children: item.name }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-500", children: ["Size: ", item.size || 'One Size'] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-500", children: ["Color: ", item.color || 'Default'] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "icon", onClick: function () { return handleUpdateQuantity(item.id, item.quantity - 1, item.size, item.color, item.backendItemId); }, className: "h-8 w-8", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Minus, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsx)("span", { className: "w-12 text-center font-medium", children: item.quantity }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "icon", onClick: function () { return handleUpdateQuantity(item.id, item.quantity + 1, item.size, item.color, item.backendItemId); }, className: "h-8 w-8", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-right", children: [(0, jsx_runtime_1.jsxs)("p", { className: "font-semibold text-lg text-gray-900", children: ["\u20B9", (item.price * item.quantity).toFixed(2)] }), item.originalPrice && ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-500 line-through", children: ["\u20B9", (item.originalPrice * item.quantity).toFixed(2)] }))] }), (0, jsx_runtime_1.jsx)("div", { className: "text-right", children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "icon", onClick: function () { return handleRemoveFromCart(item.id, item.size, item.color, item.backendItemId); }, className: "text-red-500 hover:text-red-700 hover:bg-red-50", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-5 w-5" }) }) })] })] }, "".concat(item.id, "-").concat(item.size, "-").concat(item.color, "-").concat(index))); }) }), (0, jsx_runtime_1.jsx)("div", { className: "lg:col-span-1", children: (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "sticky top-8", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-xl font-semibold", children: "Order Summary" }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm", children: [(0, jsx_runtime_1.jsxs)("span", { children: ["Subtotal (", totalItems, " items)"] }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u20B9", subtotal.toFixed(2)] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm", children: [(0, jsx_runtime_1.jsx)("span", { children: "Shipping" }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u20B9", shippingFee.toFixed(2)] })] }), discount > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm text-green-600", children: [(0, jsx_runtime_1.jsx)("span", { children: "Discount" }), (0, jsx_runtime_1.jsxs)("span", { children: ["-\u20B9", discount.toFixed(2)] })] })), (0, jsx_runtime_1.jsx)("div", { className: "border-t pt-2", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between font-semibold text-lg", children: [(0, jsx_runtime_1.jsx)("span", { children: "Total" }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u20B9", grandTotal.toFixed(2)] })] }) })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return navigate('/checkout'); }, className: "w-full", size: "lg", disabled: detailedCartItems.length === 0, children: ["Proceed to Checkout", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { className: "ml-2 h-4 w-4" })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", onClick: function () { return navigate('/products'); }, className: "w-full", children: "Continue Shopping" })] })] }) })] }))] }) }));
}
