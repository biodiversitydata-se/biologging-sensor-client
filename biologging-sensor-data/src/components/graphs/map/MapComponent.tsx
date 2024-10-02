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


        }
    }, [data])


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