export interface Dataset {
    _id: string;
    citation: string;
    datasetID: string;
    projectID: string;
    recordID: string;
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
}

export interface Contact {
    firstName: string;	
    lastName: string;
    emailAddress: string;
    userId: string;

    name: string;
    email: string;
    ORCID: string;
}


export interface Taxon {
    guid: string;	
    scientificName: string;
    commonName: string;
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
    endDatetime: string;
}

export interface Reference {
    DOI: string;
    URL: string;	
    Definition:	string;
}