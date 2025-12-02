import { BASE_API_URL, MAX_RECORD_VALUES, API_APP_ID } from "@/config/constants";
import axios, { AxiosError, AxiosResponse } from "axios";
import {  } from "@/config/constants";

type ApiResponse<T> = T | AxiosError;

export const get = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
      const response: AxiosResponse<T> = await axios.get<T>(`${BASE_API_URL}${endpoint}`, {
            headers: {
                'x-app-id': API_APP_ID
              },
        });
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
                'x-app-id': API_APP_ID
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

export const patch = async <T>( endpoint: string, data: any , includeApiKey = false): Promise<ApiResponse<T>> => {
    try {
        // Build headers dynamically
        const headers: Record<string, string> = {
            'x-app-id': API_APP_ID,
            'Content-Type': 'application/json',
            };
        if (includeApiKey) {
          headers['x-api-key'] = process.env.NEXT_PUBLIC_API_KEY!; // your API key from .env
        }

        const response: AxiosResponse<T> = await axios.patch<T>(
          `${BASE_API_URL}${endpoint}`,
          data,
          { headers }
        );

        return response.data;
    } catch (error) {
        return error as AxiosError;
    }
};