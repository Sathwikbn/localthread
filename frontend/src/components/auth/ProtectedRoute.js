"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectedRoute = ProtectedRoute;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
function ProtectedRoute(_a) {
    var children = _a.children, _b = _a.allowedRoles, allowedRoles = _b === void 0 ? ['customer', 'vendor', 'admin'] : _b, _c = _a.redirectTo, redirectTo = _c === void 0 ? '/auth' : _c;
    var _d = (0, react_redux_1.useSelector)(function (state) { return state.auth; }), user = _d.user, isAuthenticated = _d.isAuthenticated;
    var location = (0, react_router_dom_1.useLocation)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    // Check if user has required role
    var userRole = ((user === null || user === void 0 ? void 0 : user.role) || '').toLowerCase();
    var hasAllowedRole = allowedRoles.map(function (r) { return r.toLowerCase(); }).includes(userRole);
    var shouldRedirectToAuth = !isAuthenticated || !user;
    var shouldRedirectToAccessDenied = isAuthenticated && user && !hasAllowedRole;
    (0, react_1.useEffect)(function () {
        if (shouldRedirectToAuth && location.pathname !== redirectTo) {
            // Redirect to auth page with return URL
            navigate(redirectTo, { state: { from: location }, replace: true });
        }
        else if (shouldRedirectToAccessDenied && location.pathname !== '/access-denied') {
            // Redirect to access denied page
            navigate("/access-denied", { replace: true });
        }
    }, [shouldRedirectToAuth, shouldRedirectToAccessDenied, navigate, redirectTo]);
    if (shouldRedirectToAuth || shouldRedirectToAccessDenied) {
        return null;
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
}

