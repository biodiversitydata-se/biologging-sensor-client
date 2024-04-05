import { get } from '../apiService';

const ENDPOINT = 'instruments';

export const getInstruments = async (): Promise<any> => {
    return await get<any>(ENDPOINT);
}

export const getInstrument = async (id: string): Promise<any> => {
    return await get<any>(`instrument/${id}`);
}

export const filterInstruments = async (data?: any): Promise<any> => {
    return await post<any>(ENDPOINT, data);
}

