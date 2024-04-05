import { useEffect } from "react";
import { SensorList } from "./interface";
import { handleSensorSelection } from "@/hooks/sensorSelectContext/sensorSelectContext";
import { Dataset } from "@/api/dataset/dataset.interface";

interface Props {
    selectedDataset: Dataset | null;
}

export default function SensorsList({ selectedDataset }: Props) {
    const { sensors, updateSensors } = handleSensorSelection();

    useEffect(() => {
        if (selectedDataset) {
            const values: SensorList[] = selectedDataset.sensorTypes.map(item => ({
                sensor: item,
                selected: false,
            }));
            updateSensors(values);
        }
    }, [selectedDataset])

    function _selectSensor(i: number) {
        const updatedSensors = sensors.map((sensor, index) => {
            if (index === i) {
                return {
                    ...sensor,
                    selected: !sensor.selected
                };
            }
            return sensor;
        });
        updateSensors(updatedSensors);
    }

    return (
        <div>
            <h5>Select sensor</h5>
            {sensors.map((item, index) => (
                <div
                    style={item.selected ? { backgroundColor: "lightblue" } : undefined}
                    key={index}
                    onClick={() => _selectSensor(index)}
                >
                    {item.sensor}
                </div>
            ))}
        </div>
    );
}
