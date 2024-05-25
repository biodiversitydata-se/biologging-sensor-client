import { Event } from "@/api/event/event.typscript";
import { useEffect, useState } from "react";
import { SensorList } from "./interface";
import { useSensorSelection } from "@/hooks/sensorSelectContext/sensorSelectContext";
import { Dataset } from "@/api/dataset/dataset.interface";
import { datasetConfig } from "@/config/config";

interface Args {
    dataset: Dataset | undefined;
    onSelect: (itm: string[]) => void;
}

export default function SensorsList({ dataset, onSelect }: Args) {
    const [selected, setSelected] = useState<string[]>([])

    useEffect(() => {
        if (!dataset) {
            return;
        }

        setSelected([]);
        onSelect([]);

        // defult visualisation for dataset
        const defSensors = datasetConfig[dataset.datasetID]?.sensorTypes;
        if (defSensors && defSensors.length) {
            onSelect(defSensors);
            setSelected(defSensors);
        }

    }, [dataset])

    function _selectSensor(sensor: string) {
        const s = [...selected];
        if (_isSelected(sensor)) {
            s.splice(s.indexOf(sensor), 1);
        } else {
            s.unshift(sensor);
        }
        onSelect(s);
        setSelected(s);
    }

    function _isSelected(sensor: string): boolean {
        return selected.indexOf(sensor) > -1;
    }

    return (
        <div>
            <h5>Select sensor</h5>
            {dataset?.sensorType.map((item, index) => {
                return <div style={_isSelected(item) ? { backgroundColor: "lightblue" } : undefined} key={index} onClick={() => _selectSensor(item)}>{item}</div>
            })}
        </div>
    )

}