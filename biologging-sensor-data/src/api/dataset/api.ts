import { BASE_API_URL, API_APP_ID, PUBLIC_API_KEY, DATASETS_ENDPOINT } from "@/config/constants";
import { patch, get, post } from "../apiService";
import axios from "axios";

/**
 * Get all datasets
 */
export const getDatasets = async (): Promise<any> => {
    return await get<any>(DATASETS_ENDPOINT);
}

/**
 * Get specific dataset
 * @param id 
 * @returns 
 */
export const getDataset = async (id: string): Promise<any> => {
    return await get<any>(`dataset/${id}`);
}

/** 
 * Filter datasets
 * @param data 
 * @returns 
 */
export const filterDatasets = async (data?: any): Promise<any> => {
    return await post<any>(DATASETS_ENDPOINT, data);
}

/** 
 * Update a dataset by ID
 * @param id - Dataset identifier
 * @param dataset - Object containing updated fields
 * @returns 
 */
export const updateDataset = async (id: string, dataset: any): Promise<any> => {
  return await patch<any>(`dataset/${id}`, dataset, true); // includeApiKey sets to true
};

/**
 * Get specific dataset
 * @param id - dataset identifier
 * @returns 
 */
export const getDocumentsByDataset = async (id: string): Promise<any> => {
    return await get<any>(`documents/${id}`, true); // includeApiKey sets to true
}


/**
 * Upload a document for a dataset
 * @param id - dataset identifier
 * @param file - file to upload
 * @returns 
 */

export const uploadDocument = async (
  id: string,
  file: File,
  documentDescription?: string,
  documentType?: string
): Promise<any> => {
  const formData = new FormData();

  formData.append("file", file);

  if (documentDescription) { 
    formData.append( "documentDescription", documentDescription ); 
  }

  if (documentType) {
    formData.append("documentType", documentType);
  }

  try {

    const response = await axios.post(
      `${BASE_API_URL}documents/${id}/upload`,
      formData,
      {
        headers: {
          "x-app-id": API_APP_ID,
          "x-api-key": PUBLIC_API_KEY
        }
      }
    );

    return response.data;
  } catch (error) {
    console.log("error : "+error);
    throw error;
  }
};


/**
* Delete a document
* @param documentId - document identifier
* @returns
  */
export const deleteDocument = async (
  documentId: string
  ): Promise<any> => {
  try {
    const response = await axios.delete(
      `${BASE_API_URL}documents/${documentId}/delete`,
      {
        headers: {
          "x-app-id": API_APP_ID,
          "x-api-key": PUBLIC_API_KEY
        }
      }
    );

    return response.data;
  } catch (error) {
    console.log("error : " + error);
    throw error;
  }
};
