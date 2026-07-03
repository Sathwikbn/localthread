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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProfilePage = VendorProfilePage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var vendorAPI_1 = require("../../services/vendorAPI");
var button_1 = require("../ui/button");
var input_1 = require("../ui/input");
var label_1 = require("../ui/label");
var card_1 = require("../ui/card");
var alert_1 = require("../ui/alert");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var api_1 = require("../../services/api");
function VendorProfilePage() {
    var _this = this;
    var _a, _b, _c, _d;
    var _e = (0, react_1.useState)(null), profile = _e[0], setProfile = _e[1];
    var _f = (0, react_1.useState)(true), isLoading = _f[0], setIsLoading = _f[1];
    var _g = (0, react_1.useState)(false), isSaving = _g[0], setIsSaving = _g[1];
    var _h = (0, react_1.useState)(null), error = _h[0], setError = _h[1];
    var _subTier = (0, react_1.useState)('BASIC'), subTier = _subTier[0], setSubTier = _subTier[1];
    var _j = (0, react_1.useState)({
        storeName: '',
        storeLocation: '',
        storeDescription: '',
        phone: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: ''
        }
    }), formData = _j[0], setFormData = _j[1];
    // Load vendor profile
    (0, react_1.useEffect)(function () {
        loadProfile();
    }, []);
    var loadProfile = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, vendorProfile, error_1;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 2, 3, 4]);
                    setIsLoading(true);
                    setError(null);
                    return [4 /*yield*/, vendorAPI_1.vendorAPI.getProfile()];
                case 1:
                    response = _e.sent();
                    if (response.success && response.data) {
                        vendorProfile = response.data.vendor;
                        setProfile(vendorProfile);
                        setSubTier(vendorProfile.subscriptionTier || 'BASIC');
                        // Populate form data
                        setFormData({
                            storeName: vendorProfile.storeName || '',
                            storeLocation: vendorProfile.storeLocation || '',
                            storeDescription: vendorProfile.storeDescription || '',
                            phone: vendorProfile.phone || '',
                            address: {
                                street: ((_a = vendorProfile.address) === null || _a === void 0 ? void 0 : _a.street) || '',
                                city: ((_b = vendorProfile.address) === null || _b === void 0 ? void 0 : _b.city) || '',
                                state: ((_c = vendorProfile.address) === null || _c === void 0 ? void 0 : _c.state) || '',
                                zipCode: ((_d = vendorProfile.address) === null || _d === void 0 ? void 0 : _d.zipCode) || ''
                            }
                        });
                    }
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _e.sent();
                    console.error('Load profile error:', error_1);
                    setError('Failed to load profile');
                    return [3 /*break*/, 4];
                case 3:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleInputChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        if (name.startsWith('address.')) {
            var field_1 = name.split('.')[1];
            setFormData(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), { address: __assign(__assign({}, prev.address), (_a = {}, _a[field_1] = value, _a)) }));
            });
        }
        else {
            setFormData(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
            });
        }
    };
    var handleUpgradeSubscription = function (newTier) {
        (0, api_1.apiRequest)("/users/subscription", {
            method: "PUT",
            body: JSON.stringify({ tier: newTier })
        }).then(function (res) {
            if (res.success) {
                setSubTier(res.user.subscriptionTier);
                sonner_1.toast.success("Successfully upgraded to " + newTier + " Plan!");
            }
        }).catch(function (err) {
            sonner_1.toast.error("Failed to update subscription");
        });
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setIsSaving(true);
                    setError(null);
                    return [4 /*yield*/, vendorAPI_1.vendorAPI.updateProfile(formData)];
                case 2:
                    response = _a.sent();
                    if (response.success && response.data) {
                        setProfile(response.data.vendor);
                        sonner_1.toast.success('Profile updated successfully!');
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    console.error('Update profile error:', error_2);
                    setError('Failed to update profile');
                    sonner_1.toast.error('Failed to update profile');
                    return [3 /*break*/, 5];
                case 4:
                    setIsSaving(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    if (isLoading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center min-h-[400px]", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-8 w-8 animate-spin" }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-between", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold", children: "Vendor Profile" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "Manage your store information and settings" })] }) }), error && ((0, jsx_runtime_1.jsx)(alert_1.Alert, { variant: "destructive", children: (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: error }) })), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "lg:col-span-1", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "h-5 w-5" }), "Profile Overview"] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Mail, { className: "h-4 w-4 text-gray-500" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-gray-600", children: profile === null || profile === void 0 ? void 0 : profile.email })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Store, { className: "h-4 w-4 text-gray-500" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-gray-600", children: (profile === null || profile === void 0 ? void 0 : profile.storeName) || 'No store name set' })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: "h-4 w-4 text-gray-500" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-gray-600", children: (profile === null || profile === void 0 ? void 0 : profile.storeLocation) || 'No location set' })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Shield, { className: "h-4 w-4 text-gray-500" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm ".concat((profile === null || profile === void 0 ? void 0 : profile.isVerified) ? 'text-green-600' : 'text-yellow-600'), children: (profile === null || profile === void 0 ? void 0 : profile.isVerified) ? 'Verified Store' : 'Pending Verification' })] }), (profile === null || profile === void 0 ? void 0 : profile.verificationDate) && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-4 w-4 text-gray-500" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-gray-600", children: ["Verified on ", new Date(profile.verificationDate).toLocaleDateString()] })] }))] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "mt-6 border-[var(--lt-border)] shadow-lt-sm rounded-2xl bg-white overflow-hidden relative group", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 w-1 h-full bg-[var(--lt-amber)] group-hover:w-1.5 transition-all" }), (0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2 text-sm font-bold font-display uppercase tracking-wider text-[var(--lt-muted)]", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CreditCard, { className: "h-4 w-4" }), "Subscription Plan"] }), (0, jsx_runtime_1.jsxs)("div", { className: "pt-2 flex items-baseline gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-black font-display text-[var(--lt-charcoal)] uppercase tracking-tight", children: subTier }), (0, jsx_runtime_1.jsx)("span", { className: "text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full", children: "Active" })] })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4 pt-0", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-[var(--lt-muted)] leading-relaxed", children: [subTier === 'BASIC' && "You are on the Free Basic Plan. Upgrade to list unlimited products and access premium neighborhood O2O analytics.", subTier === 'GROWTH' && "You are on the Growth Plan. Enjoy unlimited product listings, map search prioritization, and complete dashboard access.", subTier === 'ENTERPRISE' && "You are on the Enterprise Plan. You have custom branding modules, unlimited messaging, and raw sales reports."] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 border-t pt-4", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-[10px] font-black text-slate-500 uppercase tracking-widest font-display", children: "Upgrade / Change Plan" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-2", children: [subTier !== 'GROWTH' && (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", onClick: function () { return handleUpgradeSubscription('GROWTH'); }, size: "sm", className: "bg-slate-900 text-white font-bold rounded-xl text-[10px]", children: "Growth Plan" }), subTier !== 'ENTERPRISE' && (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", onClick: function () { return handleUpgradeSubscription('ENTERPRISE'); }, size: "sm", variant: "outline", className: "border-slate-200 text-slate-800 font-bold rounded-xl text-[10px]", children: "Enterprise" }), (subTier === 'GROWTH' || subTier === 'ENTERPRISE') && (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", onClick: function () { return handleUpgradeSubscription('BASIC'); }, size: "sm", variant: "ghost", className: "text-red-500 hover:text-red-600 rounded-xl text-[10px] col-span-2 mt-2", children: "Cancel / Downgrade Plan" })] })] })] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "lg:col-span-2", children: (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "Edit Profile" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Update your store information and contact details" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold", children: "Store Information" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "storeName", children: "Store Name" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "storeName", name: "storeName", value: formData.storeName, onChange: handleInputChange, placeholder: "Enter store name" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "storeLocation", children: "Store Location" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "storeLocation", name: "storeLocation", value: formData.storeLocation, onChange: handleInputChange, placeholder: "Enter store location" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "storeDescription", children: "Store Description" }), (0, jsx_runtime_1.jsx)("textarea", { id: "storeDescription", name: "storeDescription", value: formData.storeDescription, onChange: handleInputChange, placeholder: "Describe your store and what you offer", className: "w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold", children: "Contact Information" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "phone", children: "Phone Number" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "phone", name: "phone", value: formData.phone, onChange: handleInputChange, placeholder: "Enter phone number" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold", children: "Address" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "address.street", children: "Street Address" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "address.street", name: "address.street", value: (_a = formData.address) === null || _a === void 0 ? void 0 : _a.street, onChange: handleInputChange, placeholder: "Enter street address" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "address.city", children: "City" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "address.city", name: "address.city", value: (_b = formData.address) === null || _b === void 0 ? void 0 : _b.city, onChange: handleInputChange, placeholder: "Enter city" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "address.state", children: "State" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "address.state", name: "address.state", value: (_c = formData.address) === null || _c === void 0 ? void 0 : _c.state, onChange: handleInputChange, placeholder: "Enter state" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "address.zipCode", children: "Zip Code" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "address.zipCode", name: "address.zipCode", value: (_d = formData.address) === null || _d === void 0 ? void 0 : _d.zipCode, onChange: handleInputChange, placeholder: "Enter zip code" })] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-end", children: (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", disabled: isSaving, children: isSaving ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Saving..."] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Save, { className: "mr-2 h-4 w-4" }), "Save Changes"] })) }) })] }) })] }) })] })] }));
}
