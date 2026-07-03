"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupPage = SignupPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var SignupForm_1 = require("./SignupForm");
var Header_1 = require("./Header");
var Footer_1 = require("./Footer");
function SignupPage() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-background", children: [(0, jsx_runtime_1.jsx)(Header_1.Header, {}), (0, jsx_runtime_1.jsx)("main", { className: "container mx-auto px-4 py-8", children: (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center min-h-[60vh]", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full max-w-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center mb-8", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Create Account" }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground", children: "Join us and start your fashion journey today" })] }), (0, jsx_runtime_1.jsx)(SignupForm_1.SignupForm, {}), (0, jsx_runtime_1.jsx)("div", { className: "text-center mt-6", children: (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-muted-foreground", children: ["Already have an account?", ' ', (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/login", className: "text-primary hover:underline font-medium", children: "Sign in here" })] }) })] }) }) }), (0, jsx_runtime_1.jsx)(Footer_1.Footer, {})] }));
}
