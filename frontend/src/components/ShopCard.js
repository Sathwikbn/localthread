"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopCard = ShopCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
function getInitials(name) {
    return name
        .split(' ')
        .slice(0, 2)
        .map(function (w) { return w[0]; })
        .join('')
        .toUpperCase();
}
function ShopCard(_a) {
    var _b, _c, _d, _e;
    var shop = _a.shop, distanceKm = _a.distanceKm, _f = _a.className, className = _f === void 0 ? '' : _f;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var handleClick = function () {
        navigate("/shop/".concat(shop.id));
    };
    var rating = (_b = shop.ratingAverage) !== null && _b !== void 0 ? _b : 0;
    var ratingCount = (_c = shop.ratingCount) !== null && _c !== void 0 ? _c : 0;
    var categories = (_d = shop.categories) !== null && _d !== void 0 ? _d : [];
    return ((0, jsx_runtime_1.jsxs)("article", { onClick: handleClick, className: "group relative bg-card rounded-2xl overflow-hidden cursor-pointer card-lift shadow-lt-sm border border-[var(--lt-border)] ".concat(className), style: { fontFamily: 'var(--lt-font-body)' }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative w-full overflow-hidden bg-[var(--lt-cream-dark)]", style: { aspectRatio: '16/7' }, children: [shop.banner ? ((0, jsx_runtime_1.jsx)("img", { src: shop.banner, alt: "".concat(shop.name, " banner"), className: "w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" })) : ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-full flex items-center justify-center", style: {
                            background: 'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 50%, #FDBA74 100%)',
                        }, children: (0, jsx_runtime_1.jsx)("span", { className: "text-5xl font-bold opacity-20", style: { fontFamily: 'var(--lt-font-display)', color: 'var(--lt-amber)' }, children: getInitials(shop.name) }) })), shop.isVerified && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute top-3 right-3 flex items-center gap-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-bold text-emerald-600 shadow-sm", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.BadgeCheck, { size: 12 }), "Verified"] })), distanceKm !== undefined && ((0, jsx_runtime_1.jsxs)("div", { className: "distance-badge absolute bottom-3 left-3", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { size: 9 }), distanceKm < 1
                                ? "".concat(Math.round(distanceKm * 1000), " m away")
                                : "".concat(distanceKm.toFixed(1), " km away")] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "p-5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-3 mb-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-shrink-0 w-11 h-11 rounded-xl overflow-hidden border border-[var(--lt-border)] bg-[var(--lt-cream-dark)] flex items-center justify-center", style: { boxShadow: 'var(--lt-shadow-sm)' }, children: shop.logo ? ((0, jsx_runtime_1.jsx)("img", { src: shop.logo, alt: shop.name, className: "w-full h-full object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold", style: { color: 'var(--lt-amber)', fontFamily: 'var(--lt-font-display)' }, children: getInitials(shop.name) })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 min-w-0", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-bold text-base leading-tight truncate", style: { fontFamily: 'var(--lt-font-display)', color: 'var(--lt-charcoal)' }, children: shop.name }), (0, jsx_runtime_1.jsxs)("p", { className: "text-xs mt-0.5", style: { color: 'var(--lt-muted)' }, children: [shop.city, ", ", shop.state] })] }), rating > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1 flex-shrink-0", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Star, { size: 12, className: "fill-amber-400 text-amber-400" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold", style: { color: 'var(--lt-charcoal)' }, children: rating.toFixed(1) }), ratingCount > 0 && ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs", style: { color: 'var(--lt-muted)' }, children: ["(", ratingCount, ")"] }))] }))] }), shop.description && ((0, jsx_runtime_1.jsx)("p", { className: "text-xs leading-relaxed mb-3 line-clamp-2", style: { color: 'var(--lt-muted)' }, children: shop.description })), categories.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-1.5 mb-4", children: [categories.slice(0, 3).map(function (cat) { return ((0, jsx_runtime_1.jsx)("span", { className: "text-xs px-2.5 py-0.5 rounded-full font-semibold", style: {
                                    background: 'var(--lt-amber-pale)',
                                    color: 'var(--lt-amber)',
                                    border: '1px solid var(--lt-amber-light)',
                                }, children: cat }, cat)); }), categories.length > 3 && ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs px-2 py-0.5 rounded-full", style: { color: 'var(--lt-muted)', background: 'var(--lt-cream-dark)' }, children: ["+", categories.length - 3] }))] })), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between pt-3", style: { borderTop: '1px solid var(--lt-border)' }, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold", style: { color: 'var(--lt-muted)' }, children: shop.establishedYear ? "Est. ".concat(shop.establishedYear) : (_e = shop.businessType) !== null && _e !== void 0 ? _e : 'Boutique' }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1 text-xs font-bold transition-gap duration-200 group-hover:gap-2", style: { color: 'var(--lt-amber)' }, children: ["View Shop ", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { size: 12 })] })] })] })] }));
}
