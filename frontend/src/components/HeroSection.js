"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroSection = HeroSection;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("./ui/button");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var shops_1 = require("../data/shops");
var shopAPI_1 = require("../services/shopAPI");

function HeroSection() {
    var _a = (0, react_1.useState)(0), activeIndex = _a[0], setActiveIndex = _a[1];
    var _b = (0, react_1.useState)([]), dbShops = _b[0], setDbShops = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];

    var getImageUrl = function (path) {
        if (!path) return '';
        if (path.startsWith('http://') || path.startsWith('https://')) return path;
        var apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        var serverRoot = apiBase.endsWith('/api') ? apiBase.slice(0, -4) : apiBase;
        var cleanPath = path.startsWith('/') ? path : '/' + path;
        return serverRoot + cleanPath;
    };

    (0, react_1.useEffect)(function () {
        var cancelled = false;
        // 5-second timeout: if backend doesn't respond, stop spinning and show fallback hero
        var timeoutId = setTimeout(function () {
            if (!cancelled) {
                setLoading(false);
            }
        }, 5000);

        shopAPI_1.shopAPI.getAllShops({ limit: 5 })
            .then(function (res) {
                clearTimeout(timeoutId);
                if (cancelled) return;
                var shopsList = null;
                if (res) {
                    if (res.success && res.data && res.data.shops) {
                        shopsList = res.data.shops;
                    } else if (res.shops) {
                        shopsList = res.shops;
                    } else if (Array.isArray(res)) {
                        shopsList = res;
                    } else if (res.data && Array.isArray(res.data)) {
                        shopsList = res.data;
                    }
                }
                var shopsToSet = [];
                if (shopsList && shopsList.length > 0) {
                    shopsToSet = shopsList.map(function (s) {
                        return {
                            id: s.id,
                            name: s.name,
                            description: s.description || "Support local fashion",
                            story: s.description || "Support local fashion",
                            street: s.street || s.location || '',
                            city: s.city || '',
                            state: s.state || '',
                            zipCode: s.zipCode || '',
                            latitude: s.latitude || 0,
                            longitude: s.longitude || 0,
                            phone: s.phone || '',
                            email: s.email || '',
                            ratingAverage: s.ratingAverage || 4.5,
                            ratingCount: s.ratingCount || 10,
                            categories: s.categories || (s.category ? [s.category] : []),
                            isVerified: s.isVerified || false,
                            establishedYear: s.establishedYear || 2024,
                            isActive: s.isActive !== false,
                            distance: s.distance || 0,
                            logo: s.logoUrl ? getImageUrl(s.logoUrl) : null,
                            banner: s.bannerUrl ? getImageUrl(s.bannerUrl) : "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop"
                        };
                    });
                } else if (shops_1.shops && shops_1.shops.length > 0) {
                    shopsToSet = shops_1.shops;
                }
                setDbShops(shopsToSet);
                setLoading(false);
            })
            .catch(function (err) {
                clearTimeout(timeoutId);
                if (cancelled) return;
                console.error("Failed to fetch shops for hero spotlight:", err);
                if (shops_1.shops && shops_1.shops.length > 0) {
                    setDbShops(shops_1.shops);
                }
                setLoading(false);
            });
        return function () { cancelled = true; clearTimeout(timeoutId); };
    }, []);

    (0, react_1.useEffect)(function () {
        if (dbShops.length === 0) return;
        var timer = setInterval(function () {
            setActiveIndex(function (prev) { return (prev + 1) % dbShops.length; });
        }, 5000); // Auto transition every 5 seconds
        return function () { return clearInterval(timer); };
    }, [dbShops.length]);

    if (loading) {
        return ((0, jsx_runtime_1.jsx)("section", { className: "relative w-full h-[70vh] min-h-[550px] md:h-[80vh] bg-slate-900 flex items-center justify-center", children: (0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-white" }) }));
    }

    if (dbShops.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("section", { className: "relative w-full h-[70vh] min-h-[550px] md:h-[80vh] bg-slate-900 overflow-hidden flex items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-0 z-0", children: [(0, jsx_runtime_1.jsx)("img", { src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=900&fit=crop", alt: "LocalThread Banner", className: "w-full h-full object-cover filter brightness-[0.35] contrast-[1.02]" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-[var(--lt-cream)] via-[var(--lt-cream)]/20 to-transparent z-10" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent z-10 hidden md:block" })] }), (0, jsx_runtime_1.jsx)("div", { className: "container mx-auto px-6 sm:px-8 relative z-20 text-white mt-8 mb-12", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative min-h-[380px] md:min-h-[420px] flex flex-col justify-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "inline-flex items-center gap-2 bg-[var(--lt-amber)] border border-[var(--lt-amber-light)]/20 rounded-full px-4 py-1.5 mb-6 w-fit shadow-lg", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { className: "h-3.5 w-3.5 text-white animate-pulse" }), (0, jsx_runtime_1.jsx)("span", { className: "text-[10px] font-black tracking-widest uppercase text-white font-display", children: "WELCOME TO LOCALTHREAD" })] }), (0, jsx_runtime_1.jsx)("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 leading-tight font-display text-white drop-shadow-md max-w-2xl", children: "Support Local Boutiques & Sustainable Fashion" }), (0, jsx_runtime_1.jsx)("p", { className: "text-base sm:text-lg text-stone-200 mb-8 leading-relaxed font-body max-w-xl drop-shadow", children: "Discover unique styles, hand-crafted apparel, and sustainable designs from verified boutiques right in your neighborhood." }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { asChild: true, className: "group px-8 py-6 text-sm font-bold bg-[var(--lt-amber)] text-white hover:bg-[var(--lt-amber)]/90 transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-amber-900/20 rounded-xl border-0 cursor-pointer", children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/shops", children: [(0, jsx_runtime_1.jsx)("span", { children: "Browse Shops" }), (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { className: "ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" })] }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { asChild: true, variant: "outline", className: "px-8 py-6 text-sm font-bold border border-white/30 text-white hover:bg-white/10 transition-all duration-300 hover:scale-[1.03] bg-transparent backdrop-blur-sm rounded-xl cursor-pointer", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/products", children: "Explore Products" }) })] })] }) })] }));
    }

    return ((0, jsx_runtime_1.jsxs)("section", { className: "relative w-full h-[70vh] min-h-[550px] md:h-[80vh] bg-slate-900 overflow-hidden flex items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-0 z-0", children: [dbShops.map(function (shop, index) { return ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 transition-opacity duration-1000 ease-in-out ".concat(index === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'), children: (0, jsx_runtime_1.jsx)("img", { src: shop.banner, alt: shop.name, className: "w-full h-full object-cover filter brightness-[0.38] contrast-[1.02]" }) }, shop.id)); }), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-[var(--lt-cream)] via-[var(--lt-cream)]/20 to-transparent z-10" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent z-10 hidden md:block" })] }), (0, jsx_runtime_1.jsx)("div", { className: "container mx-auto px-6 sm:px-8 relative z-20 text-white mt-8 mb-12", children: (0, jsx_runtime_1.jsx)("div", { className: "relative min-h-[380px] md:min-h-[420px]", children: dbShops.map(function (shop, index) {
                        var active = index === activeIndex;
                        return ((0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out transform ".concat(active
                                ? 'opacity-100 translate-y-0 z-10'
                                : 'opacity-0 translate-y-8 -z-10 pointer-events-none'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "inline-flex items-center gap-2 bg-[var(--lt-amber)] border border-[var(--lt-amber-light)]/20 rounded-full px-4 py-1.5 mb-6 w-fit shadow-lg", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { className: "h-3.5 w-3.5 text-white animate-pulse" }), (0, jsx_runtime_1.jsx)("span", { className: "text-[10px] font-black tracking-widest uppercase text-white font-display", children: "BOUTIQUE SPOTLIGHT" })] }), (0, jsx_runtime_1.jsx)("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 leading-tight font-display text-white drop-shadow-md", children: shop.name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-3 mb-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "inline-flex items-center gap-1 bg-[var(--lt-amber-pale)] border border-[var(--lt-amber-light)] rounded-full px-3 py-1 text-xs font-semibold text-[var(--lt-amber)]", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: "h-3.5 w-3.5" }), (0, jsx_runtime_1.jsxs)("span", { children: [shop.distance, " km away"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-xs font-semibold", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Star, { className: "h-3 w-3 fill-amber-400 text-amber-400" }), (0, jsx_runtime_1.jsxs)("span", { children: [shop.ratingAverage, " (", shop.ratingCount, " reviews)"] })] }), shop.establishedYear && ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-stone-300 font-medium tracking-wide", children: ["Est. ", shop.establishedYear] }))] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-base sm:text-lg text-stone-200 mb-8 leading-relaxed font-body max-w-xl drop-shadow", children: ["\"", shop.story || shop.description, "\""] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-2 mb-8", children: (shop.categories || []).map(function (cat, i) { return ((0, jsx_runtime_1.jsx)("span", { className: "text-[10px] font-bold tracking-wider uppercase bg-white/15 border border-white/15 rounded-md px-2.5 py-1 text-white font-display", children: cat }, i)); }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { asChild: true, className: "group px-8 py-6 text-sm font-bold bg-[var(--lt-amber)] text-white hover:bg-[var(--lt-amber)]/90 transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-amber-900/20 rounded-xl border-0 cursor-pointer", children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/shop/".concat(shop.id), children: [(0, jsx_runtime_1.jsx)("span", { children: "Explore Storefront" }), (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { className: "ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" })] }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { asChild: true, variant: "outline", className: "px-8 py-6 text-sm font-bold border border-white/30 text-white hover:bg-white/10 transition-all duration-300 hover:scale-[1.03] bg-transparent backdrop-blur-sm rounded-xl cursor-pointer", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/shops", children: "Browse All Shops" }) })] })] }, shop.id));
                    }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex gap-3", children: dbShops.map(function (_, index) { return ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return setActiveIndex(index); }, className: "h-3 rounded-full transition-all duration-300 cursor-pointer ".concat(index === activeIndex
                        ? 'bg-[var(--lt-amber)] w-8 shadow-md'
                        : 'bg-white/40 hover:bg-white/70 w-3'), "aria-label": "Go to boutique slide ".concat(index + 1) }, index)); }) })] }));
}
