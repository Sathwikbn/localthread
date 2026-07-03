"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Breadcrumbs = Breadcrumbs;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");

function Breadcrumbs(_a) {
    var items = _a.items;
    if (!items || items.length === 0) return null;

    return (0, jsx_runtime_1.jsx)("nav", {
        "aria-label": "Breadcrumb",
        className: "mb-8",
        children: (0, jsx_runtime_1.jsx)("ol", {
            className: "flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-widest flex-wrap",
            children: items.map(function (item, index) {
                var isLast = index === items.length - 1;
                return (0, jsx_runtime_1.jsxs)("li", {
                    className: "flex items-center gap-1.5",
                    children: [
                        index > 0 && (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, {
                            size: 12,
                            className: "text-slate-300 flex-shrink-0"
                        }),
                        isLast
                            ? (0, jsx_runtime_1.jsx)("span", {
                                className: "text-[var(--lt-charcoal)] font-extrabold truncate max-w-[200px]",
                                children: item.label
                            })
                            : (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                                to: item.href || "/",
                                className: "text-[var(--lt-muted)] hover:text-[var(--lt-charcoal)] transition-colors",
                                children: item.label
                            })
                    ]
                }, index);
            })
        })
    });
}
