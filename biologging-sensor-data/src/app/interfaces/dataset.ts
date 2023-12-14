export interface Dataset {
    _id: string;
    datasetID: string;
    projectID: string;
    datasetTitle: string;
    datasetDescription: string;
    animalCount: number;
    creator: Person[];
    contact: Person[];
    curator: Person[];
    owner: Person[];
    license: string;
    institutionCode: string;
    citation: string;
    onlineUrl: string;
    bibliographicCitation: any[];
    sensorTypes: string[];
    taxonomicCoverage: Taxonomy[];
    embargoEndDate: string;
    isPublic: boolean;
    updateFrequency: string;
    geographicalCoverage: any;
    temporalCoverage: string[];
    samplingDescription: string;
    qualityControl: string;
    relatedIdentifier: string;
    relationType: string;
    version: string;
    sensitiveData: boolean;
    dateCreated: string;
    dateUpdated: string;
}

export interface Person {
    firstName: string;
    lastName: string;
    email: string;
    ORCID: string;
}

export interface Taxonomy {
    guid: string;
    scientificName: string;
    commonName: string;
}