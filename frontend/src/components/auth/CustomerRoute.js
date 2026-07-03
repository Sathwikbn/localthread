"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var CustomerRoute = function (_a) {
    var children = _a.children;
    var _b = (0, react_redux_1.useSelector)(function (state) { return state.auth; }), user = _b.user, isAuthenticated = _b.isAuthenticated;
    var navigate = (0, react_router_dom_1.useNavigate)();
    console.log('CustomerRoute - Auth state:', { isAuthenticated: isAuthenticated, user: user === null || user === void 0 ? void 0 : user.role });
    var role = ((user === null || user === void 0 ? void 0 : user.role) || '').toLowerCase();
    var shouldRedirect = !isAuthenticated || role !== 'customer';
    (0, react_1.useEffect)(function () {
        if (!isAuthenticated) {
            console.log('CustomerRoute - Not authenticated, redirecting to login');
            navigate("/auth", { replace: true });
        }
        else if (role !== 'customer') {
            console.log('CustomerRoute - Not a customer, redirecting to appropriate dashboard');
            if (role === 'admin') {
                navigate("/admin/dashboard", { replace: true });
            }
            else if (role === 'vendor') {
                navigate("/vendor/dashboard", { replace: true });
            }
            else {
                navigate("/auth", { replace: true });
            }
        }
    }, [isAuthenticated, role, navigate]);
    if (shouldRedirect) {
        return null;
    }
    console.log('CustomerRoute - Access granted');
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
};
exports.default = CustomerRoute;
