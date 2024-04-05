export interface ActData {
    [date: string]: ActItem[];
}

export interface ActItem {
    hour: any;
    score: number;
}

export interface ActDaysData {
    [month: string]: number;
}

export interface ActogramProps {
    data: ActData | undefined;
    days: ActDaysData | undefined;
    adata: AData[] | undefined;
}

export interface AData {
    x: number;
    y: number;
    value: number;
}