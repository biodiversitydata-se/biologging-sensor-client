import { EVENTS_ENPOINT } from "@/config/constants";
import { post } from "../apiService";

/**
 * Filter events
 * @param data 
 * @returns 
 */
export const filterEvents = async (data?: any): Promise<any> => {
    return await post<any>(EVENTS_ENPOINT, data);
}