"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchBar = SearchBar;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var filterSlice_1 = require("../../store/filterSlice");
var input_1 = require("../ui/input");
var button_1 = require("../ui/button");
var lucide_react_1 = require("lucide-react");
function SearchBar(_a) {
    var _b = _a.placeholder, placeholder = _b === void 0 ? "Search products..." : _b, _c = _a.className, className = _c === void 0 ? "" : _c;
    var dispatch = (0, react_redux_1.useDispatch)();
    var searchQuery = (0, react_redux_1.useSelector)(function (state) { return state.filter.searchQuery; });
    var _d = (0, react_1.useState)(searchQuery), localQuery = _d[0], setLocalQuery = _d[1];
    // Debounce function
    var debounce = (0, react_1.useCallback)(function (func, delay) {
        var timeoutId;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function () { return func.apply(null, args); }, delay);
        };
    }, []);
    // Debounced search function
    var debouncedSearch = (0, react_1.useCallback)(debounce(function (query) {
        dispatch((0, filterSlice_1.setSearchQuery)(query));
    }, 300), [dispatch, debounce]);
    // Update local query when search query changes
    (0, react_1.useEffect)(function () {
        setLocalQuery(searchQuery);
    }, [searchQuery]);
    // Handle input change
    var handleInputChange = function (e) {
        var value = e.target.value;
        setLocalQuery(value);
        debouncedSearch(value);
    };
    // Handle clear search
    var handleClearSearch = function () {
        setLocalQuery('');
        dispatch((0, filterSlice_1.setSearchQuery)(''));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative ".concat(className), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" }), (0, jsx_runtime_1.jsx)(input_1.Input, { type: "text", placeholder: placeholder, value: localQuery, onChange: handleInputChange, className: "pl-10 pr-10" }), localQuery && ((0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "icon", className: "absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6", onClick: handleClearSearch, children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-3 w-3" }) }))] }));
}
