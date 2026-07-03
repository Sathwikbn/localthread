"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationDropdown = NotificationDropdown;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var notificationSlice_1 = require("../store/notificationSlice");
var button_1 = require("./ui/button");
var badge_1 = require("./ui/badge");

function NotificationDropdown() {
    var dispatch = (0, react_redux_1.useDispatch)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    
    var _a = (0, react_redux_1.useSelector)(function (state) { return state.notifications; }), 
        notifications = _a.notifications, 
        unreadCount = _a.unreadCount;
    var isAuthenticated = (0, react_redux_1.useSelector)(function (state) { return state.auth.isAuthenticated; });

    var _b = (0, react_1.useState)(false), isOpen = _b[0], setIsOpen = _b[1];
    var dropdownRef = (0, react_1.useRef)(null);

    // Fetch notifications
    (0, react_1.useEffect)(function () {
        if (!isAuthenticated) return;
        dispatch((0, notificationSlice_1.fetchNotificationsAsync)());

        // Polling every 30 seconds
        var timer = setInterval(function () {
            dispatch((0, notificationSlice_1.fetchNotificationsAsync)());
        }, 30000);

        return function () { clearInterval(timer); };
    }, [dispatch, isAuthenticated]);

    // Handle outside clicks to close dropdown
    (0, react_1.useEffect)(function () {
        var handleOutsideClick = function (e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return function () { document.removeEventListener('mousedown', handleOutsideClick); };
    }, []);

    var handleNotificationClick = function (n) {
        var id = n.id || n._id;
        if (!n.isRead && !n.read) {
            dispatch((0, notificationSlice_1.markAsReadAsync)(id));
        }
        setIsOpen(false);
        // Route to the referenced order/item if exists
        if (n.referenceType === 'ORDER' && n.referenceId) {
            navigate("/customer/orders");
        }
    };

    var handleMarkAllRead = function (e) {
        e.preventDefault();
        e.stopPropagation();
        dispatch((0, notificationSlice_1.markAllAsReadAsync)());
    };

    if (!isAuthenticated) return null;

    return (0, jsx_runtime_1.jsxs)("div", {
        ref: dropdownRef,
        className: "relative",
        children: [
            // Bell Button
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "ghost",
                size: "icon",
                onClick: function () { setIsOpen(!isOpen); },
                className: "relative bg-white/60 hover:bg-amber-50/70 text-slate-700 border border-amber-200/20 backdrop-blur-sm transition-all duration-500 rounded-xl hover:text-amber-700 hover:border-amber-300/40 shadow-sm",
                children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Bell, { className: "h-5 w-5" }),
                    unreadCount > 0 && (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                        className: "absolute -top-2 -right-2 h-5.5 w-5.5 rounded-full p-0 flex items-center justify-center text-[10px] font-black bg-[var(--lt-amber)] text-white border-2 border-white shadow-md animate-pulse",
                        children: unreadCount
                    })
                ]
            }),

            // Dropdown List
            isOpen && (0, jsx_runtime_1.jsxs)("div", {
                className: "absolute right-0 mt-3 w-80 sm:w-96 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-white/40 py-3 z-50 animate-slide-up-menu",
                children: [
                    // Header
                    (0, jsx_runtime_1.jsxs)("div", {
                        className: "px-4 pb-2 border-b border-[var(--lt-border)] flex items-center justify-between",
                        children: [
                            (0, jsx_runtime_1.jsxs)("h3", {
                                className: "font-extrabold font-display text-sm text-[var(--lt-charcoal)]",
                                children: ["Notifications (", unreadCount, ")"]
                            }),
                            unreadCount > 0 && (0, jsx_runtime_1.jsx)("button", {
                                onClick: handleMarkAllRead,
                                className: "text-xs font-bold text-[var(--lt-amber)] hover:underline",
                                children: "Mark all read"
                            })
                        ]
                    }),

                    // Items List
                    (0, jsx_runtime_1.jsx)("div", {
                        className: "max-h-[360px] overflow-y-auto divide-y divide-slate-100",
                        children: notifications.length === 0 ? (
                            (0, jsx_runtime_1.jsxs)("div", {
                                className: "p-8 text-center text-[var(--lt-muted)]",
                                children: [
                                    (0, jsx_runtime_1.jsx)(lucide_react_1.BellOff, { className: "h-8 w-8 mx-auto mb-2 opacity-40" }),
                                    (0, jsx_runtime_1.jsx)("p", { className: "text-xs font-semibold", children: "All caught up! No notifications." })
                                ]
                            })
                        ) : (
                            notifications.map(function (n) {
                                var isUnread = !n.isRead && !n.read;
                                return (0, jsx_runtime_1.jsxs)("div", {
                                    onClick: function () { handleNotificationClick(n); },
                                    className: "p-4 cursor-pointer hover:bg-amber-50/30 transition-colors flex gap-3 items-start " + (isUnread ? 'bg-amber-50/10' : ''),
                                    children: [
                                        // Unread dot indicator
                                        isUnread && (0, jsx_runtime_1.jsx)("div", {
                                            className: "w-2.5 h-2.5 bg-[var(--lt-amber)] rounded-full mt-1.5 shrink-0"
                                        }),
                                        // Text Content
                                        (0, jsx_runtime_1.jsxs)("div", {
                                            className: "flex-1 space-y-1",
                                            children: [
                                                (0, jsx_runtime_1.jsx)("h4", {
                                                    className: "text-xs font-extrabold text-[var(--lt-charcoal)] font-display " + (isUnread ? 'font-black' : ''),
                                                    children: n.title
                                                }),
                                                (0, jsx_runtime_1.jsx)("p", {
                                                    className: "text-xs text-[var(--lt-muted)] font-body leading-relaxed",
                                                    children: n.message
                                                }),
                                                n.createdAt && (0, jsx_runtime_1.jsx)("p", {
                                                    className: "text-[10px] text-slate-400 font-bold",
                                                    children: new Date(n.createdAt).toLocaleDateString()
                                                })
                                            ]
                                        })
                                    ]
                                }, n.id || n._id);
                            })
                        )
                    })
                ]
            })
        ]
    });
}
