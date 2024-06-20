import { ActogramC } from "@/config/model";

export interface ActogramProps {
    data: AData[] | undefined;
    mCounts: Map<string, number> | undefined;
    days: number;
    config: ActogramC | undefined;
    errorValue: number;
    notMeasuredValue: number;
}

export interface AData {
    x: number;
    y: number;
    value: number;
}