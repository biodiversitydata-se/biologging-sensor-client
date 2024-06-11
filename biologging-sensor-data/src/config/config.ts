import { AcceptedXUnits, ActogramC, ActogramConfig, DatasetConfig, LineGraphC, MapC, NoVisC, SensorTypeItem } from "./model";

export const datasetConfig: {[id: string] : DatasetConfig} = {};
export const sensorTypes: {[id: string]: SensorTypeItem} = {};

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

// DEFAULT LINEGRAPHS
const tempGraph = new LineGraphC();


// SENSOR TYPE MAPPING
sensorTypes['Acceleration'] = new SensorTypeItem(['activity'], 'A', new ActogramC(aData));
sensorTypes['Altimeter'] = new SensorTypeItem(['altitude'], 'L', tempGraph );
sensorTypes['Pressure gauge'] = new SensorTypeItem(['pressure'], 'L', tempGraph);
sensorTypes['Thermometer'] = new SensorTypeItem(['temperature'], 'L', tempGraph);
sensorTypes['Light sensor'] = new SensorTypeItem(['light level'], 'L', tempGraph);
sensorTypes['Wet/dry'] = new SensorTypeItem(['contact with water'], 'L', tempGraph);
sensorTypes['Tracking radar'] = new SensorTypeItem(['latitude', 'longitude'], 'M', new MapC());
sensorTypes['Wingbeat'] = new SensorTypeItem([''], 'N', new NoVisC());
sensorTypes['Geographic spherical coordinate system'] = new SensorTypeItem(['latitude', 'longitude'], 'M', new MapC());


// DATASET 
export const greatSnipesGraph: {[id: string]: SensorTypeItem} = {};

const gsa: ActogramConfig[] = [];
gsa.push(new ActogramConfig('#FFF0F5', 'No activity', 0, 0));
gsa.push(new ActogramConfig('#FFB6C1', 'Small', 1, 10));
gsa.push(new ActogramConfig('#FFC0CB', 'More medium', 11, 20));
gsa.push(new ActogramConfig('#FF69B4', 'Md activity', 21, 30));
gsa.push(new ActogramConfig('#FF1493', 'Somehow active', 31, 40));
gsa.push(new ActogramConfig('#FF007F', 'Active', 41, 50));
gsa.push(new ActogramConfig('#FF00FF', 'Very active', 51, 60));
gsa.push(new ActogramConfig('black', 'Active active', 61));

greatSnipesGraph['Acceleration'] = new SensorTypeItem(['activity'], 'A', new ActogramC(gsa))

datasetConfig['geolocator_great_snipes_AL'] = {sensorTypes: ['Acceleration', 'Altimeter'], customGraphs: greatSnipesGraph};
//datasetConfig['dataset_wram_moose_2003'] = {sensorTypes: ['Tracking radar', 'Altimeter']};

