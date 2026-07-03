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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("../ui/button");
var card_1 = require("../ui/card");
var input_1 = require("../ui/input");
var label_1 = require("../ui/label");
var lucide_react_1 = require("lucide-react");
var customerAPI_1 = require("../../services/customerAPI");
var sonner_1 = require("sonner");
var CustomerProfilePage = function () {
    var _a, _b, _c, _d, _e, _f;
    var _g = (0, react_1.useState)(null), profile = _g[0], setProfile = _g[1];
    var _h = (0, react_1.useState)(0), orderCount = _h[0], setOrderCount = _h[1];
    var _j = (0, react_1.useState)(false), isEditing = _j[0], setIsEditing = _j[1];
    var _k = (0, react_1.useState)(true), loading = _k[0], setLoading = _k[1];
    var _l = (0, react_1.useState)(false), saving = _l[0], setSaving = _l[1];
    // Form state
    var _m = (0, react_1.useState)({
        name: '',
        phone: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'India'
        }
    }), formData = _m[0], setFormData = _m[1];
    (0, react_1.useEffect)(function () {
        loadProfile();
    }, []);
    var loadProfile = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    return [4 /*yield*/, customerAPI_1.customerAPI.getProfile()];
                case 1:
                    response = _a.sent();
                    if (response.success && response.data && response.data.customer) {
                        setProfile(response.data.customer);
                        setOrderCount(response.data.orderCount || 0);
                        // Initialize form data
                        setFormData({
                            name: response.data.customer.name || '',
                            phone: response.data.customer.phone || '',
                            address: response.data.customer.address || {
                                street: '',
                                city: '',
                                state: '',
                                zipCode: '',
                                country: 'India'
                            }
                        });
                    }
                    else {
                        sonner_1.toast.error('Failed to load profile details');
                    }
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error loading profile:', error_1);
                    sonner_1.toast.error('Failed to load profile');
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleSave = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setSaving(true);
                    return [4 /*yield*/, customerAPI_1.customerAPI.updateProfile(formData)];
                case 1:
                    response = _a.sent();
                    if (response.success && response.data) {
                        setProfile(response.data.customer);
                        setIsEditing(false);
                        sonner_1.toast.success('Profile updated successfully');
                    }
                    else {
                        sonner_1.toast.error(response.message || 'Failed to update profile');
                    }
                    return [3 /*break*/, 4];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error updating profile:', error_2);
                    sonner_1.toast.error('Failed to update profile');
                    return [3 /*break*/, 4];
                case 3:
                    setSaving(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleCancel = function () {
        // Reset form data to current profile
        if (profile) {
            setFormData({
                name: profile.name || '',
                phone: profile.phone || '',
                address: profile.address || {
                    street: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    country: 'India'
                }
            });
        }
        setIsEditing(false);
    };
    var handleInputChange = function (field, value) {
        if (field.includes('.')) {
            var _a = field.split('.'), parent_1 = _a[0], child_1 = _a[1];
            setFormData(function (prev) {
                var _a, _b;
                return (__assign(__assign({}, prev), (_a = {}, _a[parent_1] = __assign(__assign({}, prev[parent_1]), (_b = {}, _b[child_1] = value, _b)), _a)));
            });
        }
        else {
            setFormData(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
            });
        }
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center h-64", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-gray-600", children: "Loading profile..." })] }) }));
    }
    if (!profile) {
        return ((0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsx)("p", { className: "text-center text-gray-600", children: "Profile not found" }) }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-gray-900", children: "Profile" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "Manage your account information" })] }), !isEditing ? ((0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return setIsEditing(true); }, className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "h-4 w-4" }), "Edit Profile"] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: handleCancel, className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4" }), "Cancel"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: handleSave, disabled: saving, className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Save, { className: "h-4 w-4" }), saving ? 'Saving...' : 'Save Changes'] })] }))] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "h-5 w-5" }), "Personal Information"] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "name", children: "Full Name" }), isEditing ? ((0, jsx_runtime_1.jsx)(input_1.Input, { id: "name", value: formData.name, onChange: function (e) { return handleInputChange('name', e.target.value); }, placeholder: "Enter your full name" })) : ((0, jsx_runtime_1.jsx)("div", { className: "p-3 bg-gray-50 rounded-md", children: profile.name || 'Not provided' }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "email", children: "Email" }), (0, jsx_runtime_1.jsxs)("div", { className: "p-3 bg-gray-50 rounded-md flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Mail, { className: "h-4 w-4 text-gray-400" }), profile.email] }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500", children: "Email cannot be changed" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "phone", children: "Phone Number" }), isEditing ? ((0, jsx_runtime_1.jsx)(input_1.Input, { id: "phone", value: formData.phone, onChange: function (e) { return handleInputChange('phone', e.target.value); }, placeholder: "Enter your phone number" })) : ((0, jsx_runtime_1.jsxs)("div", { className: "p-3 bg-gray-50 rounded-md flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Phone, { className: "h-4 w-4 text-gray-400" }), profile.phone || 'Not provided'] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "Member Since" }), (0, jsx_runtime_1.jsx)("div", { className: "p-3 bg-gray-50 rounded-md", children: new Date(profile.createdAt).toLocaleDateString() })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)(label_1.Label, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: "h-4 w-4" }), "Address"] }), isEditing ? ((0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "street", children: "Street Address" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "street", value: ((_a = formData.address) === null || _a === void 0 ? void 0 : _a.street) || '', onChange: function (e) { return handleInputChange('address.street', e.target.value); }, placeholder: "Enter street address" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "city", children: "City" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "city", value: ((_b = formData.address) === null || _b === void 0 ? void 0 : _b.city) || '', onChange: function (e) { return handleInputChange('address.city', e.target.value); }, placeholder: "Enter city" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "state", children: "State" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "state", value: ((_c = formData.address) === null || _c === void 0 ? void 0 : _c.state) || '', onChange: function (e) { return handleInputChange('address.state', e.target.value); }, placeholder: "Enter state" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "zipCode", children: "Zip Code" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "zipCode", value: ((_d = formData.address) === null || _d === void 0 ? void 0 : _d.zipCode) || '', onChange: function (e) { return handleInputChange('address.zipCode', e.target.value); }, placeholder: "Enter zip code" })] })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "p-3 bg-gray-50 rounded-md", children: profile.address ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: profile.address.street }), (0, jsx_runtime_1.jsxs)("p", { children: [profile.address.city, ", ", profile.address.state, " ", profile.address.zipCode] }), (0, jsx_runtime_1.jsx)("p", { children: profile.address.country })] })) : ((0, jsx_runtime_1.jsx)("p", { className: "text-gray-500", children: "No address provided" })) }))] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [(0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-gray-600", children: "Total Orders" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-gray-900", children: orderCount })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.Package, { className: "h-8 w-8 text-blue-600" })] }) }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-gray-600", children: "Saved Addresses" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-gray-900", children: ((_e = profile.addresses) === null || _e === void 0 ? void 0 : _e.length) || 0 })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: "h-8 w-8 text-green-600" })] }) }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-gray-600", children: "Wishlist Items" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-gray-900", children: ((_f = profile.wishlist) === null || _f === void 0 ? void 0 : _f.length) || 0 })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.Heart, { className: "h-8 w-8 text-red-600" })] }) }) })] })] }));
};
exports.default = CustomerProfilePage;
