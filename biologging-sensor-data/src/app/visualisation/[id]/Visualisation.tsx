import { Event } from "@/api/event/event.typscript";
import Actogram from "@/components/graphs/actogram/Actogram";
import LineGraph from "@/components/graphs/line/LineGraph";
import MapGraph from "@/components/graphs/map/MapGraph";
import { useSensorSelection } from "@/hooks/sensorSelectContext/sensorSelectContext"
import { useEffect, useState } from "react";

export default function Visualisation({ events }: { events: Event[] }) {
    const { sensors, updateSensors, handleSensorSelection } = useSensorSelection();
    const [isMap, setMap] = useState<boolean>(false);
    const [sensorSelected, setSelected] = useState<boolean>(false);
    const [isActogram, setActogram] = useState<boolean>(false);

    useEffect(() => {
        const latSelected = sensors.some(item => item.sensor === 'latitude' && item.selected);
        const lonSelected = sensors.some(item => item.sensor === 'longitude' && item.selected);


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

        setMap(latSelected && lonSelected);
        setSelected(sensors.some(itm => itm.selected));
        setActogram(sensors.filter(item => item.sensor === 'activity' && item.selected).length === 1)
    }, [sensors, updateSensors])

    return (
        <div>
            {
                sensorSelected &&
                <>
                    {isMap && <MapGraph events={events} />}
                    {isActogram && <Actogram events={events}></Actogram>}
                    {sensors
                        .filter(itm => itm.selected && itm.sensor !== 'latitude' && itm.sensor !== 'longitude' && itm.sensor !== 'activity')
                        .map((itm, index) => <LineGraph key={index} events={events} sensor={itm.sensor} />)}
                </>
            }
        </div>
    )
}