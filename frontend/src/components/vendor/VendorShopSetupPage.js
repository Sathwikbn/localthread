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
exports.VendorShopSetupPage = VendorShopSetupPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var shopAPI_1 = require("../../services/shopAPI");
var button_1 = require("../ui/button");
var input_1 = require("../ui/input");
var label_1 = require("../ui/label");
var card_1 = require("../ui/card");
var alert_1 = require("../ui/alert");
var badge_1 = require("../ui/badge");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
function VendorShopSetupPage() {
    var _this = this;
    var user = (0, react_redux_1.useSelector)(function (state) { return state.auth; }).user;
    var _a = (0, react_1.useState)(null), shop = _a[0], setShop = _a[1];
    var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(false), isSaving = _c[0], setIsSaving = _c[1];
    var _d = (0, react_1.useState)(null), error = _d[0], setError = _d[1];
    // Form states
    var _e = (0, react_1.useState)(''), name = _e[0], setName = _e[1];
    var _f = (0, react_1.useState)(''), description = _f[0], setDescription = _f[1];
    var _g = (0, react_1.useState)(''), street = _g[0], setStreet = _g[1];
    var _h = (0, react_1.useState)(''), city = _h[0], setCity = _h[1];
    var _j = (0, react_1.useState)(''), state = _j[0], setState = _j[1];
    var _k = (0, react_1.useState)(''), zipCode = _k[0], setZipCode = _k[1];
    var _l = (0, react_1.useState)(12.9716), latitude = _l[0], setLatitude = _l[1]; // Default Bangalore coords
    var _m = (0, react_1.useState)(77.5946), longitude = _m[0], setLongitude = _m[1];
    var _o = (0, react_1.useState)(''), phone = _o[0], setPhone = _o[1];
    var _p = (0, react_1.useState)(''), email = _p[0], setEmail = _p[1];
    var _q = (0, react_1.useState)(''), website = _q[0], setWebsite = _q[1];
    var _r = (0, react_1.useState)(''), gstNumber = _r[0], setGstNumber = _r[1];
    var _s = (0, react_1.useState)(''), panNumber = _s[0], setPanNumber = _s[1];
    var _t = (0, react_1.useState)('individual'), businessType = _t[0], setBusinessType = _t[1];
    var _u = (0, react_1.useState)(new Date().getFullYear()), establishedYear = _u[0], setEstablishedYear = _u[1];
    // Tag fields
    var _v = (0, react_1.useState)([]), categories = _v[0], setCategories = _v[1];
    var _w = (0, react_1.useState)(''), newCategory = _w[0], setNewCategory = _w[1];
    var _x = (0, react_1.useState)([]), features = _x[0], setFeatures = _x[1];
    var _y = (0, react_1.useState)(''), newFeature = _y[0], setNewFeature = _y[1];
    // Operating Hours State
    var daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var _z = (0, react_1.useState)(daysOfWeek.map(function (day) { return ({
        dayOfWeek: day,
        open: '09:00',
        close: '18:00',
        openDay: true
    }); })), operatingHours = _z[0], setOperatingHours = _z[1];
    // File Upload State
    var _0 = (0, react_1.useState)(null), logoFile = _0[0], setLogoFile = _0[1];
    var _1 = (0, react_1.useState)(null), bannerFile = _1[0], setBannerFile = _1[1];
    (0, react_1.useEffect)(function () {
        if ((user === null || user === void 0 ? void 0 : user.id) || (user === null || user === void 0 ? void 0 : user._id)) {
            loadShopDetails();
        }
    }, [user]);
    var loadShopDetails = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, userId, shopsList, userShop, u, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setIsLoading(true);
                    setError(null);
                    return [4 /*yield*/, shopAPI_1.shopAPI.getAllShops({ limit: 100 })];
                case 1:
                    response = _a.sent();
                    userId = (user === null || user === void 0 ? void 0 : user.id) || (user === null || user === void 0 ? void 0 : user._id);
                    if (response) {
                        shopsList = null;
                        if (response.success && response.data) {
                            shopsList = response.data.shops;
                        } else if (response.shops) {
                            shopsList = response.shops;
                        }
                        if (shopsList && Array.isArray(shopsList)) {
                            userShop = shopsList.find(function (s) { 
                                return s.ownerId === userId || (s.owner && (s.owner.id === userId || s.owner._id === userId)); 
                            });
                            if (userShop) {
                                setShop(userShop);
                                populateForm(userShop);
                            }
                            else {
                                u = user;
                                if (u) {
                                    setName(u.name || '');
                                    setEmail(u.email || '');
                                    setPhone(u.phone || '');
                                    if (u.storeName)
                                        setName(u.storeName);
                                    if (u.storeDescription)
                                        setDescription(u.storeDescription);
                                }
                            }
                        }
                    }
                    return [3 /*break*/, 4];
                case 2:
                    err_1 = _a.sent();
                    console.error('Failed to load shop details:', err_1);
                    setError('Could not fetch shop profile.');
                    return [3 /*break*/, 4];
                case 3:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var populateForm = function (shopData) {
        setName(shopData.name || '');
        setDescription(shopData.description || '');
        setStreet(shopData.street || '');
        setCity(shopData.city || '');
        setState(shopData.state || '');
        setZipCode(shopData.zipCode || '');
        setLatitude(shopData.latitude !== undefined && shopData.latitude !== null ? shopData.latitude : 12.9716);
        setLongitude(shopData.longitude !== undefined && shopData.longitude !== null ? shopData.longitude : 77.5946);
        setPhone(shopData.phone || '');
        setEmail(shopData.email || '');
        setWebsite(shopData.website || '');
        setGstNumber(shopData.gstNumber || '');
        setPanNumber(shopData.panNumber || '');
        setBusinessType(shopData.businessType || 'individual');
        setEstablishedYear(shopData.establishedYear || new Date().getFullYear());
        setCategories(shopData.categories || []);
        setFeatures(shopData.features || []);
        if (shopData.operatingHours && shopData.operatingHours.length > 0) {
            setOperatingHours(shopData.operatingHours.map(function (h) { return ({
                dayOfWeek: h.dayOfWeek,
                open: h.open,
                close: h.close,
                openDay: h.openDay !== undefined ? h.openDay : h.isOpen
            }); }));
        }
    };
    var handleAddCategory = function () {
        if (newCategory.trim() && !categories.includes(newCategory.trim())) {
            setCategories(__spreadArray(__spreadArray([], categories, true), [newCategory.trim()], false));
            setNewCategory('');
        }
    };
    var handleRemoveCategory = function (cat) {
        setCategories(categories.filter(function (c) { return c !== cat; }));
    };
    var handleAddFeature = function () {
        if (newFeature.trim() && !features.includes(newFeature.trim())) {
            setFeatures(__spreadArray(__spreadArray([], features, true), [newFeature.trim()], false));
            setNewFeature('');
        }
    };
    var handleRemoveFeature = function (feat) {
        setFeatures(features.filter(function (f) { return f !== feat; }));
    };
    var handleHoursChange = function (index, field, value) {
        var _a;
        var updated = __spreadArray([], operatingHours, true);
        updated[index] = __assign(__assign({}, updated[index]), (_a = {}, _a[field] = value, _a));
        setOperatingHours(updated);
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var payload, saveResponse, savedShop, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!name || !street || !city || !state || !zipCode || !phone || !email) {
                        sonner_1.toast.error('Please fill in all required fields.');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 12, 13, 14]);
                    setIsSaving(true);
                    setError(null);
                    payload = {
                        name: name,
                        description: description,
                        street: street,
                        city: city,
                        state: state,
                        zipCode: zipCode,
                        latitude: latitude,
                        longitude: longitude,
                        phone: phone,
                        email: email,
                        website: website,
                        gstNumber: gstNumber,
                        panNumber: panNumber,
                        businessType: businessType,
                        establishedYear: establishedYear,
                        categories: categories,
                        features: features,
                        operatingHours: operatingHours.map(function (h) { return ({
                            dayOfWeek: h.dayOfWeek,
                            open: h.open,
                            close: h.close,
                            isOpen: h.openDay
                        }); })
                    };
                    saveResponse = void 0;
                    if (!(shop && shop.id)) return [3 /*break*/, 3];
                    return [4 /*yield*/, shopAPI_1.shopAPI.updateShop(shop.id, payload)];
                case 2:
                    saveResponse = _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, shopAPI_1.shopAPI.createShop(payload)];
                case 4:
                    saveResponse = _a.sent();
                    _a.label = 5;
                case 5:
                    savedShop = null;
                    if (saveResponse) {
                        if (saveResponse.success && saveResponse.data) {
                            savedShop = saveResponse.data;
                        } else if (saveResponse.id) {
                            savedShop = saveResponse;
                        }
                    }
                    if (!savedShop) return [3 /*break*/, 10];
                    setShop(savedShop);
                    if (!(logoFile && savedShop.id)) return [3 /*break*/, 7];
                    return [4 /*yield*/, shopAPI_1.shopAPI.uploadLogo(savedShop.id, logoFile)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    if (!(bannerFile && savedShop.id)) return [3 /*break*/, 9];
                    return [4 /*yield*/, shopAPI_1.shopAPI.uploadBanner(savedShop.id, bannerFile)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    sonner_1.toast.success('Shop profile saved successfully!');
                    loadShopDetails();
                    return [3 /*break*/, 11];
                case 10:
                    setError(saveResponse.message || 'Failed to save shop details.');
                    _a.label = 11;
                case 11: return [3 /*break*/, 14];
                case 12:
                    err_2 = _a.sent();
                    console.error('Save shop error:', err_2);
                    setError(err_2.message || 'Error saving shop details.');
                    return [3 /*break*/, 14];
                case 13:
                    setIsSaving(false);
                    return [7 /*endfinally*/];
                case 14: return [2 /*return*/];
            }
        });
    }); };
    var getImageUrl = function (path) {
        if (!path) return '';
        if (path.startsWith('http://') || path.startsWith('https://')) return path;
        var apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        var serverRoot = apiBase.endsWith('/api') ? apiBase.slice(0, -4) : apiBase;
        var cleanPath = path.startsWith('/') ? path : '/' + path;
        return serverRoot + cleanPath;
    };
    if (isLoading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center min-h-[400px]", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-8 w-8 animate-spin text-primary" }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto px-4 py-8 space-y-6 max-w-5xl", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between border-b pb-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold tracking-tight text-gray-900", children: "Shop Setup & Profile" }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground text-sm mt-1", children: "Configure your physical marketplace storefront on LocalThread" })] }), (shop === null || shop === void 0 ? void 0 : shop.isVerified) && ((0, jsx_runtime_1.jsxs)(badge_1.Badge, { className: "bg-emerald-100 hover:bg-emerald-200 text-emerald-800 flex items-center gap-1 py-1.5 px-3", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, { className: "h-4 w-4" }), " Verified Store"] }))] }), error && ((0, jsx_runtime_1.jsx)(alert_1.Alert, { variant: "destructive", children: (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: error }) })), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "lg:col-span-2 space-y-6", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2 text-xl font-semibold", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Store, { className: "h-5 w-5 text-primary" }), " General Store Info"] }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Primary details about your business storefront" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)(label_1.Label, { htmlFor: "shopName", children: ["Store Name ", (0, jsx_runtime_1.jsx)("span", { className: "text-red-500", children: "*" })] }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "shopName", value: name, onChange: function (e) { return setName(e.target.value); }, placeholder: "e.g. Threads & Co. Boutique", required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "shopDesc", children: "Store Description" }), (0, jsx_runtime_1.jsx)("textarea", { id: "shopDesc", value: description, onChange: function (e) { return setDescription(e.target.value); }, placeholder: "Describe your shop offerings, specialty products, and store history...", className: "w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "businessType", children: "Business Type" }), (0, jsx_runtime_1.jsxs)("select", { id: "businessType", value: businessType, onChange: function (e) { return setBusinessType(e.target.value); }, className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring", children: [(0, jsx_runtime_1.jsx)("option", { value: "individual", children: "Sole Proprietorship" }), (0, jsx_runtime_1.jsx)("option", { value: "partnership", children: "Partnership" }), (0, jsx_runtime_1.jsx)("option", { value: "pvt_ltd", children: "Private Limited Company" }), (0, jsx_runtime_1.jsx)("option", { value: "llp", children: "LLP" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "estYear", children: "Established Year" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "estYear", type: "number", value: establishedYear, onChange: function (e) { return setEstablishedYear(parseInt(e.target.value, 10)); } })] })] })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2 text-xl font-semibold", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: "h-5 w-5 text-primary" }), " Location & Contact"] }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Help customers locate your store and reach out" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)(label_1.Label, { htmlFor: "shopPhone", children: ["Phone Number ", (0, jsx_runtime_1.jsx)("span", { className: "text-red-500", children: "*" })] }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "shopPhone", value: phone, onChange: function (e) { return setPhone(e.target.value); }, placeholder: "e.g. +91 9876543210", required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)(label_1.Label, { htmlFor: "shopEmail", children: ["Email Address ", (0, jsx_runtime_1.jsx)("span", { className: "text-red-500", children: "*" })] }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "shopEmail", type: "email", value: email, onChange: function (e) { return setEmail(e.target.value); }, placeholder: "e.g. contact@threadsco.com", required: true })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "shopWebsite", children: "Website Link" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "shopWebsite", value: website, onChange: function (e) { return setWebsite(e.target.value); }, placeholder: "e.g. https://www.threadsco.com" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)(label_1.Label, { htmlFor: "street", children: ["Street Address ", (0, jsx_runtime_1.jsx)("span", { className: "text-red-500", children: "*" })] }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "street", value: street, onChange: function (e) { return setStreet(e.target.value); }, placeholder: "e.g. 123 Fashion Street, 2nd Block", required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)(label_1.Label, { htmlFor: "city", children: ["City ", (0, jsx_runtime_1.jsx)("span", { className: "text-red-500", children: "*" })] }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "city", value: city, onChange: function (e) { return setCity(e.target.value); }, placeholder: "e.g. Bengaluru", required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)(label_1.Label, { htmlFor: "state", children: ["State ", (0, jsx_runtime_1.jsx)("span", { className: "text-red-500", children: "*" })] }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "state", value: state, onChange: function (e) { return setState(e.target.value); }, placeholder: "e.g. Karnataka", required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)(label_1.Label, { htmlFor: "zipCode", children: ["Zip Code ", (0, jsx_runtime_1.jsx)("span", { className: "text-red-500", children: "*" })] }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "zipCode", value: zipCode, onChange: function (e) { return setZipCode(e.target.value); }, placeholder: "e.g. 560001", required: true })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)(label_1.Label, { htmlFor: "lat", children: ["Latitude ", (0, jsx_runtime_1.jsx)("span", { className: "text-muted-foreground", children: "(Geospatial)" })] }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "lat", type: "number", step: "0.000001", value: latitude, onChange: function (e) { return setLatitude(parseFloat(e.target.value)); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)(label_1.Label, { htmlFor: "lng", children: ["Longitude ", (0, jsx_runtime_1.jsx)("span", { className: "text-muted-foreground", children: "(Geospatial)" })] }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "lng", type: "number", step: "0.000001", value: longitude, onChange: function (e) { return setLongitude(parseFloat(e.target.value)); } })] })] })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2 text-xl font-semibold", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { className: "h-5 w-5 text-primary" }), " Operating Hours"] }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Setup times your store is open to the public" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "space-y-4", children: operatingHours.map(function (hours, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-3 last:border-0 last:pb-0", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-28 font-medium text-sm", children: hours.dayOfWeek }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 sm:justify-end items-center gap-4", children: [(0, jsx_runtime_1.jsxs)("label", { className: "flex items-center gap-2 text-sm text-gray-600", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: hours.openDay, onChange: function (e) { return handleHoursChange(index, 'openDay', e.target.checked); }, className: "rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" }), " Open"] }), (0, jsx_runtime_1.jsx)(input_1.Input, { type: "text", value: hours.open, disabled: !hours.openDay, onChange: function (e) { return handleHoursChange(index, 'open', e.target.value); }, className: "w-20 text-center text-xs h-8", placeholder: "09:00" }), (0, jsx_runtime_1.jsx)("span", { className: "text-gray-400 text-xs", children: "to" }), (0, jsx_runtime_1.jsx)(input_1.Input, { type: "text", value: hours.close, disabled: !hours.openDay, onChange: function (e) { return handleHoursChange(index, 'close', e.target.value); }, className: "w-20 text-center text-xs h-8", placeholder: "18:00" })] })] }, hours.dayOfWeek)); }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { className: "bg-slate-50 border-slate-200", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg", children: "Publish Profile" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Save and display your storefront to marketplace customers" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "space-y-3", children: (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", className: "w-full flex items-center justify-center gap-2", disabled: isSaving, children: isSaving ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-4 w-4 animate-spin" }), " Saving Store..."] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Save, { className: "h-4 w-4" }), " Save Changes"] })) }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2 text-lg", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Image, { className: "h-4 w-4 text-primary" }), " Store Media"] }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Upload store icons & background banner" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "logoUpload", children: "Store Logo" }), ((shop === null || shop === void 0 ? void 0 : shop.logoUrl) || (shop === null || shop === void 0 ? void 0 : shop.logo)) && ((0, jsx_runtime_1.jsx)("div", { className: "w-20 h-20 rounded border overflow-hidden bg-gray-50 mb-2", children: (0, jsx_runtime_1.jsx)("img", { src: getImageUrl((shop === null || shop === void 0 ? void 0 : shop.logoUrl) || (shop === null || shop === void 0 ? void 0 : shop.logo)), alt: "Store Logo", className: "w-full h-full object-cover" }) })), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "logoUpload", type: "file", accept: "image/*", onChange: function (e) { var _a; return setLogoFile(((_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) || null); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "bannerUpload", children: "Banner Image" }), ((shop === null || shop === void 0 ? void 0 : shop.bannerUrl) || (shop === null || shop === void 0 ? void 0 : shop.banner)) && ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-24 rounded border overflow-hidden bg-gray-50 mb-2", children: (0, jsx_runtime_1.jsx)("img", { src: getImageUrl((shop === null || shop === void 0 ? void 0 : shop.bannerUrl) || (shop === null || shop === void 0 ? void 0 : shop.banner)), alt: "Store Banner", className: "w-full h-full object-cover" }) })), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "bannerUpload", type: "file", accept: "image/*", onChange: function (e) { var _a; return setBannerFile(((_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) || null); } })] })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg", children: "Legal Documents" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Upload numbers required for store verification" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "gstNum", children: "GSTIN Number" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "gstNum", value: gstNumber, onChange: function (e) { return setGstNumber(e.target.value); }, placeholder: "e.g. 29AAAAA1111A1Z1", maxLength: 15 })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "panNum", children: "PAN Card Number" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "panNum", value: panNumber, onChange: function (e) { return setPanNumber(e.target.value); }, placeholder: "e.g. ABCDE1234F", maxLength: 10 })] })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg", children: "Categories & Tags" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Categorize and tag your store for quick discoverability" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "Categories" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { value: newCategory, onChange: function (e) { return setNewCategory(e.target.value); }, placeholder: "e.g. Clothing", onKeyDown: function (e) { return e.key === 'Enter' && (e.preventDefault(), handleAddCategory()); } }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", size: "sm", onClick: handleAddCategory, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4" }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1.5 mt-2", children: categories.map(function (cat) { return ((0, jsx_runtime_1.jsxs)(badge_1.Badge, { variant: "secondary", className: "flex items-center gap-1", children: [cat, " ", (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-3 w-3 cursor-pointer text-muted-foreground hover:text-foreground", onClick: function () { return handleRemoveCategory(cat); } })] }, cat)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 border-t pt-4", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "Store Features" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { value: newFeature, onChange: function (e) { return setNewFeature(e.target.value); }, placeholder: "e.g. Free Delivery", onKeyDown: function (e) { return e.key === 'Enter' && (e.preventDefault(), handleAddFeature()); } }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", size: "sm", onClick: handleAddFeature, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4" }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1.5 mt-2", children: features.map(function (feat) { return ((0, jsx_runtime_1.jsxs)(badge_1.Badge, { variant: "secondary", className: "flex items-center gap-1", children: [feat, " ", (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-3 w-3 cursor-pointer text-muted-foreground hover:text-foreground", onClick: function () { return handleRemoveFeature(feat); } })] }, feat)); }) })] })] })] })] })] })] }));
}
