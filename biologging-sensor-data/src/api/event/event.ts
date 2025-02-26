import { Taxon } from "../dataset/dataset";

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
    valuesMeasured: string[];
    eventTaxon: Taxon[];
    organismPublic: boolean;
    dateCreated: string;
    dateUpdated: string;
    numberOfRecordsDatabase: number;

}