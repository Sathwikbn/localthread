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
            body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationSlice = exports.markAllAsReadAsync = exports.markAsReadAsync = exports.fetchNotificationsAsync = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var notificationAPI_1 = require("../services/notificationAPI");

var initialState = {
    notifications: [],
    unreadCount: 0,
    isLoading: false,
    error: null
};

exports.fetchNotificationsAsync = (0, toolkit_1.createAsyncThunk)(
    'notifications/fetchAll',
    function (_, _a) {
        var rejectWithValue = _a.rejectWithValue;
        return __awaiter(void 0, void 0, void 0, function () {
            var response, countRes, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, notificationAPI_1.notificationAPI.getNotifications()];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, notificationAPI_1.notificationAPI.getUnreadCount()];
                    case 2:
                        countRes = _b.sent();
                        if (response.success && response.data) {
                            return [2 /*return*/, {
                                notifications: response.data.notifications,
                                unreadCount: countRes.success && countRes.data ? countRes.data.count : 0
                            }];
                        }
                        return [2 /*return*/, rejectWithValue("Failed to fetch notifications")];
                    case 3:
                        err_1 = _b.sent();
                        return [2 /*return*/, rejectWithValue(err_1.message)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
);

exports.markAsReadAsync = (0, toolkit_1.createAsyncThunk)(
    'notifications/markAsRead',
    function (id, _a) {
        var rejectWithValue = _a.rejectWithValue;
        return __awaiter(void 0, void 0, void 0, function () {
            var response, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, notificationAPI_1.notificationAPI.markAsRead(id)];
                    case 1:
                        response = _b.sent();
                        if (response.success) {
                            return [2 /*return*/, id];
                        }
                        return [2 /*return*/, rejectWithValue("Failed to mark as read")];
                    case 2:
                        err_2 = _b.sent();
                        return [2 /*return*/, rejectWithValue(err_2.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
);

exports.markAllAsReadAsync = (0, toolkit_1.createAsyncThunk)(
    'notifications/markAllAsRead',
    function (_, _a) {
        var rejectWithValue = _a.rejectWithValue;
        return __awaiter(void 0, void 0, void 0, function () {
            var response, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, notificationAPI_1.notificationAPI.markAllAsRead()];
                    case 1:
                        response = _b.sent();
                        if (response.success) {
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, rejectWithValue("Failed to mark all as read")];
                    case 2:
                        err_3 = _b.sent();
                        return [2 /*return*/, rejectWithValue(err_3.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
);

exports.notificationSlice = (0, toolkit_1.createSlice)({
    name: 'notifications',
    initialState: initialState,
    reducers: {
        addLocalNotification: function (state, action) {
            state.notifications = [action.payload].concat(state.notifications);
            state.unreadCount += 1;
        }
    },
    extraReducers: function (builder) {
        builder
            .addCase(exports.fetchNotificationsAsync.pending, function (state) {
                state.isLoading = true;
            })
            .addCase(exports.fetchNotificationsAsync.fulfilled, function (state, action) {
                state.isLoading = false;
                state.notifications = action.payload.notifications;
                state.unreadCount = action.payload.unreadCount;
            })
            .addCase(exports.fetchNotificationsAsync.rejected, function (state, action) {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(exports.markAsReadAsync.fulfilled, function (state, action) {
                var id = action.payload;
                var found = state.notifications.find(function (n) { return (n.id || n._id) === id; });
                if (found && !found.read && !found.isRead) {
                    found.isRead = true;
                    found.read = true;
                    state.unreadCount = Math.max(0, state.unreadCount - 1);
                }
            })
            .addCase(exports.markAllAsReadAsync.fulfilled, function (state) {
                state.notifications.forEach(function (n) {
                    n.isRead = true;
                    n.read = true;
                });
                state.unreadCount = 0;
            });
    }
});

exports.default = exports.notificationSlice.reducer;
