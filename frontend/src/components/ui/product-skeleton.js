"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSkeleton = ProductSkeleton;
exports.ProductGridSkeleton = ProductGridSkeleton;
var jsx_runtime_1 = require("react/jsx-runtime");
var skeleton_1 = require("./skeleton");
function ProductSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "group relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "aspect-square w-full overflow-hidden rounded-lg bg-gray-200", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-full w-full" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-4 space-y-2", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-3/4" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-5 w-1/3" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-20" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-8" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 mt-3", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-9 flex-1" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-9 w-9" })] })] })] }));
}
function ProductGridSkeleton(_a) {
    var _b = _a.count, count = _b === void 0 ? 8 : _b;
    return ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: Array.from({ length: count }).map(function (_, index) { return ((0, jsx_runtime_1.jsx)(ProductSkeleton, {}, index)); }) }));
}
