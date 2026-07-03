"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearSearch = exports.clearFilters = exports.setPage = exports.setSearchQuery = exports.setSortBy = exports.setVendors = exports.setColors = exports.setPriceRange = exports.setSize = exports.setCategory = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    category: [],
    size: [],
    priceRange: [0, 1000],
    colors: [],
    vendors: [],
    sortBy: 'newest-first',
    searchQuery: '',
    page: 1,
};
var filterSlice = (0, toolkit_1.createSlice)({
    name: 'filter',
    initialState: initialState,
    reducers: {
        setCategory: function (state, action) {
            state.category = action.payload;
            state.page = 1; // Reset to first page when filters change
        },
        setSize: function (state, action) {
            state.size = action.payload;
            state.page = 1;
        },
        setPriceRange: function (state, action) {
            state.priceRange = action.payload;
            state.page = 1;
        },
        setColors: function (state, action) {
            state.colors = action.payload;
            state.page = 1;
        },
        setVendors: function (state, action) {
            state.vendors = action.payload;
            state.page = 1;
        },
        setSortBy: function (state, action) {
            state.sortBy = action.payload;
            state.page = 1;
        },
        setSearchQuery: function (state, action) {
            state.searchQuery = action.payload;
            state.page = 1;
        },
        setPage: function (state, action) {
            state.page = action.payload;
        },
        clearFilters: function (state) {
            state.category = [];
            state.size = [];
            state.priceRange = [0, 1000];
            state.colors = [];
            state.vendors = [];
            state.sortBy = 'newest-first';
            state.searchQuery = '';
            state.page = 1;
        },
        clearSearch: function (state) {
            state.searchQuery = '';
            state.page = 1;
        },
    },
});
exports.setCategory = (_a = filterSlice.actions, _a.setCategory), exports.setSize = _a.setSize, exports.setPriceRange = _a.setPriceRange, exports.setColors = _a.setColors, exports.setVendors = _a.setVendors, exports.setSortBy = _a.setSortBy, exports.setSearchQuery = _a.setSearchQuery, exports.setPage = _a.setPage, exports.clearFilters = _a.clearFilters, exports.clearSearch = _a.clearSearch;
exports.default = filterSlice.reducer;
