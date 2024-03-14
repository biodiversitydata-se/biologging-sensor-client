import { Event } from "@/api/event/event.typscript";
import Actogram from "@/components/graphs/actogram/Actogram";
import LineGraph from "@/components/graphs/line/LineGraph";
import MapGraph from "@/components/graphs/map/MapGraph";
import { handleSensorSelection } from "@/hooks/sensorSelectContext/sensorSelectContext"
import { useEffect, useState } from "react";

export default function Visualisation({ events }: { events: Event[] }) {
    const { sensors } = handleSensorSelection();
    const [isMap, setMap] = useState<boolean>(false);
    const [isActogram, setActogram] = useState<boolean>(false);
    const [sensorSelected, setSelected] = useState<boolean>(false)

    useEffect(() => {
        setMap(sensors.filter(item => item.sensor === 'latitude' && item.selected || item.sensor === 'longitude' && item.selected).length == 2);
        setActogram(sensors.filter(item => item.sensor === 'activity' && item.selected).length === 1)
        setSelected(sensors.filter(itm => itm.selected).length > 0);
    }, [sensors])

    return (
        <div>
            {
                //temp, should be changed
                sensorSelected ?
                    (isMap ?
                        <MapGraph events={events} />
                        : isActogram ? <Actogram events={events}></Actogram>
                            : sensors
                                .filter(itm => itm.selected)
                                .map((itm, index) => { return <LineGraph key={index} events={events} sensor={itm.sensor} /> }))
                    : null
            }


        </div>
    )
}