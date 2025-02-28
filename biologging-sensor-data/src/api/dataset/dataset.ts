export interface Dataset {
    _id: string;
    datasetID: string;
    projectID: string;
    datasetTitle: string;
    datasetDescription: string;
    animalCount: number;
    creator: Contact[];
    contact: Contact[];
    curator: Contact[];
    owner: Contact[];
    funders: Funder[];
    license: string;
    institutionCode: string;
    resourceCitation: string;
    onlineUrl: string;
    bibliographicCitation: Reference[];
    sensorType: string[];
    valuesMeasured: string[];
    unitsReported: string[];
    instrumentTypes: string[];
    taxonomicCoverage: Taxon[];
    embargoEndDate: string;
    accessRights: string;
    intellectualRights: string;
    dataAvailability: string;
    updateFrequency: string;
    geographicalCoverage: GeographicWENS;
    temporalCoverage: RangeDateTime;
    samplingDescription: string;
    qualityControl: string;
    relatedIdentifiers: RelatedIdentifier[];
    versions: Version[];
    sensitiveData: boolean;
    isFinalized: boolean;
    picture: Picture;
    dateCreated: string;
    dateUpdated: string;
    numberOfRecords: number;
    recordsStatistics: RecordsStatistics;
}

export interface Contact {
    firstName: string;	
    lastName: string;
    email: string;
    webpage: string;
    ORCID: string;
}

export interface RangeDateTime {
    startDatetime: string;
    endDatetime: string;
}
    
export interface Taxon {
    taxonListSourceUrl: string,
    taxonListSourceName: string,
    taxonGuid: string,
    taxonScientificName: string,
    taxonCommonName: string,
    dyntaxaId: number,
}

export interface GeographicWENS {
    westBoundCoordinate: string;
    eastBoundCoordinate: string;
    northBoundCoordinate: string;
    southBoundCoordinate: string;
    geographicalDescription: string;
}

export interface RecordsStatistics {
    numberOfPublicRecordsDatabase: number;
    customStatistics: CustomStatistic[];
}

export interface CustomStatistic {
    nameStat: string;
    valueStat: number;
    dateStat: string;
}

export interface Reference {
    DOI: string;
    title: string;  
}

export interface Reference {
    DOI: string;
    title: string;	
}

export interface RelatedIdentifier {
    providerCode: string;
    relationType: string;
    identifier: string;
    resourceUrl: string;
}

export interface Version {
    date: string;
    log: string;
    number: string;
    file: string;
}

export interface Funder {
    funderName: string;
    funderUrl: string;
}


export interface Picture {
    pictureUrl: string;
    pictureOwner: string;
}