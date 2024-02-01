import { handleSensorSelection } from "@/hooks/sensorSelectContext/sensorSelectContext"

export default function Visualisation() {
    const {sensors} = handleSensorSelection();

    return (
        <div>
            Sensors from top 30 events
            {sensors.filter(item => item.selected === true)
                    .map((item, index) => {return <div key={index}>{item.sensor}</div>})
            }
        </div>
    )
}