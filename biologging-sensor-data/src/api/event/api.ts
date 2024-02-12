import { post } from "../apiService";

const EVENTS_URL = 'events';

export const filterEvents = async (data?: any): Promise<any> => {
    return await post<any>(EVENTS_URL, data);
}