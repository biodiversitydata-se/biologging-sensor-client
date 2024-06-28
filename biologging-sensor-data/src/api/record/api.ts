import { post } from "../apiService";

/**
 * Filter records
 * @param data 
 * @param params 
 * @returns 
 */
export const filterRecords = async (data?: any, params?: any): Promise<any> => {
    return await post<any>("records", data, params);
}