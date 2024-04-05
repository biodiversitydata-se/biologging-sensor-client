import { Dataset } from "@/api/dataset/dataset.interface";
import { SensorList } from "@/app/visualisation/[id]/interface";
import { createContext, useContext, useState } from "react";

interface SensorSelection {
    sensors: SensorList[];
    updateSensors: (itm: SensorList[]) => void;
}

export const SensorSelectionContext = createContext<SensorSelection>({
    sensors: [],
    updateSensors: ([]) => { },
});

export function handleSensorSelection() {
    return useContext(SensorSelectionContext);
}

export function SensorSelectionProvider(props: any) {
    const [sensors, updateSensors] = useState<SensorList[]>([]);

    return (
        <SensorSelectionContext.Provider value={{ sensors: sensors, updateSensors: updateSensors }}>
            {props.children}
        </SensorSelectionContext.Provider>
    )

}