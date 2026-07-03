"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoutiqueMap = BoutiqueMap;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");

function BoutiqueMap(_a) {
    var shops = _a.shops, userLat = _a.userLat, userLon = _a.userLon;
    var mapContainerRef = (0, react_1.useRef)(null);
    var mapInstanceRef = (0, react_1.useRef)(null);
    var markersGroupRef = (0, react_1.useRef)(null);
    var _b = (0, react_1.useState)(false), leafletLoaded = _b[0], setLeafletLoaded = _b[1];

    // Load Leaflet assets dynamically from CDN
    (0, react_1.useEffect)(function () {
        if (window.L) {
            setLeafletLoaded(true);
            if (!document.querySelector('link[href*="leaflet"]')) {
                var cssLink_1 = document.createElement("link");
                cssLink_1.rel = "stylesheet";
                cssLink_1.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
                cssLink_1.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
                cssLink_1.crossOrigin = "";
                document.head.appendChild(cssLink_1);
            }
            return;
        }

        // Add Leaflet CSS
        var cssLink = document.createElement("link");
        cssLink.rel = "stylesheet";
        cssLink.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        cssLink.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
        cssLink.crossOrigin = "";
        document.head.appendChild(cssLink);

        // Add Leaflet JS
        var jsScript = document.createElement("script");
        jsScript.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        jsScript.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
        jsScript.crossOrigin = "";
        jsScript.onload = function () {
            setLeafletLoaded(true);
        };
        document.body.appendChild(jsScript);

        return function () {
            // Clean up elements to avoid duplication on page switches
            if (cssLink.parentNode) cssLink.parentNode.removeChild(cssLink);
            if (jsScript.parentNode) jsScript.parentNode.removeChild(jsScript);
        };
    }, []);

    // Initialize Map and markers
    (0, react_1.useEffect)(function () {
        if (!leafletLoaded || !window.L || !mapContainerRef.current) return;

        var L = window.L;

        // Create map instance if not exists
        var initialLat = userLat !== null && userLat !== undefined ? userLat : 12.9716;
        var initialLon = userLon !== null && userLon !== undefined ? userLon : 77.5946;

        if (!mapInstanceRef.current) {
            mapInstanceRef.current = L.map(mapContainerRef.current, {
                zoomControl: false // Custom controls look cleaner
            }).setView([initialLat, initialLon], 13);

            // Add standard tile layer
            L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 20
            }).addTo(mapInstanceRef.current);

            // Add zoom control at bottom-right
            L.control.zoom({ position: 'bottomright' }).addTo(mapInstanceRef.current);

            // Add markers group layer
            markersGroupRef.current = L.layerGroup().addTo(mapInstanceRef.current);
        } else {
            // Update center if coordinates changed
            mapInstanceRef.current.setView([initialLat, initialLon]);
        }

        var markersGroup = markersGroupRef.current;
        markersGroup.clearLayers();

        // Custom local shop icon using Leaflet DivIcon
        var shopIcon = L.divIcon({
            className: 'custom-shop-marker',
            html: '<div style="background-color: #C2410C; border: 2px solid white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-center; box-shadow: 0 4px 10px rgba(194,65,12,0.4);"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7"/><path d="M6 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7"/><path d="M14 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7"/><path d="M18 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7"/></svg></div>',
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        });

        // Current user icon using Leaflet DivIcon
        var userIcon = L.divIcon({
            className: 'custom-user-marker',
            html: '<div style="background-color: #0F172A; border: 2px solid white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-center; box-shadow: 0 0 10px rgba(15,23,42,0.5);"><div style="background-color: #38BDF8; width: 10px; height: 10px; border-radius: 50%; animation: pulse 2s infinite;"></div></div>',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });

        // Add user marker
        L.marker([initialLat, initialLon], { icon: userIcon })
            .bindPopup("<div style='font-family: sans-serif; font-size: 12px; font-weight: bold;'>You are here</div>")
            .addTo(markersGroup);

        // Add markers for all shops
        shops.forEach(function (shop) {
            if (!shop.latitude || !shop.longitude) return;

            var popupContent = "\n                <div style='font-family: Outfit, sans-serif; padding: 2px; width: 200px;'>\n                    <h4 style='font-weight: 800; font-size: 14px; margin: 0 0 4px 0; color: #0F172A;'>" + shop.name + "</h4>\n                    <p style='font-size: 11px; margin: 0 0 8px 0; color: #64748B; font-family: Manrope;'>" + (shop.description ? shop.description.substring(0, 70) + '...' : '') + "</p>\n                    <div style='display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #E8E4DC; padding-top: 8px; margin-top: 8px;'>\n                        <span style='font-size: 11px; font-weight: 700; color: #C2410C;'>\u2605 " + (shop.ratingAverage || 4.5).toFixed(1) + "</span>\n                        <a href='/shop/" + shop.id + "' style='background-color: #0F172A; color: white; text-decoration: none; padding: 4px 8px; border-radius: 6px; font-size: 10px; font-weight: bold;'>Visit Shop</a>\n                    </div>\n                </div>\n            ";

            L.marker([shop.latitude, shop.longitude], { icon: shopIcon })
                .bindPopup(popupContent)
                .addTo(markersGroup);
        });

    }, [leafletLoaded, shops, userLat, userLon]);

    if (!leafletLoaded) {
        return (0, jsx_runtime_1.jsxs)("div", {
            className: "h-[500px] w-full rounded-3xl bg-slate-100 flex flex-col items-center justify-center gap-2 border border-[var(--lt-border)] shadow-lt-sm",
            children: [
                (0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--lt-amber)]" }),
                (0, jsx_runtime_1.jsx)("p", { className: "text-xs font-bold text-[var(--lt-muted)]", children: "Initializing map interface..." })
            ]
        });
    }

    return (0, jsx_runtime_1.jsx)("div", {
        ref: mapContainerRef,
        className: "h-[500px] w-full rounded-3xl overflow-hidden border border-[var(--lt-border)] shadow-lt-sm relative z-10",
        children: (0, jsx_runtime_1.jsx)("style", { dangerouslySetInnerHTML: { __html: "\n            @keyframes pulse {\n                0% { transform: scale(0.95); opacity: 0.5; }\n                50% { transform: scale(1.1); opacity: 0.8; }\n                100% { transform: scale(0.95); opacity: 0.5; }\n            }\n        " } })
    });
}
