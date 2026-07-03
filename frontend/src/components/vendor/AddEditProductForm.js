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
exports.AddEditProductForm = AddEditProductForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var productAPI_1 = require("../../services/productAPI");
var button_1 = require("../ui/button");
var input_1 = require("../ui/input");
var label_1 = require("../ui/label");
var textarea_1 = require("../ui/textarea");
var select_1 = require("../ui/select");
var card_1 = require("../ui/card");
var alert_1 = require("../ui/alert");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
function AddEditProductForm() {
    var _this = this;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var productId = (0, react_router_dom_1.useParams)().productId;
    var getImageUrl = function (path) {
        if (!path) return '';
        if (path.startsWith('http://') || path.startsWith('https://')) return path;
        var apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        var serverRoot = apiBase.endsWith('/api') ? apiBase.slice(0, -4) : apiBase;
        var cleanPath = path.startsWith('/') ? path : '/' + path;
        return serverRoot + cleanPath;
    };
    var _a = (0, react_1.useState)({
        name: '',
        description: '',
        price: 0,
        originalPrice: 0,
        category: 'clothing',
        stock: 0,
        images: [],
        sizes: [],
        colors: []
    }), formData = _a[0], setFormData = _a[1];
    var _b = (0, react_1.useState)(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(false), isSaving = _c[0], setIsSaving = _c[1];
    var _d = (0, react_1.useState)(null), error = _d[0], setError = _d[1];
    var categories = [
        'clothing',
        'accessories',
        'footwear',
        'jewelry',
        'home',
        'other'
    ];
    var sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];
    var colorOptions = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink', 'Gray', 'Brown', 'Beige', 'Cream', 'Olive', 'Navy'];
    // Load product data if editing
    var loadProduct = (0, react_1.useCallback)(function () { return __awaiter(_this, void 0, void 0, function () {
        var response, product, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!productId)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setIsLoading(true);
                    setError(null);
                    return [4 /*yield*/, productAPI_1.productAPI.getProduct(productId)];
                case 2:
                    response = _a.sent();
                    product = (response && response.success && response.data && response.data.product) || (response && response.id ? response : null);
                    if (product) {
                        setFormData({
                            name: product.name,
                            description: product.description,
                            price: product.price,
                            originalPrice: product.originalPrice || 0,
                            category: product.category,
                            stock: product.stock,
                            images: (product.imageUrl ? [product.imageUrl] : []) || product.images || (product.thumbnail ? [product.thumbnail] : []),
                            sizes: product.sizes || [],
                            colors: product.colors || []
                        });
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Load product error:', error_1);
                    setError('Failed to load product');
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [productId]);
    (0, react_1.useEffect)(function () {
        if (productId) {
            loadProduct();
        }
    }, [productId, loadProduct]);
    var handleInputChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        var isNumericField = name === 'price' || name === 'originalPrice' || name === 'stock';
        console.log("\uD83D\uDCDD Input change - Field: ".concat(name, ", Value: ").concat(value, ", Type: ").concat(typeof value, ", IsNumeric: ").concat(isNumericField));
        setFormData(function (prev) {
            var _a;
            var newValue = isNumericField ? parseFloat(value) || 0 : value;
            console.log("\uD83D\uDCDD Setting ".concat(name, " to: ").concat(newValue, " (Type: ").concat(newValue, ")"));
            return __assign(__assign({}, prev), (_a = {}, _a[name] = newValue, _a));
        });
    };
    var handleSelectChange = function (name, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleSizeToggle = function (size) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), { sizes: ((_a = prev.sizes) === null || _a === void 0 ? void 0 : _a.includes(size))
                    ? prev.sizes.filter(function (s) { return s !== size; })
                    : __spreadArray(__spreadArray([], (prev.sizes || []), true), [size], false) }));
        });
    };
    var handleColorToggle = function (color) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), { colors: ((_a = prev.colors) === null || _a === void 0 ? void 0 : _a.includes(color))
                    ? prev.colors.filter(function (c) { return c !== color; })
                    : __spreadArray(__spreadArray([], (prev.colors || []), true), [color], false) }));
        });
    };
    var handleImageUpload = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var files, response_1, error_2, placeholderUrl_1, imageUrl_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    files = e.target.files;
                    if (!(files && files[0])) return [3 /*break*/, 4];
                    console.log('📸 Image upload started:', files[0].name);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, productAPI_1.productAPI.uploadProductImage(files[0])];
                case 2:
                    response_1 = _b.sent();
                    console.log('📤 Upload response:', response_1);
                    imageUrl_1 = (response_1 && response_1.success && response_1.data && response_1.data.imageUrl) || (response_1 && response_1.imageUrl);
                    if (imageUrl_1) {
                        setFormData(function (prev) { return (__assign(__assign({}, prev), { images: __spreadArray(__spreadArray([], prev.images, true), [imageUrl_1], false) })); });
                        sonner_1.toast.success('Image uploaded successfully!');
                    }
                    else {
                        sonner_1.toast.error('Upload failed: ' + ((response_1 && response_1.message) || 'Unknown error'));
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    console.error('💥 Image upload error:', error_2);
                    placeholderUrl_1 = "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600";
                    setFormData(function (prev) { return (__assign(__assign({}, prev), { images: __spreadArray(__spreadArray([], prev.images, true), [placeholderUrl_1], false) })); });
                    sonner_1.toast.warning('Image upload failed, using fallback boutique photography.');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var removeImage = function (index) {
        setFormData(function (prev) { return (__assign(__assign({}, prev), { images: prev.images.filter(function (_, i) { return i !== index; }) })); });
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var requiredFields, missingFields, response, errorMessage, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    console.log('🚀 Form submission started', formData);
                    if (formData.images.length === 0) {
                        sonner_1.toast.error('At least one product image is required');
                        return [2 /*return*/];
                    }
                    requiredFields = ['name', 'description', 'price', 'category', 'stock'];
                    missingFields = requiredFields.filter(function (field) { return !formData[field]; });
                    if (missingFields.length > 0) {
                        setError("Missing required fields: ".concat(missingFields.join(', ')));
                        sonner_1.toast.error("Missing required fields: ".concat(missingFields.join(', ')));
                        return [2 /*return*/];
                    }
                    if (typeof formData.price !== 'number' || formData.price <= 0) {
                        setError('Price must be a positive number');
                        sonner_1.toast.error('Price must be a positive number');
                        return [2 /*return*/];
                    }
                    if (typeof formData.stock !== 'number' || formData.stock < 0) {
                        setError('Stock must be a non-negative number');
                        sonner_1.toast.error('Stock must be a non-negative number');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    setIsSaving(true);
                    setError(null);
                    response = void 0;
                    if (!productId) return [3 /*break*/, 3];
                    return [4 /*yield*/, productAPI_1.productAPI.updateProduct(productId, formData)];
                case 2:
                    response = _a.sent();
                    if (response && (response.success || response.id)) {
                        sonner_1.toast.success('Product updated successfully!');
                    }
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, productAPI_1.productAPI.createProduct(formData)];
                case 4:
                    response = _a.sent();
                    if (response && (response.success || response.id)) {
                        sonner_1.toast.success('Product created successfully!');
                    }
                    _a.label = 5;
                case 5:
                    if (response && (response.success || response.id)) {
                        navigate('/vendor/products');
                    }
                    else {
                        errorMessage = (response === null || response === void 0 ? void 0 : response.message) || 'Failed to save product';
                        setError(errorMessage);
                        sonner_1.toast.error(errorMessage);
                    }
                    return [3 /*break*/, 8];
                case 6:
                    error_3 = _a.sent();
                    console.error('💥 Save product error:', error_3);
                    setError('Failed to save product');
                    sonner_1.toast.error('Failed to save product');
                    return [3 /*break*/, 8];
                case 7:
                    setIsSaving(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)("div", {
            className: "flex items-center justify-center min-h-[400px]",
            children: (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                className: "h-8 w-8 animate-spin text-[var(--lt-amber)]"
            })
        });
    }

    return (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-8 font-body text-[var(--lt-charcoal)] max-w-4xl mx-auto",
        children: [
            (0, jsx_runtime_1.jsxs)("div", {
                className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
                children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                        children: [
                            (0, jsx_runtime_1.jsx)("h1", {
                                className: "text-3xl font-bold font-display tracking-tight text-[var(--lt-charcoal)]",
                                children: productId ? 'Edit Product' : 'Add New Product'
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                                className: "text-sm text-[var(--lt-muted)] mt-1",
                                children: productId ? 'Update your product specifications and variants' : 'List a new apparel piece on your boutique storefront'
                            })
                        ]
                    }),
                    (0, jsx_runtime_1.jsxs)(button_1.Button, {
                        variant: "outline",
                        onClick: function () { return navigate('/vendor/products'); },
                        className: "border-[var(--lt-border)] hover:bg-[var(--lt-cream-dark)] rounded-xl font-bold font-display text-xs px-5 py-2.5 transition-all self-start sm:self-auto flex items-center gap-2",
                        children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, { className: "h-4 w-4" }),
                            "Back to Catalog"
                        ]
                    })
                ]
            }),
            !productId && (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
                className: "bg-[var(--lt-amber-pale)] border-[var(--lt-amber-light)] rounded-2xl p-4 flex gap-3 text-[var(--lt-charcoal)] shadow-lt-sm",
                children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Package, { className: "h-5 w-5 text-[var(--lt-amber)] mt-0.5 shrink-0" }),
                    (0, jsx_runtime_1.jsxs)(alert_1.AlertDescription, {
                        className: "text-xs text-[var(--lt-muted)] leading-relaxed",
                        children: [
                            (0, jsx_runtime_1.jsx)("strong", { className: "text-[var(--lt-charcoal)] font-display", children: "Tip:" }),
                            " Creating a detailed product page with accurate sizing options, clean descriptions, and high-quality images helps customers purchase confidently."
                        ]
                    })
                ]
            }),
            error && (0, jsx_runtime_1.jsx)(alert_1.Alert, {
                className: "border-red-200 bg-red-50 text-red-700 rounded-xl",
                children: (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: error })
            }),
            (0, jsx_runtime_1.jsxs)("form", {
                onSubmit: handleSubmit,
                className: "space-y-8",
                children: [
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                        className: "border-[var(--lt-border)] shadow-lt-sm rounded-2xl bg-white overflow-hidden",
                        children: [
                            (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                                className: "border-b border-slate-50 pb-4",
                                children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                                    className: "flex items-center gap-2 text-base font-bold font-display text-[var(--lt-charcoal)]",
                                    children: [
                                        (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { className: "h-5 w-5 text-[var(--lt-amber)]" }),
                                        "General Details"
                                    ]
                                })
                            }),
                            (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                                className: "p-6 md:p-8 space-y-6",
                                children: [
                                    (0, jsx_runtime_1.jsxs)("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                        children: [
                                            (0, jsx_runtime_1.jsxs)("div", {
                                                className: "space-y-2",
                                                children: [
                                                    (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "name", className: "text-xs font-bold uppercase tracking-wider text-[var(--lt-muted)] font-display", children: "Product Title *" }),
                                                    (0, jsx_runtime_1.jsx)(input_1.Input, { id: "name", name: "name", value: formData.name, onChange: handleInputChange, placeholder: "e.g. Handloom Silk Saree", required: true, className: "w-full px-4 py-3 bg-[var(--lt-cream)] border-[var(--lt-border)] focus:ring-[var(--lt-amber)] focus:border-[var(--lt-amber)] rounded-xl font-body text-sm text-[var(--lt-charcoal)]" })
                                                ]
                                            }),
                                            (0, jsx_runtime_1.jsxs)("div", {
                                                className: "space-y-2",
                                                children: [
                                                    (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "category", className: "text-xs font-bold uppercase tracking-wider text-[var(--lt-muted)] font-display", children: "Category *" }),
                                                    (0, jsx_runtime_1.jsxs)(select_1.Select, {
                                                        value: formData.category,
                                                        onValueChange: function (value) { return handleSelectChange('category', value); },
                                                        children: [
                                                            (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                                                                className: "w-full px-4 py-3 bg-[var(--lt-cream)] border-[var(--lt-border)] focus:ring-[var(--lt-amber)] focus:border-[var(--lt-amber)] rounded-xl font-body text-sm text-[var(--lt-charcoal)]",
                                                                children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Select Category" })
                                                            }),
                                                            (0, jsx_runtime_1.jsx)(select_1.SelectContent, {
                                                                className: "bg-white border-[var(--lt-border)] rounded-xl",
                                                                children: categories.map(function (category) {
                                                                    return (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                                                        value: category,
                                                                        className: "hover:bg-[var(--lt-cream)] text-sm font-semibold text-[var(--lt-charcoal)] py-2",
                                                                        children: category.charAt(0).toUpperCase() + category.slice(1)
                                                                    }, category);
                                                                })
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    (0, jsx_runtime_1.jsxs)("div", {
                                        className: "space-y-2",
                                        children: [
                                            (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "description", className: "text-xs font-bold uppercase tracking-wider text-[var(--lt-muted)] font-display", children: "Product Description *" }),
                                            (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { id: "description", name: "description", value: formData.description, onChange: handleInputChange, placeholder: "Give details about materials, design pattern, weaving styles, and local craft origins...", rows: 5, required: true, className: "w-full px-4 py-3 bg-[var(--lt-cream)] border-[var(--lt-border)] focus:ring-[var(--lt-amber)] focus:border-[var(--lt-amber)] rounded-xl font-body text-sm text-[var(--lt-charcoal)] resize-none" })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                        className: "border-[var(--lt-border)] shadow-lt-sm rounded-2xl bg-white overflow-hidden",
                        children: [
                            (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                                className: "border-b border-slate-50 pb-4",
                                children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-base font-bold font-display text-[var(--lt-charcoal)]", children: "Pricing & Stock" })
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                                className: "p-6 md:p-8 space-y-6",
                                children: (0, jsx_runtime_1.jsxs)("div", {
                                    className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                                    children: [
                                        (0, jsx_runtime_1.jsxs)("div", {
                                            className: "space-y-2",
                                            children: [
                                                (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "price", className: "text-xs font-bold uppercase tracking-wider text-[var(--lt-muted)] font-display", children: "Selling Price (₹) *" }),
                                                (0, jsx_runtime_1.jsx)(input_1.Input, { id: "price", name: "price", type: "number", min: "0", step: "0.01", value: formData.price || '', onChange: handleInputChange, placeholder: "0.00", required: true, className: "w-full px-4 py-3 bg-[var(--lt-cream)] border-[var(--lt-border)] focus:ring-[var(--lt-amber)] focus:border-[var(--lt-amber)] rounded-xl font-body text-sm text-[var(--lt-charcoal)]" })
                                            ]
                                        }),
                                        (0, jsx_runtime_1.jsxs)("div", {
                                            className: "space-y-2",
                                            children: [
                                                (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "originalPrice", className: "text-xs font-bold uppercase tracking-wider text-[var(--lt-muted)] font-display", children: "Original Price (₹)" }),
                                                (0, jsx_runtime_1.jsx)(input_1.Input, { id: "originalPrice", name: "originalPrice", type: "number", min: "0", step: "0.01", value: formData.originalPrice || '', onChange: handleInputChange, placeholder: "0.00", className: "w-full px-4 py-3 bg-[var(--lt-cream)] border-[var(--lt-border)] focus:ring-[var(--lt-amber)] focus:border-[var(--lt-amber)] rounded-xl font-body text-sm text-[var(--lt-charcoal)]" })
                                            ]
                                        }),
                                        (0, jsx_runtime_1.jsxs)("div", {
                                            className: "space-y-2",
                                            children: [
                                                (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "stock", className: "text-xs font-bold uppercase tracking-wider text-[var(--lt-muted)] font-display", children: "Stock Quantity *" }),
                                                (0, jsx_runtime_1.jsx)(input_1.Input, { id: "stock", name: "stock", type: "number", min: "0", value: formData.stock || '', onChange: handleInputChange, placeholder: "0", required: true, className: "w-full px-4 py-3 bg-[var(--lt-cream)] border-[var(--lt-border)] focus:ring-[var(--lt-amber)] focus:border-[var(--lt-amber)] rounded-xl font-body text-sm text-[var(--lt-charcoal)]" })
                                            ]
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                        className: "border-[var(--lt-border)] shadow-lt-sm rounded-2xl bg-white overflow-hidden",
                        children: [
                            (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                                className: "border-b border-slate-50 pb-4",
                                children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-base font-bold font-display text-[var(--lt-charcoal)]", children: "Product Photography" })
                            }),
                            (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                                className: "p-6 md:p-8 space-y-6",
                                children: [
                                    (0, jsx_runtime_1.jsxs)("div", {
                                        className: "space-y-3",
                                        children: [
                                            (0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-xs font-bold uppercase tracking-wider text-[var(--lt-muted)] font-display", children: "Upload Image *" }),
                                            (0, jsx_runtime_1.jsxs)("div", {
                                                className: "border-2 border-dashed border-[var(--lt-border)] hover:border-[var(--lt-muted)] bg-[var(--lt-cream)] rounded-2xl p-8 text-center transition-all duration-300",
                                                children: [
                                                    (0, jsx_runtime_1.jsx)(lucide_react_1.Upload, { className: "h-8 w-8 text-[var(--lt-muted)] mx-auto mb-3" }),
                                                    (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-bold font-display text-[var(--lt-charcoal)]", children: "Drag & Drop or Click to Select File" }),
                                                    (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-[var(--lt-muted)] mt-1 mb-4", children: "PNG, JPG, or WEBP up to 5MB" }),
                                                    (0, jsx_runtime_1.jsxs)("div", {
                                                        className: "flex items-center justify-center",
                                                        children: [
                                                            (0, jsx_runtime_1.jsx)("input", { type: "file", accept: "image/*", onChange: handleImageUpload, className: "hidden", id: "image-upload" }),
                                                            (0, jsx_runtime_1.jsx)("label", {
                                                                htmlFor: "image-upload",
                                                                className: "cursor-pointer",
                                                                children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                                                                    type: "button",
                                                                    variant: "outline",
                                                                    className: "border-[var(--lt-border)] hover:bg-[var(--lt-cream-dark)] rounded-xl font-bold font-display text-xs px-6 py-3 cursor-pointer transition-all shadow-lt-sm",
                                                                    onClick: function () {
                                                                        var fileInput = document.getElementById('image-upload');
                                                                        if (fileInput) {
                                                                            fileInput.click();
                                                                        }
                                                                    },
                                                                    children: "Choose Image File"
                                                                })
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    formData.images.length > 0 && (0, jsx_runtime_1.jsx)("div", {
                                        className: "grid grid-cols-2 md:grid-cols-4 gap-4 pt-2",
                                        children: formData.images.map(function (image, index) {
                                            return (0, jsx_runtime_1.jsxs)("div", {
                                                className: "relative group aspect-square rounded-xl overflow-hidden border border-[var(--lt-border)] bg-slate-50",
                                                children: [
                                                    (0, jsx_runtime_1.jsx)("img", {
                                                        src: getImageUrl(image),
                                                        alt: "Product ".concat(index + 1),
                                                        className: "w-full h-full object-cover",
                                                        onError: function (e) {
                                                            e.target.src = "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600";
                                                        }
                                                    }),
                                                    (0, jsx_runtime_1.jsx)("button", {
                                                        type: "button",
                                                        className: "absolute top-2 right-2 w-7 h-7 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center transition-all shadow-lt-sm cursor-pointer",
                                                        onClick: function () { return removeImage(index); },
                                                        children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4" })
                                                    })
                                                ]
                                            }, index);
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                        className: "border-[var(--lt-border)] shadow-lt-sm rounded-2xl bg-white overflow-hidden",
                        children: [
                            (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                                className: "border-b border-slate-50 pb-4",
                                children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-base font-bold font-display text-[var(--lt-charcoal)]", children: "Product Variants" })
                            }),
                            (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                                className: "p-6 md:p-8 space-y-6",
                                children: [
                                    (0, jsx_runtime_1.jsxs)("div", {
                                        className: "space-y-3",
                                        children: [
                                            (0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-xs font-bold uppercase tracking-wider text-[var(--lt-muted)] font-display", children: "Sizes Available" }),
                                            (0, jsx_runtime_1.jsx)("div", {
                                                className: "flex flex-wrap gap-2",
                                                children: sizeOptions.map(function (size) {
                                                    var _a;
                                                    var isSelected = (_a = formData.sizes) === null || _a === void 0 ? void 0 : _a.includes(size);
                                                    return (0, jsx_runtime_1.jsx)("button", {
                                                        type: "button",
                                                        onClick: function () { return handleSizeToggle(size); },
                                                        className: "h-10 px-4 rounded-xl text-xs font-bold font-display border transition-all duration-300 cursor-pointer ".concat(isSelected ? "bg-[var(--lt-charcoal)] text-white border-[var(--lt-charcoal)] shadow-lt-sm scale-[1.02]" : "bg-white text-[var(--lt-muted)] border-[var(--lt-border)] hover:border-[var(--lt-muted)]"),
                                                        children: size
                                                    }, size);
                                                })
                                            })
                                        ]
                                    }),
                                    (0, jsx_runtime_1.jsxs)("div", {
                                        className: "space-y-3",
                                        children: [
                                            (0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-xs font-bold uppercase tracking-wider text-[var(--lt-muted)] font-display", children: "Colors Available" }),
                                            (0, jsx_runtime_1.jsx)("div", {
                                                className: "flex flex-wrap gap-2",
                                                children: colorOptions.map(function (color) {
                                                    var _a;
                                                    var isSelected = (_a = formData.colors) === null || _a === void 0 ? void 0 : _a.includes(color);
                                                    return (0, jsx_runtime_1.jsx)("button", {
                                                        type: "button",
                                                        onClick: function () { return handleColorToggle(color); },
                                                        className: "h-10 px-4 rounded-xl text-xs font-bold font-display border transition-all duration-300 cursor-pointer ".concat(isSelected ? "bg-[var(--lt-charcoal)] text-white border-[var(--lt-charcoal)] shadow-lt-sm scale-[1.02]" : "bg-white text-[var(--lt-muted)] border-[var(--lt-border)] hover:border-[var(--lt-muted)]"),
                                                        children: color
                                                    }, color);
                                                })
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex justify-end gap-4 pt-4 border-t border-[var(--lt-border)]",
                        children: [
                            (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", variant: "outline", onClick: function () { return navigate('/vendor/products'); }, className: "border-[var(--lt-border)] hover:bg-[var(--lt-cream-dark)] rounded-xl font-bold font-display text-xs px-6 py-3 cursor-pointer transition-all duration-300", children: "Cancel" }),
                            (0, jsx_runtime_1.jsx)(button_1.Button, {
                                type: "submit",
                                disabled: isSaving,
                                className: "bg-[var(--lt-charcoal)] hover:bg-[var(--lt-amber)] text-white font-bold font-display rounded-xl tracking-wider text-xs px-8 py-3.5 cursor-pointer shadow-lt-sm transition-all duration-300 flex items-center gap-2",
                                children: isSaving ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "mr-2 h-4.5 w-4.5 animate-spin" }), "Saving catalog..."] }) : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Save, { className: "mr-2 h-4.5 w-4.5" }), productId ? 'Update Product' : 'List Product'] })
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
