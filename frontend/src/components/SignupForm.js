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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupForm = SignupForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var button_1 = require("./ui/button");
var card_1 = require("./ui/card");
var input_1 = require("./ui/input");
var label_1 = require("./ui/label");
var radio_group_1 = require("./ui/radio-group");
var sonner_1 = require("sonner");
var authSlice_1 = require("../store/authSlice");
function SignupForm() {
    var _this = this;
    var _a = (0, react_1.useState)(''), name = _a[0], setName = _a[1];
    var _b = (0, react_1.useState)(''), email = _b[0], setEmail = _b[1];
    var _c = (0, react_1.useState)(''), password = _c[0], setPassword = _c[1];
    var _d = (0, react_1.useState)(''), confirmPassword = _d[0], setConfirmPassword = _d[1];
    var _e = (0, react_1.useState)('customer'), role = _e[0], setRole = _e[1];
    var _f = (0, react_1.useState)({ name: '', email: '', password: '', confirmPassword: '' }), errors = _f[0], setErrors = _f[1];
    // Clear errors when user starts typing
    var handleInputChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        if (name === 'name') {
            setName(value);
            if (errors.name) {
                setErrors(function (prev) { return (__assign(__assign({}, prev), { name: '' })); });
            }
        }
        else if (name === 'email') {
            setEmail(value);
            if (errors.email) {
                setErrors(function (prev) { return (__assign(__assign({}, prev), { email: '' })); });
            }
        }
        else if (name === 'password') {
            setPassword(value);
            if (errors.password) {
                setErrors(function (prev) { return (__assign(__assign({}, prev), { password: '' })); });
            }
        }
        else if (name === 'confirmPassword') {
            setConfirmPassword(value);
            if (errors.confirmPassword) {
                setErrors(function (prev) { return (__assign(__assign({}, prev), { confirmPassword: '' })); });
            }
        }
    };
    var dispatch = (0, react_redux_1.useDispatch)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _g = (0, react_redux_1.useSelector)(function (state) { return state.auth; }), isLoading = _g.isLoading, error = _g.error, isAuthenticated = _g.isAuthenticated;
    // Redirect if already authenticated
    (0, react_1.useEffect)(function () {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);
    // Clear error when component mounts
    (0, react_1.useEffect)(function () {
        dispatch((0, authSlice_1.clearError)());
    }, [dispatch]);
    // Show error toast when error occurs
    (0, react_1.useEffect)(function () {
        if (error) {
            sonner_1.toast.error(error);
        }
    }, [error]);
    // Load role from localStorage on component mount
    (0, react_1.useEffect)(function () {
        var savedRole = localStorage.getItem('signupRole');
        if (savedRole && (savedRole === 'customer' || savedRole === 'vendor')) {
            setRole(savedRole);
        }
    }, []);
    // Save role to localStorage whenever it changes
    var handleRoleChange = function (value) {
        setRole(value);
        localStorage.setItem('signupRole', value);
    };
    var validate = function () {
        var newErrors = { name: '', email: '', password: '', confirmPassword: '' };
        if (!name) {
            newErrors.name = 'Name is required';
        }
        if (!email) {
            newErrors.email = 'Email is required';
        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        }
        else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        return newErrors;
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var newErrors, userData, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    newErrors = validate();
                    if (newErrors.name || newErrors.email || newErrors.password || newErrors.confirmPassword) {
                        setErrors(newErrors);
                        return [2 /*return*/];
                    }
                    // Clear previous errors
                    setErrors({ name: '', email: '', password: '', confirmPassword: '' });
                    userData = {
                        name: name,
                        email: email,
                        password: password,
                        confirmPassword: confirmPassword,
                        role: role,
                    };
                    return [4 /*yield*/, dispatch((0, authSlice_1.registerUser)(userData))];
                case 1:
                    result = _a.sent();
                    if (authSlice_1.registerUser.fulfilled.match(result)) {
                        sonner_1.toast.success("Signed up successfully as ".concat(role === 'customer' ? 'Customer' : 'Vendor', "!"));
                        // Reset form
                        setName('');
                        setEmail('');
                        setPassword('');
                        setConfirmPassword('');
                        setRole('customer');
                        // Clear localStorage after successful signup
                        localStorage.removeItem('signupRole');
                        // Navigate based on role
                        if (role === 'vendor') {
                            navigate('/vendor/dashboard');
                        }
                        else {
                            navigate('/customer/profile');
                        }
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "w-full max-w-md mx-auto", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-2xl font-bold text-center", children: "Create an Account" }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "name", children: "Name" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "name", name: "name", type: "text", placeholder: "Enter your name", value: name, onChange: handleInputChange, disabled: isLoading, className: errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '' }), errors.name && (0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.name })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "email", children: "Email" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "email", name: "email", type: "email", placeholder: "Enter your email", value: email, onChange: handleInputChange, disabled: isLoading, className: errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '' }), errors.email && (0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.email })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "Role" }), (0, jsx_runtime_1.jsxs)(radio_group_1.RadioGroup, { value: role, onValueChange: handleRoleChange, disabled: isLoading, className: "flex flex-col space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(radio_group_1.RadioGroupItem, { value: "customer", id: "customer" }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "customer", children: "Customer" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(radio_group_1.RadioGroupItem, { value: "vendor", id: "vendor" }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "vendor", children: "Vendor (Shop Owner)" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "password", children: "Password" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "password", name: "password", type: "password", placeholder: "Enter your password", value: password, onChange: handleInputChange, disabled: isLoading, className: errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '' }), errors.password && (0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.password })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "confirmPassword", children: "Confirm Password" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "confirmPassword", name: "confirmPassword", type: "password", placeholder: "Confirm your password", value: confirmPassword, onChange: handleInputChange, disabled: isLoading, className: errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '' }), errors.confirmPassword && (0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.confirmPassword })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", className: "w-full", disabled: isLoading, children: isLoading ? 'Creating account...' : 'Sign Up' })] }) })] }));
}
