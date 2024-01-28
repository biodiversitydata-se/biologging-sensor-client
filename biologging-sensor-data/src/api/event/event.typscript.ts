import { Taxon } from "../dataset/dataset.interface";

export interface Event{
    eventID: string;	
    datasetID: string;
    organismID: string;
    instrumentID: string; 
    instrumentSettings: string[];
    eventType: string;
    eventStart: string;
    eventEnd: string;
    qualityRemarks: string;
    eventRemarks: string;
    sensorTypes: string[];
    eventTaxon: Taxon[];
    dateCreated: string;
    dateUpdated: string;
}