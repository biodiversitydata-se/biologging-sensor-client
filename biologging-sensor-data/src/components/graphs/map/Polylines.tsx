import { Circle, Polyline, Tooltip } from "react-leaflet";
import { Coordinates, CoordinatesExtended } from "./MapGraph";
import { DivIcon } from "leaflet";

export default function Polylines({ coords }: { coords: CoordinatesExtended }) {
    const color = _getColor();

    // remove the text data to get only the coordinates
    let coordsOnly = new Array();;
    coords.forEach((point, indexD) => {
        coordsOnly[indexD]=[point[0], point[1]];

    });

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

    return (
        <div>
            <Polyline positions={coordsOnly} pathOptions={{ color: color }} />
            {coords.map((x, i) => (
                <Circle
                    key={i}
                    center={x as unknown as [number, number]}
                    radius={_getRadius(i, coords.length)}
                    pathOptions={i === coords.length - 1 ? { color: 'black', fillOpacity: 1, fillColor: color } : { color: color, fillOpacity: 1 }}
                    >
                    <Tooltip><b>{coords[i][2][0]}</b><br /><span style={{ backgroundColor: color }}>&nbsp;&nbsp;&nbsp;</span> {coords[i][2][1]}<br />Lat : {coords[i][0]} - Long : {coords[i][1]}</Tooltip>
                </Circle>
            ))}

        </div>
    )
}