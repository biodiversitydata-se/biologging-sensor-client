import { DATASETS_ENDPOINT } from "@/config/constants";
import { patch, get, post } from "../apiService";

/**
 * Get all datasets
 */
export const getDatasets = async (): Promise<any> => {
    return await get<any>(DATASETS_ENDPOINT);
}

/**
 * Get specific dataset
 * @param id 
 * @returns 
 */
export const getDataset = async (id: string): Promise<any> => {
    return await get<any>(`dataset/${id}`);
}

/** 
 * Filter datasets
 * @param data 
 * @returns 
 */
export const filterDatasets = async (data?: any): Promise<any> => {
    return await post<any>(DATASETS_ENDPOINT, data);
}

/** 
 * Update a dataset by ID
 * @param id - Dataset identifier
 * @param dataset - Object containing updated fields
 * @returns 
 */
export const updateDataset = async (id: string, dataset: any): Promise<any> => {
  return await patch<any>(`dataset/${id}`, dataset);
};