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
exports.clearCart = exports.updateCartItemQuantity = exports.removeFromCart = exports.addToCart = exports.clearCartAsync = exports.removeFromCartAsync = exports.updateCartItemAsync = exports.addToCartAsync = exports.fetchCart = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var cartAPI_1 = require("../services/cartAPI");
var initialState = {
    items: [],
    totalItems: 0,
    isLoading: false,
    error: null,
};
// Helper to map backend cart to slice state
var mapBackendCart = function (backendCart) {
    var items = backendCart.items.map(function (item) { return ({
        id: item.id,
        productId: item.productId.toString(),
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        name: item.productName,
        price: item.price,
        image: item.image,
    }); });
    var totalItems = items.reduce(function (total, item) { return total + item.quantity; }, 0);
    return { items: items, totalItems: totalItems };
};
// Async thunks
exports.fetchCart = (0, toolkit_1.createAsyncThunk)('cart/fetch', function (_1, _a) { return __awaiter(void 0, [_1, _a], void 0, function (_, _b) {
    var response, err_1;
    var rejectWithValue = _b.rejectWithValue;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, cartAPI_1.cartAPI.getCart()];
            case 1:
                response = _c.sent();
                if (response.success && response.data) {
                    return [2 /*return*/, mapBackendCart(response.data)];
                }
                return [2 /*return*/, rejectWithValue(response.message || 'Failed to fetch cart')];
            case 2:
                err_1 = _c.sent();
                return [2 /*return*/, rejectWithValue(err_1.message || 'Network error')];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.addToCartAsync = (0, toolkit_1.createAsyncThunk)('cart/add', function (item_1, _a) { return __awaiter(void 0, [item_1, _a], void 0, function (item, _b) {
    var response, err_2;
    var rejectWithValue = _b.rejectWithValue;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, cartAPI_1.cartAPI.addToCart({
                        productId: parseInt(item.productId, 10),
                        quantity: item.quantity,
                        size: item.size,
                        color: item.color,
                    })];
            case 1:
                response = _c.sent();
                if (response.success && response.data) {
                    return [2 /*return*/, mapBackendCart(response.data)];
                }
                return [2 /*return*/, rejectWithValue(response.message || 'Failed to add item')];
            case 2:
                err_2 = _c.sent();
                return [2 /*return*/, rejectWithValue(err_2.message || 'Network error')];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.updateCartItemAsync = (0, toolkit_1.createAsyncThunk)('cart/update', function (_a, _b) { return __awaiter(void 0, [_a, _b], void 0, function (_c, _d) {
    var response, err_3;
    var itemId = _c.itemId, quantity = _c.quantity;
    var rejectWithValue = _d.rejectWithValue;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 2, , 3]);
                return [4 /*yield*/, cartAPI_1.cartAPI.updateCartItem(itemId, quantity)];
            case 1:
                response = _e.sent();
                if (response.success && response.data) {
                    return [2 /*return*/, mapBackendCart(response.data)];
                }
                return [2 /*return*/, rejectWithValue(response.message || 'Failed to update item')];
            case 2:
                err_3 = _e.sent();
                return [2 /*return*/, rejectWithValue(err_3.message || 'Network error')];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.removeFromCartAsync = (0, toolkit_1.createAsyncThunk)('cart/remove', function (itemId_1, _a) { return __awaiter(void 0, [itemId_1, _a], void 0, function (itemId, _b) {
    var response, err_4;
    var rejectWithValue = _b.rejectWithValue;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, cartAPI_1.cartAPI.removeFromCart(itemId)];
            case 1:
                response = _c.sent();
                if (response.success && response.data) {
                    return [2 /*return*/, mapBackendCart(response.data)];
                }
                return [2 /*return*/, rejectWithValue(response.message || 'Failed to remove item')];
            case 2:
                err_4 = _c.sent();
                return [2 /*return*/, rejectWithValue(err_4.message || 'Network error')];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.clearCartAsync = (0, toolkit_1.createAsyncThunk)('cart/clear', function (_1, _a) { return __awaiter(void 0, [_1, _a], void 0, function (_, _b) {
    var response, err_5;
    var rejectWithValue = _b.rejectWithValue;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, cartAPI_1.cartAPI.clearCart()];
            case 1:
                response = _c.sent();
                if (response.success) {
                    return [2 /*return*/, { items: [], totalItems: 0 }];
                }
                return [2 /*return*/, rejectWithValue(response.message || 'Failed to clear cart')];
            case 2:
                err_5 = _c.sent();
                return [2 /*return*/, rejectWithValue(err_5.message || 'Network error')];
            case 3: return [2 /*return*/];
        }
    });
}); });
var cartSlice = (0, toolkit_1.createSlice)({
    name: 'cart',
    initialState: initialState,
    reducers: {
        // Backwards compatibility synchronous actions (client-only fallback)
        addToCart: function (state, action) {
            var _a = action.payload, productId = _a.productId, size = _a.size, color = _a.color, _b = _a.quantity, quantity = _b === void 0 ? 1 : _b;
            var existingItem = state.items.find(function (item) { return item.productId === productId && item.size === size && item.color === color; });
            if (existingItem) {
                existingItem.quantity += quantity;
            }
            else {
                state.items.push({ productId: productId, size: size, color: color, quantity: quantity });
            }
            state.totalItems = state.items.reduce(function (total, item) { return total + item.quantity; }, 0);
        },
        removeFromCart: function (state, action) {
            var _a = action.payload, productId = _a.productId, size = _a.size, color = _a.color;
            state.items = state.items.filter(function (item) { return !(item.productId === productId && item.size === size && item.color === color); });
            state.totalItems = state.items.reduce(function (total, item) { return total + item.quantity; }, 0);
        },
        updateCartItemQuantity: function (state, action) {
            var _a = action.payload, productId = _a.productId, quantity = _a.quantity, size = _a.size, color = _a.color;
            var existingItem = state.items.find(function (item) { return item.productId === productId && item.size === size && item.color === color; });
            if (existingItem) {
                if (quantity <= 0) {
                    state.items = state.items.filter(function (item) { return !(item.productId === productId && item.size === size && item.color === color); });
                }
                else {
                    existingItem.quantity = quantity;
                }
            }
            state.totalItems = state.items.reduce(function (total, item) { return total + item.quantity; }, 0);
        },
        clearCart: function (state) {
            state.items = [];
            state.totalItems = 0;
        }
    },
    extraReducers: function (builder) {
        builder
            // fetchCart
            .addCase(exports.fetchCart.pending, function (state) {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(exports.fetchCart.fulfilled, function (state, action) {
            state.isLoading = false;
            state.items = action.payload.items;
            state.totalItems = action.payload.totalItems;
        })
            .addCase(exports.fetchCart.rejected, function (state, action) {
            state.isLoading = false;
            state.error = action.payload;
        })
            // addToCartAsync
            .addCase(exports.addToCartAsync.pending, function (state) {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(exports.addToCartAsync.fulfilled, function (state, action) {
            state.isLoading = false;
            state.items = action.payload.items;
            state.totalItems = action.payload.totalItems;
        })
            .addCase(exports.addToCartAsync.rejected, function (state, action) {
            state.isLoading = false;
            state.error = action.payload;
        })
            // updateCartItemAsync
            .addCase(exports.updateCartItemAsync.pending, function (state) {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(exports.updateCartItemAsync.fulfilled, function (state, action) {
            state.isLoading = false;
            state.items = action.payload.items;
            state.totalItems = action.payload.totalItems;
        })
            .addCase(exports.updateCartItemAsync.rejected, function (state, action) {
            state.isLoading = false;
            state.error = action.payload;
        })
            // removeFromCartAsync
            .addCase(exports.removeFromCartAsync.pending, function (state) {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(exports.removeFromCartAsync.fulfilled, function (state, action) {
            state.isLoading = false;
            state.items = action.payload.items;
            state.totalItems = action.payload.totalItems;
        })
            .addCase(exports.removeFromCartAsync.rejected, function (state, action) {
            state.isLoading = false;
            state.error = action.payload;
        })
            // clearCartAsync
            .addCase(exports.clearCartAsync.pending, function (state) {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(exports.clearCartAsync.fulfilled, function (state, action) {
            state.isLoading = false;
            state.items = action.payload.items;
            state.totalItems = action.payload.totalItems;
        })
            .addCase(exports.clearCartAsync.rejected, function (state, action) {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});
exports.addToCart = (_a = cartSlice.actions, _a.addToCart), exports.removeFromCart = _a.removeFromCart, exports.updateCartItemQuantity = _a.updateCartItemQuantity, exports.clearCart = _a.clearCart;
exports.default = cartSlice.reducer;
