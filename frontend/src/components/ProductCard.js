"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCard = ProductCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var button_1 = require("./ui/button");
var badge_1 = require("./ui/badge");
var card_1 = require("./ui/card");
var ImageWithFallback_1 = require("./figma/ImageWithFallback");
var shops_1 = require("../data/shops");
var shopAPI_1 = require("../services/shopAPI");

var shopCache = {};
var pendingRequests = {};

function ProductCard(_a) {
    var id = _a.id, name = _a.name, price = _a.price, originalPrice = _a.originalPrice, image = _a.image, category = _a.category, _b = _a.isNew, isNew = _b === void 0 ? false : _b, _c = _a.isSale, isSale = _c === void 0 ? false : _c, _d = _a.colors, colors = _d === void 0 ? [] : _d, _e = _a.sizes, sizes = _e === void 0 ? [] : _e, rating = _a.rating, vendorId = _a.vendorId, shopId = _a.shopId, onAddToCart = _a.onAddToCart, onToggleWishlist = _a.onToggleWishlist, _f = _a.showShopBadge, showShopBadge = _f === void 0 ? true : _f, stock = _a.stock;
    var isOutOfStock = stock !== undefined && stock !== null && stock === 0;
    var isLowStock = stock !== undefined && stock !== null && stock > 0 && stock <= 5;
    var cleanVendorId = vendorId ? vendorId.toString().replace('vendor', '') : '';
    var targetVendorId = 'vendor' + cleanVendorId;
    
    var _g = (0, react_1.useState)(null), dbShop = _g[0], setDbShop = _g[1];
    (0, react_1.useEffect)(function () {
        var idToFetch = shopId || vendorId;
        if (!idToFetch) return;
        var cleanId = idToFetch.toString().replace('vendor', '');
        if (!cleanId || isNaN(Number(cleanId))) return;
        
        var numericId = Number(cleanId);
        if (shopCache[numericId]) {
            setDbShop(shopCache[numericId]);
            return;
        }

        if (pendingRequests[numericId]) {
            pendingRequests[numericId].then(function (resolved) {
                setDbShop(resolved);
            });
            return;
        }

        var promise = shopAPI_1.shopAPI.getShopById(numericId)
            .then(function (res) {
                var details = (res && res.data && res.data.shop) || (res && res.id ? res : null);
                if (details) {
                    shopCache[numericId] = details;
                }
                return details;
            })
            .catch(function () {
                return null;
            });

        pendingRequests[numericId] = promise;
        promise.then(function (resolved) {
            setDbShop(resolved);
            delete pendingRequests[numericId];
        });
    }, [vendorId, shopId]);

    var shop = shops_1.shops.find(function (s) { return s.id.toString() === vendorId || s.id.toString() === targetVendorId || s.id.toString() === cleanVendorId; }) || dbShop;
    return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "group relative overflow-hidden rounded-2xl shadow-lt-sm transition-all duration-300 hover:shadow-lt-md border border-[var(--lt-border)] bg-card flex flex-col h-full" + (isOutOfStock ? ' opacity-75' : ''), children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-0 flex flex-col flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative aspect-[3/4] overflow-hidden rounded-t-2xl bg-[var(--lt-cream-dark)]", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/product/".concat(id), children: (0, jsx_runtime_1.jsx)(ImageWithFallback_1.ImageWithFallback, { src: image, alt: name, className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" }) }), showShopBadge && shop && ((0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/shop/".concat(shop.id), onClick: function (e) { return e.stopPropagation(); }, className: "shop-badge absolute top-3 left-3 z-20", children: [(0, jsx_runtime_1.jsx)("div", { className: "shop-badge-dot" }), (0, jsx_runtime_1.jsx)("span", { children: shop.name })] })), (0, jsx_runtime_1.jsxs)("div", { className: "absolute left-3 flex flex-col gap-2 z-10 ".concat(showShopBadge && shop ? 'top-12' : 'top-3'), children: [isNew && (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "bg-[var(--lt-charcoal)] text-[var(--lt-cream)] font-semibold border-0 text-[10px] tracking-wide uppercase px-2 py-0.5 rounded", children: "New" }), isSale && (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "destructive", className: "bg-[var(--lt-amber)] text-white font-semibold border-0 text-[10px] tracking-wide uppercase px-2 py-0.5 rounded", children: "Sale" }), isOutOfStock && (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "bg-red-500 text-white font-semibold border-0 text-[10px] tracking-wide uppercase px-2 py-0.5 rounded", children: "Out of Stock" }), isLowStock && (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "bg-amber-500 text-white font-semibold border-0 text-[10px] tracking-wide uppercase px-2 py-0.5 rounded animate-pulse", children: "Only " + stock + " left!" })] }), (0, jsx_runtime_1.jsx)("div", { className: "absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20", children: (0, jsx_runtime_1.jsx)(button_1.Button, { size: "icon", variant: "secondary", className: "h-8 w-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-[var(--lt-border)] shadow-sm hover:bg-white dark:hover:bg-slate-700", onClick: function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onToggleWishlist === null || onToggleWishlist === void 0 ? void 0 : onToggleWishlist(id);
                                }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Heart, { className: "h-4 w-4 text-[var(--lt-charcoal)]" }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "w-full gap-2 bg-[var(--lt-charcoal)] hover:bg-black text-[var(--lt-cream)] rounded-xl py-5 text-xs font-bold", onClick: function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onAddToCart === null || onAddToCart === void 0 ? void 0 : onAddToCart(id);
                                }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShoppingBag, { className: "h-3.5 w-3.5" }), isOutOfStock ? "Out of Stock" : "Add to Cart"] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "p-4 flex-1 flex flex-col justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-[10px] text-[var(--lt-muted)] uppercase tracking-widest font-bold font-display", children: category }), (0, jsx_runtime_1.jsx)("h3", { className: "font-bold text-sm leading-snug font-body text-[var(--lt-charcoal)] line-clamp-2 hover:text-[var(--lt-amber)]", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/product/".concat(id), children: name }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-3 space-y-2", children: [sizes.length > 0 && ((0, jsx_runtime_1.jsxs)("p", { className: "text-[11px] text-[var(--lt-muted)] font-medium font-body", children: ["Sizes: ", (0, jsx_runtime_1.jsxs)("span", { className: "text-[var(--lt-charcoal)] font-semibold", children: [sizes.slice(0, 3).join(', '), sizes.length > 3 ? '...' : ''] })] })), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between pt-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-1.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: "font-bold text-base text-[var(--lt-charcoal)]", children: ["\u20B9", price] }), originalPrice && ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-[var(--lt-muted)] line-through", children: ["\u20B9", originalPrice] }))] }), rating !== undefined && rating > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Star, { className: "h-3 w-3 fill-amber-400 text-amber-400" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-[var(--lt-charcoal)]", children: rating.toFixed(1) })] }))] }), colors.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1 pt-1.5 border-t border-[var(--lt-border)]", children: [colors.slice(0, 4).map(function (color, index) { return ((0, jsx_runtime_1.jsx)("div", { className: "w-3 h-3 rounded-full border border-[var(--lt-border)] shadow-sm", style: { backgroundColor: color } }, index)); }), colors.length > 4 && ((0, jsx_runtime_1.jsx)("div", { className: "w-3 h-3 rounded-full border border-[var(--lt-border)] bg-[var(--lt-cream-dark)] flex items-center justify-center", children: (0, jsx_runtime_1.jsxs)("span", { className: "text-[8px] font-bold text-[var(--lt-muted)]", children: ["+", colors.length - 4] }) }))] }))] })] })] }) }));
}
