import { INSTRUMENT_ENPOINT } from '@/config/constants';
import { get, post } from '../apiService';

/**
 * Gt all instruments
 * @returns 
 */
export const getInstruments = async (): Promise<any> => {
    return await get<any>(INSTRUMENT_ENPOINT);
}

/**
 * Gt instrument based on id
 * @param id 
 * @returns 
 */
export const getInstrument = async (id: string): Promise<any> => {
    return await get<any>(`instrument/${id}`);
}

/**
 * Filter instruments
 * @param data 
 * @returns 
 */
export const filterInstruments = async (data?: any): Promise<any> => {
    return await post<any>(INSTRUMENT_ENPOINT, data);
}

