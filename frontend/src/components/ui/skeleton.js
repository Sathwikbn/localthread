"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skeleton = SkeletonBlock;
exports.SkeletonCard = SkeletonCard;
exports.SkeletonProductDetail = SkeletonProductDetail;
exports.SkeletonShopCard = SkeletonShopCard;
exports.SkeletonText = SkeletonText;
var jsx_runtime_1 = require("react/jsx-runtime");

function SkeletonBlock(_a) {
    var className = _a.className;
    return (0, jsx_runtime_1.jsx)("div", {
        className: "shimmer rounded-xl " + (className || "")
    });
}

function SkeletonText(_a) {
    var _b = _a.lines, lines = _b === void 0 ? 3 : _b, _c = _a.className, className = _c === void 0 ? "" : _c;
    return (0, jsx_runtime_1.jsx)("div", {
        className: "space-y-2.5 " + className,
        children: Array.from({ length: lines }).map(function (_, i) {
            return (0, jsx_runtime_1.jsx)(SkeletonBlock, {
                className: "h-3 " + (i === lines - 1 ? "w-3/5" : "w-full")
            }, i);
        })
    });
}

function SkeletonCard() {
    return (0, jsx_runtime_1.jsxs)("div", {
        className: "bg-white rounded-2xl border border-[var(--lt-border)] overflow-hidden shadow-lt-sm",
        children: [
            (0, jsx_runtime_1.jsx)(SkeletonBlock, { className: "aspect-[3/4] rounded-none" }),
            (0, jsx_runtime_1.jsxs)("div", {
                className: "p-4 space-y-3",
                children: [
                    (0, jsx_runtime_1.jsx)(SkeletonBlock, { className: "h-2.5 w-1/3" }),
                    (0, jsx_runtime_1.jsx)(SkeletonBlock, { className: "h-4 w-4/5" }),
                    (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex justify-between items-center pt-1",
                        children: [
                            (0, jsx_runtime_1.jsx)(SkeletonBlock, { className: "h-5 w-16" }),
                            (0, jsx_runtime_1.jsx)(SkeletonBlock, { className: "h-4 w-10" })
                        ]
                    })
                ]
            })
        ]
    });
}

function SkeletonShopCard() {
    return (0, jsx_runtime_1.jsxs)("div", {
        className: "bg-white rounded-2xl border border-[var(--lt-border)] overflow-hidden shadow-lt-sm",
        children: [
            (0, jsx_runtime_1.jsx)(SkeletonBlock, { className: "h-40 rounded-none" }),
            (0, jsx_runtime_1.jsxs)("div", {
                className: "p-5 space-y-3",
                children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                            (0, jsx_runtime_1.jsx)(SkeletonBlock, { className: "h-12 w-12 rounded-full flex-shrink-0" }),
                            (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex-1 space-y-2",
                                children: [
                                    (0, jsx_runtime_1.jsx)(SkeletonBlock, { className: "h-4 w-3/4" }),
                                    (0, jsx_runtime_1.jsx)(SkeletonBlock, { className: "h-3 w-1/2" })
                                ]
                            })
                        ]
                    }),
                    (0, jsx_runtime_1.jsx)(SkeletonBlock, { className: "h-3 w-full" }),
                    (0, jsx_runtime_1.jsx)(SkeletonBlock, { className: "h-3 w-2/3" })
                ]
            })
        ]
    });
}

function SkeletonProductDetail() {
    return (0, jsx_runtime_1.jsxs)("div", {
        className: "container mx-auto px-4 sm:px-6 lg:px-8 py-8",
        children: [
            (0, jsx_runtime_1.jsxs)("div", {
                className: "flex gap-2 mb-8",
                children: [
                    (0, jsx_runtime_1.jsx)(SkeletonBlock, { className: "h-3 w-12" }),
                    (0, jsx_runtime_1.jsx)(SkeletonBlock, { className: "h-3 w-16" }),
                    (0, jsx_runtime_1.jsx)(SkeletonBlock, { className: "h-3 w-24" })
                ]
            }),
            (0, jsx_runtime_1.jsxs)("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-12",
                children: [
                    (0, jsx_runtime_1.jsx)(SkeletonBlock, { className: "aspect-square rounded-3xl" }),
                    (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-6",
                        children: [
                            (0, jsx_runtime_1.jsx)(SkeletonBlock, { className: "h-3 w-20" }),
                            (0, jsx_runtime_1.jsx)(SkeletonBlock, { className: "h-8 w-4/5" }),
                            (0, jsx_runtime_1.jsx)(SkeletonBlock, { className: "h-7 w-24" }),
                            (0, jsx_runtime_1.jsx)(SkeletonText, { lines: 4 }),
                            (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex gap-3 pt-4",
                                children: [
                                    (0, jsx_runtime_1.jsx)(SkeletonBlock, { className: "h-12 flex-1" }),
                                    (0, jsx_runtime_1.jsx)(SkeletonBlock, { className: "h-12 w-12" })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
