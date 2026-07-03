"use strict";
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.clearError = exports.logout = exports.verifyEmail = exports.resetPassword = exports.forgotPassword = exports.getCurrentUser = exports.registerUser = exports.loginUser = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var api_1 = require("../services/api");
var initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};
// Load user from localStorage on initialization
var loadUserFromStorage = function () {
    try {
        var userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    }
    catch (error) {
        console.error('Error loading user from storage:', error);
        return null;
    }
};
// Load token from localStorage
var loadTokenFromStorage = function () {
    return localStorage.getItem('token');
};
// Async thunk for login
exports.loginUser = (0, toolkit_1.createAsyncThunk)('auth/login', function (credentials_1, _a) { return __awaiter(void 0, [credentials_1, _a], void 0, function (credentials, _b) {
    var response, error_1, fieldErrors;
    var rejectWithValue = _b.rejectWithValue;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, api_1.authAPI.login(credentials)];
            case 1:
                response = _c.sent();
                if (response.success && response.data) {
                    // Store token and user data
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    return [2 /*return*/, response.data.user];
                }
                else {
                    return [2 /*return*/, rejectWithValue(response.message || 'Login failed')];
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _c.sent();
                if (error_1 instanceof api_1.ApiError) {
                    // Handle field-specific validation errors
                    if (error_1.errors && error_1.errors.length > 0) {
                        fieldErrors = error_1.errors.map(function (err) { return "".concat(err.field, ": ").concat(err.message); }).join(', ');
                        return [2 /*return*/, rejectWithValue(fieldErrors)];
                    }
                    return [2 /*return*/, rejectWithValue(error_1.message)];
                }
                return [2 /*return*/, rejectWithValue('Network error. Please try again.')];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Async thunk for registration
exports.registerUser = (0, toolkit_1.createAsyncThunk)('auth/register', function (userData_1, _a) { return __awaiter(void 0, [userData_1, _a], void 0, function (userData, _b) {
    var response, error_2, fieldErrors;
    var rejectWithValue = _b.rejectWithValue;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                console.log('Registering user with data:', userData); // Debug log
                return [4 /*yield*/, api_1.authAPI.register(userData)];
            case 1:
                response = _c.sent();
                console.log('Registration response:', response); // Debug log
                if (response.success && response.data) {
                    // Store token and user data
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    console.log('Stored user data:', response.data.user); // Debug log
                    console.log('User role:', response.data.user.role); // Debug log
                    return [2 /*return*/, response.data.user];
                }
                else {
                    return [2 /*return*/, rejectWithValue(response.message || 'Registration failed')];
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _c.sent();
                console.error('Registration error:', error_2); // Debug log
                if (error_2 instanceof api_1.ApiError) {
                    // Handle field-specific validation errors
                    if (error_2.errors && error_2.errors.length > 0) {
                        fieldErrors = error_2.errors.map(function (err) { return "".concat(err.field, ": ").concat(err.message); }).join(', ');
                        return [2 /*return*/, rejectWithValue(fieldErrors)];
                    }
                    return [2 /*return*/, rejectWithValue(error_2.message)];
                }
                return [2 /*return*/, rejectWithValue('Network error. Please try again.')];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Async thunk for getting current user
exports.getCurrentUser = (0, toolkit_1.createAsyncThunk)('auth/getCurrentUser', function (_1, _a) { return __awaiter(void 0, [_1, _a], void 0, function (_, _b) {
    var response, error_3;
    var rejectWithValue = _b.rejectWithValue;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, api_1.authAPI.getCurrentUser()];
            case 1:
                response = _c.sent();
                if (response.success && response.data) {
                    return [2 /*return*/, response.data.user];
                }
                else {
                    return [2 /*return*/, rejectWithValue(response.message || 'Failed to get user')];
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _c.sent();
                if (error_3 instanceof api_1.ApiError) {
                    return [2 /*return*/, rejectWithValue(error_3.message)];
                }
                return [2 /*return*/, rejectWithValue('Network error. Please try again.')];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Async thunk for forgot password
exports.forgotPassword = (0, toolkit_1.createAsyncThunk)('auth/forgotPassword', function (email_1, _a) { return __awaiter(void 0, [email_1, _a], void 0, function (email, _b) {
    var response, error_4;
    var rejectWithValue = _b.rejectWithValue;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, api_1.authAPI.forgotPassword(email)];
            case 1:
                response = _c.sent();
                if (response.success) {
                    return [2 /*return*/, response.message];
                }
                else {
                    return [2 /*return*/, rejectWithValue(response.message || 'Failed to send reset email')];
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _c.sent();
                if (error_4 instanceof api_1.ApiError) {
                    return [2 /*return*/, rejectWithValue(error_4.message)];
                }
                return [2 /*return*/, rejectWithValue('Network error. Please try again.')];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Async thunk for reset password
exports.resetPassword = (0, toolkit_1.createAsyncThunk)('auth/resetPassword', function (_a, _b) { return __awaiter(void 0, [_a, _b], void 0, function (_c, _d) {
    var response, error_5;
    var token = _c.token, password = _c.password;
    var rejectWithValue = _d.rejectWithValue;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 2, , 3]);
                return [4 /*yield*/, api_1.authAPI.resetPassword(token, password)];
            case 1:
                response = _e.sent();
                if (response.success) {
                    return [2 /*return*/, response.message];
                }
                else {
                    return [2 /*return*/, rejectWithValue(response.message || 'Failed to reset password')];
                }
                return [3 /*break*/, 3];
            case 2:
                error_5 = _e.sent();
                if (error_5 instanceof api_1.ApiError) {
                    return [2 /*return*/, rejectWithValue(error_5.message)];
                }
                return [2 /*return*/, rejectWithValue('Network error. Please try again.')];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Async thunk for verify email
exports.verifyEmail = (0, toolkit_1.createAsyncThunk)('auth/verifyEmail', function (token_1, _a) { return __awaiter(void 0, [token_1, _a], void 0, function (token, _b) {
    var response, error_6;
    var rejectWithValue = _b.rejectWithValue;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, api_1.authAPI.verifyEmail(token)];
            case 1:
                response = _c.sent();
                if (response.success) {
                    return [2 /*return*/, response.message];
                }
                else {
                    return [2 /*return*/, rejectWithValue(response.message || 'Failed to verify email')];
                }
                return [3 /*break*/, 3];
            case 2:
                error_6 = _c.sent();
                if (error_6 instanceof api_1.ApiError) {
                    return [2 /*return*/, rejectWithValue(error_6.message)];
                }
                return [2 /*return*/, rejectWithValue('Network error. Please try again.')];
            case 3: return [2 /*return*/];
        }
    });
}); });
var authSlice = (0, toolkit_1.createSlice)({
    name: 'auth',
    initialState: __assign(__assign({}, initialState), { user: loadUserFromStorage(), isAuthenticated: !!loadTokenFromStorage() }),
    reducers: {
        logout: function (state) {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            // Clear from localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        clearError: function (state) {
            state.error = null;
        },
        updateUser: function (state, action) {
            if (state.user) {
                // Type-safe update based on current user role
                var updatedUser = __assign(__assign({}, state.user), action.payload);
                state.user = updatedUser;
                // Update localStorage
                localStorage.setItem('user', JSON.stringify(updatedUser));
            }
        },
    },
    extraReducers: function (builder) {
        // Login
        builder
            .addCase(exports.loginUser.pending, function (state) {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(exports.loginUser.fulfilled, function (state, action) {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        })
            .addCase(exports.loginUser.rejected, function (state, action) {
            state.isLoading = false;
            state.error = action.payload;
        });
        // Register
        builder
            .addCase(exports.registerUser.pending, function (state) {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(exports.registerUser.fulfilled, function (state, action) {
            var _a;
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
            // Debug logging
            console.log('Registration fulfilled - user:', action.payload);
            console.log('Registration fulfilled - user role:', (_a = action.payload) === null || _a === void 0 ? void 0 : _a.role);
            console.log('Registration fulfilled - isAuthenticated:', true);
        })
            .addCase(exports.registerUser.rejected, function (state, action) {
            state.isLoading = false;
            state.error = action.payload;
        });
        // Get current user
        builder
            .addCase(exports.getCurrentUser.pending, function (state) {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(exports.getCurrentUser.fulfilled, function (state, action) {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        })
            .addCase(exports.getCurrentUser.rejected, function (state, action) {
            state.isLoading = false;
            state.error = action.payload;
            // If getting current user fails, clear auth state
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        });
        // Forgot password
        builder
            .addCase(exports.forgotPassword.pending, function (state) {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(exports.forgotPassword.fulfilled, function (state) {
            state.isLoading = false;
            state.error = null;
        })
            .addCase(exports.forgotPassword.rejected, function (state, action) {
            state.isLoading = false;
            state.error = action.payload;
        });
        // Reset password
        builder
            .addCase(exports.resetPassword.pending, function (state) {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(exports.resetPassword.fulfilled, function (state) {
            state.isLoading = false;
            state.error = null;
        })
            .addCase(exports.resetPassword.rejected, function (state, action) {
            state.isLoading = false;
            state.error = action.payload;
        });
        // Verify email
        builder
            .addCase(exports.verifyEmail.pending, function (state) {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(exports.verifyEmail.fulfilled, function (state) {
            state.isLoading = false;
            state.error = null;
        })
            .addCase(exports.verifyEmail.rejected, function (state, action) {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});
exports.logout = (_a = authSlice.actions, _a.logout), exports.clearError = _a.clearError, exports.updateUser = _a.updateUser;
exports.default = authSlice.reducer;
