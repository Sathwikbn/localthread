"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderTimeline = OrderTimeline;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var date_fns_1 = require("date-fns");
var api_1 = require("../services/api");

function fetchTimeline(orderId) {
    return (0, api_1.apiRequest)("/orders/" + orderId + "/timeline");
}

function OrderTimeline(_a) {
    var orderId = _a.orderId;
    var _b = (0, react_1.useState)([]), timeline = _b[0], setTimeline = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];

    (0, react_1.useEffect)(function () {
        if (!orderId) return;
        setLoading(true);
        fetchTimeline(orderId)
            .then(function (res) {
                if (res.success && res.data) {
                    setTimeline(res.data.timeline || []);
                }
            })
            .catch(function (e) {
                console.error("Failed to load timeline", e);
            })
            .finally(function () {
                setLoading(false);
            });
    }, [orderId]);

    if (loading) {
        return (0, jsx_runtime_1.jsxs)("div", {
            className: "py-4 text-center text-xs font-semibold text-[var(--lt-muted)] flex items-center justify-center gap-2",
            children: [
                (0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--lt-amber)]" }),
                "Loading tracking timeline..."
            ]
        });
    }

    if (timeline.length === 0) {
        return (0, jsx_runtime_1.jsx)("p", {
            className: "text-xs text-[var(--lt-muted)] py-2",
            children: "No tracking updates available yet."
        });
    }

    // List of typical statuses for sequence checking
    var statusSteps = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED'];

    return (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-6 pt-4 border-t border-[var(--lt-border)]",
        children: [
            (0, jsx_runtime_1.jsxs)("h4", {
                className: "text-xs font-extrabold font-display uppercase tracking-widest text-[var(--lt-charcoal)] mb-4 flex items-center gap-1.5",
                children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Truck, { size: 14, className: "text-[var(--lt-amber)]" }),
                    "Order Journey"
                ]
            }),
            (0, jsx_runtime_1.jsx)("div", {
                className: "relative border-l-2 border-[var(--lt-border)] ml-3 pl-6 space-y-6",
                children: timeline.map(function (step, idx) {
                    var dateFormatted = step.createdAt 
                        ? (0, date_fns_1.format)(new Date(step.createdAt), 'MMM dd, yyyy · hh:mm a') 
                        : '';
                    var isLatest = idx === timeline.length - 1;

                    return (0, jsx_runtime_1.jsxs)("div", {
                        className: "relative",
                        children: [
                            // Timeline dot indicator
                            (0, jsx_runtime_1.jsx)("div", {
                                className: "absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center " + 
                                    (isLatest ? 'border-[var(--lt-amber)] ring-4 ring-orange-50' : 'border-slate-400'),
                                children: isLatest && (0, jsx_runtime_1.jsx)("div", {
                                    className: "w-1.5 h-1.5 rounded-full bg-[var(--lt-amber)]"
                                })
                            }),

                            // Text details
                            (0, jsx_runtime_1.jsxs)("div", {
                                className: "space-y-1",
                                children: [
                                    (0, jsx_runtime_1.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            (0, jsx_runtime_1.jsx)("span", {
                                                className: "text-xs font-extrabold font-display text-[var(--lt-charcoal)] uppercase tracking-wide",
                                                children: step.status
                                            }),
                                            isLatest && (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                                                className: "bg-[var(--lt-amber-pale)] text-[var(--lt-amber)] border border-[var(--lt-amber-light)] text-[8px] font-black uppercase px-1.5 py-0.5",
                                                children: "Current Status"
                                            })
                                        ]
                                    }),
                                    step.note && (0, jsx_runtime_1.jsx)("p", {
                                        className: "text-xs text-[var(--lt-muted)] font-body leading-relaxed",
                                        children: step.note
                                    }),
                                    dateFormatted && (0, jsx_runtime_1.jsx)("p", {
                                        className: "text-[10px] text-slate-400 font-bold",
                                        children: dateFormatted
                                    })
                                ]
                            })
                        ]
                    }, step.id || idx);
                })
            })
        ]
    });
}
