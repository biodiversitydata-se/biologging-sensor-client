import { get, post } from '../apiService';

/**
 * Get organism based on id
 * @param id 
 * @returns 
 */
export const getOrganism = async (id: string): Promise<any> => {
    return await get<any>(`organism/${id}`);
}

