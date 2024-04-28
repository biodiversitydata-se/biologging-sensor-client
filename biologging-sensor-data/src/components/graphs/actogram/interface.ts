export interface ActogramProps {
    data: AData[] | undefined;
    mCounts: Map<string, number> | undefined;
    days: number;
}

export interface AData {
    x: number;
    y: number;
    value: number;
}