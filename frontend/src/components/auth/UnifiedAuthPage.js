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
exports.UnifiedAuthPage = UnifiedAuthPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var authSlice_1 = require("../../store/authSlice");
var button_1 = require("../ui/button");
var input_1 = require("../ui/input");
var label_1 = require("../ui/label");
var card_1 = require("../ui/card");
var alert_1 = require("../ui/alert");
var tabs_1 = require("../ui/tabs");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
function UnifiedAuthPage() {
    var _this = this;
    var dispatch = (0, react_redux_1.useDispatch)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var location = (0, react_router_dom_1.useLocation)();
    var _a = (0, react_redux_1.useSelector)(function (state) { return state.auth; }), isLoading = _a.isLoading, error = _a.error, user = _a.user, isAuthenticated = _a.isAuthenticated;
    // Debug logging
    console.log('UnifiedAuthPage - Auth state:', { isAuthenticated: isAuthenticated, user: user === null || user === void 0 ? void 0 : user.name, userRole: user === null || user === void 0 ? void 0 : user.role });
    var _b = (0, react_1.useState)('customer'), activeTab = _b[0], setActiveTab = _b[1];
    var _c = (0, react_1.useState)(true), isLogin = _c[0], setIsLogin = _c[1];
    var _d = (0, react_1.useState)(false), showPassword = _d[0], setShowPassword = _d[1];
    var _e = (0, react_1.useState)(false), showConfirmPassword = _e[0], setShowConfirmPassword = _e[1];
    // API error state for field-specific errors
    var _f = (0, react_1.useState)({}), apiErrors = _f[0], setApiErrors = _f[1];
    var _g = (0, react_1.useState)({
        email: '',
        password: ''
    }), loginData = _g[0], setLoginData = _g[1];
    var _h = (0, react_1.useState)({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        storeName: '',
        storeDescription: ''
    }), registerData = _h[0], setRegisterData = _h[1];
    // Error states for form validation
    var _j = (0, react_1.useState)({
        email: '',
        password: ''
    }), loginErrors = _j[0], setLoginErrors = _j[1];
    var _k = (0, react_1.useState)({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        storeName: '',
        storeDescription: ''
    }), registerErrors = _k[0], setRegisterErrors = _k[1];
    // Clear all errors when switching tabs or modes
    var clearAllErrors = function () {
        setLoginErrors({ email: '', password: '' });
        setRegisterErrors({
            name: '', email: '', password: '', confirmPassword: '',
            phone: '', storeName: '', storeDescription: ''
        });
        setApiErrors({});
    };
    var handleLoginInputChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setLoginData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
        // Clear error when user starts typing
        if (loginErrors[name]) {
            setLoginErrors(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[name] = '', _a)));
            });
        }
        // Clear API error for this field
        if (apiErrors[name]) {
            setApiErrors(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[name] = '', _a)));
            });
        }
    };
    var handleRegisterInputChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setRegisterData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
        // Clear error when user starts typing
        if (registerErrors[name]) {
            setRegisterErrors(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[name] = '', _a)));
            });
        }
        // Clear API error for this field
        if (apiErrors[name]) {
            setApiErrors(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[name] = '', _a)));
            });
        }
    };
    // Validation functions
    var validateLogin = function () {
        var errors = { email: '', password: '' };
        if (!loginData.email) {
            errors.email = 'Email is required';
        }
        else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
            errors.email = 'Please enter a valid email';
        }
        if (!loginData.password) {
            errors.password = 'Password is required';
        }
        else if (loginData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        return errors;
    };
    var validateRegister = function () {
        var _a;
        var errors = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            storeName: '',
            storeDescription: ''
        };
        if (!registerData.name.trim()) {
            errors.name = 'Name is required';
        }
        else if (registerData.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters';
        }
        if (!registerData.email) {
            errors.email = 'Email is required';
        }
        else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
            errors.email = 'Please enter a valid email';
        }
        if (!registerData.password) {
            errors.password = 'Password is required';
        }
        else if (registerData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        if (!registerData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        }
        else if (registerData.password !== registerData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        // Vendor-specific validations
        if (activeTab === 'vendor') {
            if (!((_a = registerData.storeName) === null || _a === void 0 ? void 0 : _a.trim())) {
                errors.storeName = 'Store name is required for vendors';
            }
        }
        return errors;
    };
    var handleLogin = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var errors, result, errorMessage, email, error_1;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    e.preventDefault();
                    // Clear previous errors
                    setApiErrors({});
                    errors = validateLogin();
                    setLoginErrors(errors);
                    // Check if there are any errors
                    if (errors.email || errors.password) {
                        sonner_1.toast.error('Please fix the errors above');
                        return [2 /*return*/];
                    }
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    console.log('Attempting login with:', loginData);
                    return [4 /*yield*/, dispatch((0, authSlice_1.loginUser)(loginData))];
                case 2:
                    result = _d.sent();
                    if (authSlice_1.loginUser.fulfilled.match(result)) {
                        console.log('Login successful, user:', result.payload);
                        console.log('User role:', (_a = result.payload) === null || _a === void 0 ? void 0 : _a.role);
                        sonner_1.toast.success('Login successful!');
                        // Navigate based on user role
                        if (((_b = result.payload) === null || _b === void 0 ? void 0 : _b.role) === 'vendor') {
                            console.log('Navigating to vendor dashboard after login');
                            navigate('/vendor/dashboard');
                        }
                        else if (((_c = result.payload) === null || _c === void 0 ? void 0 : _c.role) === 'admin') {
                            console.log('Navigating to admin dashboard after login');
                            navigate('/admin/dashboard');
                        }
                        else {
                            console.log('Navigating to customer dashboard after login');
                            navigate('/customer/profile');
                        }
                    }
                    else if (authSlice_1.loginUser.rejected.match(result)) {
                        console.error('Login failed:', result.payload);
                        // Handle field-specific errors from API
                        if (typeof result.payload === 'string') {
                            errorMessage = result.payload;
                            // Check for specific error patterns
                            if (errorMessage.includes('Invalid credentials')) {
                                email = loginData.email;
                                if (email) {
                                    // Show a more helpful message suggesting registration
                                    setApiErrors({
                                        email: 'Account not found. Please register first or check your email.',
                                        password: 'Account not found. Please register first or check your email.'
                                    });
                                    sonner_1.toast.error('Account not found. Please register first or check your email and password.', {
                                        duration: 5000,
                                        action: {
                                            label: 'Switch to Register',
                                            onClick: function () { return setActiveTab('customer'); }
                                        }
                                    });
                                }
                                else {
                                    setApiErrors({
                                        email: 'Invalid email or password',
                                        password: 'Invalid email or password'
                                    });
                                    sonner_1.toast.error('Invalid email or password. Please try again.');
                                }
                            }
                            else if (errorMessage.includes('Invalid email or password')) {
                                setApiErrors({
                                    email: 'Invalid email or password',
                                    password: 'Invalid email or password'
                                });
                                sonner_1.toast.error('Invalid email or password. Please try again.');
                            }
                            else if (errorMessage.includes('email') || errorMessage.includes('Email')) {
                                setApiErrors({ email: errorMessage });
                            }
                            else if (errorMessage.includes('password') || errorMessage.includes('Password')) {
                                setApiErrors({ password: errorMessage });
                            }
                            else if (errorMessage.includes('Account is deactivated')) {
                                sonner_1.toast.error('Your account has been deactivated. Please contact support.');
                            }
                            else {
                                sonner_1.toast.error(errorMessage);
                            }
                        }
                        else {
                            sonner_1.toast.error('Login failed. Please try again.');
                        }
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _d.sent();
                    console.error('Login error:', error_1);
                    sonner_1.toast.error('Network error. Please check your connection and try again.');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleRegister = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var errors, userData, result, errorMessage, nameError, emailError, passwordError, storeError, phoneError, error_2;
        var _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    e.preventDefault();
                    // Clear previous errors
                    setApiErrors({});
                    errors = validateRegister();
                    setRegisterErrors(errors);
                    // Check if there are any errors
                    if (Object.values(errors).some(function (error) { return error; })) {
                        sonner_1.toast.error('Please fix the errors above');
                        return [2 /*return*/];
                    }
                    userData = {
                        name: registerData.name,
                        email: registerData.email,
                        password: registerData.password,
                        confirmPassword: registerData.confirmPassword,
                        role: activeTab,
                        phone: registerData.phone || undefined,
                        storeName: activeTab === 'vendor' ? registerData.storeName : undefined,
                        storeDescription: activeTab === 'vendor' ? registerData.storeDescription : undefined,
                    };
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, dispatch((0, authSlice_1.registerUser)(userData))];
                case 2:
                    result = _f.sent();
                    if (authSlice_1.registerUser.fulfilled.match(result)) {
                        sonner_1.toast.success("Welcome to LocalThread, ".concat(registerData.name, "!"));
                        // Navigate based on role
                        if (activeTab === 'vendor') {
                            console.log('Navigating to vendor dashboard after registration');
                            navigate('/vendor/dashboard');
                        }
                        else {
                            console.log('Navigating to customer dashboard after registration');
                            navigate('/customer/profile');
                        }
                    }
                    else if (authSlice_1.registerUser.rejected.match(result)) {
                        console.error('Registration failed:', result.payload);
                        // Handle field-specific errors from API
                        if (typeof result.payload === 'string') {
                            errorMessage = result.payload;
                            // Parse field-specific errors from backend validation
                            if (errorMessage.includes('name:') || errorMessage.includes('Name')) {
                                nameError = ((_a = errorMessage.match(/name:\s*([^,]+)/i)) === null || _a === void 0 ? void 0 : _a[1]) || 'Name validation failed';
                                setApiErrors({ name: nameError });
                            }
                            else if (errorMessage.includes('email:') || errorMessage.includes('Email')) {
                                emailError = ((_b = errorMessage.match(/email:\s*([^,]+)/i)) === null || _b === void 0 ? void 0 : _b[1]) || 'Email validation failed';
                                setApiErrors({ email: emailError });
                            }
                            else if (errorMessage.includes('password:') || errorMessage.includes('Password')) {
                                passwordError = ((_c = errorMessage.match(/password:\s*([^,]+)/i)) === null || _c === void 0 ? void 0 : _c[1]) || 'Password validation failed';
                                setApiErrors({ password: passwordError });
                            }
                            else if (errorMessage.includes('confirmPassword:') || errorMessage.includes('Password confirmation')) {
                                setApiErrors({ confirmPassword: 'Password confirmation does not match password' });
                            }
                            else if (errorMessage.includes('storeName:') || errorMessage.includes('Store name')) {
                                storeError = ((_d = errorMessage.match(/storeName:\s*([^,]+)/i)) === null || _d === void 0 ? void 0 : _d[1]) || 'Store name validation failed';
                                setApiErrors({ storeName: storeError });
                            }
                            else if (errorMessage.includes('phone:') || errorMessage.includes('Phone')) {
                                phoneError = ((_e = errorMessage.match(/phone:\s*([^,]+)/i)) === null || _e === void 0 ? void 0 : _e[1]) || 'Phone validation failed';
                                setApiErrors({ phone: phoneError });
                            }
                            else if (errorMessage.includes('already exists') || errorMessage.includes('User with this email')) {
                                setApiErrors({ email: 'An account with this email already exists' });
                                sonner_1.toast.error('An account with this email already exists. Please try logging in instead.');
                            }
                            else {
                                // Show general error message
                                sonner_1.toast.error(errorMessage);
                            }
                        }
                        else {
                            sonner_1.toast.error('Registration failed. Please try again.');
                        }
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _f.sent();
                    console.error('Registration error:', error_2);
                    sonner_1.toast.error('Network error. Please check your connection and try again.');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-background flex items-center justify-center px-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full max-w-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-6", children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/", className: "inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, { className: "h-4 w-4 mr-2" }), "Back to LocalThread"] }) }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4", children: (0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "h-6 w-6 text-primary-foreground" }) }), (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-2xl", children: "Welcome to LocalThread" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Sign in to your account or create a new one" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, { value: activeTab, onValueChange: function (value) {
                                    setActiveTab(value);
                                    clearAllErrors();
                                }, children: [(0, jsx_runtime_1.jsxs)(tabs_1.TabsList, { className: "grid w-full grid-cols-2", children: [(0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, { value: "customer", className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "h-4 w-4" }), "Customer"] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, { value: "vendor", className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Store, { className: "h-4 w-4" }), "Vendor"] })] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, { value: activeTab, className: "mt-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 mb-6", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: isLogin ? "default" : "outline", onClick: function () {
                                                            setIsLogin(true);
                                                            clearAllErrors();
                                                        }, className: "flex-1", children: "Login" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: !isLogin ? "default" : "outline", onClick: function () {
                                                            setIsLogin(false);
                                                            clearAllErrors();
                                                        }, className: "flex-1", children: "Register" })] }), error && ((0, jsx_runtime_1.jsxs)(alert_1.Alert, { variant: "destructive", className: "mb-4", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: error })] })), isLogin ? ((0, jsx_runtime_1.jsxs)("form", { onSubmit: handleLogin, className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "email", children: "Email" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "email", name: "email", type: "email", placeholder: "Enter your email", value: loginData.email, onChange: handleLoginInputChange, required: true, className: loginErrors.email || apiErrors.email
                                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                                    : '' }), (loginErrors.email || apiErrors.email) && ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-red-500 mt-1 flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "h-3 w-3" }), loginErrors.email || apiErrors.email] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "password", children: "Password" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { id: "password", name: "password", type: showPassword ? 'text' : 'password', placeholder: "Enter your password", value: loginData.password, onChange: handleLoginInputChange, required: true, className: loginErrors.password || apiErrors.password
                                                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                                            : '' }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", variant: "ghost", size: "icon", className: "absolute right-2 top-1/2 transform -translate-y-1/2", onClick: function () { return setShowPassword(!showPassword); }, children: showPassword ? (0, jsx_runtime_1.jsx)(lucide_react_1.EyeOff, { className: "h-4 w-4" }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4" }) })] }), (loginErrors.password || apiErrors.password) && ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-red-500 mt-1 flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "h-3 w-3" }), loginErrors.password || apiErrors.password] }))] }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", className: "w-full bg-gray-900 text-white hover:bg-black", disabled: isLoading, children: isLoading ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), "Signing in..."] })) : ('Sign In') })] })) : ((0, jsx_runtime_1.jsxs)("form", { onSubmit: handleRegister, className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "name", children: "Full Name" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "name", name: "name", placeholder: "Enter your full name", value: registerData.name, onChange: handleRegisterInputChange, required: true, className: registerErrors.name || apiErrors.name
                                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                                    : '' }), (registerErrors.name || apiErrors.name) && ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-red-500 mt-1 flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "h-3 w-3" }), registerErrors.name || apiErrors.name] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "email", children: "Email" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "email", name: "email", type: "email", placeholder: "Enter your email", value: registerData.email, onChange: handleRegisterInputChange, required: true, className: registerErrors.email || apiErrors.email
                                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                                    : '' }), (registerErrors.email || apiErrors.email) && ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-red-500 mt-1 flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "h-3 w-3" }), registerErrors.email || apiErrors.email] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "password", children: "Password" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { id: "password", name: "password", type: showPassword ? 'text' : 'password', placeholder: "Create a password", value: registerData.password, onChange: handleRegisterInputChange, required: true, className: registerErrors.password || apiErrors.password
                                                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                                            : '' }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", variant: "ghost", size: "icon", className: "absolute right-2 top-1/2 transform -translate-y-1/2", onClick: function () { return setShowPassword(!showPassword); }, children: showPassword ? (0, jsx_runtime_1.jsx)(lucide_react_1.EyeOff, { className: "h-4 w-4" }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4" }) })] }), (registerErrors.password || apiErrors.password) && ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-red-500 mt-1 flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "h-3 w-3" }), registerErrors.password || apiErrors.password] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "confirmPassword", children: "Confirm Password" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { id: "confirmPassword", name: "confirmPassword", type: showConfirmPassword ? 'text' : 'password', placeholder: "Confirm your password", value: registerData.confirmPassword, onChange: handleRegisterInputChange, required: true, className: registerErrors.confirmPassword
                                                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                                            : '' }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", variant: "ghost", size: "icon", className: "absolute right-2 top-1/2 transform -translate-y-1/2", onClick: function () { return setShowConfirmPassword(!showConfirmPassword); }, children: showConfirmPassword ? (0, jsx_runtime_1.jsx)(lucide_react_1.EyeOff, { className: "h-4 w-4" }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4" }) })] }), registerErrors.confirmPassword && ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-red-500 mt-1 flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "h-3 w-3" }), registerErrors.confirmPassword] }))] }), activeTab === 'customer' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "phone", children: "Phone (Optional)" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "phone", name: "phone", placeholder: "Enter your phone number", value: registerData.phone, onChange: handleRegisterInputChange, className: registerErrors.phone || apiErrors.phone
                                                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                                            : '' }), (registerErrors.phone || apiErrors.phone) && ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-red-500 mt-1 flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "h-3 w-3" }), registerErrors.phone || apiErrors.phone] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "address", children: "Address (Optional)" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "address", name: "address", placeholder: "Enter your address", value: registerData.address, onChange: handleRegisterInputChange })] })] })), activeTab === 'vendor' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "storeName", children: "Store Name" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "storeName", name: "storeName", placeholder: "Enter your store name", value: registerData.storeName, onChange: handleRegisterInputChange, required: true, className: registerErrors.storeName || apiErrors.storeName
                                                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                                            : '' }), (registerErrors.storeName || apiErrors.storeName) && ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-red-500 mt-1 flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "h-3 w-3" }), registerErrors.storeName || apiErrors.storeName] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "storeDescription", children: "Store Description (Optional)" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "storeDescription", name: "storeDescription", placeholder: "Describe your store", value: registerData.storeDescription, onChange: handleRegisterInputChange, className: registerErrors.storeDescription || apiErrors.storeDescription
                                                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                                            : '' }), (registerErrors.storeDescription || apiErrors.storeDescription) && ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-red-500 mt-1 flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "h-3 w-3" }), registerErrors.storeDescription || apiErrors.storeDescription] }))] })] })), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", className: "w-full bg-gray-900 text-white hover:bg-black", disabled: isLoading, children: isLoading ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), "Creating account..."] })) : ('Create Account') })] }))] })] }) })] }), process.env.NODE_ENV === 'development' && ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "mt-4", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-sm text-gray-500", children: "Debug Information" }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-xs space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Is Authenticated:" }), " ", isAuthenticated ? 'Yes' : 'No'] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "User:" }), " ", (user === null || user === void 0 ? void 0 : user.name) || 'None'] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "User Role:" }), " ", (user === null || user === void 0 ? void 0 : user.role) || 'None'] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Token:" }), " ", localStorage.getItem('token') ? 'Present' : 'Missing'] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Stored User:" }), " ", localStorage.getItem('user') ? 'Present' : 'Missing'] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Current Tab:" }), " ", activeTab] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Is Login Mode:" }), " ", isLogin ? 'Yes' : 'No'] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "API URL:" }), " ", process.env.REACT_APP_API_URL || 'http://localhost:5000/api'] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "API Errors:" }), " ", Object.keys(apiErrors).length > 0 ? JSON.stringify(apiErrors) : 'None'] })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                                        var response, data, error_3;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    _a.trys.push([0, 3, , 4]);
                                                    return [4 /*yield*/, fetch('http://localhost:5000/api/health')];
                                                case 1:
                                                    response = _a.sent();
                                                    return [4 /*yield*/, response.json()];
                                                case 2:
                                                    data = _a.sent();
                                                    console.log('API Health Check:', data);
                                                    sonner_1.toast.success('API is working!');
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    error_3 = _a.sent();
                                                    console.error('API Health Check failed:', error_3);
                                                    sonner_1.toast.error('API connection failed');
                                                    return [3 /*break*/, 4];
                                                case 4: return [2 /*return*/];
                                            }
                                        });
                                    }); }, className: "mt-2", size: "sm", children: "Test API Connection" })] })] }))] }) }));
}
