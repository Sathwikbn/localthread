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
exports.ProductDetailsPage = ProductDetailsPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var button_1 = require("./ui/button");
var products_1 = require("../data/products");
var shops_1 = require("../data/shops");
var ImageWithFallback_1 = require("./figma/ImageWithFallback");
var ProductGrid_1 = require("./ProductGrid");
var sonner_1 = require("sonner");
var react_redux_1 = require("react-redux");
var cartSlice_1 = require("../store/cartSlice");
var wishlistSlice_1 = require("../store/wishlistSlice");
var productAPI_1 = require("../services/productAPI");
var shopAPI_1 = require("../services/shopAPI");
var reviewAPI_1 = require("../services/reviewAPI");
var useRecentlyViewed_1 = require("../hooks/useRecentlyViewed");
var Skeleton_1 = require("./ui/skeleton");
var Breadcrumbs_1 = require("./ui/Breadcrumbs");
var BoutiqueChatBubble_1 = require("./BoutiqueChatBubble");
function ProductDetailsPage() {
    var _this = this;
    var _a;
    var id = (0, react_router_dom_1.useParams)().id;
    var getImageUrl = function (path) {
        if (!path) return '';
        if (path.startsWith('http://') || path.startsWith('https://')) return path;
        var apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        var serverRoot = apiBase.endsWith('/api') ? apiBase.slice(0, -4) : apiBase;
        var cleanPath = path.startsWith('/') ? path : '/' + path;
        return serverRoot + cleanPath;
    };
    var _b = (0, react_1.useState)(null), product = _b[0], setProduct = _b[1];
    var _c = (0, react_1.useState)(true), isLoadingProduct = _c[0], setIsLoadingProduct = _c[1];
    var dispatch = (0, react_redux_1.useDispatch)();
    var wishlistItems = (0, react_redux_1.useSelector)(function (state) { return state.wishlist.items; });
    var isAuthenticated = (0, react_redux_1.useSelector)(function (state) { return state.auth.isAuthenticated; });
    var recentlyViewed = (0, useRecentlyViewed_1.useRecentlyViewed)();
    var _d = (0, react_1.useState)(undefined), selectedSize = _d[0], setSelectedSize = _d[1];
    var _e = (0, react_1.useState)(undefined), selectedColor = _e[0], setSelectedColor = _e[1];
    var _f = (0, react_1.useState)(1), quantity = _f[0], setQuantity = _f[1];
    // Accordion states
    var _g = (0, react_1.useState)(true), isDescOpen = _g[0], setIsDescOpen = _g[1];
    var _h = (0, react_1.useState)(false), isSpecsOpen = _h[0], setIsSpecsOpen = _h[1];
    var _j = (0, react_1.useState)(false), isShippingOpen = _j[0], setIsShippingOpen = _j[1];
    
    // Gallery & Reviews states
    var _k = (0, react_1.useState)(null), selectedImage = _k[0], setSelectedImage = _k[1];
    var _l = (0, react_1.useState)([]), reviews = _l[0], setReviews = _l[1];
    var _m = (0, react_1.useState)(5), reviewRating = _m[0], setReviewRating = _m[1];
    var _n = (0, react_1.useState)(''), reviewComment = _n[0], setReviewComment = _n[1];
    var _o = (0, react_1.useState)(''), reviewName = _o[0], setReviewName = _o[1];
    var _ratingFilter = (0, react_1.useState)(0), ratingFilter = _ratingFilter[0], setRatingFilter = _ratingFilter[1];
    var _sortByFilter = (0, react_1.useState)('recent'), sortByFilter = _sortByFilter[0], setSortByFilter = _sortByFilter[1];

    (0, react_1.useEffect)(function () {
        var fetchProductDetails = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, p, colors, sizes, err_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!id)
                            return [2 /*return*/];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        setIsLoadingProduct(true);
                        return [4 /*yield*/, productAPI_1.productAPI.getProduct(id)];
                    case 2:
                        response = _c.sent();
                        p = (response && response.success && response.data && response.data.product)
                            || (response && response.id ? response : null);
                        if (p) {
                            var colors = [];
                            if (p.colors) {
                                if (typeof p.colors === 'string') {
                                    colors = p.colors.split(',').map(function (c) { return c.trim(); });
                                } else if (Array.isArray(p.colors)) {
                                    colors = p.colors;
                                }
                            } else if (p.variants) {
                                colors = Array.from(new Set(p.variants.map(function (v) { return v.color; }).filter(Boolean)));
                            }
                            if (colors.length === 0) {
                                colors = ["Black", "White", "Navy"];
                            }

                            var sizes = [];
                            if (p.sizes) {
                                if (typeof p.sizes === 'string') {
                                    sizes = p.sizes.split(',').map(function (s) { return s.trim(); });
                                } else if (Array.isArray(p.sizes)) {
                                    sizes = p.sizes;
                                }
                            } else if (p.variants) {
                                sizes = Array.from(new Set(p.variants.map(function (v) { return v.size; }).filter(Boolean)));
                            }
                            if (sizes.length === 0) {
                                sizes = ["S", "M", "L", "XL"];
                            }

                            var rawImages = p.imageUrl || p.image || p.thumbnail;
                            var galleryList = [];
                            if (rawImages) {
                                if (typeof rawImages === 'string' && rawImages.indexOf(',') !== -1) {
                                    galleryList = rawImages.split(',').map(function (path) { return getImageUrl(path.trim()); });
                                } else {
                                    galleryList = [getImageUrl(rawImages)];
                                }
                            }
                            if (galleryList.length < 3) {
                                galleryList = galleryList.concat([
                                    "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=500&fit=crop",
                                    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=500&fit=crop",
                                    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=500&fit=crop"
                                ].slice(0, 3 - galleryList.length));
                            }

                            setProduct({
                                id: (p.id || p._id).toString(),
                                name: p.name,
                                price: p.price,
                                originalPrice: p.originalPrice,
                                image: galleryList[0],
                                images: galleryList,
                                category: p.category,
                                colors: colors,
                                sizes: sizes,
                                rating: p.ratingAverage || (p.rating ? p.rating.average : 0),
                                vendorId: ((_b = p.vendorId) === null || _b === void 0 ? void 0 : _b.toString()) || '',
                                shopId: ((_c = p.shopId) === null || _c === void 0 ? void 0 : _c.toString()) || '',
                                description: p.description || 'Elevate your daily wear with this carefully designed boutique item, made with locally sourced materials.',
                                createdAt: p.createdAt || '',
                                shop: p.shop,
                                stock: p.stock !== undefined ? p.stock : 10
                            });
                            var idToFetch = p.shopId || p.vendorId;
                            if (idToFetch) {
                                shopAPI_1.shopAPI.getShopById(Number(idToFetch.toString().replace('vendor', '')))
                                    .then(function (shopRes) {
                                        var shopDetails = (shopRes && shopRes.data && shopRes.data.shop) || (shopRes && shopRes.id ? shopRes : null);
                                        if (shopDetails) {
                                            setProduct(function (prev) {
                                                return prev ? Object.assign({}, prev, { shop: shopDetails }) : null;
                                            });
                                        }
                                    })
                                    .catch(function (e) {
                                        console.error("Error fetching shop details:", e);
                                    });
                            }
                            // Pre-select first size/color if available
                            if (sizes.length > 0)
                                setSelectedSize(sizes[0]);
                            if (colors.length > 0)
                                setSelectedColor(colors[0]);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _c.sent();
                        console.error('Fetch product details error:', err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        {
                            setIsLoadingProduct(false);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        fetchProductDetails();
    }, [id]);
    (0, react_1.useEffect)(function () {
        if (isAuthenticated) {
            dispatch((0, wishlistSlice_1.fetchWishlist)());
        }
    }, [dispatch, isAuthenticated]);

    (0, react_1.useEffect)(function () {
        if (product) {
            setSelectedImage(product.image);
            recentlyViewed.addItem(product);
            
            var seedReviews = [
                { id: "seed-1", userName: "Aarav S.", rating: 5, comment: "Absolutely love the warm, premium quality of this " + product.name + "! Fits perfectly and supports our neighborhood boutique.", createdAt: new Date(Date.now() - 5*24*60*60*1000).toISOString(), likes: 12 },
                { id: "seed-2", userName: "Priya K.", rating: 4, comment: "Great material, sustainable and eco-friendly packaging. Fast local delivery within a few hours. Will buy again!", createdAt: new Date(Date.now() - 2*24*60*60*1000).toISOString(), likes: 7 }
            ];

            reviewAPI_1.reviewAPI.getProductReviews(Number(product.id))
                .then(function (res) {
                    if (res && res.success && res.data && Array.isArray(res.data.reviews)) {
                        var dbReviews = res.data.reviews.map(function (rev) {
                            return {
                                id: rev.id,
                                userName: rev.userName || "Customer",
                                rating: rev.rating,
                                comment: rev.comment,
                                createdAt: rev.createdAt,
                                likes: rev.likes || 0
                            };
                        });
                        setReviews(dbReviews.concat(seedReviews));
                    } else {
                        setReviews(seedReviews);
                    }
                })
                .catch(function (err) {
                    console.error("Error fetching product reviews:", err);
                    setReviews(seedReviews);
                });
        }
    }, [product]);

    var processedReviews = reviews
        .filter(function (r) {
            return ratingFilter === 0 || r.rating === ratingFilter;
        })
        .sort(function (a, b) {
            if (sortByFilter === 'helpful') {
                return (b.likes || 0) - (a.likes || 0);
            }
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

    if (isLoadingProduct) {
        return (0, jsx_runtime_1.jsx)(Skeleton_1.SkeletonProductDetail, {});
    }
    if (!product) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "container mx-auto px-4 py-20 text-center font-display font-bold text-[var(--lt-charcoal)]", children: "Product not found." }));
    }
    // Resolve shop for spotlight card
    var resolvedShop = product.shop
        ? (shops_1.shops.find(function (s) { return s.name.toLowerCase() === product.shop.name.toLowerCase(); }) || {
            id: ((_a = product.shop.id) === null || _a === void 0 ? void 0 : _a.toString()) || 'vendor1',
            name: product.shop.name,
            description: product.shop.description,
            ratingAverage: product.shop.ratingAverage || 4.5,
            distance: 2.3,
            isVerified: product.shop.verified || product.shop.isVerified || true,
            logo: getImageUrl(product.shop.logoUrl || product.shop.logo) || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
            city: product.shop.city || product.shop.location || 'Ward 3',
            state: product.shop.state || 'West Bengal'
        })
        : (shops_1.shops.find(function (s) {
            var cleanVendorId = product.vendorId ? product.vendorId.toString().replace('vendor', '') : '';
            var targetVendorId = 'vendor' + cleanVendorId;
            var cleanShopId = product.shopId ? product.shopId.toString().replace('vendor', '') : '';
            var targetShopId = 'vendor' + cleanShopId;
            return s.id.toString() === product.vendorId || s.id.toString() === targetVendorId || s.id.toString() === cleanVendorId ||
                   s.id.toString() === product.shopId || s.id.toString() === targetShopId || s.id.toString() === cleanShopId;
          }) || {
            id: product.vendorId || product.shopId || 'unknown',
            name: "Local Boutique",
            description: "Your local neighborhood boutique.",
            ratingAverage: 4.5,
            distance: 2.3,
            isVerified: true,
            logo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
            city: 'Salt Lake',
            state: 'West Bengal'
        });
    var handleAddToCart = function () {
        if (!selectedSize && product.sizes.length > 0) {
            sonner_1.toast.error("Please select a size");
            return;
        }
        if (!selectedColor && product.colors.length > 0) {
            sonner_1.toast.error("Please select a color");
            return;
        }
        if (isAuthenticated) {
            dispatch((0, cartSlice_1.addToCartAsync)({
                productId: product.id,
                size: selectedSize,
                color: selectedColor,
                quantity: quantity
            }));
        }
        else {
            dispatch((0, cartSlice_1.addToCart)({
                productId: product.id,
                size: selectedSize,
                color: selectedColor,
                quantity: quantity
            }));
        }
        sonner_1.toast.success("".concat(quantity, " x ").concat(product.name, " added to cart!"));
    };
    var handleToggleWishlist = function () {
        var isCurrentlyInWishlist = wishlistItems.includes(product.id);
        if (isAuthenticated) {
            if (isCurrentlyInWishlist) {
                dispatch((0, wishlistSlice_1.removeFromWishlistAsync)(product.id));
                sonner_1.toast.success("Removed from wishlist");
            }
            else {
                dispatch((0, wishlistSlice_1.addToWishlistAsync)(product.id));
                sonner_1.toast.success("Added to wishlist!");
            }
        }
        else {
            dispatch((0, wishlistSlice_1.toggleWishlist)(product.id));
            if (isCurrentlyInWishlist) {
                sonner_1.toast.success("Removed from wishlist");
            }
            else {
                sonner_1.toast.success("Added to wishlist!");
            }
        }
    };
    var handleQuantityChange = function (type) {
        if (type === 'increment') {
            setQuantity(function (prev) { return prev + 1; });
        }
        else if (type === 'decrement' && quantity > 1) {
            setQuantity(function (prev) { return prev - 1; });
        }
    };
    var handleAddReview = function () {
        if (!reviewName || !reviewComment) return;
        var newReview = {
            id: reviews.length + 1,
            userName: reviewName,
            rating: reviewRating,
            comment: reviewComment,
            createdAt: new Date().toISOString(),
            likes: 0
        };
        setReviews([newReview].concat(reviews));
        setReviewComment('');
        setReviewName('');
        setReviewRating(5);
        sonner_1.toast.success("Review posted successfully! Awaiting platform approval.");
        if (isAuthenticated) {
            reviewAPI_1.reviewAPI.createProductReview(product.id, { rating: reviewRating, comment: reviewComment })
                .catch(function (e) { console.log("Database review save skipped:", e); });
        }
    };

    return ((0, jsx_runtime_1.jsx)("div", {
        className: "bg-[var(--lt-cream)] font-body text-[var(--lt-charcoal)] min-h-screen py-8 fade-up",
        children: (0, jsx_runtime_1.jsxs)("main", {
            className: "container mx-auto px-4 sm:px-6 lg:px-8",
            children: [
                // 1. Breadcrumbs
                (0, jsx_runtime_1.jsx)(Breadcrumbs_1.Breadcrumbs, { items: [{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: product.name }] }),

                // 2. Product Details Grid (2 Columns)
                (0, jsx_runtime_1.jsxs)("div", {
                    className: "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start",
                    children: [
                        // Left Column (Grid span 6) - Media & Eco Impact
                        (0, jsx_runtime_1.jsxs)("div", {
                            className: "lg:col-span-6 space-y-6 lg:sticky lg:top-24",
                            children: [
                                // Large Main Image Container
                                (0, jsx_runtime_1.jsxs)("div", {
                                    className: "relative aspect-square overflow-hidden rounded-3xl border border-[var(--lt-border)] bg-white shadow-lt-md group",
                                    children: [
                                        (0, jsx_runtime_1.jsx)(ImageWithFallback_1.ImageWithFallback, {
                                            src: selectedImage || product.image,
                                            alt: product.name,
                                            className: "w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        }),
                                        (0, jsx_runtime_1.jsx)("div", {
                                            className: "absolute top-4 left-4 z-10",
                                            children: (0, jsx_runtime_1.jsxs)("span", {
                                                className: "distance-badge bg-white/95 backdrop-blur-md shadow-lt-sm text-[var(--lt-amber)]",
                                                children: [
                                                    (0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { size: 11, className: "inline mr-1" }),
                                                    resolvedShop.distance || 2.3,
                                                    " km away"
                                                ]
                                            })
                                        })
                                    ]
                                }),
                                // Thumbnail Gallery Row
                                (0, jsx_runtime_1.jsx)("div", {
                                    className: "flex gap-3 overflow-x-auto pb-2",
                                    children: (product.images || [product.image]).map(function (imgUrl, idx) {
                                        var isSelected = (selectedImage || product.image) === imgUrl;
                                        return ((0, jsx_runtime_1.jsx)("button", {
                                            onClick: function () { return setSelectedImage(imgUrl); },
                                            className: "w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 shrink-0 cursor-pointer " + (isSelected ? 'border-[var(--lt-charcoal)] scale-[1.03] shadow-lt-sm' : 'border-[var(--lt-border)] opacity-60 hover:opacity-100 hover:border-slate-400'),
                                            children: (0, jsx_runtime_1.jsx)("img", { src: imgUrl, alt: "thumbnail", className: "w-full h-full object-cover" })
                                        }, idx));
                                    })
                                }),
                                // Eco Impact Card
                                (0, jsx_runtime_1.jsxs)("div", {
                                    className: "p-6 rounded-3xl border border-emerald-100 bg-emerald-50/40 shadow-lt-sm space-y-3",
                                    children: [
                                        (0, jsx_runtime_1.jsxs)("h4", {
                                            className: "text-emerald-800 font-extrabold text-[10px] uppercase tracking-wider font-display flex items-center gap-1.5",
                                            children: [
                                                (0, jsx_runtime_1.jsx)(lucide_react_1.Leaf, { size: 14, className: "text-emerald-600 animate-pulse" }),
                                                "Sustainable Local Impact"
                                            ]
                                        }),
                                        (0, jsx_runtime_1.jsxs)("p", {
                                            className: "text-xs text-emerald-700 leading-relaxed font-body",
                                            children: [
                                                "This boutique item is made with locally sourced materials. Sourced within ",
                                                (0, jsx_runtime_1.jsx)("strong", { children: (resolvedShop.distance || 2.3) + " km" }),
                                                " of your location, buying this saves approximately ",
                                                (0, jsx_runtime_1.jsx)("strong", { children: "1,200g of CO₂ emissions" }),
                                                " compared to global online retail shipping! EV or walking local courier dispatch available."
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),

                        // Right Column (Grid span 6) - Product Info & Options
                        (0, jsx_runtime_1.jsxs)("div", {
                            className: "lg:col-span-6 space-y-8",
                            children: [
                                // Title Section
                                (0, jsx_runtime_1.jsxs)("div", {
                                    className: "space-y-4",
                                    children: [
                                        (0, jsx_runtime_1.jsxs)("div", {
                                            className: "flex flex-wrap gap-2 items-center",
                                            children: [
                                                (0, jsx_runtime_1.jsxs)("div", {
                                                    className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--lt-amber-pale)] border border-[var(--lt-amber-light)] text-[10px] font-black text-[var(--lt-amber)] uppercase tracking-widest font-display",
                                                    children: [
                                                        (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { size: 10 }),
                                                        "Boutique Exclusive"
                                                    ]
                                                }),
                                                product.stock === 0 && (
                                                    (0, jsx_runtime_1.jsx)("span", {
                                                        className: "inline-flex items-center px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[10px] font-black text-red-600 uppercase tracking-widest font-display",
                                                        children: "Out of Stock"
                                                    })
                                                ),
                                                product.stock > 0 && product.stock <= 5 && (
                                                    (0, jsx_runtime_1.jsx)("span", {
                                                        className: "inline-flex items-center px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-black text-amber-600 uppercase tracking-widest font-display animate-pulse",
                                                        children: "Only " + product.stock + " Left!"
                                                    })
                                                )
                                            ]
                                        }),
                                        (0, jsx_runtime_1.jsx)("h1", {
                                            className: "text-3xl md:text-5xl font-display font-extrabold leading-tight tracking-tight text-[var(--lt-charcoal)]",
                                            children: product.name
                                        }),
                                        // Stars & Ratings count
                                        (0, jsx_runtime_1.jsxs)("div", {
                                            className: "flex items-center gap-2 pt-1",
                                            children: [
                                                (0, jsx_runtime_1.jsx)("div", {
                                                    className: "flex items-center text-amber-500",
                                                    children: Array.from({ length: 5 }).map(function (_, i) {
                                                        return ((0, jsx_runtime_1.jsx)(lucide_react_1.Star, { className: "h-4.5 w-4.5 " + (i < 5 ? 'fill-current' : 'text-gray-300') }, i));
                                                    })
                                                }),
                                                (0, jsx_runtime_1.jsxs)("span", {
                                                    className: "text-xs font-bold text-[var(--lt-charcoal)] font-display mt-0.5",
                                                    children: ["(", reviews.length, " Reviews)"]
                                                })
                                            ]
                                        }),
                                        // Pricing with discount tag
                                        (0, jsx_runtime_1.jsxs)("div", {
                                            className: "flex items-baseline gap-3.5 pt-1",
                                            children: [
                                                (0, jsx_runtime_1.jsxs)("span", {
                                                    className: "text-4xl font-extrabold font-display text-[var(--lt-charcoal)]",
                                                    children: ["\u20B9", product.price]
                                                }),
                                                product.originalPrice && Number(product.originalPrice) > Number(product.price) && (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                                                    children: [
                                                        (0, jsx_runtime_1.jsxs)("span", {
                                                            className: "text-xl text-[var(--lt-muted)] line-through font-medium",
                                                            children: ["\u20B9", product.originalPrice]
                                                        }),
                                                        (0, jsx_runtime_1.jsxs)("span", {
                                                            className: "text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-display",
                                                            children: [
                                                                Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100),
                                                                "% OFF"
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),

                                // Shop Spotlight Card
                                (0, jsx_runtime_1.jsxs)("div", {
                                    className: "p-6 rounded-3xl bg-white/70 backdrop-blur-md border border-[var(--lt-border)] shadow-lt-sm flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center hover:shadow-lt-md hover:-translate-y-0.5 transition-all duration-300",
                                    children: [
                                        (0, jsx_runtime_1.jsxs)("div", {
                                            className: "flex items-center gap-4.5",
                                            children: [
                                                (0, jsx_runtime_1.jsx)("img", {
                                                    src: resolvedShop.logo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
                                                    alt: resolvedShop.name,
                                                    className: "w-14 h-14 rounded-2xl object-cover border border-[var(--lt-border)] bg-slate-50 shrink-0"
                                                }),
                                                (0, jsx_runtime_1.jsxs)("div", {
                                                    children: [
                                                        (0, jsx_runtime_1.jsxs)("div", {
                                                            className: "flex items-center gap-1.5",
                                                            children: [
                                                                (0, jsx_runtime_1.jsx)("h3", {
                                                                    className: "font-extrabold font-display text-sm text-[var(--lt-charcoal)]",
                                                                    children: resolvedShop.name
                                                                }),
                                                                resolvedShop.isVerified && (0, jsx_runtime_1.jsx)(lucide_react_1.BadgeCheck, { className: "h-4.5 w-4.5 text-blue-500 fill-blue-50" })
                                                            ]
                                                        }),
                                                        (0, jsx_runtime_1.jsxs)("p", {
                                                            className: "text-xs text-[var(--lt-muted)] flex items-center gap-1 mt-1 font-body",
                                                            children: [
                                                                (0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { size: 12, className: "text-[var(--lt-amber)] shrink-0" }),
                                                                "Dispatching from ",
                                                                resolvedShop.city || 'Ward 3',
                                                                ", within ",
                                                                resolvedShop.distance || 2.3,
                                                                " km"
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                                            to: "/shop/" + resolvedShop.id,
                                            className: "text-[10px] font-bold font-display uppercase tracking-widest text-[var(--lt-amber)] hover:text-white shrink-0 bg-[var(--lt-amber-pale)] hover:bg-[var(--lt-amber)] px-4 py-3 rounded-2xl border border-[var(--lt-amber-light)] transition-all duration-300 shadow-lt-sm active:scale-[0.98]",
                                            children: "Visit Storefront"
                                        })
                                    ]
                                }),

                                // Size Selector
                                product.sizes && product.sizes.length > 0 && (0, jsx_runtime_1.jsxs)("div", {
                                    className: "space-y-3",
                                    children: [
                                        (0, jsx_runtime_1.jsxs)("div", {
                                            className: "flex justify-between items-baseline",
                                            children: [
                                                (0, jsx_runtime_1.jsx)("h3", { className: "text-xs font-bold uppercase tracking-widest text-[var(--lt-muted)] font-display", children: "Select Size" }),
                                                selectedSize && (0, jsx_runtime_1.jsxs)("span", {
                                                    className: "text-xs font-bold text-[var(--lt-amber)] font-display",
                                                    children: ["Selected: ", selectedSize]
                                                })
                                            ]
                                        }),
                                        (0, jsx_runtime_1.jsx)("div", {
                                            className: "flex flex-wrap gap-2.5",
                                            children: product.sizes.map(function (size) {
                                                var isSelected = selectedSize === size;
                                                return ((0, jsx_runtime_1.jsxs)("button", {
                                                    onClick: function () { return setSelectedSize(size); },
                                                    className: "h-11 px-5 rounded-2xl text-xs font-bold font-display uppercase border transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer " + (isSelected ? 'bg-[var(--lt-charcoal)] text-white border-[var(--lt-charcoal)] shadow-lt-sm scale-[1.03]' : 'bg-white text-[var(--lt-charcoal)] border-[var(--lt-border)] hover:border-[var(--lt-muted)] hover:bg-slate-50'),
                                                    children: [
                                                        size,
                                                        (0, jsx_runtime_1.jsx)("span", {
                                                            className: "text-[9px] font-medium ml-1 " + (isSelected ? 'text-slate-300' : 'text-slate-400'),
                                                            children: "(In Stock)"
                                                        })
                                                    ]
                                                }, size));
                                            })
                                        })
                                    ]
                                }),

                                // Color Selector
                                product.colors && product.colors.length > 0 && (0, jsx_runtime_1.jsxs)("div", {
                                    className: "space-y-3",
                                    children: [
                                        (0, jsx_runtime_1.jsxs)("div", {
                                            className: "flex justify-between items-baseline",
                                            children: [
                                                (0, jsx_runtime_1.jsx)("h3", { className: "text-xs font-bold uppercase tracking-widest text-[var(--lt-muted)] font-display", children: "Select Color" }),
                                                selectedColor && (0, jsx_runtime_1.jsxs)("span", {
                                                    className: "text-xs font-bold text-[var(--lt-amber)] font-display uppercase",
                                                    children: ["Selected: ", selectedColor]
                                                })
                                            ]
                                        }),
                                        (0, jsx_runtime_1.jsx)("div", {
                                            className: "flex flex-wrap gap-3.5",
                                            children: product.colors.map(function (color) {
                                                var isSelected = selectedColor === color;
                                                return ((0, jsx_runtime_1.jsx)("button", {
                                                    onClick: function () { return setSelectedColor(color); },
                                                    className: "w-10 h-10 rounded-full border-2 transition-all duration-300 cursor-pointer flex items-center justify-center shrink-0 " + (isSelected ? 'border-[var(--lt-charcoal)] scale-[1.12] shadow-lt-md' : 'border-[var(--lt-border)] hover:scale-[1.05]'),
                                                    style: { backgroundColor: color.toLowerCase() },
                                                    title: color,
                                                    children: isSelected && (0, jsx_runtime_1.jsx)("span", { className: "w-2.5 h-2.5 rounded-full " + (['white', 'yellow', '#faf9f6', '#fff7ed'].includes(color.toLowerCase()) ? 'bg-slate-900' : 'bg-white') })
                                                }, color));
                                            })
                                        })
                                    ]
                                }),

                                // Quantity Selector
                                (0, jsx_runtime_1.jsxs)("div", {
                                    className: "space-y-3",
                                    children: [
                                        (0, jsx_runtime_1.jsx)("h3", { className: "text-xs font-bold uppercase tracking-widest text-[var(--lt-muted)] font-display", children: "Quantity" }),
                                        (0, jsx_runtime_1.jsxs)("div", {
                                            className: "inline-flex items-center bg-white border border-[var(--lt-border)] rounded-2xl p-1.5 shadow-lt-sm",
                                            children: [
                                                (0, jsx_runtime_1.jsx)(button_1.Button, {
                                                    variant: "ghost",
                                                    size: "icon",
                                                    onClick: function () { return handleQuantityChange('decrement'); },
                                                    disabled: quantity <= 1,
                                                    className: "h-10 w-10 hover:bg-[var(--lt-cream)] rounded-xl text-[var(--lt-charcoal)] transition-transform active:scale-95 cursor-pointer",
                                                    children: (0, jsx_runtime_1.jsx)(lucide_react_1.Minus, { className: "h-4 w-4" })
                                                }),
                                                (0, jsx_runtime_1.jsx)("span", {
                                                    className: "px-5 font-bold font-display text-sm text-[var(--lt-charcoal)]",
                                                    children: quantity
                                                }),
                                                (0, jsx_runtime_1.jsx)(button_1.Button, {
                                                    variant: "ghost",
                                                    size: "icon",
                                                    onClick: function () { return handleQuantityChange('increment'); },
                                                    className: "h-10 w-10 hover:bg-[var(--lt-cream)] rounded-xl text-[var(--lt-charcoal)] transition-transform active:scale-95 cursor-pointer",
                                                    children: (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4" })
                                                })
                                            ]
                                        })
                                    ]
                                }),

                                // Purchase Actions CTAs
                                (0, jsx_runtime_1.jsxs)("div", {
                                    className: "flex flex-col sm:flex-row gap-4 pt-4 border-t border-[var(--lt-border)]",
                                    children: [
                                        (0, jsx_runtime_1.jsxs)("button", {
                                            onClick: handleAddToCart,
                                            disabled: product.stock === 0,
                                            className: "flex-1 h-14 bg-[var(--lt-charcoal)] hover:bg-[var(--lt-amber)] text-white font-extrabold font-display uppercase tracking-widest text-[10px] rounded-2xl shadow-lt-md hover:shadow-lt-lg transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--lt-charcoal)]",
                                            children: [
                                                (0, jsx_runtime_1.jsx)(lucide_react_1.ShoppingBag, { className: "h-4 w-4" }),
                                                product.stock === 0 ? "Out of Stock" : "Add to Cart"
                                            ]
                                        }),
                                        (0, jsx_runtime_1.jsxs)("button", {
                                            onClick: handleToggleWishlist,
                                            className: "h-14 px-8 rounded-2xl border font-bold font-display uppercase tracking-widest text-[10px] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] " + (wishlistItems.includes(product.id) ? 'bg-[var(--lt-amber-pale)] text-[var(--lt-amber)] border-[var(--lt-amber-light)] shadow-lt-sm' : 'bg-white text-[var(--lt-muted)] border-[var(--lt-border)] hover:text-[var(--lt-charcoal)] hover:border-[var(--lt-muted)] shadow-lt-sm'),
                                            children: [
                                                (0, jsx_runtime_1.jsx)(lucide_react_1.Heart, { className: "h-4.5 w-4.5 " + (wishlistItems.includes(product.id) ? 'fill-[var(--lt-amber)] text-[var(--lt-amber)] animate-pulse' : 'text-slate-400') }),
                                                "Wishlist"
                                            ]
                                        })
                                    ]
                                }),

                                // Share Button
                                (0, jsx_runtime_1.jsxs)("div", {
                                    className: "flex items-center gap-3 pt-2",
                                    children: [
                                        (0, jsx_runtime_1.jsxs)("button", {
                                            onClick: function () {
                                                if (navigator.share) {
                                                    navigator.share({ title: product.name, text: 'Check out ' + product.name + ' on LocalThread!', url: window.location.href }).catch(function () {});
                                                } else {
                                                    navigator.clipboard.writeText(window.location.href).then(function () { sonner_1.toast.success('Link copied to clipboard!'); });
                                                }
                                            },
                                            className: "flex items-center gap-2 text-xs font-bold text-[var(--lt-muted)] hover:text-[var(--lt-charcoal)] transition-colors",
                                            children: [
                                                (0, jsx_runtime_1.jsx)(lucide_react_1.Share2, { size: 14 }),
                                                "Share"
                                            ]
                                        }),
                                        (0, jsx_runtime_1.jsxs)("a", {
                                            href: 'https://wa.me/?text=' + encodeURIComponent('Check out ' + product.name + ' on LocalThread! ' + window.location.href),
                                            target: '_blank',
                                            rel: 'noopener noreferrer',
                                            className: "flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200",
                                            children: [
                                                (0, jsx_runtime_1.jsx)(lucide_react_1.MessageCircle, { size: 13 }),
                                                "WhatsApp"
                                            ]
                                        })
                                    ]
                                }),

                                // Accordions (Details, Origin, Shipping)
                                (0, jsx_runtime_1.jsxs)("div", {
                                    className: "space-y-3 pt-6 border-t border-[var(--lt-border)]",
                                    children: [
                                        // Desc Accordion
                                        (0, jsx_runtime_1.jsxs)("div", {
                                            className: "border border-[var(--lt-border)] rounded-2xl bg-white overflow-hidden shadow-lt-sm transition-all hover:shadow-md",
                                            children: [
                                                (0, jsx_runtime_1.jsxs)("button", {
                                                    onClick: function () { return setIsDescOpen(!isDescOpen); },
                                                    className: "w-full px-5 py-4 flex items-center justify-between text-left font-extrabold font-display text-xs uppercase tracking-wider text-[var(--lt-charcoal)] bg-slate-50/50 hover:bg-slate-50 transition-colors",
                                                    children: [
                                                        "Description",
                                                        isDescOpen ? (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronUp, { size: 16 }) : (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { size: 16 })
                                                    ]
                                                }),
                                                isDescOpen && (0, jsx_runtime_1.jsx)("div", {
                                                    className: "px-5 py-4 border-t border-[var(--lt-border)] text-sm text-[var(--lt-muted)] leading-relaxed font-body",
                                                    children: product.description
                                                })
                                            ]
                                        }),
                                        // Specs Accordion
                                        (0, jsx_runtime_1.jsxs)("div", {
                                            className: "border border-[var(--lt-border)] rounded-2xl bg-white overflow-hidden shadow-lt-sm transition-all hover:shadow-md",
                                            children: [
                                                (0, jsx_runtime_1.jsxs)("button", {
                                                    onClick: function () { return setIsSpecsOpen(!isSpecsOpen); },
                                                    className: "w-full px-5 py-4 flex items-center justify-between text-left font-extrabold font-display text-xs uppercase tracking-wider text-[var(--lt-charcoal)] bg-slate-50/50 hover:bg-slate-50 transition-colors",
                                                    children: [
                                                        "Specifications & Origin",
                                                        isSpecsOpen ? (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronUp, { size: 16 }) : (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { size: 16 })
                                                    ]
                                                }),
                                                isSpecsOpen && (0, jsx_runtime_1.jsxs)("div", {
                                                    className: "px-5 py-4 border-t border-[var(--lt-border)] text-sm text-[var(--lt-muted)] leading-relaxed font-body space-y-2.5",
                                                    children: [
                                                        (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { className: "text-slate-700", children: "Boutique Origin:" }), " ", resolvedShop.name, " (", resolvedShop.city || 'Salt Lake', ", ", resolvedShop.state || 'West Bengal', ")"] }),
                                                        (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { className: "text-slate-700", children: "Category:" }), " ", product.category] }),
                                                        (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { className: "text-slate-700", children: "Eco Rating:" }), " 100% Sustainable Organic fabrics"] }),
                                                        (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { className: "text-slate-700", children: "Dispatch:" }), " Direct dispatch within 10km for local zero-carbon emissions."] })
                                                    ]
                                                })
                                            ]
                                        }),
                                        // Shipping Accordion
                                        (0, jsx_runtime_1.jsxs)("div", {
                                            className: "border border-[var(--lt-border)] rounded-2xl bg-white overflow-hidden shadow-lt-sm transition-all hover:shadow-md",
                                            children: [
                                                (0, jsx_runtime_1.jsxs)("button", {
                                                    onClick: function () { return setIsShippingOpen(!isShippingOpen); },
                                                    className: "w-full px-5 py-4 flex items-center justify-between text-left font-extrabold font-display text-xs uppercase tracking-wider text-[var(--lt-charcoal)] bg-slate-50/50 hover:bg-slate-50 transition-colors",
                                                    children: [
                                                        "Shipping & Returns",
                                                        isShippingOpen ? (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronUp, { size: 16 }) : (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { size: 16 })
                                                    ]
                                                }),
                                                isShippingOpen && (0, jsx_runtime_1.jsxs)("div", {
                                                    className: "px-5 py-4 border-t border-[var(--lt-border)] text-sm text-[var(--lt-muted)] leading-relaxed font-body space-y-2.5",
                                                    children: [
                                                        (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { className: "text-slate-700", children: "Local Eco-Delivery:" }), " Delivered via local electric couriers within 24-48 hours inside our 10km circle."] }),
                                                        (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { className: "text-slate-700", children: "Return Policy:" }), " 7-day hassle-free doorstep pickup if size does not fit. Items must be unworn and contain tags."] })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),

                // 3. Customer Reviews Section (Full width, grid layout inside)
                (0, jsx_runtime_1.jsxs)("section", {
                    className: "mt-24 pt-12 border-t border-[var(--lt-border)] space-y-12",
                    children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                            className: "grid grid-cols-1 lg:grid-cols-12 gap-12 items-start",
                            children: [
                                // Star breakdown and overview
                                (0, jsx_runtime_1.jsxs)("div", {
                                    className: "lg:col-span-4 bg-white p-7 rounded-3xl border border-[var(--lt-border)] shadow-lt-sm space-y-5",
                                    children: [
                                        (0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold font-display text-[var(--lt-charcoal)]", children: "Customer Reviews" }),
                                        (0, jsx_runtime_1.jsxs)("div", {
                                            className: "flex items-baseline gap-2",
                                            children: [
                                                (0, jsx_runtime_1.jsx)("span", {
                                                    className: "text-5xl font-black font-display text-[var(--lt-charcoal)]",
                                                    children: (reviews.reduce(function (sum, r) { return sum + r.rating; }, 0) / (reviews.length || 1)).toFixed(1)
                                                }),
                                                (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-[var(--lt-muted)] font-bold uppercase", children: "out of 5" })
                                            ]
                                        }),
                                        (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-[var(--lt-muted)] font-body font-medium", children: ["Based on ", reviews.length, " verified buyer reviews"] }),
                                        // Individual bars
                                        (0, jsx_runtime_1.jsx)("div", {
                                            className: "space-y-3 pt-2",
                                            children: [5, 4, 3, 2, 1].map(function (stars) {
                                                var count = reviews.filter(function (r) { return r.rating === stars; }).length;
                                                var pct = reviews.length ? (count / reviews.length) * 100 : 0;
                                                return ((0, jsx_runtime_1.jsxs)("div", {
                                                    className: "flex items-center gap-3 text-xs",
                                                    children: [
                                                        (0, jsx_runtime_1.jsxs)("span", { className: "w-3 text-right font-extrabold text-[var(--lt-charcoal)] font-display", children: [stars] }),
                                                        (0, jsx_runtime_1.jsx)(lucide_react_1.Star, { className: "h-3.5 w-3.5 fill-amber-500 text-amber-500 shrink-0" }),
                                                        (0, jsx_runtime_1.jsx)("div", {
                                                            className: "flex-1 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-50",
                                                            children: (0, jsx_runtime_1.jsx)("div", {
                                                                className: "h-full bg-amber-500 rounded-full transition-all duration-500",
                                                                style: { width: pct + "%" }
                                                            })
                                                        }),
                                                        (0, jsx_runtime_1.jsxs)("span", { className: "w-6 text-right text-[var(--lt-muted)] font-semibold", children: [count] })
                                                    ]
                                                }, stars));
                                            })
                                        })
                                    ]
                                }),

                                // Reviews List
                                (0, jsx_runtime_1.jsxs)("div", {
                                    className: "lg:col-span-8 space-y-6",
                                    children: [
                                        (0, jsx_runtime_1.jsx)("h3", {
                                            className: "text-lg font-bold font-display text-[var(--lt-charcoal)] uppercase tracking-wider",
                                            children: "Boutique Feedback"
                                        }),
                                        // Premium Filter & Sort controls
                                        (0, jsx_runtime_1.jsxs)("div", {
                                            className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 mb-6",
                                            children: [
                                                (0, jsx_runtime_1.jsxs)("div", {
                                                    className: "flex flex-wrap gap-2 items-center",
                                                    children: [
                                                        (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-[var(--lt-muted)] uppercase tracking-wider mr-2", children: "Filter:" }),
                                                        [0, 5, 4, 3, 2, 1].map(function (stars) {
                                                            var isActive = ratingFilter === stars;
                                                            return (0, jsx_runtime_1.jsxs)(button_1.Button, {
                                                                type: "button",
                                                                onClick: function () { return setRatingFilter(stars); },
                                                                variant: isActive ? "default" : "outline",
                                                                size: "sm",
                                                                className: "h-8 px-3 rounded-full text-xs font-bold transition-all " + (isActive ? "bg-slate-900 text-white" : "border-slate-200 text-slate-700 hover:bg-slate-50"),
                                                                children: [
                                                                    stars === 0 ? "All Reviews" : stars + " Star",
                                                                    stars > 0 && (0, jsx_runtime_1.jsx)(lucide_react_1.Star, { className: "h-3 w-3 ml-1 fill-current inline-block" })
                                                                ]
                                                            }, stars);
                                                        })
                                                    ]
                                                }),
                                                (0, jsx_runtime_1.jsxs)("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-[var(--lt-muted)] uppercase tracking-wider shrink-0", children: "Sort By:" }),
                                                        (0, jsx_runtime_1.jsxs)("select", {
                                                            value: sortByFilter,
                                                            onChange: function (e) { return setSortByFilter(e.target.value); },
                                                            className: "text-xs font-bold text-slate-700 border border-slate-200 rounded-xl px-3 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-[var(--lt-amber)] cursor-pointer",
                                                            children: [
                                                                (0, jsx_runtime_1.jsx)("option", { value: "recent", children: "Newest First" }),
                                                                (0, jsx_runtime_1.jsx)("option", { value: "helpful", children: "Most Helpful" })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        processedReviews.length === 0 ? ((0, jsx_runtime_1.jsx)("div", {
                                            className: "p-8 border border-dashed rounded-2xl text-center text-[var(--lt-muted)]",
                                            children: "No matching reviews found. Share your feedback below!"
                                        })) : (processedReviews.map(function (r, idx) {
                                            return ((0, jsx_runtime_1.jsxs)("div", {
                                                className: "p-6 rounded-3xl bg-white border border-[var(--lt-border)] shadow-lt-sm space-y-4 hover:shadow-md transition-shadow duration-300",
                                                children: [
                                                    (0, jsx_runtime_1.jsxs)("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            (0, jsx_runtime_1.jsxs)("div", {
                                                                className: "flex items-center gap-3",
                                                                children: [
                                                                    (0, jsx_runtime_1.jsx)("div", {
                                                                        className: "w-9 h-9 rounded-2xl bg-[var(--lt-amber-pale)] text-[var(--lt-amber)] font-black font-display flex items-center justify-center text-xs border border-[var(--lt-amber-light)] shrink-0",
                                                                        children: r.userName.split(' ').map(function (n) { return n[0]; }).join('').toUpperCase()
                                                                    }),
                                                                    (0, jsx_runtime_1.jsxs)("div", {
                                                                        children: [
                                                                            (0, jsx_runtime_1.jsx)("p", { className: "text-xs font-bold text-[var(--lt-charcoal)] font-display", children: r.userName }),
                                                                            (0, jsx_runtime_1.jsxs)("p", {
                                                                                className: "text-[9px] text-emerald-600 font-bold uppercase tracking-wider flex items-center gap-1.5 mt-0.5",
                                                                                children: [
                                                                                    (0, jsx_runtime_1.jsx)(lucide_react_1.BadgeCheck, { size: 11, className: "text-emerald-500 fill-emerald-50" }),
                                                                                    "Verified Purchase"
                                                                                ]
                                                                            })
                                                                        ]
                                                                    })
                                                                ]
                                                            }),
                                                            (0, jsx_runtime_1.jsx)("span", { className: "text-[10px] text-[var(--lt-muted)] font-mono", children: new Date(r.createdAt).toLocaleDateString() })
                                                        ]
                                                    }),
                                                    (0, jsx_runtime_1.jsx)("div", {
                                                        className: "flex items-center text-amber-500 gap-0.5",
                                                        children: Array.from({ length: 5 }).map(function (_, i) {
                                                            return ((0, jsx_runtime_1.jsx)(lucide_react_1.Star, { className: "h-4 w-4 " + (i < r.rating ? 'fill-current' : 'text-gray-200') }, i));
                                                        })
                                                    }),
                                                    (0, jsx_runtime_1.jsx)("p", {
                                                        className: "text-sm text-[var(--lt-charcoal)] font-body leading-relaxed",
                                                        children: r.comment
                                                    }),
                                                    (0, jsx_runtime_1.jsxs)("button", {
                                                        onClick: function () {
                                                            setReviews(function (prev) {
                                                                return prev.map(function (item) {
                                                                    return item.id === r.id ? Object.assign({}, item, { likes: (item.likes || 0) + 1 }) : item;
                                                                });
                                                            });
                                                        },
                                                        className: "inline-flex items-center gap-1.5 text-[10px] text-[var(--lt-muted)] font-bold uppercase tracking-wider hover:text-[var(--lt-charcoal)] transition-colors cursor-pointer",
                                                        children: [
                                                            (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { size: 10, className: "text-amber-500" }),
                                                            "Helpful (",
                                                            r.likes || 0,
                                                            ")"
                                                        ]
                                                    })
                                                ]
                                            }, r.id || idx));
                                        }))
                                    ]
                                })
                            ]
                        }),

                        // Submit review form
                        (0, jsx_runtime_1.jsxs)("div", {
                            className: "bg-white p-6 md:p-8 rounded-3xl border border-[var(--lt-border)] shadow-lt-sm max-w-xl mx-auto space-y-5",
                            children: [
                                (0, jsx_runtime_1.jsx)("h3", {
                                    className: "text-base font-extrabold font-display text-[var(--lt-charcoal)] uppercase tracking-wider text-center",
                                    children: "Share Your Feedback"
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                    className: "text-xs text-[var(--lt-muted)] text-center font-body",
                                    children: "Rate this product and comment on fit, fabrics, or boutique customer experience."
                                }),
                                // Stars in form
                                (0, jsx_runtime_1.jsx)("div", {
                                    className: "flex justify-center gap-1.5 py-2",
                                    children: [1, 2, 3, 4, 5].map(function (stars) {
                                        return ((0, jsx_runtime_1.jsx)("button", {
                                            type: "button",
                                            onClick: function () { return setReviewRating(stars); },
                                            className: "p-0.5 hover:scale-110 transition-transform cursor-pointer",
                                            children: (0, jsx_runtime_1.jsx)(lucide_react_1.Star, { className: "h-7 w-7 " + (stars <= reviewRating ? 'fill-amber-500 text-amber-500' : 'text-gray-300') })
                                        }, stars));
                                    })
                                }),
                                // Inputs
                                (0, jsx_runtime_1.jsxs)("div", {
                                    className: "space-y-4",
                                    children: [
                                        (0, jsx_runtime_1.jsxs)("div", {
                                            className: "space-y-1.5",
                                            children: [
                                                (0, jsx_runtime_1.jsx)("label", { className: "text-[10px] font-black uppercase tracking-wider text-[var(--lt-muted)] font-display", children: "Your Name" }),
                                                (0, jsx_runtime_1.jsx)("input", {
                                                    type: "text",
                                                    value: reviewName,
                                                    onChange: function (e) { return setReviewName(e.target.value); },
                                                    placeholder: "e.g. S. Sen",
                                                    className: "w-full px-4 py-2.5 rounded-xl border border-[var(--lt-border)] bg-[var(--lt-cream)] text-sm text-[var(--lt-charcoal)] focus:outline-none focus:ring-1 focus:ring-[var(--lt-amber)] focus:border-[var(--lt-amber)]"
                                                })
                                            ]
                                        }),
                                        (0, jsx_runtime_1.jsxs)("div", {
                                            className: "space-y-1.5",
                                            children: [
                                                (0, jsx_runtime_1.jsx)("label", { className: "text-[10px] font-black uppercase tracking-wider text-[var(--lt-muted)] font-display", children: "Comments" }),
                                                (0, jsx_runtime_1.jsx)("textarea", {
                                                    value: reviewComment,
                                                    onChange: function (e) { return setReviewComment(e.target.value); },
                                                    placeholder: "How does the size fit? Is the fabric premium?",
                                                    className: "w-full min-h-[100px] px-4 py-2.5 rounded-xl border border-[var(--lt-border)] bg-[var(--lt-cream)] text-sm text-[var(--lt-charcoal)] focus:outline-none focus:ring-1 focus:ring-[var(--lt-amber)] focus:border-[var(--lt-amber)]"
                                                })
                                            ]
                                        }),
                                        (0, jsx_runtime_1.jsx)("button", {
                                            onClick: handleAddReview,
                                            disabled: !reviewName || !reviewComment,
                                            className: "w-full h-12 bg-[var(--lt-charcoal)] hover:bg-[var(--lt-amber)] disabled:hover:bg-[var(--lt-charcoal)] text-white font-bold font-display uppercase tracking-widest text-[10px] rounded-xl shadow-lt-sm hover:shadow-lt-md transition-all duration-300 cursor-pointer disabled:opacity-50",
                                            children: "Submit Feedback"
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),

                // 4. You Might Also Like Section
                (0, jsx_runtime_1.jsxs)("section", {
                    className: "mt-24 pt-12 border-t border-[var(--lt-border)]",
                    children: [
                        (0, jsx_runtime_1.jsx)("div", {
                            className: "flex flex-col md:flex-row md:items-baseline justify-between mb-8 gap-2",
                            children: (0, jsx_runtime_1.jsxs)("div", {
                                children: [
                                    (0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold font-display text-[var(--lt-charcoal)]", children: "You Might Also Like" }),
                                    (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-[var(--lt-muted)] font-body mt-1.5", children: "Other curated items from neighborhood boutiques" })
                                ]
                            })
                        }),
                        (0, jsx_runtime_1.jsx)(ProductGrid_1.ProductGrid, {
                            products: products_1.featuredProducts.filter(function (p) { return p.id !== product.id; }).slice(0, 4),
                            onAddToCart: function (productId) {
                                dispatch((0, cartSlice_1.addToCart)({ productId: productId }));
                                sonner_1.toast.success("Added to cart!");
                            },
                            onToggleWishlist: function (productId) {
                                var isCurrentlyInWishlist = wishlistItems.includes(productId);
                                dispatch((0, wishlistSlice_1.toggleWishlist)(productId));
                                if (isCurrentlyInWishlist) {
                                    sonner_1.toast.success("Removed from wishlist");
                                }
                                else {
                                    sonner_1.toast.success("Added to wishlist!");
                                }
                            }
                        })
                    ]
                }),
                (0, jsx_runtime_1.jsx)(BoutiqueChatBubble_1.BoutiqueChatBubble, {
                    vendorId: product.vendorId,
                    shopName: resolvedShop.name
                })
            ]
        })
    }));
}
