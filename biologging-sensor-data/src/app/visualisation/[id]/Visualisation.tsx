import { Event } from "@/api/event/event.typscript";
import Actogram from "@/components/graphs/actogram/Actogram";
import LineGraph from "@/components/graphs/line/LineGraph";
import MapGraph from "@/components/graphs/map/MapGraph";
import { datasetConfig, sensorTypes } from "@/config/config";
import { useEffect, useState } from "react";

export default function Visualisation({ events, sensors }: { events: Event[], sensors: string[] }) {
    const SensorTypeDisplay = ({ sensor }: { sensor: string }) => {
        let graphType;

        const dId = events[0].datasetID;
        const customGraphs = datasetConfig[dId]?.customGraphs;
        if (customGraphs && sensor in customGraphs) {
            graphType = customGraphs[sensor].graphType;
        } else {
            graphType = sensorTypes[sensor].graphType;
        }

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