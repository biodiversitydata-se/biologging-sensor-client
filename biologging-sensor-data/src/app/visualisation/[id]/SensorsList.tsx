import { Event } from "@/api/event/event.typscript";
import { useEffect, useState } from "react";
import { SensorList } from "./interface";
import { useSensorSelection } from "@/hooks/sensorSelectContext/sensorSelectContext";
import { Dataset } from "@/api/dataset/dataset.interface";

interface Args {
    dataset: Dataset | undefined;
}

export default function SensorsList({ dataset }: Args) {
    const { sensors, updateSensors } = useSensorSelection();

    useEffect(() => {
        if (!dataset) {
            return;
        }

        const values: SensorList[] = dataset.sensorType.map(item => ({
            sensor: item,
            selected: false,
        }));

        updateSensors(values);
    }, [dataset])

    function _selectSensor(i: number) {
        const s = [...sensors];
        s[i].selected = !s[i].selected;
        updateSensors(s);
    }

    return (
        <div>
            <h5>Select sensor</h5>
            {sensors.map((item, index) => {
                return <div style={item.selected ? { backgroundColor: "lightblue" } : undefined} key={index} onClick={() => _selectSensor(index)}>{item.sensor}</div>
            })}
        </div>
    )

}