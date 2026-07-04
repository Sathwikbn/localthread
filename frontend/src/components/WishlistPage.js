"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistPage = WishlistPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_redux_1 = require("react-redux");
var lucide_react_1 = require("lucide-react");
var button_1 = require("./ui/button");
var card_1 = require("./ui/card");
var ImageWithFallback_1 = require("./figma/ImageWithFallback");
var cartSlice_1 = require("../store/cartSlice");
var wishlistSlice_1 = require("../store/wishlistSlice");
var products_1 = require("../data/products");
var sonner_1 = require("sonner");
function WishlistPage() {
    var dispatch = (0, react_redux_1.useDispatch)();
    var wishlistItems = (0, react_redux_1.useSelector)(function (state) { return state.wishlist.items; });
    // Get detailed product information for wishlist items
    var wishlistProducts = products_1.featuredProducts.filter(function (product) {
        return wishlistItems.includes(product.id);
    });
    var handleAddToCart = function (productId) {
        dispatch((0, cartSlice_1.addToCart)({ productId: productId }));
        sonner_1.toast.success("Added to cart!");
    };
    var handleRemoveFromWishlist = function (productId) {
        dispatch((0, wishlistSlice_1.toggleWishlist)(productId));
        sonner_1.toast.success("Removed from wishlist");
    };
    return ((0, jsx_runtime_1.jsxs)("main", { className: "container mx-auto px-4 py-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-8", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl md:text-4xl font-bold text-foreground mb-2", children: "My Wishlist" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-muted-foreground", children: [wishlistProducts.length, " ", wishlistProducts.length === 1 ? 'item' : 'items', " in your wishlist"] })] }), wishlistProducts.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "text-center py-20", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Heart, { className: "mx-auto h-24 w-24 text-muted-foreground mb-6 opacity-40" }), (0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-semibold text-foreground mb-2", children: "Your wishlist is empty" }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground mb-6", children: "Start adding items to your wishlist to see them here" }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return window.history.back(); }, size: "lg", className: "bg-primary text-primary-foreground hover:bg-primary/90", children: "Continue Shopping" })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: wishlistProducts.map(function (product) { return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "group hover:shadow-lg transition-shadow border border-border", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "aspect-square overflow-hidden rounded-t-lg bg-muted", children: (0, jsx_runtime_1.jsx)(ImageWithFallback_1.ImageWithFallback, { src: product.image, alt: product.name, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "icon", className: "absolute top-2 right-2 bg-background/80 hover:bg-background text-red-500 hover:text-red-600", onClick: function () { return handleRemoveFromWishlist(product.id); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-4 w-4" }) })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-lg mb-2 line-clamp-2 text-foreground", children: product.name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 mb-3", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-lg font-bold text-foreground", children: ["\u20B9", product.price] }), product.originalPrice && ((0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-muted-foreground line-through", children: ["\u20B9", product.originalPrice] }))] }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-2", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return handleAddToCart(product.id); }, className: "flex-1 bg-primary text-primary-foreground hover:bg-primary/90", size: "sm", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShoppingBag, { className: "h-4 w-4 mr-2" }), "Add to Cart"] }) })] })] }, product.id)); }) }))] }));
}
