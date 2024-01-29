// TODO: see if dataset and dataset detail are the same
export interface Dataset {
    _id: string;
    datasetID: string;
    projectID: string;
    recordID: string;
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
    taxonomicCoverage: Taxon[];
    embargoEndDate: string;
    isPublic: boolean;
    updateFrequency: string;
    geographicalCoverage: any;
    temporalCoverage: any;
    samplingDescription: string;
    qualityControl: string;
    relatedIdentifier: string;
    relationType: string;
    version: string;
    sensitiveData: boolean;
    dateCreated: string;
    dateUpdated: string;
    instrumentTypes: string[];
}

export interface DatasetDetail {
    datasetTitle: string;
    datasetDescription: string;
    institutionCode: string;
    geographicalDescription: string;
    taxonomicCoverage: Taxon[];
    sensorTypes: string;
    curator: Person[];
    creator: Person[];
    contact: Person[];
    geographicalCoverage: { [key: string]: string };
    license: string;
    Version: string;
    bibliographicCitation: { [key: string]: string };
    updateFrequency: string;
    animalCount: number;
  
    temporalCoverage?: {
      startDate: string;
      endDate: string;
    };
  }

export interface Person {
    firstName: string;
    lastName: string;
    email: string;
    ORCID: string;
}

export interface Taxon {
    guid: string;
    scientificName: string;
    commonName: string;
}


// Define types for selected data VISUALIZATION
export interface SelectedData {
  dataset: Dataset;
  sensor: Dataset | null; // Allow sensor to be null when no sensor data is available
}

