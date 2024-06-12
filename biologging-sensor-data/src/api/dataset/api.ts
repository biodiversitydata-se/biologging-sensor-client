import { DATASETS_ENDPOINT } from "@/config/constants";
import { get, post } from "../apiService";

export const getDatasets = async (): Promise<any> => {
    return await get<any>(DATASETS_ENDPOINT);
}

export const getDataset = async (id: string): Promise<any> => {
    return await get<any>(`dataset/${id}`);
}

export const filterDatasets = async (data?: any): Promise<any> => {
    return await post<any>(DATASETS_ENDPOINT, data);
}