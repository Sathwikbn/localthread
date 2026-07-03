"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterSidebar = FilterSidebar;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_redux_1 = require("react-redux");
var filterSlice_1 = require("../../store/filterSlice");
var button_1 = require("../ui/button");
var checkbox_1 = require("../ui/checkbox");
var slider_1 = require("../ui/slider");
var separator_1 = require("../ui/separator");
var badge_1 = require("../ui/badge");
var lucide_react_1 = require("lucide-react");
var categories = [
    { value: 't-shirts', label: 'T-Shirts', count: 45 },
    { value: 'ethnic', label: 'Ethnic Wear', count: 32 },
    { value: 'hoodies', label: 'Hoodies', count: 28 },
    { value: 'jeans', label: 'Jeans', count: 56 },
    { value: 'dresses', label: 'Dresses', count: 38 },
    { value: 'shirts', label: 'Shirts', count: 42 },
];
var sizes = [
    { value: 'S', label: 'Small', count: 89 },
    { value: 'M', label: 'Medium', count: 156 },
    { value: 'L', label: 'Large', count: 134 },
    { value: 'XL', label: 'Extra Large', count: 67 },
    { value: 'XXL', label: '2XL', count: 34 },
];
var colors = [
    { value: 'black', label: 'Black', hex: '#000000' },
    { value: 'white', label: 'White', hex: '#ffffff' },
    { value: 'red', label: 'Red', hex: '#ff0000' },
    { value: 'blue', label: 'Blue', hex: '#0000ff' },
    { value: 'green', label: 'Green', hex: '#00ff00' },
    { value: 'yellow', label: 'Yellow', hex: '#ffff00' },
    { value: 'purple', label: 'Purple', hex: '#800080' },
    { value: 'pink', label: 'Pink', hex: '#ffc0cb' },
];
var vendors = [
    { id: 'vendor1', name: 'Fashion Hub', count: 45 },
    { id: 'vendor2', name: 'Style Studio', count: 32 },
    { id: 'vendor3', name: 'Urban Threads', count: 28 },
    { id: 'vendor4', name: 'Elegant Wear', count: 56 },
    { id: 'vendor5', name: 'Trendy Boutique', count: 38 },
];
function FilterSidebar(_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, _b = _a.isStatic, isStatic = _b === void 0 ? false : _b;
    var dispatch = (0, react_redux_1.useDispatch)();
    var filterState = (0, react_redux_1.useSelector)(function (state) { return state.filter; });
    var handleCategoryChange = function (category, checked) {
        var newCategories = checked
            ? __spreadArray(__spreadArray([], filterState.category, true), [category], false) : filterState.category.filter(function (c) { return c !== category; });
        dispatch((0, filterSlice_1.setCategory)(newCategories));
    };
    var handleSizeChange = function (size, checked) {
        var newSizes = checked
            ? __spreadArray(__spreadArray([], filterState.size, true), [size], false) : filterState.size.filter(function (s) { return s !== size; });
        dispatch((0, filterSlice_1.setSize)(newSizes));
    };
    var handleColorChange = function (color, checked) {
        var newColors = checked
            ? __spreadArray(__spreadArray([], filterState.colors, true), [color], false) : filterState.colors.filter(function (c) { return c !== color; });
        dispatch((0, filterSlice_1.setColors)(newColors));
    };
    var handleVendorChange = function (vendorId, checked) {
        var newVendors = checked
            ? __spreadArray(__spreadArray([], filterState.vendors, true), [vendorId], false) : filterState.vendors.filter(function (v) { return v !== vendorId; });
        dispatch((0, filterSlice_1.setVendors)(newVendors));
    };
    var handlePriceRangeChange = function (value) {
        dispatch((0, filterSlice_1.setPriceRange)([value[0], value[1]]));
    };
    var handleClearFilters = function () {
        dispatch((0, filterSlice_1.clearFilters)());
    };
    var getActiveFiltersCount = function () {
        return (filterState.category.length +
            filterState.size.length +
            filterState.colors.length +
            filterState.vendors.length +
            (filterState.priceRange[0] > 0 || filterState.priceRange[1] < 1000 ? 1 : 0));
    };
    var sidebarClasses = isStatic 
        ? "w-full bg-white/40 backdrop-blur-md rounded-3xl border border-[var(--lt-border)] p-6 shadow-lt-sm space-y-6" 
        : "fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-[var(--lt-border)] shadow-lg transform transition-transform duration-300 ease-in-out " + (isOpen ? 'translate-x-0' : '-translate-x-full');

    return ((0, jsx_runtime_1.jsx)("div", {
        className: sidebarClasses,
        children: (0, jsx_runtime_1.jsxs)("div", {
            className: isStatic ? "" : "flex flex-col h-full",
            children: [
                !isStatic && (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center justify-between p-5 border-b border-[var(--lt-border)] bg-slate-50/50",
                    children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center gap-2",
                            children: [
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Filter, { className: "h-4.5 w-4.5 text-[var(--lt-amber)]" }),
                                (0, jsx_runtime_1.jsx)("h2", { className: "text-sm font-bold font-display uppercase tracking-widest text-[var(--lt-charcoal)]", children: "Filters" }),
                                getActiveFiltersCount() > 0 && (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "secondary", className: "bg-[var(--lt-amber)] text-white text-[10px] rounded-full", children: getActiveFiltersCount() })
                            ]
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center gap-2",
                            children: [
                                (0, jsx_runtime_1.jsxs)(button_1.Button, {
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: handleClearFilters,
                                    className: "text-[10px] font-black uppercase tracking-wider text-[var(--lt-amber)] hover:bg-[var(--lt-amber-pale)] rounded-xl cursor-pointer",
                                    children: [
                                        (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { className: "h-3 w-3 mr-1" }),
                                        "Reset"
                                    ]
                                }),
                                (0, jsx_runtime_1.jsx)(button_1.Button, {
                                    variant: "ghost",
                                    size: "icon",
                                    onClick: onClose,
                                    className: "h-8 w-8 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer",
                                    children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4" })
                                })
                            ]
                        })
                    ]
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                    className: (isStatic ? "" : "flex-1 overflow-y-auto p-5") + " space-y-6",
                    children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                                (0, jsx_runtime_1.jsx)("h3", { className: "text-[10px] font-black uppercase tracking-widest text-[var(--lt-muted)] font-display mb-3.5", children: "Categories" }),
                                (0, jsx_runtime_1.jsx)("div", {
                                    className: "space-y-2.5",
                                    children: categories.map(function (category) {
                                        var isChecked = filterState.category.includes(category.value);
                                        return ((0, jsx_runtime_1.jsxs)("div", {
                                            className: "flex items-center space-x-3.5 group",
                                            children: [
                                                (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, {
                                                    id: "category-" + category.value,
                                                    checked: isChecked,
                                                    onCheckedChange: function (checked) { return handleCategoryChange(category.value, checked); },
                                                    className: "border-[var(--lt-border)] data-[state=checked]:bg-[var(--lt-charcoal)] data-[state=checked]:border-[var(--lt-charcoal)]"
                                                }),
                                                (0, jsx_runtime_1.jsx)("label", {
                                                    htmlFor: "category-" + category.value,
                                                    className: "text-xs font-semibold leading-none text-[var(--lt-charcoal)] font-body flex-1 cursor-pointer group-hover:text-[var(--lt-amber)] transition-colors",
                                                    children: category.label
                                                }),
                                                (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                                                    variant: "outline",
                                                    className: "text-[9px] font-bold font-mono px-1.5 py-0.5 rounded-md border-[var(--lt-border)] text-[var(--lt-muted)] bg-white",
                                                    children: category.count
                                                })
                                            ]
                                        }, category.value));
                                    })
                                })
                            ]
                        }),
                        (0, jsx_runtime_1.jsx)(separator_1.Separator, { className: "bg-[var(--lt-border)]" }),
                        (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                                (0, jsx_runtime_1.jsx)("h3", { className: "text-[10px] font-black uppercase tracking-widest text-[var(--lt-muted)] font-display mb-3.5", children: "Sizes" }),
                                (0, jsx_runtime_1.jsx)("div", {
                                    className: "grid grid-cols-2 gap-2.5",
                                    children: sizes.map(function (size) {
                                        var isChecked = filterState.size.includes(size.value);
                                        return ((0, jsx_runtime_1.jsxs)("div", {
                                            className: "flex items-center space-x-2.5 group",
                                            children: [
                                                (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, {
                                                    id: "size-" + size.value,
                                                    checked: isChecked,
                                                    onCheckedChange: function (checked) { return handleSizeChange(size.value, checked); },
                                                    className: "border-[var(--lt-border)] data-[state=checked]:bg-[var(--lt-charcoal)] data-[state=checked]:border-[var(--lt-charcoal)]"
                                                }),
                                                (0, jsx_runtime_1.jsx)("label", {
                                                    htmlFor: "size-" + size.value,
                                                    className: "text-xs font-semibold leading-none text-[var(--lt-charcoal)] font-body flex-1 cursor-pointer group-hover:text-[var(--lt-amber)] transition-colors",
                                                    children: size.label
                                                }),
                                                (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                                                    variant: "outline",
                                                    className: "text-[9px] font-bold font-mono px-1.5 py-0.5 rounded-md border-[var(--lt-border)] text-[var(--lt-muted)] bg-white",
                                                    children: size.count
                                                })
                                            ]
                                        }, size.value));
                                    })
                                })
                            ]
                        }),
                        (0, jsx_runtime_1.jsx)(separator_1.Separator, { className: "bg-[var(--lt-border)]" }),
                        (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                                (0, jsx_runtime_1.jsx)("h3", { className: "text-[10px] font-black uppercase tracking-widest text-[var(--lt-muted)] font-display mb-3.5", children: "Price Range" }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                    className: "px-2",
                                    children: [
                                        (0, jsx_runtime_1.jsx)(slider_1.Slider, {
                                            value: filterState.priceRange,
                                            onValueChange: handlePriceRangeChange,
                                            max: 1000,
                                            min: 0,
                                            step: 10,
                                            className: "w-full"
                                        }),
                                        (0, jsx_runtime_1.jsxs)("div", {
                                            className: "flex justify-between mt-3 text-xs font-mono font-bold text-[var(--lt-charcoal)]",
                                            children: [
                                                (0, jsx_runtime_1.jsxs)("span", { children: ["\u20B9", filterState.priceRange[0]] }),
                                                (0, jsx_runtime_1.jsxs)("span", { children: ["\u20B9", filterState.priceRange[1]] })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        (0, jsx_runtime_1.jsx)(separator_1.Separator, { className: "bg-[var(--lt-border)]" }),
                        (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                                (0, jsx_runtime_1.jsx)("h3", { className: "text-[10px] font-black uppercase tracking-widest text-[var(--lt-muted)] font-display mb-3.5", children: "Colors" }),
                                (0, jsx_runtime_1.jsx)("div", {
                                    className: "grid grid-cols-4 gap-3",
                                    children: colors.map(function (color) {
                                        var isSelected = filterState.colors.includes(color.value);
                                        return ((0, jsx_runtime_1.jsxs)("div", {
                                            className: "flex flex-col items-center space-y-1.5",
                                            children: [
                                                (0, jsx_runtime_1.jsx)("div", {
                                                    className: "w-8.5 h-8.5 rounded-full border-2 cursor-pointer transition-all duration-300 flex items-center justify-center shrink-0 " + (isSelected ? 'border-[var(--lt-charcoal)] scale-110 shadow-lt-sm' : 'border-[var(--lt-border)] hover:scale-105'),
                                                    style: { backgroundColor: color.hex },
                                                    onClick: function () {
                                                        return handleColorChange(color.value, !isSelected);
                                                    },
                                                    children: isSelected && (0, jsx_runtime_1.jsx)("span", { className: "w-2.5 h-2.5 rounded-full " + (['white', 'yellow', '#ffffff', '#ffff00'].includes(color.value) ? 'bg-slate-900' : 'bg-white') })
                                                }),
                                                (0, jsx_runtime_1.jsx)("span", { className: "text-[9px] font-bold uppercase tracking-wider text-[var(--lt-muted)] font-display", children: color.label })
                                            ]
                                        }, color.value));
                                    })
                                })
                            ]
                        }),
                        (0, jsx_runtime_1.jsx)(separator_1.Separator, { className: "bg-[var(--lt-border)]" }),
                        (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                                (0, jsx_runtime_1.jsx)("h3", { className: "text-[10px] font-black uppercase tracking-widest text-[var(--lt-muted)] font-display mb-3.5", children: "Boutique Stores" }),
                                (0, jsx_runtime_1.jsx)("div", {
                                    className: "space-y-2.5",
                                    children: vendors.map(function (vendor) {
                                        var isChecked = filterState.vendors.includes(vendor.id);
                                        return ((0, jsx_runtime_1.jsxs)("div", {
                                            className: "flex items-center space-x-3.5 group",
                                            children: [
                                                (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, {
                                                    id: "vendor-" + vendor.id,
                                                    checked: isChecked,
                                                    onCheckedChange: function (checked) { return handleVendorChange(vendor.id, checked); },
                                                    className: "border-[var(--lt-border)] data-[state=checked]:bg-[var(--lt-charcoal)] data-[state=checked]:border-[var(--lt-charcoal)]"
                                                }),
                                                (0, jsx_runtime_1.jsx)("label", {
                                                    htmlFor: "vendor-" + vendor.id,
                                                    className: "text-xs font-semibold leading-none text-[var(--lt-charcoal)] font-body flex-1 cursor-pointer group-hover:text-[var(--lt-amber)] transition-colors",
                                                    children: vendor.name
                                                }),
                                                (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                                                    variant: "outline",
                                                    className: "text-[9px] font-bold font-mono px-1.5 py-0.5 rounded-md border-[var(--lt-border)] text-[var(--lt-muted)] bg-white",
                                                    children: vendor.count
                                                })
                                            ]
                                        }, vendor.id));
                                    })
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    }));
}
