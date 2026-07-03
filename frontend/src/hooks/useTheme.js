"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = useTheme;
var react_1 = require("react");

var STORAGE_KEY = 'lt_theme';

function getSystemTheme() {
    if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
}

function getInitialTheme() {
    try {
        var stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'dark' || stored === 'light') return stored;
        if (stored === 'system') return getSystemTheme();
    } catch (e) { /* noop */ }
    return 'light';
}

function applyTheme(theme) {
    var root = document.documentElement;
    if (theme === 'dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
}

function useTheme() {
    var _a = (0, react_1.useState)(function () {
        try { return localStorage.getItem(STORAGE_KEY) || 'light'; } catch (e) { return 'light'; }
    }), mode = _a[0], setMode = _a[1];

    var resolvedTheme = mode === 'system' ? getSystemTheme() : mode;
    var isDark = resolvedTheme === 'dark';

    // Apply theme on mount and changes
    (0, react_1.useEffect)(function () {
        applyTheme(resolvedTheme);
    }, [resolvedTheme]);

    // Listen for system theme changes when in 'system' mode
    (0, react_1.useEffect)(function () {
        if (mode !== 'system') return;
        var mq = window.matchMedia('(prefers-color-scheme: dark)');
        var handler = function () { applyTheme(getSystemTheme()); };
        mq.addEventListener('change', handler);
        return function () { mq.removeEventListener('change', handler); };
    }, [mode]);

    var setTheme = (0, react_1.useCallback)(function (newMode) {
        setMode(newMode);
        try { localStorage.setItem(STORAGE_KEY, newMode); } catch (e) { /* noop */ }
    }, []);

    var toggle = (0, react_1.useCallback)(function () {
        var next = isDark ? 'light' : 'dark';
        setTheme(next);
    }, [isDark, setTheme]);

    return { mode: mode, isDark: isDark, resolvedTheme: resolvedTheme, setTheme: setTheme, toggle: toggle };
}
