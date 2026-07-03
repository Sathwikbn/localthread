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
exports.AdminUsersPage = AdminUsersPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("../ui/card");
var button_1 = require("../ui/button");
var lucide_react_1 = require("lucide-react");
var adminAPI_1 = require("../../services/adminAPI");
var sonner_1 = require("sonner");
var AdminPageLayout_1 = require("./AdminPageLayout");
function AdminUsersPage() {
    var _this = this;
    var _a = (0, react_1.useState)([]), users = _a[0], setUsers = _a[1];
    var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(''), search = _c[0], setSearch = _c[1];
    var _d = (0, react_1.useState)(''), roleFilter = _d[0], setRoleFilter = _d[1];
    var _e = (0, react_1.useState)(1), currentPage = _e[0], setCurrentPage = _e[1];
    var _f = (0, react_1.useState)(1), totalPages = _f[0], setTotalPages = _f[1];
    var _g = (0, react_1.useState)(0), totalElements = _g[0], setTotalElements = _g[1];
    var fetchUsers = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setIsLoading(true);
                    return [4 /*yield*/, adminAPI_1.adminAPI.getUsers({
                            page: currentPage,
                            limit: 10,
                            search: search,
                            role: roleFilter
                        })];
                case 1:
                    res = _a.sent();
                    if (res.success && res.data) {
                        setUsers(res.data.users);
                        setTotalPages(res.data.pagination.totalPages);
                        setTotalElements(res.data.pagination.totalElements);
                    }
                    return [3 /*break*/, 4];
                case 2:
                    err_1 = _a.sent();
                    console.error(err_1);
                    sonner_1.toast.error('Failed to load users');
                    return [3 /*break*/, 4];
                case 3:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        fetchUsers();
    }, [currentPage, roleFilter]);
    var handleSearchSubmit = function (e) {
        e.preventDefault();
        setCurrentPage(1);
        fetchUsers();
    };
    var toggleStatus = function (userId, currentActive) { return __awaiter(_this, void 0, void 0, function () {
        var res, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, adminAPI_1.adminAPI.toggleUserActive(userId, !currentActive)];
                case 1:
                    res = _a.sent();
                    if (res.success) {
                        sonner_1.toast.success("User account ".concat(!currentActive ? 'activated' : 'suspended'));
                        fetchUsers();
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    sonner_1.toast.error(err_2.message || 'Operation failed');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var verifyVendor = function (vendorId) { return __awaiter(_this, void 0, void 0, function () {
        var res, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, adminAPI_1.adminAPI.verifyVendor(vendorId)];
                case 1:
                    res = _a.sent();
                    if (res.success) {
                        sonner_1.toast.success('Vendor profile verified successfully');
                        fetchUsers();
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    sonner_1.toast.error(err_3.message || 'Verification failed');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsx)(AdminPageLayout_1.AdminPageLayout, { title: "User Moderation", description: "View, filter, and control active customer and vendor profiles", icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-6 w-6 text-indigo-600" }), children: (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "border-slate-200/80 shadow-sm", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "pb-4", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg font-bold text-gray-900", children: "Platform Accounts" }), (0, jsx_runtime_1.jsxs)(card_1.CardDescription, { children: ["A total of ", totalElements, " registered members"] })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSearchSubmit, className: "flex flex-col sm:flex-row gap-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Search by name or email...", value: search, onChange: function (e) { return setSearch(e.target.value); }, className: "w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" })] }), (0, jsx_runtime_1.jsxs)("select", { value: roleFilter, onChange: function (e) { setRoleFilter(e.target.value); setCurrentPage(1); }, className: "px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none bg-white focus:ring-2 focus:ring-indigo-500", children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "All Roles" }), (0, jsx_runtime_1.jsx)("option", { value: "customer", children: "Customer" }), (0, jsx_runtime_1.jsx)("option", { value: "vendor", children: "Vendor" }), (0, jsx_runtime_1.jsx)("option", { value: "admin", children: "Administrator" })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", className: "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold", children: "Search" })] }), isLoading ? ((0, jsx_runtime_1.jsx)("div", { className: "py-12 flex justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-8 w-8 animate-spin text-indigo-600" }) })) : users.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "border border-dashed rounded-lg p-10 text-center text-gray-500", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-10 w-10 mx-auto text-gray-300 mb-2" }), (0, jsx_runtime_1.jsx)("p", { className: "font-semibold text-gray-700", children: "No users found" }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-400 mt-1", children: "Try relaxing your search terms or filters" })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "overflow-x-auto border border-slate-100 rounded-lg", children: (0, jsx_runtime_1.jsxs)("table", { className: "min-w-full divide-y divide-slate-100 text-sm", children: [(0, jsx_runtime_1.jsx)("thead", { className: "bg-slate-50/70 text-gray-600 font-semibold", children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-left", children: "User Name" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-left", children: "Email Address" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-left", children: "Role" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-left", children: "Store Detail" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-left", children: "Status" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-right", children: "Moderations" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { className: "divide-y divide-slate-100 bg-white", children: users.map(function (u) { return ((0, jsx_runtime_1.jsxs)("tr", { className: "hover:bg-slate-50/50", children: [(0, jsx_runtime_1.jsx)("td", { className: "px-4 py-3 font-semibold text-gray-800", children: u.name }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-3 text-gray-600", children: u.email }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-3", children: (0, jsx_runtime_1.jsx)("span", { className: "px-2 py-0.5 text-xs font-semibold rounded-full uppercase tracking-wider ".concat(u.role === 'admin' ? 'bg-red-50 text-red-700 border border-red-100' :
                                                            u.role === 'vendor' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                                                                'bg-blue-50 text-blue-700 border border-blue-100'), children: u.role }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-3", children: u.role === 'vendor' ? ((0, jsx_runtime_1.jsxs)("div", { className: "text-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-semibold text-gray-800 block", children: u.storeName || 'Unnamed Shop' }), (0, jsx_runtime_1.jsx)("span", { className: "text-gray-500 block truncate max-w-[150px]", children: u.storeLocation || 'No location' })] })) : '-' }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-3", children: (0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ".concat(u.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'), children: [(0, jsx_runtime_1.jsx)("span", { className: "h-1.5 w-1.5 rounded-full ".concat(u.isActive ? 'bg-green-600' : 'bg-red-600') }), u.isActive ? 'Active' : 'Suspended'] }) }), (0, jsx_runtime_1.jsxs)("td", { className: "px-4 py-3 text-right space-x-2", children: [u.role === 'vendor' && !u.isVerified && ((0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return verifyVendor(u.id); }, size: "sm", className: "bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-7 px-2 text-xs", children: "Verify Vendor" })), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return toggleStatus(u.id, u.isActive); }, variant: "ghost", size: "sm", className: "h-7 px-2 text-xs font-bold ".concat(u.isActive ? 'text-red-600 hover:text-red-700 hover:bg-red-50' : 'text-green-600 hover:text-green-700 hover:bg-green-50'), children: u.isActive ? (0, jsx_runtime_1.jsx)(lucide_react_1.UserX, { className: "h-4 w-4" }) : (0, jsx_runtime_1.jsx)(lucide_react_1.UserCheck, { className: "h-4 w-4" }) })] })] }, u.id)); }) })] }) })), totalPages > 1 && ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center pt-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return setCurrentPage(function (prev) { return Math.max(prev - 1, 1); }); }, disabled: currentPage === 1, variant: "outline", size: "sm", children: "Previous" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-gray-500 font-medium", children: ["Page ", currentPage, " of ", totalPages] }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return setCurrentPage(function (prev) { return Math.min(prev + 1, totalPages); }); }, disabled: currentPage === totalPages, variant: "outline", size: "sm", children: "Next" })] }))] })] }) }));
}
