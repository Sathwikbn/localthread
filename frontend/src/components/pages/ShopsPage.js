"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopsPage = ShopsPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var shopAPI_1 = require("../../services/shopAPI");
var ShopCard_1 = require("../ShopCard");
var shops_1 = require("../../data/shops");
var BoutiqueMap_1 = require("../BoutiqueMap");
/* ── Haversine distance (km) ── */
function haversineKm(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = ((lat2 - lat1) * Math.PI) / 180;
    var dLon = ((lon2 - lon1) * Math.PI) / 180;
    var a = Math.pow(Math.sin(dLat / 2), 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.pow(Math.sin(dLon / 2), 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
var SORT_OPTIONS = [
    { value: 'distance', label: 'Nearest First' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'name', label: 'A – Z' },
];
var CATEGORY_OPTIONS = [
    'All', 'Men', 'Women', 'Kids', 'Ethnic Wear', 'Casual', 'Formals', 'Western', 'Accessories',
];
var MOCK_SHOPS = [
    {
        id: 1, name: "Ritu's Boutique", description: 'Hand-crafted ethnic wear and designer salwar suits from the heart of the city.',
        street: '12 Gandhi Nagar', city: 'Bengaluru', state: 'Karnataka', zipCode: '560001',
        latitude: 12.9716, longitude: 77.5946, phone: '9876543210', email: 'ritu@example.com',
        ratingAverage: 4.6, ratingCount: 128, categories: ['Women', 'Ethnic Wear', 'Salwar Suits'],
        isVerified: true, establishedYear: 2015, isActive: true,
    },
    {
        id: 2, name: 'Threads & Co.', description: 'Trendy western wear and denim for men and women at affordable prices.',
        street: '5 MG Road', city: 'Bengaluru', state: 'Karnataka', zipCode: '560008',
        latitude: 12.9756, longitude: 77.6098, phone: '9876543211', email: 'threads@example.com',
        ratingAverage: 4.2, ratingCount: 76, categories: ['Men', 'Women', 'Western', 'Casual'],
        isVerified: true, establishedYear: 2018, isActive: true,
    },
    {
        id: 3, name: 'Kiddo Klothes', description: 'Colourful and comfortable clothing for children aged 0–12 years.',
        street: '88 Jayanagar', city: 'Bengaluru', state: 'Karnataka', zipCode: '560011',
        latitude: 12.9259, longitude: 77.5852, phone: '9876543212', email: 'kiddo@example.com',
        ratingAverage: 4.8, ratingCount: 200, categories: ['Kids', 'Casual'],
        isVerified: false, establishedYear: 2020, isActive: true,
    },
    {
        id: 4, name: 'The Formal Studio', description: 'Premium office wear, blazers, trousers, and formal shirts for professionals.',
        street: '3 Residency Road', city: 'Bengaluru', state: 'Karnataka', zipCode: '560025',
        latitude: 12.9700, longitude: 77.6013, phone: '9876543213', email: 'formal@example.com',
        ratingAverage: 4.4, ratingCount: 55, categories: ['Men', 'Formals'],
        isVerified: true, establishedYear: 2012, isActive: true,
    },
    {
        id: 5, name: 'Sari Palace', description: 'Silk, cotton and georgette sarees from all over India.',
        street: '7 Commercial Street', city: 'Bengaluru', state: 'Karnataka', zipCode: '560001',
        latitude: 12.9784, longitude: 77.6109, phone: '9876543214', email: 'sari@example.com',
        ratingAverage: 4.9, ratingCount: 312, categories: ['Women', 'Ethnic Wear', 'Sarees'],
        isVerified: true, establishedYear: 2005, isActive: true,
    },
    {
        id: 6, name: 'Urban Drip', description: 'Streetwear, sneakers, and accessories for the youth crowd.',
        street: '22 Koramangala', city: 'Bengaluru', state: 'Karnataka', zipCode: '560034',
        latitude: 12.9352, longitude: 77.6245, phone: '9876543215', email: 'urban@example.com',
        ratingAverage: 4.1, ratingCount: 88, categories: ['Men', 'Women', 'Casual', 'Accessories'],
        isVerified: false, establishedYear: 2021, isActive: true,
    },
];
/* ────────────────────────────────────────────────────── */
function ShopsPage() {
    var _this = this;
    var _a = (0, react_1.useState)([]), shops = _a[0], setShops = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(null), userLat = _c[0], setUserLat = _c[1];
    var _d = (0, react_1.useState)(null), userLon = _d[0], setUserLon = _d[1];
    var _e = (0, react_1.useState)(false), locationError = _e[0], setLocationError = _e[1];
    var _f = (0, react_1.useState)(''), search = _f[0], setSearch = _f[1];
    var _g = (0, react_1.useState)('distance'), sortBy = _g[0], setSortBy = _g[1];
    var _h = (0, react_1.useState)('All'), selectedCategory = _h[0], setSelectedCategory = _h[1];
    var _j = (0, react_1.useState)(0), minRating = _j[0], setMinRating = _j[1];
    var _k = (0, react_1.useState)(false), showFilters = _k[0], setShowFilters = _k[1];
    var _l = (0, react_1.useState)('grid'), viewMode = _l[0], setViewMode = _l[1];
    /* Get user location */
    (0, react_1.useEffect)(function () {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                setUserLat(pos.coords.latitude);
                setUserLon(pos.coords.longitude);
            }, function () {
                setLocationError(true);
                /* Fallback: Bengaluru city center */
                setUserLat(12.9716);
                setUserLon(77.5946);
            }, { timeout: 5000 });
        }
        else {
            setUserLat(12.9716);
            setUserLon(77.5946);
        }
    }, []);
    /* Fetch shops */
    var loadShops = (0, react_1.useCallback)(function () { return __awaiter(_this, void 0, void 0, function () {
        var res, _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    setLoading(true);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, shopAPI_1.shopAPI.getAllShops({ limit: 50, isVerified: undefined })];
                case 2:
                    res = _c.sent();
                    var shopsList = null;
                    if (res) {
                        if (res.success && res.data && res.data.shops) {
                            shopsList = res.data.shops;
                        } else if (res.shops) {
                            shopsList = res.shops;
                        }
                    }
                    if (shopsList && shopsList.length > 0) {
                        setShops(shopsList);
                    }
                    else {
                        setShops(shops_1.shops);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    _a = _c.sent();
                    setShops(shops_1.shops);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, []);
    (0, react_1.useEffect)(function () {
        loadShops();
    }, [loadShops]);
    /* Distance helper */
    var getDistance = (0, react_1.useCallback)(function (shop) {
        if (userLat == null || userLon == null)
            return null;
        return haversineKm(userLat, userLon, shop.latitude, shop.longitude);
    }, [userLat, userLon]);
    /* Filter + sort */
    var visible = shops
        .filter(function (s) {
        var _a, _b;
        var dist = getDistance(s);
        if (dist !== null && dist > 10)
            return false;
        if (search && !s.name.toLowerCase().includes(search.toLowerCase()))
            return false;
        if (selectedCategory !== 'All' && !((_a = s.categories) === null || _a === void 0 ? void 0 : _a.includes(selectedCategory)))
            return false;
        if (minRating > 0 && ((_b = s.ratingAverage) !== null && _b !== void 0 ? _b : 0) < minRating)
            return false;
        return true;
    })
        .sort(function (a, b) {
        var _a, _b, _c, _d;
        if (sortBy === 'distance') {
            var da = (_a = getDistance(a)) !== null && _a !== void 0 ? _a : 999;
            var db = (_b = getDistance(b)) !== null && _b !== void 0 ? _b : 999;
            return da - db;
        }
        if (sortBy === 'rating')
            return ((_c = b.ratingAverage) !== null && _c !== void 0 ? _c : 0) - ((_d = a.ratingAverage) !== null && _d !== void 0 ? _d : 0);
        return a.name.localeCompare(b.name);
    });
    /* ── Skeleton Loader ── */
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-[var(--lt-cream)]", style: { fontFamily: 'var(--lt-font-body)' }, children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto px-6 py-12", children: [(0, jsx_runtime_1.jsx)("div", { className: "shimmer h-10 w-64 rounded-xl mb-2" }), (0, jsx_runtime_1.jsx)("div", { className: "shimmer h-5 w-48 rounded-lg mb-10" }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: Array.from({ length: 6 }).map(function (_, i) { return ((0, jsx_runtime_1.jsxs)("div", { className: "rounded-2xl overflow-hidden border border-[var(--lt-border)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "shimmer", style: { aspectRatio: '16/7' } }), (0, jsx_runtime_1.jsxs)("div", { className: "p-5 space-y-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "shimmer h-5 w-3/4 rounded-lg" }), (0, jsx_runtime_1.jsx)("div", { className: "shimmer h-4 w-1/2 rounded-lg" }), (0, jsx_runtime_1.jsx)("div", { className: "shimmer h-4 w-full rounded-lg" })] })] }, i)); }) })] }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-[var(--lt-cream)]", style: { fontFamily: 'var(--lt-font-body)' }, children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto px-6 py-12", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-8 fade-up", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 mb-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { size: 16, style: { color: 'var(--lt-amber)' } }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold", style: { color: 'var(--lt-amber)' }, children: locationError ? 'Bengaluru (default)' : 'Shops near you' })] }), (0, jsx_runtime_1.jsx)("h1", { className: "text-4xl font-bold leading-tight mb-1", style: { fontFamily: 'var(--lt-font-display)', color: 'var(--lt-charcoal)' }, children: "Local Boutiques" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-base", style: { color: 'var(--lt-muted)' }, children: [visible.length, " shops within 10 km \u00B7 Support local fashion"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-3 mb-8 fade-up", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex-1 min-w-60", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { size: 16, className: "absolute left-4 top-1/2 -translate-y-1/2", style: { color: 'var(--lt-muted)' } }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Search shops...", value: search, onChange: function (e) { return setSearch(e.target.value); }, className: "w-full pl-11 pr-4 py-3 rounded-xl text-sm font-medium outline-none transition-shadow", style: {
                                        background: 'white',
                                        border: '1.5px solid var(--lt-border)',
                                        color: 'var(--lt-charcoal)',
                                        boxShadow: 'var(--lt-shadow-sm)',
                                    }, onFocus: function (e) { return (e.target.style.borderColor = 'var(--lt-amber)'); }, onBlur: function (e) { return (e.target.style.borderColor = 'var(--lt-border)'); } }), search && ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return setSearch(''); }, className: "absolute right-3 top-1/2 -translate-y-1/2", style: { color: 'var(--lt-muted)' }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 14 }) }))] }), (0, jsx_runtime_1.jsx)("select", { value: sortBy, onChange: function (e) { return setSortBy(e.target.value); }, className: "px-4 py-3 rounded-xl text-sm font-semibold outline-none cursor-pointer", style: {
                                background: 'white',
                                border: '1.5px solid var(--lt-border)',
                                color: 'var(--lt-charcoal)',
                                boxShadow: 'var(--lt-shadow-sm)',
                            }, children: SORT_OPTIONS.map(function (o) { return ((0, jsx_runtime_1.jsx)("option", { value: o.value, children: o.label }, o.value)); }) }), (0, jsx_runtime_1.jsxs)("button", { onClick: function () { return setShowFilters(!showFilters); }, className: "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-colors", style: {
                                background: showFilters ? 'var(--lt-amber)' : 'white',
                                color: showFilters ? 'white' : 'var(--lt-charcoal)',
                                border: '1.5px solid var(--lt-border)',
                                boxShadow: 'var(--lt-shadow-sm)',
                            }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.SlidersHorizontal, { size: 15 }), "Filters"] }),
                            (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex rounded-xl bg-white border border-[var(--lt-border)] p-1 shadow-lt-sm ml-auto",
                                children: [
                                    (0, jsx_runtime_1.jsxs)("button", {
                                        onClick: function () { return setViewMode('grid'); },
                                        className: "flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold font-display uppercase tracking-wider transition-all " + (viewMode === 'grid' ? 'bg-[var(--lt-charcoal)] text-white shadow-sm' : 'text-[var(--lt-muted)] hover:text-[var(--lt-charcoal)]'),
                                        children: [
                                            (0, jsx_runtime_1.jsx)(lucide_react_1.LayoutGrid, { size: 14 }),
                                            "Grid"
                                        ]
                                    }),
                                    (0, jsx_runtime_1.jsxs)("button", {
                                        onClick: function () { return setViewMode('map'); },
                                        className: "flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold font-display uppercase tracking-wider transition-all " + (viewMode === 'map' ? 'bg-[var(--lt-charcoal)] text-white shadow-sm' : 'text-[var(--lt-muted)] hover:text-[var(--lt-charcoal)]'),
                                        children: [
                                            (0, jsx_runtime_1.jsx)(lucide_react_1.Map, { size: 14 }),
                                            "Map"
                                        ]
                                    })
                                ]
                            })] }), showFilters && ((0, jsx_runtime_1.jsx)("div", { className: "mb-8 p-5 rounded-2xl fade-up", style: { background: 'white', border: '1px solid var(--lt-border)', boxShadow: 'var(--lt-shadow-sm)' }, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-6", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs font-bold mb-3 uppercase tracking-wider", style: { color: 'var(--lt-muted)' }, children: "Category" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-2", children: CATEGORY_OPTIONS.map(function (cat) { return ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return setSelectedCategory(cat); }, className: "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors", style: {
                                                background: selectedCategory === cat ? 'var(--lt-amber)' : 'var(--lt-cream-dark)',
                                                color: selectedCategory === cat ? 'white' : 'var(--lt-charcoal)',
                                                border: "1px solid ".concat(selectedCategory === cat ? 'var(--lt-amber)' : 'var(--lt-border)'),
                                            }, children: cat }, cat)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs font-bold mb-3 uppercase tracking-wider", style: { color: 'var(--lt-muted)' }, children: "Min. Rating" }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-2", children: [0, 3, 3.5, 4, 4.5].map(function (r) { return ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return setMinRating(r); }, className: "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors", style: {
                                                background: minRating === r ? 'var(--lt-amber)' : 'var(--lt-cream-dark)',
                                                color: minRating === r ? 'white' : 'var(--lt-charcoal)',
                                                border: "1px solid ".concat(minRating === r ? 'var(--lt-amber)' : 'var(--lt-border)'),
                            }, children: r === 0 ? 'Any' : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Star, { size: 10 }), r, "+"] })) }, r)); }) })] })] }) })), 
                            viewMode === 'map' ? (
                                (0, jsx_runtime_1.jsx)(BoutiqueMap_1.BoutiqueMap, { shops: visible, userLat: userLat, userLon: userLon })
                            ) : (
                                visible.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "text-center py-24", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-5xl mb-4", children: "\uD83E\uDEA1" }), (0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-bold mb-2", style: { fontFamily: 'var(--lt-font-display)', color: 'var(--lt-charcoal)' }, children: "No shops found" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm", style: { color: 'var(--lt-muted)' }, children: "Try adjusting your filters or search term." })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: visible.map(function (shop, i) {
                                    var _a;
                                    return ((0, jsx_runtime_1.jsx)("div", { className: "fade-up", style: { animationDelay: "".concat(i * 60, "ms") }, children: (0, jsx_runtime_1.jsx)(ShopCard_1.ShopCard, { shop: shop, distanceKm: (_a = getDistance(shop)) !== null && _a !== void 0 ? _a : undefined }) }, shop.id));
                                }) }))
                            )
                        ] }) }));
}
