"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var button_1 = require("../ui/button");
var card_1 = require("../ui/card");
var lucide_react_1 = require("lucide-react");
var react_redux_1 = require("react-redux");
var authSlice_1 = require("../../store/authSlice");
var CustomerDashboardLayout = function () {
    var location = (0, react_router_dom_1.useLocation)();
    var dispatch = (0, react_redux_1.useDispatch)();
    var navigationItems = [
        {
            name: 'Profile',
            href: '/customer/profile',
            icon: lucide_react_1.User,
            description: 'View and edit your profile'
        },
        {
            name: 'Orders',
            href: '/customer/orders',
            icon: lucide_react_1.Package,
            description: 'View your order history'
        },
        {
            name: 'Addresses',
            href: '/customer/addresses',
            icon: lucide_react_1.MapPin,
            description: 'Manage shipping addresses'
        },
        {
            name: 'Wishlist',
            href: '/customer/wishlist',
            icon: lucide_react_1.Heart,
            description: 'Your saved products'
        },
        {
            name: 'Cart',
            href: '/cart',
            icon: lucide_react_1.ShoppingCart,
            description: 'Shopping cart'
        }
    ];
    var handleLogout = function () {
        dispatch((0, authSlice_1.logout)());
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-gray-50", children: (0, jsx_runtime_1.jsx)("div", { className: "container mx-auto px-4 py-8", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-8", children: [(0, jsx_runtime_1.jsx)("div", { className: "lg:col-span-1", children: (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Settings, { className: "h-5 w-5" }), "Customer Dashboard"] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-2", children: [navigationItems.map(function (item) {
                                            var Icon = item.icon;
                                            var isActive = location.pathname === item.href;
                                            return ((0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: item.href, className: "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ".concat(isActive
                                                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                                    : 'hover:bg-gray-100 text-gray-700'), children: [(0, jsx_runtime_1.jsx)(Icon, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "font-medium", children: item.name }), (0, jsx_runtime_1.jsx)("div", { className: "text-xs text-gray-500", children: item.description })] })] }, item.name));
                                        }), (0, jsx_runtime_1.jsx)("div", { className: "pt-4 border-t", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: handleLogout, className: "w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, { className: "h-4 w-4" }), "Logout"] }) })] })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "lg:col-span-3", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}) })] }) }) }));
};
exports.default = CustomerDashboardLayout;
