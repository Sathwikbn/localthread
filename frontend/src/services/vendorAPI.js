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
exports.vendorAPI = void 0;
var api_1 = require("./api");
// Vendor API
exports.vendorAPI = {
    // Get vendor profile
    getProfile: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, api_1.apiRequest)('/vendors/profile')];
        });
    }); },
    // Update vendor profile
    updateProfile: function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, api_1.apiRequest)('/vendors/profile', {
                    method: 'PUT',
                    body: JSON.stringify(data),
                })];
        });
    }); },
    // Get vendor statistics
    getStats: function (vendorId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, api_1.apiRequest)("/vendors/".concat(vendorId, "/stats"))];
        });
    }); },
    // Get all vendors (Admin only)
    getAllVendors: function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var queryParams, queryString, endpoint;
        return __generator(this, function (_a) {
            queryParams = new URLSearchParams();
            if (params === null || params === void 0 ? void 0 : params.page)
                queryParams.append('page', params.page.toString());
            if (params === null || params === void 0 ? void 0 : params.limit)
                queryParams.append('limit', params.limit.toString());
            if ((params === null || params === void 0 ? void 0 : params.verified) !== undefined)
                queryParams.append('verified', params.verified.toString());
            if (params === null || params === void 0 ? void 0 : params.search)
                queryParams.append('search', params.search);
            queryString = queryParams.toString();
            endpoint = "/vendors".concat(queryString ? "?".concat(queryString) : '');
            return [2 /*return*/, (0, api_1.apiRequest)(endpoint)];
        });
    }); },
    // Verify vendor (Admin only)
    verifyVendor: function (vendorId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, api_1.apiRequest)("/vendors/".concat(vendorId, "/verify"), {
                    method: 'PATCH',
                })];
        });
    }); },
    // Get vendor orders (Vendor only)
    getOrders: function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var queryParams, queryString;
        return __generator(this, function (_a) {
            queryParams = new URLSearchParams();
            if (params === null || params === void 0 ? void 0 : params.page)
                queryParams.append('page', params.page.toString());
            if (params === null || params === void 0 ? void 0 : params.limit)
                queryParams.append('limit', params.limit.toString());
            queryString = queryParams.toString();
            return [2 /*return*/, (0, api_1.apiRequest)("/orders/vendor".concat(queryString ? "?".concat(queryString) : ''))];
        });
    }); },
    // Update order status (Vendor only)
    updateOrderStatus: function (orderId, status) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, api_1.apiRequest)("/orders/".concat(orderId, "/status"), {
                    method: 'PUT',
                    body: JSON.stringify({ status: status }),
                })];
        });
    }); },
    // Get vendor offline analytics (Vendor only)
    getOfflineAnalytics: function (vendorId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, api_1.apiRequest)("/vendors/".concat(vendorId, "/offline-analytics"))];
        });
    }); },
    // Verify reservation code (Vendor only)
    verifyReservation: function (reservationCode) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, api_1.apiRequest)('/orders/verify-reservation', {
                    method: 'POST',
                    body: JSON.stringify({ reservationCode: reservationCode }),
                })];
        });
    }); },
};
