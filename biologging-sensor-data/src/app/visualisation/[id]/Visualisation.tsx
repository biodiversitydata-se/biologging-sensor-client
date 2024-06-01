import { Event } from "@/api/event/event.typscript";
import Actogram from "@/components/graphs/actogram/Actogram";
import LineGraph from "@/components/graphs/line/LineGraph";
import MapGraph from "@/components/graphs/map/MapGraph";
import { datasetConfig, sensorTypes } from "@/config/config";
import { SensorList } from "./interface";

export default function Visualisation({ events, sensors }: { events: Event[], sensors: SensorList }) {
    const SensorTypeDisplay = ({ sensor }: { sensor: string }) => {
        let config;

        const dId = events[0]?.datasetID;

        if (!dId) return null;

        const customGraphs = datasetConfig[dId]?.customGraphs;
        if (customGraphs && sensor in customGraphs) {
            config = customGraphs[sensor];
        } else {
            config = sensorTypes[sensor];
        }

        const graphType = config.graphType;

        if (graphType === 'A') return <Actogram events={events} sensor={sensor} config={config.actogramC} />
        else if (graphType === 'M') return <MapGraph events={events} config={config.mapC} />
        else if (graphType === 'N') return <div>No visualisation available. Download data for analysis</div>
        else return <LineGraph events={events} sensor={sensor} config={config.lineGraphC} />

    }

    return (
        <div>
            {
                Object.keys(sensors).map((key, index) => (
                    sensors[key] ? <SensorTypeDisplay key={index} sensor={key} /> : null
                ))
            }
        </div>
    )
}