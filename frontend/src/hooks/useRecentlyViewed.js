"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRecentlyViewed = useRecentlyViewed;
var react_1 = require("react");

var STORAGE_KEY = 'lt_recently_viewed';
var MAX_ITEMS = 20;

function getStoredItems() {
    try {
        var raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function useRecentlyViewed() {
    var _a = (0, react_1.useState)(getStoredItems), items = _a[0], setItems = _a[1];

    var addItem = (0, react_1.useCallback)(function (product) {
        if (!product || !product.id) return;
        var entry = {
            id: product.id.toString(),
            name: product.name,
            price: product.price,
            image: product.image || product.imageUrl || '',
            category: product.category || ''
        };
        setItems(function (prev) {
            var filtered = prev.filter(function (item) { return item.id !== entry.id; });
            var updated = [entry].concat(filtered).slice(0, MAX_ITEMS);
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch (e) { /* noop */ }
            return updated;
        });
    }, []);

    var clearAll = (0, react_1.useCallback)(function () {
        localStorage.removeItem(STORAGE_KEY);
        setItems([]);
    }, []);

    return { items: items, addItem: addItem, clearAll: clearAll };
}
