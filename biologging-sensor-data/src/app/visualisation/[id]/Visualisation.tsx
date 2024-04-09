import { Event } from "@/api/event/event.typscript";
import LineGraph from "@/components/graphs/line/LineGraph";
import MapGraph from "@/components/graphs/map/MapGraph";
import { useSensorSelection } from "@/hooks/sensorSelectContext/sensorSelectContext"
import { useEffect, useState } from "react";

export default function Visualisation({ events }: { events: Event[] }) {
    console.log("events", events);
    const { sensors, updateSensors, handleSensorSelection } = useSensorSelection();
    const [isMap, setMap] = useState<boolean>(false);
    const [sensorSelected, setSelected] = useState<boolean>(false)

    useEffect(() => {
        const latSelected = sensors.some(item => item.sensor === 'latitude' && item.selected);
        const lonSelected = sensors.some(item => item.sensor === 'longitude' && item.selected);
        const otherSelected = sensors.some(item => item.sensor !== 'latitude' && item.sensor !== 'longitude' && item.selected);

        if ((latSelected && !lonSelected) || (!latSelected && lonSelected)) {
            const newSensors = sensors.map(item => {
                if (item.sensor === 'latitude' && lonSelected) {
                    return { ...item, selected: true };
                }
                if (item.sensor === 'longitude' && latSelected) {
                    return { ...item, selected: true };
                }
                return item;
            });
            updateSensors(newSensors);
        }

        setMap(latSelected && lonSelected && !otherSelected);
        setSelected(sensors.some(itm => itm.selected));
    }, [sensors, updateSensors])

    return (
        <div>
            {
                sensorSelected ?
                    (isMap ?
                        <MapGraph events={events} />
                        : sensors
                            .filter(itm => itm.selected)
                            .map((itm, index) => { return <LineGraph key={index} events={events} sensor={itm.sensor} /> }))
                    : null
            }
        </div>
    )
}