Leaflet.jsonstyles
==================

A [Leaflet][] plugin that styles GeoJSON layers using a JSON object.

The goal is to allow more advanced styling--eg by zoom level--than is currently
possible using Leaflet's vector styling attributes.


## Usage

Include `leaflet.jsonstyles.js` in your page. Then add a property to your
L.GeoJson options called `jsonStyle`. This should be an object such as the
following:

    [
        {
          "style": {
            "fillOpacity": 1,
            "color": "#ffffff",
            "opacity": 1,
            "stroke": true,
            "weight": 1,
            "radius": 10,
            "fill": true,
            "fillColor": "#ff6600"
          }
        },
        {
          "style": {
            "fillOpacity": 1,
            "color": "#ffffff",
            "opacity": 1,
            "stroke": true,
            "weight": 1,
            "radius": 40,
            "fill": true,
            "fillColor": "#ffff00"
          },
          "conditions": [
            {
              "operator": ">=",
              "type": "zoom",
              "value": 9
            }
          ]
        }
    ]

That is, an array of objects containing a standard L.GeoJson `style` and an
optional array of `conditions`.

Leaflet.jsonstyles is only tested on Leaflet version 0.7 or greater.

AMD compatible.


### Examples

TODO


## Demos

TODO


## License

Leaflet.jsonstyles is free software, and may be redistributed under the MIT
License.


 [Leaflet]: https://github.com/Leaflet/Leaflet
