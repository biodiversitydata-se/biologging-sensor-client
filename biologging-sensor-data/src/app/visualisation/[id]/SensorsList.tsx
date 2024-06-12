import { useEffect, useState } from "react";
import { datasetConfig } from "@/config/config";
import { SensorList } from "./interface";
import { Dataset } from "@/api/dataset/dataset";

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
        const defSensors = datasetConfig[dataset.datasetID]?.defaultSensors;

        // load sensors
        dataset.sensorType.map((item) => {
            sensors[item] = defSensors?.includes(item) ?? false;
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
            <div className="vis-list-items">
                {dataset?.sensorType.map((item, index) => {
                    return <div style={selected[item] ? { backgroundColor: "lightblue" } : undefined} key={index} onClick={() => _selectSensor(item)}>{item}</div>
                })}
            </div>
        </div>
    )

}