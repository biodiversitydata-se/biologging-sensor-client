import { Event } from "@/api/event/event.typscript";
import { useEffect, useState } from "react";
import { SensorList } from "./interface";
import { useSensorSelection } from "@/hooks/sensorSelectContext/sensorSelectContext";

interface Args {
    events: Event[];
}


export default function SensorsList({ events }: Args) {
    const { sensors, updateSensors } = useSensorSelection();

    useEffect(() => {
        // identify sensors
        const sensorSet = new Set<string>();

        for (const e of events) {
            e.valuesMeasured.map((itm) => {
                sensorSet.add(itm);
            })
        }

        const sorted = Array.from(sensorSet).sort();

        const values: SensorList[] = sorted.map(item => ({
            sensor: item,
            selected: false,
        }));

        updateSensors(values);
    }, [events])

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