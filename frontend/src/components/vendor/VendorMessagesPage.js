"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorMessagesPage = VendorMessagesPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var api_1 = require("../../services/api");
var input_1 = require("../ui/input");
var button_1 = require("../ui/button");
var card_1 = require("../ui/card");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");

function VendorMessagesPage() {
    var _this = this;
    var _a = (0, react_1.useState)([]), threads = _a[0], setThreads = _a[1];
    var _b = (0, react_1.useState)(null), activeThread = _b[0], setActiveThread = _b[1];
    var _c = (0, react_1.useState)([]), messages = _c[0], setMessages = _c[1];
    var _d = (0, react_1.useState)(''), messageText = _d[0], setMessageText = _d[1];
    var _e = (0, react_1.useState)(false), isLoading = _e[0], setIsLoading = _e[1];
    var chatEndRef = (0, react_1.useRef)(null);

    var loadThreads = (0, react_1.useCallback)(function () {
        (0, api_1.apiRequest)("/messages/threads")
            .then(function (res) {
                if (res && res.success && res.data && Array.isArray(res.data.threads)) {
                    setThreads(res.data.threads);
                }
            })
            .catch(function (err) {
                console.error("Error loading chat threads:", err);
            });
    }, []);

    var loadMessages = (0, react_1.useCallback)(function () {
        if (!activeThread) return;
        (0, api_1.apiRequest)("/messages/thread/" + activeThread.userId)
            .then(function (res) {
                if (res && res.success && res.data && Array.isArray(res.data.messages)) {
                    setMessages(res.data.messages);
                }
            })
            .catch(function (err) {
                console.error("Error loading conversation history:", err);
            });
    }, [activeThread]);

    (0, react_1.useEffect)(function () {
        loadThreads();
        var tInterval = setInterval(loadThreads, 8000);
        return function () { return clearInterval(tInterval); };
    }, [loadThreads]);

    (0, react_1.useEffect)(function () {
        loadMessages();
        var mInterval;
        if (activeThread) {
            mInterval = setInterval(loadMessages, 4000);
        }
        return function () { return clearInterval(mInterval); };
    }, [activeThread, loadMessages]);

    (0, react_1.useEffect)(function () {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    var handleSend = function (e) {
        e.preventDefault();
        if (!messageText.trim() || !activeThread) return;
        var textToSend = messageText.trim();
        setMessageText('');

        (0, api_1.apiRequest)("/messages", {
            method: "POST",
            body: JSON.stringify({ receiverId: activeThread.userId, message: textToSend })
        }).then(function () {
            loadMessages();
        }).catch(function (err) {
            sonner_1.toast.error("Failed to send reply");
        });
    };

    return ((0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-6 font-body text-[var(--lt-charcoal)] h-[calc(100vh-140px)] flex flex-col",
        children: [
            (0, jsx_runtime_1.jsxs)("div", {
                children: [
                    (0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold font-display tracking-tight text-[var(--lt-charcoal)]", children: "Boutique Chats" }),
                    (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-[var(--lt-muted)] mt-1", children: "Interact directly with neighborhood shoppers and manage offline try-on coordinates." })
                ]
            }),
            (0, jsx_runtime_1.jsxs)("div", {
                className: "flex-1 flex bg-white border border-[var(--lt-border)] rounded-2xl overflow-hidden shadow-lt-sm",
                children: [
                    // Thread Sidebar
                    (0, jsx_runtime_1.jsxs)("div", {
                        className: "w-80 border-r border-slate-100 flex flex-col bg-slate-50/50 shrink-0",
                        children: [
                            (0, jsx_runtime_1.jsx)("div", {
                                className: "p-4 border-b border-slate-100 bg-white font-bold font-display text-xs text-[var(--lt-muted)] uppercase tracking-wider",
                                children: "Active Chats"
                            }),
                            (0, jsx_runtime_1.jsx)("div", {
                                className: "flex-1 overflow-y-auto divide-y divide-slate-100",
                                children: threads.length === 0 ? (
                                    (0, jsx_runtime_1.jsx)("div", {
                                        className: "p-8 text-center text-xs text-[var(--lt-muted)]",
                                        children: "No active threads yet. Shoppers will message you from product details."
                                    })
                                ) : (
                                    threads.map(function (t) {
                                        var isActive = activeThread && activeThread.userId === t.userId;
                                        return (0, jsx_runtime_1.jsxs)("button", {
                                            onClick: function () { return setActiveThread(t); },
                                            className: "w-full text-left p-4 hover:bg-slate-50 transition-colors flex items-start gap-3 cursor-pointer " + (isActive ? 'bg-slate-100/80 border-l-4 border-[var(--lt-amber)]' : ''),
                                            children: [
                                                (0, jsx_runtime_1.jsx)("div", {
                                                    className: "w-10 h-10 rounded-2xl bg-[var(--lt-amber-pale)] text-[var(--lt-amber)] border border-[var(--lt-amber-light)] flex items-center justify-center font-bold font-display text-sm shrink-0",
                                                    children: t.name.split(' ').map(function (n) { return n[0]; }).join('').toUpperCase()
                                                }),
                                                (0, jsx_runtime_1.jsxs)("div", {
                                                    className: "overflow-hidden flex-1",
                                                    children: [
                                                        (0, jsx_runtime_1.jsxs)("div", {
                                                            className: "flex justify-between items-center mb-0.5",
                                                            children: [
                                                                (0, jsx_runtime_1.jsx)("p", { className: "font-extrabold font-display text-sm text-[var(--lt-charcoal)] truncate", children: t.name }),
                                                                t.lastMessageTime && (0, jsx_runtime_1.jsx)("span", {
                                                                    className: "text-[9px] text-slate-400 font-mono",
                                                                    children: new Date(t.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                                })
                                                            ]
                                                        }),
                                                        (0, jsx_runtime_1.jsx)("p", {
                                                            className: "text-xs text-[var(--lt-muted)] truncate",
                                                            children: t.lastMessage || "No messages yet"
                                                        })
                                                    ]
                                                })
                                            ]
                                        }, t.userId);
                                    })
                                )
                            })
                        ]
                    }),
                    // Chat Box
                    activeThread ? (
                        (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex-1 flex flex-col bg-white",
                            children: [
                                // Header
                                (0, jsx_runtime_1.jsxs)("div", {
                                    className: "p-4 border-b border-slate-100 flex items-center justify-between bg-white",
                                    children: [
                                        (0, jsx_runtime_1.jsxs)("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                (0, jsx_runtime_1.jsx)("div", {
                                                    className: "w-9 h-9 rounded-2xl bg-[var(--lt-amber-pale)] text-[var(--lt-amber)] border border-[var(--lt-amber-light)] flex items-center justify-center font-bold font-display text-xs",
                                                    children: activeThread.name.split(' ').map(function (n) { return n[0]; }).join('').toUpperCase()
                                                }),
                                                (0, jsx_runtime_1.jsxs)("div", {
                                                    children: [
                                                        (0, jsx_runtime_1.jsx)("h4", { className: "font-bold text-sm font-display text-[var(--lt-charcoal)]", children: activeThread.name }),
                                                        (0, jsx_runtime_1.jsx)("p", { className: "text-[10px] text-[var(--lt-muted)]", children: activeThread.email })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                // Messages List
                                (0, jsx_runtime_1.jsxs)("div", {
                                    className: "flex-1 overflow-y-auto p-6 bg-slate-50 space-y-4",
                                    children: [
                                        messages.map(function (msg) {
                                            var isMe = String(msg.senderId) === String(activeThread.userId);
                                            return (0, jsx_runtime_1.jsxs)("div", {
                                                className: "flex flex-col " + (isMe ? 'items-start' : 'items-end'),
                                                children: [
                                                    (0, jsx_runtime_1.jsx)("div", {
                                                        className: "max-w-[70%] px-4 py-2.5 rounded-2xl text-xs font-semibold leading-relaxed " + (isMe ? 'bg-white text-slate-800 border border-slate-200 rounded-tl-none' : 'bg-slate-900 text-white rounded-tr-none'),
                                                        children: msg.message
                                                    }),
                                                    (0, jsx_runtime_1.jsx)("span", {
                                                        className: "text-[8px] text-slate-400 mt-1 px-1",
                                                        children: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                    })
                                                ]
                                            }, msg.id);
                                        }),
                                        (0, jsx_runtime_1.jsx)("div", { ref: chatEndRef })
                                    ]
                                }),
                                // Input Bar
                                (0, jsx_runtime_1.jsxs)("form", {
                                    onSubmit: handleSend,
                                    className: "p-4 border-t border-slate-100 flex gap-3 bg-white",
                                    children: [
                                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                                            type: "text",
                                            value: messageText,
                                            onChange: function (e) { return setMessageText(e.target.value); },
                                            placeholder: "Type a reply...",
                                            className: "flex-1 rounded-xl h-11"
                                        }),
                                        (0, jsx_runtime_1.jsx)(button_1.Button, {
                                            type: "submit",
                                            disabled: !messageText.trim(),
                                            className: "bg-slate-900 text-white font-bold h-11 rounded-xl px-6",
                                            children: "Send"
                                        })
                                    ]
                                })
                            ]
                        })
                    ) : (
                        (0, jsx_runtime_1.jsx)("div", {
                            className: "flex-1 flex flex-col items-center justify-center text-center p-8 bg-white",
                            children: (0, jsx_runtime_1.jsxs)("div", {
                                className: "max-w-xs space-y-2",
                                children: [
                                    (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, { className: "h-10 w-10 text-slate-300 mx-auto" }),
                                    (0, jsx_runtime_1.jsx)("h3", { className: "text-sm font-bold font-display text-[var(--lt-charcoal)]", children: "Select a Chat Thread" }),
                                    (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-[var(--lt-muted)] leading-relaxed", children: "Choose an active conversation from the list to view chat logs and send replies." })
                                ]
                            })
                        })
                    )
                ]
            })
        ]
    }));
}
