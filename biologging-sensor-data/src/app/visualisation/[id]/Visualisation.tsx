import { Event } from "@/api/event/event.typscript";
import Actogram from "@/components/graphs/actogram/Actogram";
import LineGraph from "@/components/graphs/line/LineGraph";
import MapGraph from "@/components/graphs/map/MapGraph";
import { sensorTypes } from "@/config/config";

export default function Visualisation({ events, sensors }: { events: Event[], sensors: string[] }) {
    const SensorTypeDisplay = ({ sensor }: { sensor: string }) => {
        const graphType = sensorTypes[sensor]?.graphType;

        if (!graphType) return <div>No visualisation</div>;

        if (graphType === 'A') return <Actogram events={events} sensor={sensor} />
        else if (graphType === 'M') return <MapGraph events={events} />
        else return <LineGraph events={events} sensor={sensor} />

    }

    return (
        <div>
            {sensors.map((sensor, index) => (
                <SensorTypeDisplay key={index} sensor={sensor} />
            ))}
        </div>
    )
}