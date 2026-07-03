"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = AdminRoute;
var jsx_runtime_1 = require("react/jsx-runtime");
var ProtectedRoute_1 = require("./ProtectedRoute");
function AdminRoute(_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsx)(ProtectedRoute_1.ProtectedRoute, { allowedRoles: ['admin'], redirectTo: "/auth", children: children }));
}
