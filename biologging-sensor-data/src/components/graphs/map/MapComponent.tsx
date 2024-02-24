import { useEffect, Fragment } from "react";
import { useMap, TileLayer, Polyline, Marker, Circle } from "react-leaflet";
import { Coordinates } from "./MapGraph";
import { DivIcon, latLngBounds } from "leaflet";
import Polylines from "./Polylines";

export default function MapComponent({ data }: { data: Coordinates[] }) {
    const map = useMap();

    useEffect(() => {
        if (data.length > 0) {
            const bounds = latLngBounds(data.reduce((acc, polyline) => [...acc, ...polyline], []));
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