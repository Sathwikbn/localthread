"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductListingPage = ProductListingPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var filterSlice_1 = require("../../store/filterSlice");
var ProductGrid_1 = require("../ProductGrid");
var FilterSidebar_1 = require("../filters/FilterSidebar");
var SortDropdown_1 = require("../filters/SortDropdown");
var SearchBar_1 = require("../filters/SearchBar");
var Pagination_1 = require("../filters/Pagination");
var product_skeleton_1 = require("../ui/product-skeleton");
var empty_state_1 = require("../ui/empty-state");
var button_1 = require("../ui/button");
var lucide_react_1 = require("lucide-react");
var productAPI_1 = require("../../services/productAPI");
var cartSlice_1 = require("../../store/cartSlice");
var wishlistSlice_1 = require("../../store/wishlistSlice");
var sonner_1 = require("sonner");
function ProductListingPage() {
    var _this = this;
    var getImageUrl = function (path) {
        if (!path) return '';
        if (path.startsWith('http://') || path.startsWith('https://')) return path;
        var apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        var serverRoot = apiBase.endsWith('/api') ? apiBase.slice(0, -4) : apiBase;
        var cleanPath = path.startsWith('/') ? path : '/' + path;
        return serverRoot + cleanPath;
    };
    var dispatch = (0, react_redux_1.useDispatch)();
    var filterState = (0, react_redux_1.useSelector)(function (state) { return state.filter; });
    var wishlistItems = (0, react_redux_1.useSelector)(function (state) { return state.wishlist.items; });
    var isAuthenticated = (0, react_redux_1.useSelector)(function (state) { return state.auth.isAuthenticated; });
    var _a = (0, react_1.useState)(false), isFilterOpen = _a[0], setIsFilterOpen = _a[1];
    var _b = (0, react_1.useState)([]), filteredProducts = _b[0], setFilteredProducts = _b[1];
    var _c = (0, react_1.useState)(1), totalPages = _c[0], setTotalPages = _c[1];
    var itemsPerPage = 12;
    var page = filterState.page, searchQuery = filterState.searchQuery, category = filterState.category, priceRange = filterState.priceRange, sortBy = filterState.sortBy;
    var categoryStr = category.join(',');
    var priceRangeStr = priceRange.join(',');
    var _d = (0, react_1.useState)(false), isLoading = _d[0], setIsLoading = _d[1];
    // Load products from backend when filters change
    (0, react_1.useEffect)(function () {
        var fetchProducts = function () { return __awaiter(_this, void 0, void 0, function () {
            var sortByField, sortOrder, categoryParam, response, mapped, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        setIsLoading(true);
                        sortByField = 'createdAt';
                        sortOrder = 'desc';
                        if (sortBy === 'price-low-high') {
                            sortByField = 'price';
                            sortOrder = 'asc';
                        }
                        else if (sortBy === 'price-high-low') {
                            sortByField = 'price';
                            sortOrder = 'desc';
                        }
                        else if (sortBy === 'popularity') {
                            sortByField = 'ratingAverage';
                            sortOrder = 'desc';
                        }
                        categoryParam = category.length > 0 ? category[0] : undefined;
                        return [4 /*yield*/, productAPI_1.productAPI.getAllProducts({
                                page: page,
                                limit: itemsPerPage,
                                search: searchQuery || undefined,
                                category: categoryParam,
                                minPrice: priceRange[0],
                                maxPrice: priceRange[1],
                                sortBy: sortByField,
                                sortOrder: sortOrder,
                            })];
                    case 1:
                        response = _a.sent();
                        var productsList = [];
                        var totalPagesCount = 1;
                        if (response) {
                            if (response.success && response.data && response.data.products) {
                                productsList = response.data.products;
                                totalPagesCount = response.data.pagination ? response.data.pagination.totalPages : 1;
                            } else if (response.products) {
                                productsList = response.products;
                                var totalItems = response.total || productsList.length;
                                totalPagesCount = Math.ceil(totalItems / itemsPerPage);
                            } else if (Array.isArray(response)) {
                                productsList = response;
                                totalPagesCount = 1;
                            }
                        }
                        if (productsList && productsList.length > 0) {
                            mapped = productsList.map(function (p) {
                                var _a;
                                return ({
                                    id: (p.id || p._id).toString(),
                                    name: p.name,
                                    price: p.price,
                                    originalPrice: p.originalPrice,
                                    image: getImageUrl(p.imageUrl || p.image || p.thumbnail || (p.images && p.images.length > 0 ? p.images[0] : '')),
                                    category: p.category,
                                    colors: p.colors || [],
                                    sizes: p.sizes || [],
                                    rating: p.ratingAverage || 0,
                                    vendorId: ((_a = p.vendorId) === null || _a === void 0 ? void 0 : _a.toString()) || '',
                                    description: p.description || '',
                                    createdAt: p.createdAt || '',
                                });
                            });
                            setFilteredProducts(mapped);
                            setTotalPages(totalPagesCount);
                        } else {
                            setFilteredProducts([]);
                            setTotalPages(1);
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        err_1 = _a.sent();
                        console.error('Fetch products error:', err_1);
                        return [3 /*break*/, 4];
                    case 3:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchProducts();
    }, [dispatch, page, searchQuery, categoryStr, priceRangeStr, sortBy]);
    var handleAddToCart = function (productId) {
        if (isAuthenticated) {
            dispatch((0, cartSlice_1.addToCartAsync)({ productId: productId, quantity: 1 }));
        }
        else {
            dispatch((0, cartSlice_1.addToCart)({ productId: productId, quantity: 1 }));
        }
        sonner_1.toast.success("Added to cart!");
    };
    var handleToggleWishlist = function (productId) {
        var isCurrentlyInWishlist = wishlistItems.includes(productId);
        if (isAuthenticated) {
            if (isCurrentlyInWishlist) {
                dispatch((0, wishlistSlice_1.removeFromWishlistAsync)(productId));
                sonner_1.toast.info("Removed from wishlist");
            }
            else {
                dispatch((0, wishlistSlice_1.addToWishlistAsync)(productId));
                sonner_1.toast.success("Added to wishlist!");
            }
        }
        else {
            dispatch((0, wishlistSlice_1.toggleWishlist)(productId));
            if (isCurrentlyInWishlist) {
                sonner_1.toast.info("Removed from wishlist");
            }
            else {
                sonner_1.toast.success("Added to wishlist!");
            }
        }
    };
    var handlePageChange = function (page) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    var currentProducts = filteredProducts;

    // Compile Active Filter Chips
    var activeChips = [];
    if (searchQuery) {
        activeChips.push({
            label: "Search: " + searchQuery,
            onClear: function () { dispatch((0, filterSlice_1.setSearchQuery)('')); }
        });
    }
    filterState.category.forEach(function (cat) {
        var labelMap = {
            't-shirts': 'T-Shirts',
            'ethnic': 'Ethnic Wear',
            'hoodies': 'Hoodies',
            'jeans': 'Jeans',
            'dresses': 'Dresses',
            'shirts': 'Shirts'
        };
        activeChips.push({
            label: "Category: " + (labelMap[cat] || cat),
            onClear: function () {
                dispatch((0, filterSlice_1.setCategory)(filterState.category.filter(function (c) { return c !== cat; })));
            }
        });
    });
    filterState.size.forEach(function (sz) {
        activeChips.push({
            label: "Size: " + sz,
            onClear: function () {
                dispatch((0, filterSlice_1.setSize)(filterState.size.filter(function (s) { return s !== sz; })));
            }
        });
    });
    filterState.colors.forEach(function (col) {
        activeChips.push({
            label: "Color: " + col.charAt(0).toUpperCase() + col.slice(1),
            onClear: function () {
                dispatch((0, filterSlice_1.setColors)(filterState.colors.filter(function (c) { return c !== col; })));
            }
        });
    });
    filterState.vendors.forEach(function (vId) {
        var vendorMap = {
            'vendor1': 'Fashion Hub',
            'vendor2': 'Style Studio',
            'vendor3': 'Urban Threads',
            'vendor4': 'Elegant Wear',
            'vendor5': 'Trendy Boutique'
        };
        activeChips.push({
            label: "Store: " + (vendorMap[vId] || vId),
            onClear: function () {
                dispatch((0, filterSlice_1.setVendors)(filterState.vendors.filter(function (v) { return v !== vId; })));
            }
        });
    });
    if (priceRange[0] > 0 || priceRange[1] < 1000) {
        activeChips.push({
            label: "Price: \u20B9" + priceRange[0] + " - \u20B9" + priceRange[1],
            onClear: function () { dispatch((0, filterSlice_1.setPriceRange)([0, 1000])); }
        });
    }

    return ((0, jsx_runtime_1.jsxs)("div", {
        className: "min-h-screen bg-[var(--lt-cream)] font-body text-[var(--lt-charcoal)]",
        children: [
            // Hero Banner Header
            (0, jsx_runtime_1.jsxs)("div", {
                className: "bg-white/40 border-b border-[var(--lt-border)] py-12 md:py-16 text-center space-y-4 px-4",
                children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                        className: "text-[10px] font-black uppercase tracking-widest text-[var(--lt-muted)] font-display flex items-center justify-center gap-2",
                        children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { size: 10, className: "text-[var(--lt-amber)] animate-pulse" }),
                            "Bespoke Local Apparel"
                        ]
                    }),
                    (0, jsx_runtime_1.jsx)("h1", {
                        className: "text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[var(--lt-charcoal)]",
                        children: "Discover Local Threads"
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                        className: "text-xs md:text-sm text-[var(--lt-muted)] font-body max-w-lg mx-auto leading-relaxed",
                        children: "Explore handcrafted garments, organic fabrics, and unique styles dispatched directly from verification-checked boutiques in your neighborhood."
                    })
                ]
            }),

            // Sticky Filter & Sort Sub-bar
            (0, jsx_runtime_1.jsx)("div", {
                className: "sticky top-16 z-40 bg-[var(--lt-cream)]/95 backdrop-blur-md border-b border-[var(--lt-border)] shadow-lt-sm",
                children: (0, jsx_runtime_1.jsx)("div", {
                    className: "w-full px-4 sm:px-8 md:px-12 lg:px-16 py-4",
                    children: (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4",
                        children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex flex-col sm:flex-row gap-3.5 flex-1 items-stretch sm:items-center",
                                children: [
                                    (0, jsx_runtime_1.jsx)(SearchBar_1.SearchBar, { className: "w-full sm:max-w-xs", placeholder: "Search local products..." }),
                                    (0, jsx_runtime_1.jsxs)("div", {
                                        className: "flex items-center gap-3.5",
                                        children: [
                                            (0, jsx_runtime_1.jsxs)(button_1.Button, {
                                                variant: "outline",
                                                onClick: function () { return setIsFilterOpen(true); },
                                                className: "lg:hidden border-[var(--lt-border)] bg-white text-xs font-bold font-display uppercase tracking-wider rounded-xl hover:bg-slate-50 cursor-pointer h-10 px-4 flex items-center justify-center",
                                                children: [
                                                    (0, jsx_runtime_1.jsx)(lucide_react_1.Filter, { className: "h-3.5 w-3.5 mr-2 text-[var(--lt-amber)]" }),
                                                    "Filters"
                                                ]
                                            }),
                                            (0, jsx_runtime_1.jsx)(SortDropdown_1.SortDropdown, {})
                                        ]
                                    })
                                ]
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                                className: "text-[11px] font-bold font-display uppercase tracking-widest text-[var(--lt-muted)] flex items-center gap-1.5 justify-end",
                                children: [
                                    (0, jsx_runtime_1.jsx)(lucide_react_1.Tag, { size: 12, className: "text-[var(--lt-amber)]" }),
                                    filteredProducts.length,
                                    " items found"
                                ]
                            })
                        ]
                    })
                })
            }),

            // Main Listing Area
            (0, jsx_runtime_1.jsx)("div", {
                className: "w-full px-4 sm:px-8 md:px-12 lg:px-16 py-10",
                children: (0, jsx_runtime_1.jsxs)("div", {
                    className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",

                    children: [
                        // Left Sidebar (desktop only, inline static sidebar)
                        (0, jsx_runtime_1.jsx)("div", {
                            className: "hidden lg:block lg:col-span-3 lg:sticky lg:top-36",
                            children: (0, jsx_runtime_1.jsx)(FilterSidebar_1.FilterSidebar, { isOpen: true, isStatic: true, onClose: function () { } })
                        }),

                        // Right Grid area (span 9 on desktop)
                        (0, jsx_runtime_1.jsxs)("div", {
                            className: "lg:col-span-9 flex-1 space-y-6",
                            children: [
                                // Active Filter Chips
                                activeChips.length > 0 && ((0, jsx_runtime_1.jsxs)("div", {
                                    className: "flex flex-wrap items-center gap-2 p-4 rounded-2xl bg-white border border-[var(--lt-border)] shadow-lt-sm",
                                    children: [
                                        (0, jsx_runtime_1.jsx)("span", {
                                            className: "text-[10px] font-black uppercase tracking-widest text-[var(--lt-muted)] font-display mr-1",
                                            children: "Active Filters:"
                                        }),
                                        activeChips.map(function (chip, idx) {
                                            return ((0, jsx_runtime_1.jsxs)("span", {
                                                className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--lt-cream-dark)] text-xs font-bold text-[var(--lt-charcoal)] border border-[var(--lt-border)] transition-all",
                                                children: [
                                                    chip.label,
                                                    (0, jsx_runtime_1.jsx)("button", {
                                                        onClick: chip.onClear,
                                                        className: "hover:text-[var(--lt-amber)] text-slate-400 focus:outline-none cursor-pointer font-bold ml-0.5",
                                                        children: "\u2715"
                                                    })
                                                ]
                                            }, idx));
                                        }),
                                        (0, jsx_runtime_1.jsx)("button", {
                                            onClick: function () { dispatch((0, filterSlice_1.clearFilters)()); },
                                            className: "text-[10px] font-black uppercase tracking-wider text-[var(--lt-amber)] hover:underline ml-auto cursor-pointer",
                                            children: "Clear All"
                                        })
                                    ]
                                })),

                                // Products listing grid or empty state
                                isLoading ? ((0, jsx_runtime_1.jsx)(product_skeleton_1.ProductGridSkeleton, { count: 8 })) : currentProducts.length > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                                    children: [
                                        (0, jsx_runtime_1.jsx)(ProductGrid_1.ProductGrid, {
                                            products: currentProducts,
                                            onAddToCart: handleAddToCart,
                                            onToggleWishlist: handleToggleWishlist
                                        }),
                                        (0, jsx_runtime_1.jsx)("div", {
                                            className: "mt-12 flex justify-center",
                                            children: (0, jsx_runtime_1.jsx)(Pagination_1.Pagination, {
                                                totalPages: totalPages,
                                                currentPage: filterState.page,
                                                onPageChange: handlePageChange
                                            })
                                        })
                                    ]
                                })) : ((0, jsx_runtime_1.jsx)(empty_state_1.EmptyState, {
                                    variant: filterState.searchQuery ? 'search' : 'filter',
                                    action: {
                                        label: 'Reset Filters',
                                        onClick: function () {
                                            dispatch((0, filterSlice_1.clearFilters)());
                                        }
                                    }
                                }))
                            ]
                        })
                    ]
                })
            }),

            // Mobile sliding drawer sidebar
            (0, jsx_runtime_1.jsx)(FilterSidebar_1.FilterSidebar, { isOpen: isFilterOpen, onClose: function () { return setIsFilterOpen(false); } }),
            isFilterOpen && ((0, jsx_runtime_1.jsx)("div", {
                className: "fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300",
                onClick: function () { return setIsFilterOpen(false); }
            }))
        ]
    }));
}
