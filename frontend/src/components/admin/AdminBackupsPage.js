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
exports.AdminBackupsPage = AdminBackupsPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("../ui/card");
var button_1 = require("../ui/button");
var lucide_react_1 = require("lucide-react");
var adminAPI_1 = require("../../services/adminAPI");
var sonner_1 = require("sonner");
var AdminPageLayout_1 = require("./AdminPageLayout");
function AdminBackupsPage() {
    var _this = this;
    var _a = (0, react_1.useState)(false), isBackingUp = _a[0], setIsBackingUp = _a[1];
    var _b = (0, react_1.useState)([]), logs = _b[0], setLogs = _b[1];
    var handleBackup = function () { return __awaiter(_this, void 0, void 0, function () {
        var res_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setIsBackingUp(true);
                    sonner_1.toast.loading('Generating database snapshot...', { id: 'backup-loading' });
                    return [4 /*yield*/, adminAPI_1.adminAPI.triggerBackup()];
                case 1:
                    res_1 = _a.sent();
                    sonner_1.toast.dismiss('backup-loading');
                    if (res_1.success && res_1.data) {
                        sonner_1.toast.success(res_1.data.message || 'Backup generated');
                        setLogs(function (prev) {
                            var _a;
                            return __spreadArray([
                                {
                                    id: Date.now(),
                                    filename: ((_a = res_1.data) === null || _a === void 0 ? void 0 : _a.filename) || 'backup.sql',
                                    date: new Date().toLocaleString(),
                                    status: 'SUCCESS'
                                }
                            ], prev, true);
                        });
                    }
                    return [3 /*break*/, 4];
                case 2:
                    err_1 = _a.sent();
                    sonner_1.toast.dismiss('backup-loading');
                    sonner_1.toast.error(err_1.message || 'Backup failed');
                    return [3 /*break*/, 4];
                case 3:
                    setIsBackingUp(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsx)(AdminPageLayout_1.AdminPageLayout, { title: "System Backups & Logs", description: "Trigger database snapshot generation utility and track logs", icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Database, { className: "h-6 w-6 text-amber-600" }), children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { className: "md:col-span-1 border-amber-100 shadow-sm h-fit", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg font-bold text-gray-900", children: "Trigger Utility" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Instant database backup snapshots" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500 leading-relaxed", children: "Generate a full SQL schema and data export dump file of the LocalThread application context. Dumps contain all users, products, follows, carts, orders, and configuration models." }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleBackup, disabled: isBackingUp, className: "w-full bg-amber-600 hover:bg-amber-700 text-white font-bold h-10 shadow-sm flex items-center justify-center gap-2", children: isBackingUp ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-4 w-4 animate-spin" }), "Generating..."] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Play, { className: "h-4 w-4 fill-white" }), "Trigger Snapshot"] })) })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "md:col-span-2 border-slate-200 shadow-sm", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg font-bold text-gray-900", children: "Recent Dump Snapshots" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "List of recently generated database backups" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: logs.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "border border-dashed rounded-lg p-10 text-center text-gray-500 bg-gray-50/50", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Database, { className: "h-8 w-8 mx-auto text-gray-400 mb-2" }), (0, jsx_runtime_1.jsx)("p", { className: "font-semibold text-gray-700", children: "No snapshots generated in this session" }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500 mt-0.5", children: "Click 'Trigger Snapshot' to back up data" })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "space-y-3", children: logs.map(function (log) { return ((0, jsx_runtime_1.jsxs)("div", { className: "border border-slate-100 p-4 rounded-xl flex justify-between items-center bg-white shadow-sm hover:border-slate-200 transition-colors", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-mono text-xs font-bold text-gray-800 block", children: log.filename }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-gray-500 flex items-center gap-1.5 font-medium", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-3 w-3 text-slate-400" }), log.date] })] }), (0, jsx_runtime_1.jsx)("span", { className: "px-2.5 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded font-bold uppercase text-[9px]", children: log.status })] }, log.id)); }) })) })] })] }) }));
}
