import { Event } from "@/api/event/event.typscript";
import LineGraph from "@/components/graphs/line/LineGraph";
import MapGraph from "@/components/graphs/map/MapGraph";
import { handleSensorSelection } from "@/hooks/sensorSelectContext/sensorSelectContext"

export default function Visualisation({ events }: { events: Event[] }) {
    const { sensors } = handleSensorSelection();

    // temp check for map
    const isMap = sensors.filter(item => item.sensor === 'latitude' && item.selected || item.sensor === 'longitude' && item.selected).length == 2;

    return (
        <div>
            {isMap ? <MapGraph events={events} /> : <LineGraph />}

        </div>
    )
}