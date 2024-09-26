import { useEffect } from "react";
import { useMap, TileLayer } from "react-leaflet";
import { CoordinatesExtended, Coordinates } from "./MapGraph";
import { latLngBounds } from "leaflet";
import Polylines from "./Polylines";

export default function MapComponent({ data }: { data: CoordinatesExtended[] }) {
    const map = useMap();

    useEffect(() => {
        if (data.length > 0) {

            // remove the text data to get only the coordinates
            let dataOnlyCoord = new Array();;
            data.forEach((track, indexD) => {
                dataOnlyCoord[indexD] = new Array();
                track.forEach((point, indexT) => {
                    if (point.length>2) {
                        dataOnlyCoord[indexD][indexT]=[point[0], point[1]];
                    }
                });
            });

            const bounds = latLngBounds(dataOnlyCoord.reduce((acc, polyline) => [...acc, ...polyline], []));
            map.panTo(bounds.getCenter());
            map.fitBounds(bounds);
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