"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalThreadLogo = LocalThreadLogo;
var jsx_runtime_1 = require("react/jsx-runtime");
function LocalThreadLogo(_a) {
    var _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.size, size = _c === void 0 ? 'md' : _c;
    var sizeClasses = {
        sm: 'h-6',
        md: 'h-8',
        lg: 'h-12'
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center ".concat(className), children: (0, jsx_runtime_1.jsx)("img", { src: "/images/localthread-logo.png", alt: "LocalThread Logo", className: "".concat(sizeClasses[size], " w-auto") }) }));
}
