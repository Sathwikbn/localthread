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
exports.AdminSettingsPage = AdminSettingsPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("../ui/card");
var button_1 = require("../ui/button");
var lucide_react_1 = require("lucide-react");
var adminAPI_1 = require("../../services/adminAPI");
var sonner_1 = require("sonner");
var AdminPageLayout_1 = require("./AdminPageLayout");
function AdminSettingsPage() {
    var _this = this;
    var _a = (0, react_1.useState)([]), settings = _a[0], setSettings = _a[1];
    var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(null), editingKey = _c[0], setEditingKey = _c[1];
    var _d = (0, react_1.useState)(''), editingValue = _d[0], setEditingValue = _d[1];
    var fetchSettings = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setIsLoading(true);
                    return [4 /*yield*/, adminAPI_1.adminAPI.getSettings()];
                case 1:
                    res = _a.sent();
                    if (res.success && res.data) {
                        setSettings(res.data);
                    }
                    return [3 /*break*/, 4];
                case 2:
                    err_1 = _a.sent();
                    console.error(err_1);
                    sonner_1.toast.error('Failed to load system settings');
                    return [3 /*break*/, 4];
                case 3:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        fetchSettings();
    }, []);
    var handleUpdate = function (key) { return __awaiter(_this, void 0, void 0, function () {
        var res, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, adminAPI_1.adminAPI.updateSetting(key, editingValue)];
                case 1:
                    res = _a.sent();
                    if (res.success) {
                        sonner_1.toast.success("System setting [".concat(key, "] updated"));
                        setEditingKey(null);
                        fetchSettings();
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    sonner_1.toast.error(err_2.message || 'Failed to update setting');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsx)(AdminPageLayout_1.AdminPageLayout, { title: "Platform Settings", description: "Configure integration API keys, Razorpay credentials, and system parameters", icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, { className: "h-6 w-6 text-gray-600" }), children: (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "border-slate-200", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg font-bold text-gray-900", children: "Global System Variables" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Direct configuration of global environment constants saved in the database" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: isLoading ? ((0, jsx_runtime_1.jsx)("div", { className: "py-12 flex justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-8 w-8 animate-spin text-gray-600" }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: settings.map(function (set) { return ((0, jsx_runtime_1.jsxs)("div", { className: "border-b last:border-0 border-slate-100 pb-4 last:pb-0 flex flex-col sm:flex-row justify-between sm:items-center gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-1 flex-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-mono font-bold text-xs text-indigo-700 block uppercase tracking-wider", children: set.key.replace(/_/g, ' ') }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-gray-500 block", children: set.description || 'Global configuration parameter' }), editingKey === set.key ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 max-w-md pt-2", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: editingValue, onChange: function (e) { return setEditingValue(e.target.value); }, className: "flex-1 px-3 py-1 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent" }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return handleUpdate(set.key); }, size: "sm", className: "bg-indigo-600 hover:bg-indigo-700 text-white text-xs h-8 px-3", children: "Save" }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return setEditingKey(null); }, variant: "ghost", size: "sm", className: "text-xs h-8 text-gray-500", children: "Cancel" })] })) : ((0, jsx_runtime_1.jsx)("span", { className: "font-mono text-sm bg-slate-50 text-slate-800 px-2 py-0.5 rounded border inline-block mt-2", children: set.value }))] }), editingKey !== set.key && ((0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { setEditingKey(set.key); setEditingValue(set.value); }, variant: "outline", size: "sm", className: "border-slate-200 text-gray-700 h-8 font-semibold", children: "Change Value" }))] }, set.key)); }) })) })] }) }));
}
