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
exports.productAPI = void 0;
var api_1 = require("./api");
// Product API
exports.productAPI = {
    // Get vendor's products
    getVendorProducts: function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var queryParams, queryString, endpoint;
        return __generator(this, function (_a) {
            queryParams = new URLSearchParams();
            if (params === null || params === void 0 ? void 0 : params.page)
                queryParams.append('page', params.page.toString());
            if (params === null || params === void 0 ? void 0 : params.limit)
                queryParams.append('limit', params.limit.toString());
            if (params === null || params === void 0 ? void 0 : params.category)
                queryParams.append('category', params.category);
            if (params === null || params === void 0 ? void 0 : params.search)
                queryParams.append('search', params.search);
            queryString = queryParams.toString();
            endpoint = "/products/vendor".concat(queryString ? "?".concat(queryString) : '');
            return [2 /*return*/, (0, api_1.apiRequest)(endpoint)];
        });
    }); },
    // Create new product
    createProduct: function (productData) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, api_1.apiRequest)('/products', {
                    method: 'POST',
                    body: JSON.stringify(productData),
                })];
        });
    }); },
    // Update product
    updateProduct: function (productId, productData) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, api_1.apiRequest)("/products/".concat(productId), {
                    method: 'PUT',
                    body: JSON.stringify(productData),
                })];
        });
    }); },
    // Get single product
    getProduct: function (productId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, api_1.apiRequest)("/products/".concat(productId))];
        });
    }); },
    // Delete product
    deleteProduct: function (productId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, api_1.apiRequest)("/products/".concat(productId), {
                    method: 'DELETE',
                })];
        });
    }); },
    // Test API connectivity
    testAPIConnection: function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, apiUrl, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = localStorage.getItem('token');
                    apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
                    console.log('Testing API connection:', {
                        apiUrl: apiUrl,
                        hasToken: !!token,
                        tokenPreview: token ? token.substring(0, 20) + '...' : 'none'
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("".concat(apiUrl, "/products/test-upload"), {
                            method: 'POST',
                            headers: {
                                Authorization: "Bearer ".concat(token),
                                'Content-Type': 'application/json'
                            }
                        })];
                case 2:
                    response = _a.sent();
                    console.log('Test response:', {
                        status: response.status,
                        statusText: response.statusText
                    });
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    console.log('Test response data:', data);
                    return [2 /*return*/, data];
                case 4:
                    error_1 = _a.sent();
                    console.error('Test API connection error:', error_1);
                    throw error_1;
                case 5: return [2 /*return*/];
            }
        });
    }); },
    // Upload product image
    uploadProductImage: function (file) { return __awaiter(void 0, void 0, void 0, function () {
        var formData, token, apiUrl, response, errorData, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formData = new FormData();
                    formData.append('image', file);
                    token = localStorage.getItem('token');
                    apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
                    console.log('Upload attempt:', {
                        fileName: file.name,
                        fileSize: file.size,
                        fileType: file.type,
                        apiUrl: apiUrl,
                        hasToken: !!token
                    });
                    // Check if token exists
                    if (!token) {
                        throw new Error('No authentication token found. Please login again.');
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("".concat(apiUrl, "/products/upload-image"), {
                            method: 'POST',
                            headers: {
                                Authorization: "Bearer ".concat(token),
                                // Don't set Content-Type for FormData, let the browser set it with boundary
                            },
                            body: formData,
                        })];
                case 2:
                    response = _a.sent();
                    console.log('Upload response status:', response.status);
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    errorData = _a.sent();
                    console.error('Upload failed:', errorData);
                    // Handle authentication errors
                    if (response.status === 401) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        throw new Error('Authentication failed. Please login again.');
                    }
                    throw new Error(errorData.message || 'Upload failed');
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    data = _a.sent();
                    console.log('Upload success:', data);
                    return [2 /*return*/, data];
                case 6:
                    error_2 = _a.sent();
                    console.error('Upload error:', error_2);
                    throw error_2;
                case 7: return [2 /*return*/];
            }
        });
    }); },
    // Get all products (public)
    getAllProducts: function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var queryParams, queryString, endpoint;
        return __generator(this, function (_a) {
            queryParams = new URLSearchParams();
            if (params === null || params === void 0 ? void 0 : params.page)
                queryParams.append('page', params.page.toString());
            if (params === null || params === void 0 ? void 0 : params.limit)
                queryParams.append('limit', params.limit.toString());
            if (params === null || params === void 0 ? void 0 : params.category)
                queryParams.append('category', params.category);
            if (params === null || params === void 0 ? void 0 : params.search)
                queryParams.append('search', params.search);
            if (params === null || params === void 0 ? void 0 : params.vendorId)
                queryParams.append('vendorId', params.vendorId);
            if ((params === null || params === void 0 ? void 0 : params.minPrice) !== undefined)
                queryParams.append('minPrice', params.minPrice.toString());
            if ((params === null || params === void 0 ? void 0 : params.maxPrice) !== undefined)
                queryParams.append('maxPrice', params.maxPrice.toString());
            if (params === null || params === void 0 ? void 0 : params.sortBy)
                queryParams.append('sortBy', params.sortBy);
            if (params === null || params === void 0 ? void 0 : params.sortOrder)
                queryParams.append('sortOrder', params.sortOrder);
            queryString = queryParams.toString();
            endpoint = "/products".concat(queryString ? "?".concat(queryString) : '');
            return [2 /*return*/, (0, api_1.apiRequest)(endpoint)];
        });
    }); },
};
