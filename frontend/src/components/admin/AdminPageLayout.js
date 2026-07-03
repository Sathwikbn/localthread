"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPageLayout = AdminPageLayout;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var button_1 = require("../ui/button");
var lucide_react_1 = require("lucide-react");
var AdminRoute_1 = require("../auth/AdminRoute");
function AdminPageLayout(_a) {
    var title = _a.title, description = _a.description, icon = _a.icon, children = _a.children;
    var navigate = (0, react_router_dom_1.useNavigate)();
    return ((0, jsx_runtime_1.jsx)(AdminRoute_1.AdminRoute, { children: (0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto px-4 py-8 space-y-6 max-w-5xl", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4 border-b border-slate-100 pb-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "icon", onClick: function () { return navigate('/admin/dashboard'); }, className: "hover:bg-slate-100 rounded-full", children: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, { className: "h-5 w-5 text-gray-600" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "p-2.5 bg-slate-50 border rounded-xl", children: icon }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-extrabold tracking-tight text-gray-900", children: title }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-500 text-sm mt-0.5", children: description })] })] })] }), children] }) }));
}
