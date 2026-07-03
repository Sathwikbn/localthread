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
var badge_1 = require("../ui/badge");
var lucide_react_1 = require("lucide-react");
var customerAPI_1 = require("../../services/customerAPI");
var sonner_1 = require("sonner");
var CustomerAddressesPage = function () {
    var _a = (0, react_1.useState)([]), addresses = _a[0], setAddresses = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(false), isAdding = _c[0], setIsAdding = _c[1];
    var _d = (0, react_1.useState)(null), editingId = _d[0], setEditingId = _d[1];
    // Form state
    var _e = (0, react_1.useState)({
        label: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        isDefault: false
    }), formData = _e[0], setFormData = _e[1];
    (0, react_1.useEffect)(function () {
        loadAddresses();
    }, []);
    var loadAddresses = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    return [4 /*yield*/, customerAPI_1.customerAPI.getAddresses()];
                case 1:
                    response = _a.sent();
                    if (response.success && response.data) {
                        setAddresses(response.data.addresses);
                    }
                    else {
                        sonner_1.toast.error('Failed to load addresses');
                    }
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error loading addresses:', error_1);
                    sonner_1.toast.error('Failed to load addresses');
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleAddAddress = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, customerAPI_1.customerAPI.addAddress(formData)];
                case 1:
                    response = _a.sent();
                    if (response.success && response.data) {
                        setAddresses(response.data.addresses);
                        setIsAdding(false);
                        resetForm();
                        sonner_1.toast.success('Address added successfully');
                    }
                    else {
                        sonner_1.toast.error(response.message || 'Failed to add address');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error adding address:', error_2);
                    sonner_1.toast.error('Failed to add address');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleUpdateAddress = function (addressId) { return __awaiter(void 0, void 0, void 0, function () {
        var updateData, response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    updateData = __assign({}, formData);
                    return [4 /*yield*/, customerAPI_1.customerAPI.updateAddress(addressId, updateData)];
                case 1:
                    response = _a.sent();
                    if (response.success && response.data) {
                        setAddresses(response.data.addresses);
                        setEditingId(null);
                        resetForm();
                        sonner_1.toast.success('Address updated successfully');
                    }
                    else {
                        sonner_1.toast.error(response.message || 'Failed to update address');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error('Error updating address:', error_3);
                    sonner_1.toast.error('Failed to update address');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleDeleteAddress = function (addressId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.confirm('Are you sure you want to delete this address?')) {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, customerAPI_1.customerAPI.deleteAddress(addressId)];
                case 2:
                    response = _a.sent();
                    if (response.success && response.data) {
                        setAddresses(response.data.addresses);
                        sonner_1.toast.success('Address deleted successfully');
                    }
                    else {
                        sonner_1.toast.error(response.message || 'Failed to delete address');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.error('Error deleting address:', error_4);
                    sonner_1.toast.error('Failed to delete address');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleEdit = function (address) {
        setEditingId(address._id);
        setFormData({
            label: address.label,
            street: address.street,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            isDefault: address.isDefault
        });
    };
    var handleCancel = function () {
        setIsAdding(false);
        setEditingId(null);
        resetForm();
    };
    var resetForm = function () {
        setFormData({
            label: '',
            street: '',
            city: '',
            state: '',
            zipCode: '',
            isDefault: false
        });
    };
    var handleInputChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center h-64", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-gray-600", children: "Loading addresses..." })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-gray-900", children: "Shipping Addresses" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "Manage your delivery addresses" })] }), !isAdding && ((0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return setIsAdding(true); }, className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4" }), "Add New Address"] }))] }), isAdding && ((0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-5 w-5" }), "Add New Address"] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "label", children: "Address Label" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "label", value: formData.label, onChange: function (e) { return handleInputChange('label', e.target.value); }, placeholder: "e.g., Home, Office, Work" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "street", children: "Street Address" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "street", value: formData.street, onChange: function (e) { return handleInputChange('street', e.target.value); }, placeholder: "Enter street address" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "city", children: "City" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "city", value: formData.city, onChange: function (e) { return handleInputChange('city', e.target.value); }, placeholder: "Enter city" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "state", children: "State" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "state", value: formData.state, onChange: function (e) { return handleInputChange('state', e.target.value); }, placeholder: "Enter state" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "zipCode", children: "Zip Code" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "zipCode", value: formData.zipCode, onChange: function (e) { return handleInputChange('zipCode', e.target.value); }, placeholder: "Enter 6-digit zip code", maxLength: 6 })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 flex items-center", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", id: "isDefault", checked: formData.isDefault, onChange: function (e) { return handleInputChange('isDefault', e.target.checked); }, className: "mr-2" }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "isDefault", children: "Set as default address" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 mt-4", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: handleAddAddress, className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Save, { className: "h-4 w-4" }), "Add Address"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: handleCancel, className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4" }), "Cancel"] })] })] })] })), addresses.length === 0 ? ((0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-12 text-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: "h-12 w-12 text-gray-400 mx-auto mb-4" }), (0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "No addresses found" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 mb-4", children: "Add your first shipping address to get started." }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return setIsAdding(true); }, className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4" }), "Add Address"] })] }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: addresses.map(function (address) { return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "relative", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-6", children: [address.isDefault && ((0, jsx_runtime_1.jsx)("div", { className: "absolute top-4 right-4", children: (0, jsx_runtime_1.jsxs)(badge_1.Badge, { className: "bg-green-100 text-green-800 flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Star, { className: "h-3 w-3" }), "Default"] }) })), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 mb-3", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: "h-5 w-5 text-blue-600" }), (0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold text-gray-900", children: address.label })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 text-gray-600", children: [(0, jsx_runtime_1.jsx)("p", { children: address.street }), (0, jsx_runtime_1.jsxs)("p", { children: [address.city, ", ", address.state, " ", address.zipCode] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 mt-4 pt-4 border-t", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", onClick: function () { return handleEdit(address); }, className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "h-4 w-4" }), "Edit"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", onClick: function () { return handleDeleteAddress(address._id); }, className: "flex items-center gap-2 text-red-600 hover:text-red-700", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-4 w-4" }), "Delete"] })] })] }) }, address._id)); }) })), editingId && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-white rounded-lg max-w-md w-full", children: (0, jsx_runtime_1.jsxs)("div", { className: "p-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-4", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold", children: "Edit Address" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: handleCancel, children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "edit-label", children: "Address Label" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "edit-label", value: formData.label, onChange: function (e) { return handleInputChange('label', e.target.value); }, placeholder: "e.g., Home, Office, Work" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "edit-street", children: "Street Address" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "edit-street", value: formData.street, onChange: function (e) { return handleInputChange('street', e.target.value); }, placeholder: "Enter street address" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "edit-city", children: "City" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "edit-city", value: formData.city, onChange: function (e) { return handleInputChange('city', e.target.value); }, placeholder: "Enter city" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "edit-state", children: "State" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "edit-state", value: formData.state, onChange: function (e) { return handleInputChange('state', e.target.value); }, placeholder: "Enter state" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "edit-zipCode", children: "Zip Code" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "edit-zipCode", value: formData.zipCode, onChange: function (e) { return handleInputChange('zipCode', e.target.value); }, placeholder: "Enter 6-digit zip code", maxLength: 6 })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", id: "edit-isDefault", checked: formData.isDefault, onChange: function (e) { return handleInputChange('isDefault', e.target.checked); }, className: "mr-2" }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "edit-isDefault", children: "Set as default address" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 mt-6", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return handleUpdateAddress(editingId); }, className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Save, { className: "h-4 w-4" }), "Update Address"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: handleCancel, className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4" }), "Cancel"] })] })] }) }) }))] }));
};
exports.default = CustomerAddressesPage;
