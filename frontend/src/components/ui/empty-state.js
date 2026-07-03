"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyState = EmptyState;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("./button");
function EmptyState(_a) {
    var title = _a.title, description = _a.description, icon = _a.icon, action = _a.action, _b = _a.variant, variant = _b === void 0 ? 'general' : _b;
    var getDefaultContent = function () {
        switch (variant) {
            case 'search':
                return {
                    title: 'No products found',
                    description: 'Try adjusting your search terms or browse our categories to find what you\'re looking for.',
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "h-12 w-12 text-muted-foreground" })
                };
            case 'filter':
                return {
                    title: 'No products match your filters',
                    description: 'Try adjusting your filters or clear all filters to see more products.',
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Filter, { className: "h-12 w-12 text-muted-foreground" })
                };
            default:
                return {
                    title: 'No products available',
                    description: 'Check back later for new arrivals or browse our other categories.',
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Package, { className: "h-12 w-12 text-muted-foreground" })
                };
        }
    };
    var defaultContent = getDefaultContent();
    return ((0, jsx_runtime_1.jsxs)("div", {
        className: "flex flex-col items-center justify-center py-20 px-6 text-center max-w-md mx-auto bg-white/50 backdrop-blur-md border border-[var(--lt-border)] rounded-3xl shadow-lt-sm space-y-5 my-8 fade-up",
        children: [
            (0, jsx_runtime_1.jsx)("div", { className: "p-4 bg-[var(--lt-cream-dark)]/50 rounded-2xl border border-[var(--lt-border)] text-[var(--lt-amber)] shrink-0 shadow-inner", children: icon || defaultContent.icon }),
            (0, jsx_runtime_1.jsx)("h3", { className: "text-base font-extrabold font-display uppercase tracking-wider text-[var(--lt-charcoal)]", children: title || defaultContent.title }),
            (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-[var(--lt-muted)] font-body leading-relaxed max-w-sm", children: description || defaultContent.description }),
            action && (0, jsx_runtime_1.jsx)(button_1.Button, {
                onClick: action.onClick,
                className: "h-11 bg-[var(--lt-charcoal)] hover:bg-[var(--lt-amber)] text-white font-bold font-display uppercase tracking-widest text-xs rounded-xl shadow-lt-sm px-8 transition-all duration-300 cursor-pointer active:scale-98",
                children: action.label
            })
        ]
    }));
}

