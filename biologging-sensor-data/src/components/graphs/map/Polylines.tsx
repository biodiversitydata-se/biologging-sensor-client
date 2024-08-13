import { Circle, Polyline, Tooltip } from "react-leaflet";
import { Coordinates } from "./MapGraph";
import { DivIcon } from "leaflet";

export default function Polylines({ coords }: { coords: Coordinates }) {
    const color = _getColor();

    const markerIcon = new DivIcon({
        html: '<i class="fas fa-minus"></i>',
        iconSize: [30, 30],
    })

    function _getColor(): string {
        const colors: string[] = [
            "#FF5733",
            "#33FF57",
            "#3366FF",
            "#FF33FF",
            "#FFFF33",
            "#33FFFF",
            "#FF3333",
            "#33FF33",
            "#3333FF",
            "#FF6633",
            "#33FF66",
            "#6633FF",
            "#FF33CC",
            "#33CCFF",
            "#CC33FF",
            "#CCFF33",
        ]

        const i = Math.floor(Math.random() * colors.length);
        return colors[i];
    }

    function _getRadius(i: number, n: number): number {
        const s = 5;
        const m = 25;
        const l = 35;

        if (i === 0) {
            return l;
        } else if (i === n - 1) {
            return m;
        }

        return s;
    }

console.log(coords)
    return (
        <div>
            <Polyline positions={coords} pathOptions={{ color: color }} />
            {coords.map((x, i) => (
                <Circle
                    key={i}
                    center={x}
                    radius={_getRadius(i, coords.length)}
                    pathOptions={i === coords.length - 1 ? { color: 'black', fillOpacity: 1, fillColor: color } : { color: color, fillOpacity: 1 }}
                    >
                    <Tooltip>Lat : {coords[i][0]} - Long : {coords[i][1]}</Tooltip>
                </Circle>
            ))}

        </div>
    )
}