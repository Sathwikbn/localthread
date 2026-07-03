"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppSelector = exports.useAppDispatch = exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var react_redux_1 = require("react-redux");
var cartSlice_1 = __importDefault(require("./cartSlice"));
var wishlistSlice_1 = __importDefault(require("./wishlistSlice"));
var authSlice_1 = __importDefault(require("./authSlice"));
var filterSlice_1 = __importDefault(require("./filterSlice"));
var notificationSlice_1 = __importDefault(require("./notificationSlice"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        cart: cartSlice_1.default,
        wishlist: wishlistSlice_1.default,
        auth: authSlice_1.default,
        filter: filterSlice_1.default,
        notifications: notificationSlice_1.default,
    }
});
// Typed hooks for use throughout the app
var useAppDispatch = function () { return (0, react_redux_1.useDispatch)(); };
exports.useAppDispatch = useAppDispatch;
exports.useAppSelector = react_redux_1.useSelector;
