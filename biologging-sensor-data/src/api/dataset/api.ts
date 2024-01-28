import { get, post } from "../apiService";

const ENDPOINT = 'datasets';

export const getDatasets = async (): Promise<any> => {
    return await get<any>(ENDPOINT);
}

export const getDataset = async (id: string): Promise<any> => {
    return await get<any>(`dataset/${id}`);
}

export const filterDatasets = async (data?: any): Promise<any> => {
    return await post<any>(ENDPOINT, data);
}