export interface Organism {
    organismID: string;
    projectID: string;
    datasetID: string;
    internalOrganismId: string;
    isPublic: boolean;
    customProperties: string[];
    organismTaxon: Taxon[];
}

export interface Sensor {
    sensorID:  string;
    sensorType: string;
    sensorManufacturer: string;
    valuesMeasured:string;
    unitsReported:string;
    sensorPrecision: string;
    range: string;
    settings: string;
    calibrationDate: string;
    calibrationDetails: string;
}
