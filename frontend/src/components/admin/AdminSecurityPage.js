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
exports.AdminSecurityPage = AdminSecurityPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("../ui/card");
var button_1 = require("../ui/button");
var lucide_react_1 = require("lucide-react");
var adminAPI_1 = require("../../services/adminAPI");
var sonner_1 = require("sonner");
var AdminPageLayout_1 = require("./AdminPageLayout");
function AdminSecurityPage() {
    var _this = this;
    var _a = (0, react_1.useState)([]), logs = _a[0], setLogs = _a[1];
    var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(1), currentPage = _c[0], setCurrentPage = _c[1];
    var _d = (0, react_1.useState)(1), totalPages = _d[0], setTotalPages = _d[1];
    var fetchLogs = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setIsLoading(true);
                    return [4 /*yield*/, adminAPI_1.adminAPI.getSecurityLogs({ page: currentPage, limit: 12 })];
                case 1:
                    res = _a.sent();
                    if (res.success && res.data) {
                        setLogs(res.data.logs);
                        setTotalPages(res.data.pagination.totalPages);
                    }
                    return [3 /*break*/, 4];
                case 2:
                    err_1 = _a.sent();
                    console.error(err_1);
                    sonner_1.toast.error('Failed to load security audit logs');
                    return [3 /*break*/, 4];
                case 3:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        fetchLogs();
    }, [currentPage]);
    return ((0, jsx_runtime_1.jsx)(AdminPageLayout_1.AdminPageLayout, { title: "System Security Settings", description: "Manage access controls and lookup security audit log database entries", icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, { className: "h-6 w-6 text-red-600" }), children: (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "border-red-100 shadow-sm", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg font-bold text-gray-900", children: "Security Audit Logs" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Real-time listing of sensitive administrator operations and system adjustments" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [isLoading ? ((0, jsx_runtime_1.jsx)("div", { className: "py-12 flex justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-8 w-8 animate-spin text-red-600" }) })) : logs.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "border border-dashed rounded-lg p-10 text-center text-gray-500 bg-gray-50/50", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Shield, { className: "h-10 w-10 mx-auto text-gray-300 mb-3" }), (0, jsx_runtime_1.jsx)("p", { className: "font-semibold text-gray-700", children: "Security logs audit trail is empty" }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-400 mt-1", children: "No login checks or onboarding operations have been executed yet" })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "overflow-x-auto border border-slate-100 rounded-lg", children: (0, jsx_runtime_1.jsxs)("table", { className: "min-w-full divide-y divide-slate-100 text-xs", children: [(0, jsx_runtime_1.jsx)("thead", { className: "bg-slate-50/70 text-gray-600 font-semibold", children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { className: "px-3 py-3 text-left", children: "Time Stamp" }), (0, jsx_runtime_1.jsx)("th", { className: "px-3 py-3 text-left", children: "Action Event" }), (0, jsx_runtime_1.jsx)("th", { className: "px-3 py-3 text-left", children: "Admin Identity" }), (0, jsx_runtime_1.jsx)("th", { className: "px-3 py-3 text-left", children: "Event Details" }), (0, jsx_runtime_1.jsx)("th", { className: "px-3 py-3 text-left", children: "IP Address" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { className: "divide-y divide-slate-100 bg-white font-mono", children: logs.map(function (log) { return ((0, jsx_runtime_1.jsxs)("tr", { className: "hover:bg-slate-50/50", children: [(0, jsx_runtime_1.jsx)("td", { className: "px-3 py-2.5 text-gray-500 whitespace-nowrap", children: new Date(log.createdAt).toLocaleString() }), (0, jsx_runtime_1.jsx)("td", { className: "px-3 py-2.5", children: (0, jsx_runtime_1.jsx)("span", { className: "px-1.5 py-0.5 bg-red-50 text-red-700 rounded font-bold uppercase text-[9px]", children: log.action }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-3 py-2.5 text-gray-700 font-semibold", children: log.userName }), (0, jsx_runtime_1.jsx)("td", { className: "px-3 py-2.5 text-gray-600 truncate max-w-[200px]", title: log.details, children: log.details }), (0, jsx_runtime_1.jsx)("td", { className: "px-3 py-2.5 text-gray-500", children: log.ipAddress || '127.0.0.1' })] }, log.id)); }) })] }) })), totalPages > 1 && ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center pt-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return setCurrentPage(function (prev) { return Math.max(prev - 1, 1); }); }, disabled: currentPage === 1, variant: "outline", size: "sm", children: "Previous" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-gray-500 font-medium", children: ["Page ", currentPage, " of ", totalPages] }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return setCurrentPage(function (prev) { return Math.min(prev + 1, totalPages); }); }, disabled: currentPage === totalPages, variant: "outline", size: "sm", children: "Next" })] }))] })] }) }));
}
