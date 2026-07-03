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
exports.ProductListingPage = ProductListingPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var ProductGrid_1 = require("./ProductGrid");
var products_1 = require("../data/products");
var button_1 = require("./ui/button");
var input_1 = require("./ui/input");
var label_1 = require("./ui/label");
var select_1 = require("./ui/select");
var checkbox_1 = require("./ui/checkbox");
var Header_1 = require("./Header");
var Footer_1 = require("./Footer");
var sonner_1 = require("sonner");
var react_redux_1 = require("react-redux");
var cartSlice_1 = require("../store/cartSlice");
var wishlistSlice_1 = require("../store/wishlistSlice");
function ProductListingPage() {
    var dispatch = (0, react_redux_1.useDispatch)();
    var wishlistItems = (0, react_redux_1.useSelector)(function (state) { return state.wishlist.items; });
    var _a = (0, react_1.useState)({
        priceMin: '',
        priceMax: '',
        sizes: [],
        colors: [],
        categories: [],
    }), filters = _a[0], setFilters = _a[1];
    var _b = (0, react_1.useState)('newest'), sortBy = _b[0], setSortBy = _b[1];
    var _c = (0, react_1.useState)(12), displayCount = _c[0], setDisplayCount = _c[1]; // Number of products to display initially
    var allCategories = (0, react_1.useMemo)(function () { return Array.from(new Set(products_1.featuredProducts.map(function (p) { return p.category; }))); }, []);
    var allSizes = (0, react_1.useMemo)(function () { return Array.from(new Set(products_1.featuredProducts.flatMap(function (p) { return p.sizes || []; }))); }, []);
    var allColors = (0, react_1.useMemo)(function () { return Array.from(new Set(products_1.featuredProducts.flatMap(function (p) { return p.colors || []; }))); }, []);
    var handleFilterChange = function (key, value, type) {
        if (type === 'text') {
            setFilters(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[key] = value, _a)));
            });
        }
        else if (type === 'checkbox') {
            setFilters(function (prev) {
                var _a, _b;
                var currentArray = prev[key];
                if (value) {
                    return __assign(__assign({}, prev), (_a = {}, _a[key] = __spreadArray(__spreadArray([], currentArray, true), [value], false), _a));
                }
                else {
                    return __assign(__assign({}, prev), (_b = {}, _b[key] = currentArray.filter(function (item) { return item !== value; }), _b));
                }
            });
        }
    };
    var handleSortChange = function (value) {
        setSortBy(value);
    };
    var filteredAndSortedProducts = (0, react_1.useMemo)(function () {
        var products = __spreadArray([], products_1.featuredProducts, true);
        // Apply filters
        if (filters.priceMin) {
            products = products.filter(function (p) { return p.price >= parseFloat(filters.priceMin); });
        }
        if (filters.priceMax) {
            products = products.filter(function (p) { return p.price <= parseFloat(filters.priceMax); });
        }
        if (filters.sizes.length > 0) {
            products = products.filter(function (p) { var _a; return (_a = p.sizes) === null || _a === void 0 ? void 0 : _a.some(function (s) { return filters.sizes.includes(s); }); });
        }
        if (filters.colors.length > 0) {
            products = products.filter(function (p) { var _a; return (_a = p.colors) === null || _a === void 0 ? void 0 : _a.some(function (c) { return filters.colors.includes(c); }); });
        }
        if (filters.categories.length > 0) {
            products = products.filter(function (p) { return filters.categories.includes(p.category); });
        }
        // Apply sorting
        products.sort(function (a, b) {
            switch (sortBy) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'newest':
                    // Assuming products are already sorted by newest or have a 'createdAt' field
                    return 0; // Placeholder for now
                case 'popularity':
                    // Placeholder for now
                    return 0;
                default:
                    return 0;
            }
        });
        return products;
    }, [filters, sortBy]);
    var productsToDisplay = (0, react_1.useMemo)(function () {
        return filteredAndSortedProducts.slice(0, displayCount);
    }, [filteredAndSortedProducts, displayCount]);
    var handleLoadMore = function () {
        setDisplayCount(function (prev) { return prev + 12; });
    };
    var handleAddToCart = function (productId) {
        dispatch((0, cartSlice_1.addToCart)({ productId: productId }));
        sonner_1.toast.success("Added to cart!");
    };
    var handleToggleWishlist = function (productId) {
        var isCurrentlyInWishlist = wishlistItems.includes(productId);
        dispatch((0, wishlistSlice_1.toggleWishlist)(productId));
        if (isCurrentlyInWishlist) {
            sonner_1.toast.success("Removed from wishlist");
        }
        else {
            sonner_1.toast.success("Added to wishlist!");
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-background", children: [(0, jsx_runtime_1.jsx)(Header_1.Header, {}), (0, jsx_runtime_1.jsxs)("main", { className: "container mx-auto px-4 py-8", children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-8", children: (0, jsx_runtime_1.jsxs)("h1", { className: "text-3xl font-bold", children: ["All Products \u2014 ", filteredAndSortedProducts.length, " items"] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row gap-8", children: [(0, jsx_runtime_1.jsxs)("aside", { className: "w-full md:w-64 sticky top-20 h-fit bg-card p-6 rounded-lg shadow-sm", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-semibold mb-4", children: "Filters" }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-6", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "price-range", className: "mb-2 block", children: "Price Range" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { type: "number", placeholder: "Min", value: filters.priceMin, onChange: function (e) { return handleFilterChange('priceMin', e.target.value, 'text'); }, className: "w-1/2" }), (0, jsx_runtime_1.jsx)(input_1.Input, { type: "number", placeholder: "Max", value: filters.priceMax, onChange: function (e) { return handleFilterChange('priceMax', e.target.value, 'text'); }, className: "w-1/2" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-medium mb-2", children: "Categories" }), allCategories.map(function (category) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2 mb-1", children: [(0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, { id: "category-".concat(category), checked: filters.categories.includes(category), onCheckedChange: function (checked) { return handleFilterChange('categories', category, 'checkbox'); } }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "category-".concat(category), children: category })] }, category)); })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-medium mb-2", children: "Sizes" }), allSizes.map(function (size) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2 mb-1", children: [(0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, { id: "size-".concat(size), checked: filters.sizes.includes(size), onCheckedChange: function (checked) { return handleFilterChange('sizes', size, 'checkbox'); } }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "size-".concat(size), children: size })] }, size)); })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-medium mb-2", children: "Colors" }), allColors.map(function (color) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2 mb-1", children: [(0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, { id: "color-".concat(color), checked: filters.colors.includes(color), onCheckedChange: function (checked) { return handleFilterChange('colors', color, 'checkbox'); } }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "color-".concat(color), children: color })] }, color)); })] })] }), (0, jsx_runtime_1.jsxs)("main", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-end mb-6", children: (0, jsx_runtime_1.jsxs)(select_1.Select, { value: sortBy, onValueChange: handleSortChange, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "w-[180px]", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Sort by" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "newest", children: "Newest" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "price-asc", children: "Price: Low to High" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "price-desc", children: "Price: High to Low" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "popularity", children: "Popularity" })] })] }) }), (0, jsx_runtime_1.jsx)(ProductGrid_1.ProductGrid, { products: productsToDisplay, onAddToCart: handleAddToCart, onToggleWishlist: handleToggleWishlist }), productsToDisplay.length < filteredAndSortedProducts.length && ((0, jsx_runtime_1.jsx)("div", { className: "text-center mt-8", children: (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleLoadMore, variant: "outline", children: "Load More Products" }) }))] })] })] }), (0, jsx_runtime_1.jsx)(Footer_1.Footer, {})] }));
}
