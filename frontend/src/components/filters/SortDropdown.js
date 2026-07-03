"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortDropdown = SortDropdown;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_redux_1 = require("react-redux");
var filterSlice_1 = require("../../store/filterSlice");
var select_1 = require("../ui/select");
var lucide_react_1 = require("lucide-react");
var sortOptions = [
    {
        value: 'newest-first',
        label: 'Newest First',
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { className: "h-4 w-4" }),
    },
    {
        value: 'price-low-high',
        label: 'Price: Low to High',
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpDown, { className: "h-4 w-4" }),
    },
    {
        value: 'price-high-low',
        label: 'Price: High to Low',
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpDown, { className: "h-4 w-4" }),
    },
    {
        value: 'popularity',
        label: 'Popularity',
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, { className: "h-4 w-4" }),
    },
    {
        value: 'discount',
        label: 'Discount %',
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Percent, { className: "h-4 w-4" }),
    },
];
function SortDropdown() {
    var dispatch = (0, react_redux_1.useDispatch)();
    var sortBy = (0, react_redux_1.useSelector)(function (state) { return state.filter.sortBy; });
    var handleSortChange = function (value) {
        dispatch((0, filterSlice_1.setSortBy)(value));
    };
    var getCurrentSortIcon = function () {
        var currentSort = sortOptions.find(function (option) { return option.value === sortBy; });
        return (currentSort === null || currentSort === void 0 ? void 0 : currentSort.icon) || (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpDown, { className: "h-4 w-4" });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium text-muted-foreground", children: "Sort by:" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: sortBy, onValueChange: handleSortChange, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "w-[180px]", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [getCurrentSortIcon(), (0, jsx_runtime_1.jsx)(select_1.SelectValue, {})] }) }), (0, jsx_runtime_1.jsx)(select_1.SelectContent, { children: sortOptions.map(function (option) { return ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: option.value, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [option.icon, option.label] }) }, option.value)); }) })] })] }));
}
