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
exports.AdminReportsPage = AdminReportsPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("../ui/card");
var button_1 = require("../ui/button");
var lucide_react_1 = require("lucide-react");
var adminAPI_1 = require("../../services/adminAPI");
var sonner_1 = require("sonner");
var AdminPageLayout_1 = require("./AdminPageLayout");
function AdminReportsPage() {
    var _this = this;
    var _a = (0, react_1.useState)([]), reviews = _a[0], setReviews = _a[1];
    var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(1), currentPage = _c[0], setCurrentPage = _c[1];
    var _d = (0, react_1.useState)(1), totalPages = _d[0], setTotalPages = _d[1];
    var fetchReviews = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setIsLoading(true);
                    return [4 /*yield*/, adminAPI_1.adminAPI.getPendingReviews({ page: currentPage, limit: 10 })];
                case 1:
                    res = _a.sent();
                    if (res.success && res.data) {
                        setReviews(res.data.reviews);
                        setTotalPages(res.data.pagination.totalPages);
                    }
                    return [3 /*break*/, 4];
                case 2:
                    err_1 = _a.sent();
                    console.error(err_1);
                    sonner_1.toast.error('Failed to load pending reviews');
                    return [3 /*break*/, 4];
                case 3:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        fetchReviews();
    }, [currentPage]);
    var handleModerate = function (reviewId, status) { return __awaiter(_this, void 0, void 0, function () {
        var res, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, adminAPI_1.adminAPI.moderateReview(reviewId, status)];
                case 1:
                    res = _a.sent();
                    if (res.success) {
                        sonner_1.toast.success("Review successfully ".concat(status));
                        fetchReviews();
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
    return ((0, jsx_runtime_1.jsx)(AdminPageLayout_1.AdminPageLayout, { title: "Content Moderation", description: "Inspect customer product reviews and verify appropriate commenting guidelines", icon: (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-6 w-6 text-cyan-600" }), children: (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "border-slate-200", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg font-bold text-gray-900", children: "Ratings Moderation Queue" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Decide whether pending customer reviews appear on public listings" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [isLoading ? ((0, jsx_runtime_1.jsx)("div", { className: "py-12 flex justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-8 w-8 animate-spin text-cyan-600" }) })) : reviews.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "border border-dashed rounded-lg p-10 text-center text-gray-500 bg-gray-50/50", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-10 w-10 mx-auto text-gray-400 mb-3" }), (0, jsx_runtime_1.jsx)("p", { className: "font-semibold text-gray-700", children: "No pending reviews" }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500 mt-1", children: "Excellent! All reviews match community standards and guidelines" })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: reviews.map(function (rev) { return ((0, jsx_runtime_1.jsxs)("div", { className: "border border-slate-100 rounded-xl p-5 bg-white space-y-3 shadow-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-start", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("span", { className: "font-semibold text-gray-800 text-sm block", children: ["User ID: ", rev.userId || 'Anonymous'] }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-gray-500 block mt-0.5", children: ["Product ID: ", rev.productId || 'Unknown', " | Rating: ", '★'.repeat(rev.rating), '☆'.repeat(5 - rev.rating)] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return handleModerate(rev.id, 'rejected'); }, size: "sm", variant: "ghost", className: "h-8 text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-3", children: "Hide/Reject" }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return handleModerate(rev.id, 'approved'); }, size: "sm", className: "bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-8 text-xs px-3", children: "Approve" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "p-3 bg-slate-50/55 rounded-lg border border-slate-100 text-sm text-gray-700", children: [(0, jsx_runtime_1.jsxs)("p", { className: "font-bold text-gray-800 text-xs mb-1", children: ["\"", rev.title || 'Rating review', "\""] }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-600", children: rev.comment || 'No comment provided' })] })] }, rev.id)); }) })), totalPages > 1 && ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center pt-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return setCurrentPage(function (prev) { return Math.max(prev - 1, 1); }); }, disabled: currentPage === 1, variant: "outline", size: "sm", children: "Previous" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-gray-500 font-medium", children: ["Page ", currentPage, " of ", totalPages] }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return setCurrentPage(function (prev) { return Math.min(prev + 1, totalPages); }); }, disabled: currentPage === totalPages, variant: "outline", size: "sm", children: "Next" })] }))] })] }) }));
}
