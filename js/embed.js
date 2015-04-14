(function(exports) {

    function init() {
        if (typeof L === 'undefined') throw new Error('Leaflet not found!');

        var parent = document.getElementById("map"),
            providerName = parent.getAttribute("data-provider"),
            provider = getProvider(providerName);

        // our main map
        var main =  L.map(parent, {
            scrollWheelZoom: false,
            layers: [provider],
            zoomControl: false,
            attributionControl: false,
            trackResize: true,
            // Maptiks tracking code
            track_id: "b67e9b8c-1408-44ff-b788-63dee4906de9",
            // Maptiks label
            sa_id: "Embed: " + providerName
        });

        // set the initial map position
        var centerAndZoom = L.Hash.prototype.parseHash(document.location.hash);
        if (centerAndZoom) {
            main.setView(centerAndZoom.center, centerAndZoom.zoom);
        } else {
            main.setView(new L.latLng(37.7706, -122.3782), 12);
        }

        if (typeof setupZoomControls === 'function') setupZoomControls(main);

        var zoom = parseInt(parent.getAttribute("data-zoom"));
        if (!isNaN(zoom)) {
            main.setZoom(zoom);
        }

        var center = parent.getAttribute("data-center");
        if (center && center.length) {
            var bits = center.split(",");
            main.setView(new L.latLng(parseFloat(bits[0]), parseFloat(bits[1])), main.getZoom());
        }

        var homeLink = document.getElementById("home-link");
        if (homeLink && typeof syncMapLinks === 'function') {
            syncMapLinks(main, [homeLink], function(parts) {
                parts.unshift(providerName);
            });
        }

        exports.MAP = main;
    }

    window.onload = function() {
        init();
        if (typeof track === 'function' ) track();
    };

})(this);
