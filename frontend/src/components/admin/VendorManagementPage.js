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
exports.VendorManagementPage = VendorManagementPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var vendorAPI_1 = require("../../services/vendorAPI");
var card_1 = require("../ui/card");
var button_1 = require("../ui/button");
var input_1 = require("../ui/input");
var alert_1 = require("../ui/alert");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
function VendorManagementPage() {
    var _this = this;
    var _a = (0, react_1.useState)([]), vendors = _a[0], setVendors = _a[1];
    var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(null), isVerifying = _c[0], setIsVerifying = _c[1];
    var _d = (0, react_1.useState)(null), error = _d[0], setError = _d[1];
    var _e = (0, react_1.useState)(''), searchTerm = _e[0], setSearchTerm = _e[1];
    var _f = (0, react_1.useState)(null), verifiedFilter = _f[0], setVerifiedFilter = _f[1];
    var _g = (0, react_1.useState)(1), currentPage = _g[0], setCurrentPage = _g[1];
    var _h = (0, react_1.useState)(1), totalPages = _h[0], setTotalPages = _h[1];
    (0, react_1.useEffect)(function () {
        loadVendors();
    }, [currentPage, searchTerm, verifiedFilter]);
    var loadVendors = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setIsLoading(true);
                    setError(null);
                    return [4 /*yield*/, vendorAPI_1.vendorAPI.getAllVendors({
                            page: currentPage,
                            limit: 10,
                            verified: verifiedFilter || undefined,
                            search: searchTerm || undefined
                        })];
                case 1:
                    response = _a.sent();
                    if (response.success && response.data) {
                        setVendors(response.data.vendors);
                        setTotalPages(response.data.pagination.totalPages);
                    }
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    console.error('Load vendors error:', error_1);
                    setError('Failed to load vendors');
                    return [3 /*break*/, 4];
                case 3:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleVerifyVendor = function (vendorId) { return __awaiter(_this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setIsVerifying(vendorId);
                    return [4 /*yield*/, vendorAPI_1.vendorAPI.verifyVendor(vendorId)];
                case 1:
                    response = _a.sent();
                    if (response.success) {
                        sonner_1.toast.success('Vendor verified successfully!');
                        loadVendors(); // Reload the list
                    }
                    return [3 /*break*/, 4];
                case 2:
                    error_2 = _a.sent();
                    console.error('Verify vendor error:', error_2);
                    sonner_1.toast.error('Failed to verify vendor');
                    return [3 /*break*/, 4];
                case 3:
                    setIsVerifying(null);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var formatDate = function (dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
    if (isLoading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center min-h-[400px]", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-8 w-8 animate-spin" }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold", children: "Vendor Management" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "Manage and verify vendor accounts" })] }), error && ((0, jsx_runtime_1.jsx)(alert_1.Alert, { variant: "destructive", children: (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: error }) })), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "Filters" }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row gap-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "Search vendors...", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); }, className: "pl-10" })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: verifiedFilter === null ? "default" : "outline", onClick: function () { return setVerifiedFilter(null); }, children: "All Vendors" }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: verifiedFilter === true ? "default" : "outline", onClick: function () { return setVerifiedFilter(true); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, { className: "mr-2 h-4 w-4" }), "Verified"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: verifiedFilter === false ? "default" : "outline", onClick: function () { return setVerifiedFilter(false); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Shield, { className: "mr-2 h-4 w-4" }), "Pending"] })] })] }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardTitle, { children: ["Vendors (", vendors.length, ")"] }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Manage vendor accounts and verification status" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: vendors.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "text-center py-8", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Store, { className: "h-12 w-12 text-gray-400 mx-auto mb-4" }), (0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "No vendors found" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-500", children: searchTerm ? 'Try adjusting your search terms.' : 'No vendors have registered yet.' })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: vendors.map(function (vendor) { return ((0, jsx_runtime_1.jsx)("div", { className: "border rounded-lg p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "h-6 w-6 text-gray-600" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold", children: vendor.name }), vendor.isVerified ? ((0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, { className: "h-4 w-4 text-green-600" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, { className: "h-4 w-4 text-yellow-600" }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4 text-sm text-gray-600 mt-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Mail, { className: "h-3 w-3" }), vendor.email] }), vendor.storeName && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Store, { className: "h-3 w-3" }), vendor.storeName] })), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-3 w-3" }), "Joined ", formatDate(vendor.createdAt)] })] }), vendor.storeDescription && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500 mt-2", children: vendor.storeDescription }))] })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-2", children: !vendor.isVerified ? ((0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return handleVerifyVendor(vendor._id); }, disabled: isVerifying === vendor._id, size: "sm", children: [isVerifying === vendor._id ? ((0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-4 w-4 animate-spin" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, { className: "h-4 w-4" })), "Verify"] })) : ((0, jsx_runtime_1.jsx)("div", { className: "text-sm text-green-600 font-medium", children: "Verified" })) })] }) }, vendor._id)); }) })) })] }), totalPages > 1 && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center gap-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", onClick: function () { return setCurrentPage(function (prev) { return Math.max(1, prev - 1); }); }, disabled: currentPage === 1, children: "Previous" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-gray-600", children: ["Page ", currentPage, " of ", totalPages] }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", onClick: function () { return setCurrentPage(function (prev) { return Math.min(totalPages, prev + 1); }); }, disabled: currentPage === totalPages, children: "Next" })] }))] }));
}
