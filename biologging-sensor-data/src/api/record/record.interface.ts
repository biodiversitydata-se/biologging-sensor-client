export interface Record{
    recordID: string;		
    instrumentID: string;
    eventID: string;	
    datasetID: string;		
    recordStart: string;	
    recordEnd: string;
    recordValues: any;
    dateCreated: string;
    dateUpdated: string;
}

export interface KeyValue {
    key: string;
    value: string;
}
