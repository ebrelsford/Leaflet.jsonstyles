//
// leaflet.jsonstyles
//
// A Leaflet plugin that styles GeoJSON layers using a JSON object.
//

(function () {
    
    function defineJsonStyles(L) {

        L.GeoJSON = L.GeoJSON.extend({

            initialize: function (id, options) {
                L.GeoJSON.__super__.initialize.call(this, id, options);
                if (this.options.jsonStyle) {
                    this.setJsonStyle(this.options.jsonStyle);
                }
            },

            setJsonStyle: function (style) {
                this.jsonStyle = style;
                this.applyJsonStyles();
            },

            applyJsonStyles: function () {
                var style = {};
                this.jsonStyle.forEach(function (rule) {
                    if (this.jsonStyleIsApplicable(rule)) {
                        style = L.extend(style, rule.style);
                    }
                }, this);
                this.setStyle(style);
            },

            jsonStyleIsApplicable: function (rule) {
                if (!rule.conditions) {
                    return true;
                }
                var conditionsMet = false;
                rule.conditions.forEach(function (condition) {
                    if (this.jsonConditionMet(condition)) {
                        conditionsMet = true;
                    }
                }, this);
                return conditionsMet;
            },

            jsonConditionMet: function (condition) {
                // Zoom condition
                if (condition.type === 'zoom' && this.map) {
                    var zoom = this.map.getZoom();
                    switch (condition.operator) {
                        case '<=':
                            return zoom <= condition.value;
                        case '<':
                            return zoom < condition.value;
                        case '=':
                            return zoom === condition.value;
                        case '>':
                            return zoom > condition.value;
                        case '>=':
                            return zoom >= condition.value;
                    }
                }
                return false;
            },

            onAdd: function (map) {
                L.GeoJSON.__super__.onAdd.call(this, map);
                this.map = map;
                map.on('zoomend', this.applyJsonStyles, this);
                this.applyJsonStyles();
            },

            onRemove: function (map) {
                L.GeoJSON.__super__.onRemove.call(this, map);
                this.map = null;
                map.off('zoomend', this.applyJsonStyles, this);
            }

        });

    }

    if (typeof define === 'function' && define.amd) {
        // Try to add dataoptions to Leaflet using AMD
        define(['leaflet'], function (L) {
            defineJsonStyles(L);
        });
    }
    else {
        // Else use the global L
        defineJsonStyles(L);
    }

})();
