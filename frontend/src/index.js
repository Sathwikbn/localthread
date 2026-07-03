"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var client_1 = __importDefault(require("react-dom/client"));
require("./index.css");
var App_1 = __importDefault(require("./App"));
var root = client_1.default.createRoot(document.getElementById('root'));
root.render((0, jsx_runtime_1.jsx)(react_1.default.StrictMode, { children: (0, jsx_runtime_1.jsx)(App_1.default, {}) }));

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // First unregister all existing service workers to remove any broken cached SW
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            var unregisterAll = registrations.map(function(reg) { return reg.unregister(); });
            return Promise.all(unregisterAll);
        }).catch(function(err) {
            console.log('ServiceWorker cleanup failed: ', err);
        });

        if (process.env.NODE_ENV === 'production') {
            navigator.serviceWorker.register('/service-worker.js').then(function(reg) {
                console.log('ServiceWorker registered with scope: ', reg.scope);
            }).catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
        }
    });
}

