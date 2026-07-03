"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchModal = SearchModal;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var productAPI_1 = require("../services/productAPI");

function SearchModal(_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose;
    var navigate = (0, react_router_dom_1.useNavigate)();
    
    var _b = (0, react_1.useState)(''), query = _b[0], setQuery = _b[1];
    var _c = (0, react_1.useState)([]), results = _c[0], setResults = _c[1];
    var _d = (0, react_1.useState)(false), loading = _d[0], setLoading = _d[1];
    
    var inputRef = (0, react_1.useRef)(null);
    var modalRef = (0, react_1.useRef)(null);

    // Auto-focus input when modal opens
    (0, react_1.useEffect)(function () {
        if (isOpen && inputRef.current) {
            setTimeout(function () {
                inputRef.current.focus();
            }, 50);
        }
    }, [isOpen]);

    // Handle click outside modal content to close it
    (0, react_1.useEffect)(function () {
        var handleOutsideClick = function (e) {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }
        return function () { document.removeEventListener('mousedown', handleOutsideClick); };
    }, [isOpen, onClose]);

    // Handle Escape key to close modal
    (0, react_1.useEffect)(function () {
        var handleEscape = function (e) {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }
        return function () { document.removeEventListener('keydown', handleEscape); };
    }, [isOpen, onClose]);

    // Debounced search logic
    (0, react_1.useEffect)(function () {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);
        var timer = setTimeout(function () {
            productAPI_1.productAPI.getAllProducts({ search: query, limit: 6 })
                .then(function (res) {
                    var list = (res && res.success && res.data && res.data.products) || (res && res.products) || [];
                    setResults(list);
                })
                .catch(function (err) {
                    console.error("Search failed:", err);
                })
                .finally(function () {
                    setLoading(false);
                });
        }, 300);

        return function () { clearTimeout(timer); };
    }, [query]);

    var handleItemClick = function (productId) {
        onClose();
        setQuery('');
        navigate("/product/" + productId);
    };

    if (!isOpen) return null;

    return (0, jsx_runtime_1.jsx)("div", {
        className: "fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-start justify-center pt-20 px-4",
        children: (0, jsx_runtime_1.jsxs)("div", {
            ref: modalRef,
            className: "w-full max-w-xl bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-[0_32px_64px_rgba(0,0,0,0.16)] py-6 px-6 overflow-hidden animate-slide-up-menu",
            children: [
                // Input box
                (0, jsx_runtime_1.jsxs)("div", {
                    className: "relative flex items-center mb-4 pb-4 border-b border-[var(--lt-border)]",
                    children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "text-[var(--lt-muted)] mr-3 shrink-0", size: 20 }),
                        (0, jsx_runtime_1.jsx)("input", {
                            ref: inputRef,
                            type: "text",
                            value: query,
                            onChange: function (e) { setQuery(e.target.value); },
                            placeholder: "Search clothes, boutiques, styles...",
                            className: "w-full bg-transparent border-0 outline-none text-base font-medium text-[var(--lt-charcoal)] placeholder-slate-400"
                        }),
                        (0, jsx_runtime_1.jsx)("button", {
                            onClick: onClose,
                            className: "p-1.5 hover:bg-slate-100 rounded-xl transition-colors shrink-0",
                            children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 18, className: "text-[var(--lt-muted)]" })
                        })
                    ]
                }),

                // Suggestions List
                (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-4 max-h-[380px] overflow-y-auto pr-1",
                    children: [
                        loading && (0, jsx_runtime_1.jsxs)("div", {
                            className: "py-8 text-center text-xs font-semibold text-[var(--lt-muted)] flex items-center justify-center gap-2",
                            children: [
                                (0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--lt-amber)]" }),
                                "Fetching suggestions..."
                            ]
                        }),

                        !loading && query.trim() && results.length === 0 && (
                            (0, jsx_runtime_1.jsxs)("div", {
                                className: "py-12 text-center text-[var(--lt-muted)]",
                                children: [
                                    (0, jsx_runtime_1.jsx)(lucide_react_1.Sliders, { className: "h-8 w-8 mx-auto mb-2 opacity-40" }),
                                    (0, jsx_runtime_1.jsx)("p", { className: "text-xs font-extrabold font-display uppercase tracking-wider", children: "No products matched" })
                                ]
                            })
                        ),

                        !loading && !query.trim() && (
                            (0, jsx_runtime_1.jsxs)("div", {
                                className: "py-4 text-[var(--lt-muted)] space-y-3",
                                children: [
                                    (0, jsx_runtime_1.jsx)("h4", { className: "text-[10px] font-black uppercase tracking-widest", children: "Popular Categories" }),
                                    (0, jsx_runtime_1.jsx)("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: ['t-shirts', 'hoodies', 'shirts', 'jeans', 'dresses'].map(function (c) {
                                            return (0, jsx_runtime_1.jsx)("button", {
                                                onClick: function () { setQuery(c); },
                                                className: "px-3.5 py-2 rounded-xl text-xs font-bold font-display uppercase tracking-wide bg-[var(--lt-cream-dark)] hover:bg-[var(--lt-amber-pale)] hover:text-[var(--lt-amber)] transition-colors border border-[var(--lt-border)]",
                                                children: c
                                            }, c);
                                        })
                                    })
                                ]
                            })
                        ),

                        !loading && results.length > 0 && (
                            (0, jsx_runtime_1.jsxs)("div", {
                                className: "space-y-2.5",
                                children: [
                                    (0, jsx_runtime_1.jsx)("h4", { className: "text-[10px] font-black uppercase tracking-widest text-[var(--lt-muted)]", children: "Matches found" }),
                                    (0, jsx_runtime_1.jsx)("div", {
                                        className: "divide-y divide-slate-100",
                                        children: results.map(function (p) {
                                            return (0, jsx_runtime_1.jsxs)("div", {
                                                onClick: function () { handleItemClick(p.id || p._id); },
                                                className: "flex items-center gap-4 py-2.5 cursor-pointer hover:bg-slate-50 transition-colors rounded-xl px-2",
                                                children: [
                                                    (0, jsx_runtime_1.jsx)("img", {
                                                        src: p.imageUrl || p.image || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100',
                                                        alt: p.name,
                                                        className: "w-11 h-11 rounded-lg object-cover border border-[var(--lt-border)]"
                                                    }),
                                                    (0, jsx_runtime_1.jsxs)("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            (0, jsx_runtime_1.jsx)("p", { className: "text-xs font-bold text-[var(--lt-charcoal)] truncate font-display", children: p.name }),
                                                            (0, jsx_runtime_1.jsx)("p", { className: "text-[10px] text-[var(--lt-muted)] uppercase tracking-widest font-black", children: p.category })
                                                        ]
                                                    }),
                                                    (0, jsx_runtime_1.jsxs)("span", {
                                                        className: "text-xs font-bold text-[var(--lt-charcoal)] font-display",
                                                        children: ["\u20B9", p.price]
                                                    })
                                                ]
                                            }, p.id || p._id);
                                        })
                                    })
                                ]
                            })
                        )
                    ]
                })
            ]
        })
    });
}
