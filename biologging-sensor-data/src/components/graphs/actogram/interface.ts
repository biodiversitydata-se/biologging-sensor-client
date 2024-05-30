import { ActogramConfig } from "@/config/model";

export interface ActogramProps {
    data: AData[] | undefined;
    mCounts: Map<string, number> | undefined;
    days: number;
    config: ActogramConfig[] | undefined;
}

export interface AData {
    x: number;
    y: number;
    value: number;
}