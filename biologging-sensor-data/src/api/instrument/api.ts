import { get, post } from '../apiService';

/**
 * Get instrument based on id
 * @param id 
 * @returns 
 */
export const getInstrument = async (id: string): Promise<any> => {
    return await get<any>(`instrument/${id}`);
}
