import { post } from "../apiService";

export const filterRecords = async (data?: any): Promise<any> => {
    return await post<any>("records", data);
}