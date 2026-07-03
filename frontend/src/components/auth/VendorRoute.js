"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorRoute = VendorRoute;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var VendorDashboardLayout_1 = require("../vendor/VendorDashboardLayout");
function VendorRoute(_a) {
    var children = _a.children;
    var _b = (0, react_redux_1.useSelector)(function (state) { return state.auth; }), user = _b.user, isAuthenticated = _b.isAuthenticated;
    var location = (0, react_router_dom_1.useLocation)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    // Debug logging
    console.log('VendorRoute - isAuthenticated:', isAuthenticated);
    console.log('VendorRoute - user:', user);
    console.log('VendorRoute - user role:', user === null || user === void 0 ? void 0 : user.role);
    // Check localStorage directly
    var storedUser = localStorage.getItem('user');
    var storedToken = localStorage.getItem('token');
    console.log('VendorRoute - storedUser:', storedUser);
    console.log('VendorRoute - storedToken:', storedToken);
    if (storedUser) {
        try {
            var parsedUser = JSON.parse(storedUser);
            console.log('VendorRoute - parsed stored user:', parsedUser);
            console.log('VendorRoute - parsed user role:', parsedUser === null || parsedUser === void 0 ? void 0 : parsedUser.role);
        }
        catch (error) {
            console.error('VendorRoute - error parsing stored user:', error);
        }
    }
    var role = ((user === null || user === void 0 ? void 0 : user.role) || '').toLowerCase();
    var shouldRedirect = !isAuthenticated || !user || role !== 'vendor';
    (0, react_1.useEffect)(function () {
        if (shouldRedirect && location.pathname !== '/auth') {
            console.log('VendorRoute - Access denied, redirecting to auth');
            console.log('VendorRoute - Reason:', {
                isAuthenticated: isAuthenticated,
                hasUser: !!user,
                userRole: user === null || user === void 0 ? void 0 : user.role,
                expectedRole: 'vendor'
            });
            // Redirect to auth page with return URL
            navigate("/auth", { state: { from: location }, replace: true });
        }
    }, [shouldRedirect, navigate, isAuthenticated, user]);
    if (shouldRedirect) {
        return null;
    }
    console.log('VendorRoute - Access granted, rendering vendor dashboard');
    return ((0, jsx_runtime_1.jsx)(VendorDashboardLayout_1.VendorDashboardLayout, { children: children }));
}
