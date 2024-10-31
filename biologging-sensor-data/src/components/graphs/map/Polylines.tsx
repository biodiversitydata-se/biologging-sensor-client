import { Circle, Polyline, Tooltip } from "react-leaflet";
import { Coordinates, CoordinatesExtended } from "./MapGraph";
import { DivIcon } from "leaflet";

export default function Polylines({ coords }: { coords: CoordinatesExtended }) {
    //const color = _getColor();
    let color:string = "";

    // remove the text data to get only the coordinates
    let coordsOnly = new Array();;
    coords.forEach((point, indexD) => {
        coordsOnly[indexD]=[point[0], point[1]];
        color=point[2][2];
    });

    const markerIcon = new DivIcon({
        html: '<i class="fas fa-minus"></i>',
        iconSize: [30, 30],
    })

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
                    <Tooltip><b>{coords[i][2][0]}</b><br />
                    <span style={{ backgroundColor: color }}>&nbsp;&nbsp;&nbsp;</span> 
                    {coords[i][2][1]}<br />Lat : {parseFloat(coords[i][0].toString()).toFixed(4)} - Long : {parseFloat(coords[i][1].toString()).toFixed(4)}
                    </Tooltip>
                </Circle>
            ))}

        </div>
    )
}