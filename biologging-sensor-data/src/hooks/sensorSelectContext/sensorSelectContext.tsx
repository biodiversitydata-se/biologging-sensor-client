import { Dataset } from "@/api/dataset/dataset.interface";
import { SensorList } from "@/app/visualisation/[id]/interface";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface SensorSelection {
    sensors: SensorList[];
    updateSensors: (itm: SensorList[]) => void;
    handleSensorSelection: (sensor: string) => void;
}

export const SensorSelectionContext = createContext<SensorSelection | undefined>(undefined);

export function useSensorSelection() {
    const context = useContext(SensorSelectionContext);
    if (!context) {
        throw new Error('useSensorSelection must be used within a SensorSelectionProvider');
    }
    return context;
}

interface SensorSelectionProviderProps {
    children: ReactNode;
}

export function SensorSelectionProvider({ children }: SensorSelectionProviderProps) {
    const [sensors, updateSensors] = useState<SensorList[]>([]);

    const handleSensorSelection = useCallback((sensor: string) => {
        updateSensors(prevSensors => {
            const isLatOrLon = sensor === 'latitude' || sensor === 'longitude';
            const newSelectedStatus = !prevSensors.find(s => s.sensor === sensor)?.selected;

            return prevSensors.map(item => {
                if (item.sensor === sensor || (isLatOrLon && (item.sensor === 'latitude' || item.sensor === 'longitude'))) {
                    return { ...item, selected: newSelectedStatus };
                }
                return item;
            });
        });
    }, []);

    return (
        <SensorSelectionContext.Provider value={{ sensors, updateSensors, handleSensorSelection }}>
            {children}
        </SensorSelectionContext.Provider>
    )
}