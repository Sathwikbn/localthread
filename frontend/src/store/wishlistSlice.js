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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearWishlist = exports.toggleWishlist = exports.removeFromWishlist = exports.addToWishlist = exports.removeFromWishlistAsync = exports.addToWishlistAsync = exports.fetchWishlist = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var customerAPI_1 = require("../services/customerAPI");
var initialState = {
    items: [],
    isLoading: false,
    error: null,
};
exports.fetchWishlist = (0, toolkit_1.createAsyncThunk)('wishlist/fetch', function (_1, _a) { return __awaiter(void 0, [_1, _a], void 0, function (_, _b) {
    var response, err_1;
    var rejectWithValue = _b.rejectWithValue;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, customerAPI_1.customerAPI.getWishlist()];
            case 1:
                response = _c.sent();
                if (response.success && response.data) {
                    return [2 /*return*/, response.data.wishlist.map(function (item) { return (item._id || item.id).toString(); })];
                }
                return [2 /*return*/, rejectWithValue(response.message || 'Failed to fetch wishlist')];
            case 2:
                err_1 = _c.sent();
                return [2 /*return*/, rejectWithValue(err_1.message || 'Network error')];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.addToWishlistAsync = (0, toolkit_1.createAsyncThunk)('wishlist/add', function (productId_1, _a) { return __awaiter(void 0, [productId_1, _a], void 0, function (productId, _b) {
    var response, err_2;
    var rejectWithValue = _b.rejectWithValue;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, customerAPI_1.customerAPI.addToWishlist(productId)];
            case 1:
                response = _c.sent();
                if (response.success && response.data) {
                    return [2 /*return*/, response.data.wishlist.map(function (item) { return (item._id || item.id).toString(); })];
                }
                return [2 /*return*/, rejectWithValue(response.message || 'Failed to add item')];
            case 2:
                err_2 = _c.sent();
                return [2 /*return*/, rejectWithValue(err_2.message || 'Network error')];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.removeFromWishlistAsync = (0, toolkit_1.createAsyncThunk)('wishlist/remove', function (productId_1, _a) { return __awaiter(void 0, [productId_1, _a], void 0, function (productId, _b) {
    var response, err_3;
    var rejectWithValue = _b.rejectWithValue;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, customerAPI_1.customerAPI.removeFromWishlist(productId)];
            case 1:
                response = _c.sent();
                if (response.success && response.data) {
                    return [2 /*return*/, response.data.wishlist.map(function (item) { return (item._id || item.id).toString(); })];
                }
                return [2 /*return*/, rejectWithValue(response.message || 'Failed to remove item')];
            case 2:
                err_3 = _c.sent();
                return [2 /*return*/, rejectWithValue(err_3.message || 'Network error')];
            case 3: return [2 /*return*/];
        }
    });
}); });
var wishlistSlice = (0, toolkit_1.createSlice)({
    name: 'wishlist',
    initialState: initialState,
    reducers: {
        addToWishlist: function (state, action) {
            var productId = action.payload;
            if (!state.items.includes(productId)) {
                state.items.push(productId);
            }
        },
        removeFromWishlist: function (state, action) {
            var productId = action.payload;
            state.items = state.items.filter(function (id) { return id !== productId; });
        },
        toggleWishlist: function (state, action) {
            var productId = action.payload;
            var existingIndex = state.items.findIndex(function (id) { return id === productId; });
            if (existingIndex >= 0) {
                state.items.splice(existingIndex, 1);
            }
            else {
                state.items.push(productId);
            }
        },
        clearWishlist: function (state) {
            state.items = [];
        }
    },
    extraReducers: function (builder) {
        builder
            // fetchWishlist
            .addCase(exports.fetchWishlist.pending, function (state) {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(exports.fetchWishlist.fulfilled, function (state, action) {
            state.isLoading = false;
            state.items = action.payload;
        })
            .addCase(exports.fetchWishlist.rejected, function (state, action) {
            state.isLoading = false;
            state.error = action.payload;
        })
            // addToWishlistAsync
            .addCase(exports.addToWishlistAsync.pending, function (state) {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(exports.addToWishlistAsync.fulfilled, function (state, action) {
            state.isLoading = false;
            state.items = action.payload;
        })
            .addCase(exports.addToWishlistAsync.rejected, function (state, action) {
            state.isLoading = false;
            state.error = action.payload;
        })
            // removeFromWishlistAsync
            .addCase(exports.removeFromWishlistAsync.pending, function (state) {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(exports.removeFromWishlistAsync.fulfilled, function (state, action) {
            state.isLoading = false;
            state.items = action.payload;
        })
            .addCase(exports.removeFromWishlistAsync.rejected, function (state, action) {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});
exports.addToWishlist = (_a = wishlistSlice.actions, _a.addToWishlist), exports.removeFromWishlist = _a.removeFromWishlist, exports.toggleWishlist = _a.toggleWishlist, exports.clearWishlist = _a.clearWishlist;
exports.default = wishlistSlice.reducer;
