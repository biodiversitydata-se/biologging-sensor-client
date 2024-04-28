import { post } from "../apiService";

export const filterRecords = async (data?: any, params?: any): Promise<any> => {
    return await post<any>("records", data, params);
}