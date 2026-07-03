"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentlyViewedCarousel = RecentlyViewedCarousel;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var useRecentlyViewed_1 = require("../hooks/useRecentlyViewed");
var ImageWithFallback_1 = require("./figma/ImageWithFallback");

function RecentlyViewedCarousel() {
    var _a = (0, useRecentlyViewed_1.useRecentlyViewed)(), items = _a.items, clearAll = _a.clearAll;
    var scrollRef = (0, react_1.useRef)(null);
    var _b = (0, react_1.useState)(false), canScrollLeft = _b[0], setCanScrollLeft = _b[1];
    var _c = (0, react_1.useState)(false), canScrollRight = _c[0], setCanScrollRight = _c[1];

    var checkScroll = (0, react_1.useCallback)(function () {
        var el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    }, []);

    (0, react_1.useEffect)(function () {
        checkScroll();
        var el = scrollRef.current;
        if (el) {
            el.addEventListener('scroll', checkScroll);
            return function () { el.removeEventListener('scroll', checkScroll); };
        }
    }, [checkScroll, items]);

    var scroll = function (direction) {
        var el = scrollRef.current;
        if (!el) return;
        el.scrollBy({ left: direction === 'left' ? -260 : 260, behavior: 'smooth' });
    };

    if (!items || items.length === 0) return null;

    return (0, jsx_runtime_1.jsxs)("div", {
        className: "mt-16 fade-up",
        children: [
            (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center justify-between mb-6",
                children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                        children: [
                            (0, jsx_runtime_1.jsxs)("h2", {
                                className: "text-2xl font-bold font-display text-[var(--lt-charcoal)] flex items-center gap-2",
                                children: [
                                    (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { size: 20, className: "text-[var(--lt-amber)]" }),
                                    "Recently Viewed"
                                ]
                            }),
                            (0, jsx_runtime_1.jsxs)("p", {
                                className: "text-sm text-[var(--lt-muted)] font-body mt-1",
                                children: ["Products you've browsed recently"]
                            })
                        ]
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                            (0, jsx_runtime_1.jsxs)("button", {
                                onClick: clearAll,
                                className: "text-xs font-bold text-[var(--lt-muted)] hover:text-red-500 transition-colors flex items-center gap-1",
                                children: [
                                    (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 12 }),
                                    "Clear"
                                ]
                            }),
                            canScrollLeft && (0, jsx_runtime_1.jsx)("button", {
                                onClick: function () { scroll('left'); },
                                className: "p-2 rounded-xl bg-white border border-[var(--lt-border)] shadow-lt-sm hover:shadow-lt-md transition-all",
                                children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, { size: 16 })
                            }),
                            canScrollRight && (0, jsx_runtime_1.jsx)("button", {
                                onClick: function () { scroll('right'); },
                                className: "p-2 rounded-xl bg-white border border-[var(--lt-border)] shadow-lt-sm hover:shadow-lt-md transition-all",
                                children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { size: 16 })
                            })
                        ]
                    })
                ]
            }),
            (0, jsx_runtime_1.jsx)("div", {
                ref: scrollRef,
                className: "flex gap-4 overflow-x-auto pb-4 scrollbar-none scroll-smooth",
                style: { scrollbarWidth: 'none', msOverflowStyle: 'none' },
                children: items.map(function (item) {
                    return (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                        to: "/product/" + item.id,
                        className: "flex-shrink-0 w-[200px] group",
                        children: (0, jsx_runtime_1.jsxs)("div", {
                            className: "bg-white rounded-2xl border border-[var(--lt-border)] overflow-hidden shadow-lt-sm hover:shadow-lt-md transition-all duration-300 hover:-translate-y-1",
                            children: [
                                (0, jsx_runtime_1.jsx)("div", {
                                    className: "aspect-square overflow-hidden bg-[var(--lt-cream-dark)]",
                                    children: (0, jsx_runtime_1.jsx)(ImageWithFallback_1.ImageWithFallback, {
                                        src: item.image,
                                        alt: item.name,
                                        className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    })
                                }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                    className: "p-3",
                                    children: [
                                        item.category && (0, jsx_runtime_1.jsx)("p", {
                                            className: "text-[9px] text-[var(--lt-muted)] uppercase tracking-widest font-bold font-display mb-1",
                                            children: item.category
                                        }),
                                        (0, jsx_runtime_1.jsx)("h3", {
                                            className: "text-xs font-bold font-body text-[var(--lt-charcoal)] line-clamp-1",
                                            children: item.name
                                        }),
                                        (0, jsx_runtime_1.jsxs)("p", {
                                            className: "text-sm font-bold text-[var(--lt-charcoal)] mt-1",
                                            children: ["\u20B9", typeof item.price === 'number' ? item.price.toLocaleString() : item.price]
                                        })
                                    ]
                                })
                            ]
                        })
                    }, item.id);
                })
            })
        ]
    });
}
