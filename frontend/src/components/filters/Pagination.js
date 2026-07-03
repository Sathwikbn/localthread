"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = Pagination;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var filterSlice_1 = require("../../store/filterSlice");
var button_1 = require("../ui/button");
var lucide_react_1 = require("lucide-react");
function Pagination(_a) {
    var totalPages = _a.totalPages, currentPage = _a.currentPage, onPageChange = _a.onPageChange;
    var dispatch = (0, react_redux_1.useDispatch)();
    var handlePageChange = function (page) {
        if (page >= 1 && page <= totalPages) {
            dispatch((0, filterSlice_1.setPage)(page));
            onPageChange(page);
        }
    };
    var getVisiblePages = function () {
        var delta = 2;
        var range = [];
        var rangeWithDots = [];
        for (var i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }
        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        }
        else {
            rangeWithDots.push(1);
        }
        rangeWithDots.push.apply(rangeWithDots, range);
        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        }
        else {
            rangeWithDots.push(totalPages);
        }
        return rangeWithDots;
    };
    if (totalPages <= 1) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center gap-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", onClick: function () { return handlePageChange(currentPage - 1); }, disabled: currentPage === 1, className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, { className: "h-4 w-4" }), "Previous"] }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-1", children: getVisiblePages().map(function (page, index) { return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: page === '...' ? ((0, jsx_runtime_1.jsx)("span", { className: "px-2 py-1 text-muted-foreground", children: "..." })) : ((0, jsx_runtime_1.jsx)(button_1.Button, { variant: currentPage === page ? 'default' : 'outline', size: "sm", onClick: function () { return handlePageChange(page); }, className: "w-8 h-8 p-0", children: page })) }, index)); }) }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", onClick: function () { return handlePageChange(currentPage + 1); }, disabled: currentPage === totalPages, className: "flex items-center gap-1", children: ["Next", (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { className: "h-4 w-4" })] })] }));
}
