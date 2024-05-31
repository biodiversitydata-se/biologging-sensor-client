import { useEffect, useState } from "react";
import { Dataset } from "@/api/dataset/dataset.interface";
import { datasetConfig } from "@/config/config";
import { SensorList } from "./interface";

interface Args {
    dataset: Dataset | undefined;
    onSelect: (itm: SensorList) => void;
}

export default function SensorsList({ dataset, onSelect }: Args) {
    const [selected, updateSelected] = useState<SensorList>({});

    useEffect(() => {
        if (!dataset) {
            return;
        }

        updateSelected({});
        onSelect({});

        const sensors: { [id: string]: boolean } = {};

        // defult visualisation for dataset
        const defSensors = datasetConfig[dataset.datasetID]?.sensorTypes;

        // load sensors
        dataset.sensorType.map((item) => {
            sensors[item] = defSensors?.includes(item);
        })

        updateSelected(sensors);
        onSelect(sensors);

    }, [dataset])

    function _selectSensor(sensor: string) {
        const s = { ...selected };
        s[sensor] = !s[sensor];
        updateSelected(s);
        onSelect(s);
    }

    return (
        <div>
            <h5>Select sensor</h5>
            {dataset?.sensorType.map((item, index) => {
                return <div style={selected[item] ? { backgroundColor: "lightblue" } : undefined} key={index} onClick={() => _selectSensor(item)}>{item}</div>
            })}
        </div>
    )

}