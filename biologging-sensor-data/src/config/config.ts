import { ActogramC, ActogramConfig, DatasetConfig, LineGraphC, MapC, NoVisC, ConfigItem } from "./model";

export const datasetConfig: {[id: string] : DatasetConfig} = {};
export const sensorTypes: {[id: string]: ConfigItem} = {};
export const databaseValues: {[id: string]: string} = {};

// DEFAULT ACTOGRAM CONFIG
// TODO: add labels
const aData: ActogramConfig[] = [];
aData.push(new ActogramConfig('#F8F8FF', 'No activity, resting', 0, 0));
aData.push(new ActogramConfig('#66FF66', 'Low activity', 1, 10));
aData.push(new ActogramConfig('#33FF33', '', 11, 20));
aData.push(new ActogramConfig('#00CC00', 'Medium activity', 21, 30));
aData.push(new ActogramConfig('#009900', '', 31, 40));
aData.push(new ActogramConfig('#006600', '', 41, 50));
aData.push(new ActogramConfig('#660066', 'High activity', 51, 60));
aData.push(new ActogramConfig('black', 'Continuous activity', 61));



// SENSOR TYPE MAPPING
sensorTypes['Acceleration'] = new ConfigItem(['activity'], 'A', new ActogramC(aData));
sensorTypes['Altimeter'] = new ConfigItem(['altitude'], 'L', new LineGraphC() );
sensorTypes['Pressure gauge'] = new ConfigItem(['pressure'], 'L', new LineGraphC());
sensorTypes['Thermometer'] = new ConfigItem(['air temperature'], 'L', new LineGraphC());
sensorTypes['Light sensor'] = new ConfigItem(['light level'], 'L', new LineGraphC());
sensorTypes['Wet/dry'] = new ConfigItem(['contact with water'], 'L', new LineGraphC());
sensorTypes['Tracking radar'] = new ConfigItem(['latitude', 'longitude'], 'M', new MapC());
sensorTypes['Wingbeat'] = new ConfigItem([''], 'N', new NoVisC());
sensorTypes['Geographic spherical coordinate system'] = new ConfigItem(['latitude', 'longitude'], 'M', new MapC());


// SPECIFIC DATASET
datasetConfig['geolocator_great_snipes_AL'] = {defaultSensors: ['Acceleration', 'Altimeter']};
datasetConfig['dataset_wram_moose_2003'] = {defaultSensors: ['Geographic spherical coordinate system', 'Thermometer']};
datasetConfig['LU_trackingradar_Falsterbo_springs_2010-11'] = {defaultSensors: ['Tracking radar', 'Wingbeat']};
datasetConfig['LU_trackingradar_Falsterbo_autumns_2009-12'] = {defaultSensors: ['Tracking radar', 'Wingbeat']};
datasetConfig['LU_trackingradar_Lundfixed_2006-13'] = {defaultSensors: ['Tracking radar', 'Wingbeat']};


// VOCABULARY DATABASE
databaseValues['datasetNoAccess']="no open access";