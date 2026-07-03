"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorDashboardLayout = VendorDashboardLayout;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var authSlice_1 = require("../../store/authSlice");
var button_1 = require("../ui/button");
var lucide_react_1 = require("lucide-react");
var LocalThreadLogo_1 = require("../LocalThreadLogo");
var sonner_1 = require("sonner");
var navigationItems = [
    {
        name: 'Dashboard',
        href: '/vendor/dashboard',
        icon: lucide_react_1.LayoutDashboard,
    },
    {
        name: 'My Products',
        href: '/vendor/products',
        icon: lucide_react_1.Package,
    },
    {
        name: 'Orders',
        href: '/vendor/orders',
        icon: lucide_react_1.ShoppingCart,
    },
    {
        name: 'Messages',
        href: '/vendor/messages',
        icon: lucide_react_1.MessageSquare,
    },
    {
        name: 'Profile',
        href: '/vendor/profile',
        icon: lucide_react_1.Settings,
    },
];
function VendorDashboardLayout(_a) {
    var _b;
    var children = _a.children;
    var dispatch = (0, react_redux_1.useDispatch)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    var location = (0, react_router_dom_1.useLocation)();
    var user = (0, react_redux_1.useSelector)(function (state) { return state.auth; }).user;
    var _c = (0, react_1.useState)(false), sidebarOpen = _c[0], setSidebarOpen = _c[1];
    var handleLogout = function () {
        dispatch((0, authSlice_1.logout)());
        sonner_1.toast.success('Logged out successfully');
        navigate('/auth');
    };
    var isActiveRoute = function (href) {
        return location.pathname === href;
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-[var(--lt-cream)] font-body text-[var(--lt-charcoal)] flex flex-col lg:flex-row", children: [sidebarOpen && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-black/45 z-40 lg:hidden backdrop-blur-sm", onClick: function () { return setSidebarOpen(false); } })), (0, jsx_runtime_1.jsx)("div", { className: "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[var(--lt-border)] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen ".concat(sidebarOpen ? 'translate-x-0' : '-translate-x-full'), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col h-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between p-6 border-b border-[var(--lt-border)] bg-[var(--lt-cream)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Store, { className: "h-5 w-5 text-[var(--lt-amber)]" }), (0, jsx_runtime_1.jsx)("span", { className: "font-bold text-lg font-display tracking-tight text-[var(--lt-charcoal)]", children: "Vendor Portal" })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "icon", onClick: function () { return setSidebarOpen(false); }, className: "lg:hidden hover:bg-[var(--lt-cream-dark)]", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4" }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "p-6 border-b border-[var(--lt-border)]", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 bg-[var(--lt-amber-pale)] border border-[var(--lt-amber-light)] rounded-full flex items-center justify-center font-display shrink-0", children: (0, jsx_runtime_1.jsx)("span", { className: "text-[var(--lt-amber)] font-bold text-sm", children: ((_b = user === null || user === void 0 ? void 0 : user.name) === null || _b === void 0 ? void 0 : _b.charAt(0)) || 'V' }) }), (0, jsx_runtime_1.jsxs)("div", { className: "overflow-hidden", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-bold text-sm text-[var(--lt-charcoal)] truncate font-display", children: user === null || user === void 0 ? void 0 : user.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-[var(--lt-muted)] truncate", children: user === null || user === void 0 ? void 0 : user.email })] })] }) }), (0, jsx_runtime_1.jsx)("nav", { className: "flex-1 p-4 space-y-1 bg-white", children: navigationItems.map(function (item) {
                                var Icon = item.icon;
                                var active = isActiveRoute(item.href);
                                return ((0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: item.href, className: "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold font-display tracking-wide transition-all ".concat(active
                                        ? 'bg-[var(--lt-amber-pale)] text-[var(--lt-amber)] border-l-4 border-[var(--lt-amber)] shadow-lt-sm'
                                        : 'text-[var(--lt-muted)] hover:text-[var(--lt-charcoal)] hover:bg-[var(--lt-cream)]'), onClick: function () { return setSidebarOpen(false); }, children: [(0, jsx_runtime_1.jsx)(Icon, { className: "h-4.5 w-4.5 ".concat(active ? 'text-[var(--lt-amber)]' : 'text-[var(--lt-muted)]') }), item.name] }, item.name));
                            }) }), (0, jsx_runtime_1.jsx)("div", { className: "p-4 border-t border-[var(--lt-border)] bg-[var(--lt-cream)]", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", className: "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50/50 rounded-xl font-bold font-display", onClick: handleLogout, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, { className: "h-4 w-4 mr-3" }), "Logout"] }) })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 flex flex-col lg:h-screen lg:overflow-y-auto", children: [(0, jsx_runtime_1.jsx)("header", { className: "sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-[var(--lt-border)] px-6 py-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "icon", onClick: function () { return setSidebarOpen(true); }, className: "lg:hidden hover:bg-[var(--lt-cream)]", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Menu, { className: "h-5 w-5" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/vendor/dashboard", className: "transition-all hover:opacity-85", children: (0, jsx_runtime_1.jsx)(LocalThreadLogo_1.LocalThreadLogo, { size: "sm" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", size: "icon", className: "hover:bg-[var(--lt-cream)] rounded-xl relative", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bell, { className: "h-4 w-4 text-[var(--lt-charcoal)]" }), (0, jsx_runtime_1.jsx)("span", { className: "absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--lt-amber)] rounded-full" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "hidden sm:flex items-center gap-2 text-sm font-display font-semibold border-l border-[var(--lt-border)] pl-4", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-[var(--lt-muted)] font-normal", children: "Welcome," }), (0, jsx_runtime_1.jsx)("span", { className: "text-[var(--lt-charcoal)]", children: user === null || user === void 0 ? void 0 : user.name })] })] })] }) }), (0, jsx_runtime_1.jsx)("main", { className: "p-6 md:p-8 flex-1", children: children })] })] }));
}
