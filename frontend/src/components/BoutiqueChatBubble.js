"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoutiqueChatBubble = BoutiqueChatBubble;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var lucide_react_1 = require("lucide-react");
var button_1 = require("./ui/button");
var input_1 = require("./ui/input");
var api_1 = require("../services/api");
var sonner_1 = require("sonner");

function BoutiqueChatBubble(_a) {
    var vendorId = _a.vendorId, shopName = _a.shopName;
    var isAuthenticated = (0, react_redux_1.useSelector)(function (state) { return state.auth.isAuthenticated; });
    var _b = (0, react_1.useState)(false), isOpen = _b[0], setIsOpen = _b[1];
    var _c = (0, react_1.useState)([]), messages = _c[0], setMessages = _c[1];
    var _d = (0, react_1.useState)(''), messageText = _d[0], setMessageText = _d[1];
    var _e = (0, react_1.useState)(false), loading = _e[0], setLoading = _e[1];
    var chatEndRef = (0, react_1.useRef)(null);

    var loadMessages = (0, react_1.useCallback)(function () {
        if (!isAuthenticated || !isOpen || !vendorId) return;
        (0, api_1.apiRequest)("/messages/thread/" + vendorId)
            .then(function (res) {
                if (res && res.success && res.data && Array.isArray(res.data.messages)) {
                    setMessages(res.data.messages);
                }
            })
            .catch(function (err) {
                console.error("Error loading chat messages:", err);
            });
    }, [isAuthenticated, isOpen, vendorId]);

    (0, react_1.useEffect)(function () {
        loadMessages();
        var interval;
        if (isOpen) {
            interval = setInterval(loadMessages, 4000);
        }
        return function () { return clearInterval(interval); };
    }, [isOpen, loadMessages]);

    (0, react_1.useEffect)(function () {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    var handleSend = function (e) {
        e.preventDefault();
        if (!messageText.trim() || !vendorId) return;
        var textToSend = messageText.trim();
        setMessageText('');

        (0, api_1.apiRequest)("/messages", {
            method: "POST",
            body: JSON.stringify({ receiverId: vendorId, message: textToSend })
        }).then(function () {
            loadMessages();
        }).catch(function (err) {
            sonner_1.toast.error("Failed to send message");
        });
    };

    var toggleChat = function () {
        if (!isAuthenticated) {
            sonner_1.toast.error("Please log in to chat with the boutique.");
            return;
        }
        setIsOpen(!isOpen);
    };

    return ((0, jsx_runtime_1.jsxs)("div", {
        className: "fixed bottom-6 right-6 z-50 font-body",
        children: [
            (0, jsx_runtime_1.jsx)("button", {
                onClick: toggleChat,
                className: "w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[var(--lt-amber)] transition-all duration-300 transform hover:scale-105 cursor-pointer",
                children: isOpen 
                    ? (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 24 }) 
                    : (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, { size: 24 })
            }),
            isOpen && (0, jsx_runtime_1.jsxs)("div", {
                className: "absolute bottom-18 right-0 w-80 sm:w-96 h-96 bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300",
                children: [
                    // Header
                    (0, jsx_runtime_1.jsxs)("div", {
                        className: "bg-slate-900 text-white p-4 flex items-center justify-between",
                        children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                                children: [
                                    (0, jsx_runtime_1.jsx)("h4", { className: "font-bold text-sm font-display", children: shopName || "Boutique Support" }),
                                    (0, jsx_runtime_1.jsx)("p", { className: "text-[10px] text-emerald-400 font-semibold", children: "Online" })
                                ]
                            }),
                            (0, jsx_runtime_1.jsx)("button", {
                                onClick: function () { return setIsOpen(false); },
                                className: "text-slate-400 hover:text-white cursor-pointer",
                                children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 18 })
                            })
                        ]
                    }),
                    // Chat area
                    (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex-1 overflow-y-auto p-4 bg-slate-50 space-y-3",
                        children: [
                            messages.length === 0 ? (
                                (0, jsx_runtime_1.jsx)("div", {
                                    className: "h-full flex items-center justify-center text-center p-4",
                                    children: (0, jsx_runtime_1.jsx)("p", {
                                        className: "text-xs text-[var(--lt-muted)]",
                                        children: "Ask about custom stitching, sizing details, or offline trial times."
                                    })
                                })
                            ) : (
                                messages.map(function (msg) {
                                    var isMe = String(msg.senderId) !== String(vendorId);
                                    return (0, jsx_runtime_1.jsxs)("div", {
                                        className: "flex flex-col " + (isMe ? 'items-end' : 'items-start'),
                                        children: [
                                            (0, jsx_runtime_1.jsx)("div", {
                                                className: "max-w-[75%] px-3.5 py-2 rounded-2xl text-xs font-medium " + (isMe ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'),
                                                children: msg.message
                                            }),
                                            (0, jsx_runtime_1.jsx)("span", {
                                                className: "text-[8px] text-slate-400 mt-1 px-1",
                                                children: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                            })
                                        ]
                                    }, msg.id);
                                })
                            ),
                            (0, jsx_runtime_1.jsx)("div", { ref: chatEndRef })
                        ]
                    }),
                    // Input Form
                    (0, jsx_runtime_1.jsxs)("form", {
                        onSubmit: handleSend,
                        className: "p-3 border-t border-slate-100 flex gap-2 bg-white",
                        children: [
                            (0, jsx_runtime_1.jsx)(input_1.Input, {
                                type: "text",
                                value: messageText,
                                onChange: function (e) { return setMessageText(e.target.value); },
                                placeholder: "Type a message...",
                                className: "flex-1 rounded-xl text-xs h-9"
                            }),
                            (0, jsx_runtime_1.jsx)(button_1.Button, {
                                type: "submit",
                                size: "sm",
                                disabled: !messageText.trim(),
                                className: "bg-slate-900 text-white h-9 rounded-xl",
                                children: (0, jsx_runtime_1.jsx)(lucide_react_1.Send, { size: 14 })
                            })
                        ]
                    })
                ]
            })
        ]
    }));
}
