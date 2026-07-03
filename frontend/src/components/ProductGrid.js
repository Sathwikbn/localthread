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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductGrid = ProductGrid;
var jsx_runtime_1 = require("react/jsx-runtime");
var ProductCard_1 = require("./ProductCard");
function ProductGrid(_a) {
    var products = _a.products, onAddToCart = _a.onAddToCart, onToggleWishlist = _a.onToggleWishlist;
    return ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: products.map(function (product) { return ((0, jsx_runtime_1.jsx)(ProductCard_1.ProductCard, __assign({}, product, { onAddToCart: onAddToCart, onToggleWishlist: onToggleWishlist }), product.id)); }) }));
}
