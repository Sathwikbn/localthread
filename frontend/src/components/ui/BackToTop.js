"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackToTop = BackToTop;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var framer_motion_1 = require("framer-motion");

function BackToTop() {
    var _a = (0, react_1.useState)(false), isVisible = _a[0], setIsVisible = _a[1];

    (0, react_1.useEffect)(function () {
        var handleScroll = function () {
            setIsVisible(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return function () { window.removeEventListener('scroll', handleScroll); };
    }, []);

    var scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, {
        children: isVisible && (0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, {
            initial: { opacity: 0, scale: 0.8, y: 20 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.8, y: 20 },
            transition: { duration: 0.25, ease: 'easeOut' },
            onClick: scrollToTop,
            className: "fixed bottom-8 right-8 z-50 p-3 rounded-2xl bg-[var(--lt-charcoal)] text-white shadow-lg hover:bg-black hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-white/10",
            "aria-label": "Back to top",
            children: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUp, {
                size: 20,
                className: "transition-transform duration-300 group-hover:-translate-y-0.5"
            })
        })
    });
}
