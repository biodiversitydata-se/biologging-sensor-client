import { useEffect } from "react";
import { useMap, TileLayer } from "react-leaflet";
import { CoordinatesExtended, Coordinates } from "./MapGraph";
import { latLngBounds } from "leaflet";
import L from "leaflet";
import Polylines from "./Polylines";

export default function MapComponent({ data }: { data: CoordinatesExtended[] }) {
    const map = useMap();

    useEffect(() => {
        if (data.length > 0) {

            // store the tag id + taxon for the legend
            let tracksName: string[] = [];
            let tracksColor: string[] = [];

            // remove the text data to get only the coordinates
            let dataOnlyCoord = new Array();;
            data.forEach((track, indexD) => {
                dataOnlyCoord[indexD] = new Array();
                track.forEach((point, indexT) => {
                    if (point.length>2) {
                        dataOnlyCoord[indexD][indexT]=[point[0], point[1]];

                        if (!tracksName.includes(point[2][1])) {
                            tracksName.push(point[2][1]);
                            tracksColor.push(point[2][2]);
                        }
                    }
                });
            });

            const bounds = latLngBounds(dataOnlyCoord.reduce((acc, polyline) => [...acc, ...polyline], []));
            map.panTo(bounds.getCenter());
            map.fitBounds(bounds);

            const legend = new L.Control({ position: "bottomright" });

            legend.onAdd = () => {
              const div = L.DomUtil.create("div", "mapLegendBox");
              let labels: string[] = [];

              labels.push ('<i><span class="mapCircleLegend"></span> First position</i>');

              for (let i = 0; i < tracksName.length; i++) {
                labels.push('<i><span style="background-color: ' + tracksColor[i] + '"">&nbsp;&nbsp;&nbsp;</span> ' + tracksName[i] + '</i>');
              }

              div.innerHTML = labels.join("<br>");
              return div;
            };

            legend.addTo(map);

            // add the layers
            var token = "8e55e105-71ff-3816-98eb-86f7979c3650",
            osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
              id: "mapbox.streets"
            }),
            topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
              attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            }),
            esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
              attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            });
            /*lantmateriet = L.tileLayer('https://api.lantmateriet.se/open/topowebb-ccby/v1/wmts/token/'+ token +'/?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=topowebb&STYLE=default&TILEMATRIXSET=3857&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fpng', 
            {
              attribution: '&copy; <a href="https://www.lantmateriet.se/en/">Lantmäteriet</a> Topografisk Webbkarta Visning, CCB'
            });
            */

            var baseMaps = {
                "OpenStreetMap": osm,
                "Open Topo": topo,
                //"Lantmäteriet Topo": lantmateriet,
                "ESRI satellite Imagery": esriSat
            }

            L.control.layers(baseMaps).addTo(map);

        }
    }, [data, map])


    return (
        <div>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {data.map((itm, index) => {
                return <Polylines key={index} coords={itm} />
            })}
        </div >
    )
}