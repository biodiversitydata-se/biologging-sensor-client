import { ActogramC, ActogramConfig, DatasetConfig, LineGraphC, MapC, SensorType } from "./model";

export const datasetConfig: {[id: string] : DatasetConfig} = {};
export const sensorTypes: {[id: string] : ActogramConfig|LineGraphC|MapC} = {};

// DEFAULT ACTOGRAM CONFIG
const aData: ActogramConfig[] = [];
aData.push(new ActogramConfig('#FFFFFF', '', 0, 0));
aData.push(new ActogramConfig('#66FF66', '', 1, 10));
aData.push(new ActogramConfig('#33FF33', '', 11, 20));
aData.push(new ActogramConfig('#00CC00', '', 21, 30));
aData.push(new ActogramConfig('#009900', '', 31, 40));
aData.push(new ActogramConfig('#006600', '', 41, 50));
aData.push(new ActogramConfig('#660066', '', 51, 60));
aData.push(new ActogramConfig('black', '', 61));


const actogram = new ActogramC('A', ['activity'], aData);

// DEFAULT GRAPHS
sensorTypes['activity'] = actogram;


// DATASET 
datasetConfig['geolocator_great_snipes_AL'] = {sensorTypes: ['Acceleration', 'Altimeter']};
datasetConfig['dataset_wram_moose_2003'] = {sensorTypes: ['Tracking radar', 'Altimeter']};

