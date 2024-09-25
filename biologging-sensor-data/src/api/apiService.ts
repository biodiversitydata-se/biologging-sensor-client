import { BASE_API_URL, MAX_RECORD_VALUES } from "@/config/constants";
import axios, { AxiosError, AxiosResponse } from "axios";

type ApiResponse<T> = T | AxiosError;

export const get = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
      const response: AxiosResponse<T> = await axios.get<T>(`${BASE_API_URL}${endpoint}`);
      return response.data;
    } catch (error) {
      return error as AxiosError; 
    }
};

export const post = async <T>(endpoint: string, body: any, params?: any): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<T> = await axios.post<T>(`${BASE_API_URL}${endpoint}`, body, {
            headers: {
                'Content-Type': 'application/json',
              },
              params: params ?? {
                take: MAX_RECORD_VALUES,
              },
        });
        return response.data;
    } catch (error) {
        return error as AxiosError;
    }
}
