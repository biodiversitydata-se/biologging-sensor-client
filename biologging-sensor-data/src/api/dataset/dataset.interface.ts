export interface Dataset {
    datasetID: string;
    projectID: string;
    datasetTitle: string;
    datasetDescription: string;
    animalCount: number;
    creator: Contact[];
    contact: Contact[];
    curator: Contact[];
    owner: Contact[];
    license: string;
    institutionCode: string;
    resourceCitation: string;
    onlineUrl: string;
    bibliographicCitation: Reference;
    sensorTypes: string[];
    instrumentTypes: string[];
    taxonomicCoverage: Taxon[];
    embargoEndDate: string;
    isPublic: boolean;
    updateFrequency: string;
    geographicalCoverage: GeographicWENS;
    temporalCoverage: RangeDateTime;
    samplingDescription: string;
    qualityControl: string;
    relatedIdentifier: string;
    relationType: string;
    version: string;
    sensitiveData: boolean;
    dateCreated: string;
    dateUpdated: string;
    numberOfRecords: number;
    valuesMeasured: string[];
    isFinalized: boolean;
}

export interface Contact {
    firstName: string;	
    lastName: string;
    email: string;
    userid: string;
    webpage: string;
}

export interface Taxon {
    taxonGuid: string;	
    taxonScientificName: string;
    taxonCommonName: string;
}

export interface GeographicWENS {
    westBoundCoordinate: string;
    eastBoundCoordinate: string;
    northBoundCoordinate: string;
    southBoundCoordinate: string;
    geographicalDescription: string;
}

export interface RangeDateTime {
    startDatetime: string;
    endDateTime: string;
    }

export interface Reference {
    DOI: string;
    title: string;	
}