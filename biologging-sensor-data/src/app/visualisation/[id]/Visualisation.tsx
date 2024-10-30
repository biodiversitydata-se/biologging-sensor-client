import Actogram from "@/components/graphs/actogram/Actogram";
import LineGraph from "@/components/graphs/line/LineGraph";
import { datasetConfig, sensorTypes } from "@/config/config";
import { SensorList } from "./interface";
import { Event } from "@/api/event/event";

// to avoid "window is not defined" when no map
//import MapGraph from "@/components/graphs/map/MapGraph";
import dynamic from 'next/dynamic';
const MapGraph = dynamic(() => import("@/components/graphs/map/MapGraph"), {
  ssr: false,
});


/**
 * Content of "Visualisation" page
 */
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

        const graphType = config?.graphType;

        if (graphType === undefined) {
            return <div>Graph not configured</div>
        }

        switch (graphType) {
            case 'A':
                return <Actogram events={events} valueMeasured={config.valuesMeasured[0]} config={config.actogramC} />;
            case 'M':
                return <MapGraph events={events} sensor={sensor} config={config.mapC} />
            case 'N':
                return <div>Under development. No visualisation for this sensor type provided yet. Download data for viewing.</div>
            default:
                return <LineGraph events={events} sensor={sensor} config={config.lineGraphC} />
        }

    }

    return (
        <div className="container">
            {
                Object.keys(sensors).filter((itm) => sensors[itm]).map((sensor, index) => (
                    <div className="mb-40" key={index}>
                        {sensors[sensor] ? <SensorTypeDisplay key={index} sensor={sensor} /> : null}
                    </div>
                ))
            }
        </div>
    )
}