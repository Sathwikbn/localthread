"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = useAuth;
var react_redux_1 = require("react-redux");
function useAuth() {
    var _a = (0, react_redux_1.useSelector)(function (state) { return state.auth; }), user = _a.user, isAuthenticated = _a.isAuthenticated, isLoading = _a.isLoading, error = _a.error;
    var role = ((user === null || user === void 0 ? void 0 : user.role) || '').toLowerCase();
    var isCustomer = role === 'customer';
    var isVendor = role === 'vendor';
    var isAdmin = role === 'admin';
    // Check if user can access customer functionality (both customers and vendors)
    var canAccessCustomerFeatures = role === 'customer' || role === 'vendor';
    var hasRole = function (r) {
        return ((user === null || user === void 0 ? void 0 : user.role) || '').toLowerCase() === (r || '').toLowerCase();
    };
    var getCustomer = function () {
        return isCustomer ? user : null;
    };
    var getVendor = function () {
        return isVendor ? user : null;
    };
    var getAdmin = function () {
        return isAdmin ? user : null;
    };
    return {
        user: user,
        isAuthenticated: isAuthenticated,
        isLoading: isLoading,
        error: error,
        isCustomer: isCustomer,
        isVendor: isVendor,
        isAdmin: isAdmin,
        canAccessCustomerFeatures: canAccessCustomerFeatures,
        hasRole: hasRole,
        getCustomer: getCustomer,
        getVendor: getVendor,
        getAdmin: getAdmin,
    };
}
