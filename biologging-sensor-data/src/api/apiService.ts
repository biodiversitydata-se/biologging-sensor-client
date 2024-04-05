import axios, { AxiosError, AxiosResponse } from "axios";

const BASE_URL = 'http://canmove-dev.ekol.lu.se:8080/biologgingAPI/v1/';

type ApiResponse<T> = T | AxiosError;

export const get = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
      const response: AxiosResponse<T> = await axios.get<T>(`${BASE_URL}${endpoint}`);
      return response.data;
    } catch (error) {
      return error as AxiosError; 
    }
};

export const post = async <T>(endpoint: string, body: any): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<T> = await axios.post<T>(`${BASE_URL}${endpoint}`, body, {
            headers: {
                'Content-Type': 'application/json',
              },
              params: {
                take: 100,
              },
        });
        return response.data;
    } catch (error) {
        return error as AxiosError;
    }
}
