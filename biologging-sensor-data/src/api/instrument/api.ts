import { INSTRUMENT_ENPOINT } from '@/config/constants';
import { get, post } from '../apiService';

export const getInstruments = async (): Promise<any> => {
    return await get<any>(INSTRUMENT_ENPOINT);
}

export const getInstrument = async (id: string): Promise<any> => {
    return await get<any>(`instrument/${id}`);
}

export const filterInstruments = async (data?: any): Promise<any> => {
    return await post<any>(INSTRUMENT_ENPOINT, data);
}

