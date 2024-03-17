// ./src/api/instrumentApi.ts
import { get } from './api'; // Assuming you have the API functions defined as you provided

export const fetchInstrumentData = async (instrumentID) => {
  try {
    const instrument = await get(`instrument/${instrumentID}`);
    return instrument;
  } catch (error) {
    console.error('Error fetching instrument data:', error);
    throw error;
  }
};
