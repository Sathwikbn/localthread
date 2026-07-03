"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageWithFallback = ImageWithFallback;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var ERROR_IMG_SRC = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';
function ImageWithFallback(props) {
    var _a = (0, react_1.useState)(false), didError = _a[0], setDidError = _a[1];
    var handleError = function () {
        setDidError(true);
    };
    var src = props.src, alt = props.alt, style = props.style, className = props.className, rest = __rest(props, ["src", "alt", "style", "className"]);
    return didError ? ((0, jsx_runtime_1.jsx)("div", { className: "inline-block bg-gray-100 text-center align-middle ".concat(className !== null && className !== void 0 ? className : ''), style: style, children: (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center w-full h-full", children: (0, jsx_runtime_1.jsx)("img", __assign({ src: ERROR_IMG_SRC, alt: "Error loading image" }, rest, { "data-original-url": src })) }) })) : ((0, jsx_runtime_1.jsx)("img", __assign({ src: src, alt: alt || "Product", className: className, style: style }, rest, { onError: handleError })));
}
