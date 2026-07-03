"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.healthAPI = exports.userAPI = exports.authAPI = exports.apiRequest = exports.ApiError = void 0;
// API Base URL - Change this based on your environment
var API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
// Debug logging for API configuration
console.log('API Configuration:', {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    API_BASE_URL: API_BASE_URL,
    NODE_ENV: process.env.NODE_ENV
});
// API Error class
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(message, status, errors) {
        var _this = _super.call(this, message) || this;
        _this.name = 'ApiError';
        _this.status = status;
        _this.errors = errors;
        return _this;
    }
    return ApiError;
}(Error));
exports.ApiError = ApiError;
// Get auth token from localStorage
var getAuthToken = function () {
    return localStorage.getItem('token');
};
// Get auth headers
var getAuthHeaders = function () {
    var token = getAuthToken();
    return __assign({ 'Content-Type': 'application/json' }, (token && { Authorization: "Bearer ".concat(token) }));
};
var isAuthRoute = function () {
    return typeof window !== 'undefined' && window.location.pathname.indexOf('/auth') === 0;
};
// Make API request
var apiRequest = function (endpoint_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([endpoint_1], args_1, true), void 0, function (endpoint, options) {
        var url, config, response, data, fieldErrors, error_1;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "".concat(API_BASE_URL).concat(endpoint);
                    console.log('API Request:', { url: url, method: options.method || 'GET' }); // Debug log
                    config = __assign(__assign({}, options), { headers: __assign(__assign({}, getAuthHeaders()), options.headers) });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    console.log('Making API request to:', url); // Debug log
                    return [4 /*yield*/, fetch(url, config)];
                case 2:
                    response = _a.sent();
                    console.log('API Response status:', response.status); // Debug log
                    data = {};
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    _a.sent();
                    // Response body was empty or not valid JSON
                    data = {};
                    return [3 /*break*/, 6];
                case 6:
                    console.log('API Response data:', data); // Debug log
                    if (!response.ok) {
                        // Handle authentication errors
                        if (response.status === 401) {
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            if (!isAuthRoute()) {
                                window.location.href = '/auth';
                            }
                            throw new ApiError('Authentication failed. Please login again.', 401);
                        }
                        // Handle validation errors with field-specific messages
                        if (response.status === 400 && data.errors && Array.isArray(data.errors)) {
                            fieldErrors = data.errors.map(function (error) { return ({
                                field: error.field || error.path || 'general',
                                message: error.message || error.msg || 'Validation failed'
                            }); });
                            throw new ApiError(data.message || 'Validation failed', response.status, fieldErrors);
                        }
                        // Handle other errors
                        throw new ApiError(data.message || 'Request failed', response.status);
                    }
                    return [2 /*return*/, data];
                case 4:
                    error_1 = _a.sent();
                    console.error('API Request error:', error_1); // Debug log
                    if (error_1 instanceof ApiError) {
                        throw error_1;
                    }
                    throw new ApiError('Network error. Please check your connection.', 0);
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.apiRequest = apiRequest;
// Authentication API
exports.authAPI = {
    // Register user
    register: function (userData) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, exports.apiRequest)('/auth/register', {
                    method: 'POST',
                    body: JSON.stringify(userData),
                })];
        });
    }); },
    // Login user
    login: function (credentials) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, exports.apiRequest)('/auth/login', {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                })];
        });
    }); },
    // Get current user
    getCurrentUser: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, exports.apiRequest)('/auth/me')];
        });
    }); },
    // Refresh token
    refreshToken: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, exports.apiRequest)('/auth/refresh-token', {
                    method: 'POST',
                })];
        });
    }); },
    // Forgot password
    forgotPassword: function (email) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, exports.apiRequest)('/auth/forgot-password', {
                    method: 'POST',
                    body: JSON.stringify({ email: email }),
                })];
        });
    }); },
    // Reset password
    resetPassword: function (token, password) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, exports.apiRequest)('/auth/reset-password', {
                    method: 'POST',
                    body: JSON.stringify({ token: token, password: password }),
                })];
        });
    }); },
    // Verify email
    verifyEmail: function (token) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, exports.apiRequest)('/auth/verify-email', {
                    method: 'POST',
                    body: JSON.stringify({ token: token }),
                })];
        });
    }); },
};
// User API
exports.userAPI = {
    // Get user profile
    getProfile: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, exports.apiRequest)('/users/profile')];
        });
    }); },
    // Update user profile
    updateProfile: function (profileData) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, exports.apiRequest)('/users/profile', {
                    method: 'PUT',
                    body: JSON.stringify(profileData),
                })];
        });
    }); },
    // Upload avatar
    uploadAvatar: function (file) { return __awaiter(void 0, void 0, void 0, function () {
        var formData, token, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formData = new FormData();
                    formData.append('avatar', file);
                    token = getAuthToken();
                    return [4 /*yield*/, fetch("".concat(API_BASE_URL, "/users/avatar"), {
                            method: 'PUT',
                            headers: {
                                Authorization: "Bearer ".concat(token),
                            },
                            body: formData,
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    throw new ApiError(data.message || 'Upload failed', response.status);
                case 3: return [2 /*return*/, response.json()];
            }
        });
    }); },
    // Upload store image (vendor only)
    uploadStoreImage: function (file) { return __awaiter(void 0, void 0, void 0, function () {
        var formData, token, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formData = new FormData();
                    formData.append('storeImage', file);
                    token = getAuthToken();
                    return [4 /*yield*/, fetch("".concat(API_BASE_URL, "/users/store-image"), {
                            method: 'PUT',
                            headers: {
                                Authorization: "Bearer ".concat(token),
                            },
                            body: formData,
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    throw new ApiError(data.message || 'Upload failed', response.status);
                case 3: return [2 /*return*/, response.json()];
            }
        });
    }); },
    // Change password
    changePassword: function (currentPassword, newPassword) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, exports.apiRequest)('/users/password', {
                    method: 'PUT',
                    body: JSON.stringify({ currentPassword: currentPassword, newPassword: newPassword }),
                })];
        });
    }); },
    // Deactivate account
    deactivateAccount: function (password) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, exports.apiRequest)('/users/account', {
                    method: 'DELETE',
                    body: JSON.stringify({ password: password }),
                })];
        });
    }); },
    // Get all vendors (public)
    getVendors: function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var searchParams, queryString, endpoint;
        return __generator(this, function (_a) {
            searchParams = new URLSearchParams();
            if (params === null || params === void 0 ? void 0 : params.page)
                searchParams.append('page', params.page.toString());
            if (params === null || params === void 0 ? void 0 : params.limit)
                searchParams.append('limit', params.limit.toString());
            if (params === null || params === void 0 ? void 0 : params.search)
                searchParams.append('search', params.search);
            queryString = searchParams.toString();
            endpoint = "/users/vendors".concat(queryString ? "?".concat(queryString) : '');
            return [2 /*return*/, (0, exports.apiRequest)(endpoint)];
        });
    }); },
    // Get vendor profile by ID (public)
    getVendorProfile: function (vendorId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, exports.apiRequest)("/users/vendors/".concat(vendorId))];
        });
    }); },
};
// Health check API
exports.healthAPI = {
    // Check API health
    checkHealth: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, exports.apiRequest)('/health')];
        });
    }); },
};
