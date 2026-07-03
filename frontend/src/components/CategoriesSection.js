"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesSection = CategoriesSection;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("./ui/card");
var lucide_react_1 = require("lucide-react");
var ImageWithFallback_1 = require("./figma/ImageWithFallback");
var categories = [
    {
        id: '1',
        name: 'Women\'s Fashion',
        image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=400&h=500&fit=crop&crop=center',
        productCount: 156
    },
    {
        id: '2',
        name: 'Men\'s Clothing',
        image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=400&h=500&fit=crop&crop=center',
        productCount: 89
    },
    {
        id: '3',
        name: 'Accessories',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop&crop=center',
        productCount: 67
    },
    {
        id: '4',
        name: 'Footwear',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop&crop=center',
        productCount: 124
    }
];
function CategoriesSection() {
    return ((0, jsx_runtime_1.jsx)("section", { className: "py-16", children: (0, jsx_runtime_1.jsxs)("div", { className: "container px-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center mb-12", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-3xl font-bold mb-4", children: "Shop by Category" }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground max-w-2xl mx-auto", children: "Discover our carefully curated collections designed for every style and occasion" })] }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: categories.map(function (category) { return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-0", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative aspect-[3/4] overflow-hidden", children: [(0, jsx_runtime_1.jsx)(ImageWithFallback_1.ImageWithFallback, { src: category.image, alt: category.name, className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute bottom-0 left-0 right-0 p-6 text-white", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-bold mb-1", children: category.name }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-white/80 mb-3", children: [category.productCount, " items"] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "Shop Now" }), (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { className: "h-4 w-4" })] })] })] }) }) }, category.id)); }) })] }) }));
}
