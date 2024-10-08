export interface Instrument {
    instrumentID: string;
    projectID: string;
    instrumentType:	string; //should be enum??
    instrumentModel: string;
    instrumentManufacturer:	string;
    instrumentSerialNumber:	string;
    instrumentCharacteristics:	string[];
    sensors: Sensor[];
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


