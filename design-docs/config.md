_This file be improved by Zuzanna_

# Updating the About Page Content

_Task given by Mathieu: All the configuration files (path/content) containing data that can easily be changed before an application restart (URL of the API, colors of the graphs, dedicated behaviour for datasets, etc)_


## Keywords of folders and files
keywords is added here

## Directory
file path is added here
```
biologging-sensor-client\biologging-sensor-data\

```



<details>
  <summary><strong>See Further Details</strong></summary>

The directory for configuration contains 3 files:
## model.ts
This is a skeleton for the config file. Numerous classes and other types are in this file to create to create the structure of config file, located in `config.ts`. 

Type `GraphType` - marks the type of the graph. It is used to determine which graph visualisation should be done. 

Class `ConfigItem` - serves to set up the configuration of the component, which is a graph. It should have contain `valuesMeasured`, `graphType` and specific graph implementation in `graph` to be used is the config file. Too add a new graph, view "add_diagram.md". 

Other classes and types in the file extends on this `ConfigItem` class. Config class for speicific visualisation is marked as `SpecificGraphC` which should have members of the class related to its configuration. 

Class `DatasetConfig` - sets a skeleton for implementing specific graphs related to the given dataset. It is used mainly if one dataset should have different visualisation or configuration for a given graph. Additionally, member `defaultSensors` indicates which sensors should be displayed by default when the visualisation page for the dataset is loaded. 


## config.ts
The file contains the main configuration for datasets. There are two main and important structures:

**sensorTypes** - contains general confiration for given sensor. The configuration from this structure is used if the sensor type is not configured for a given dataset in **datasetConfig**.

To add a new item to the structure:
```
sensorTypes['sensorType'] = new ConfigItem(['valuemeasured'], 'graphType', new GraphConfigC(parameters));
```


**datasetConfig** - contains specific configuration of visualisation for a given dataset.  

To add a new item to the structure: 
```
const datasetSpecificGraphConfig: {[id: string]: ConfigItem} = {};
datasetSpecificGraphConfig['sensorType'] = new ConfigItem(['valuemeasured'], 'graphType', new GraphConfigC(parameters));
datasetConfig['datasetId'] = {sensorTypes: ['DefSensor1', 'DefSensor2'], customGraphs: datasetSpecificGraphConfig};
```

### Example 1: Different visualisation for given dataset.
In this case, there is a graph configured for a sensor "Thermometer". But for a given dataset with id of "animal_1_id", it should not dsplay the visualisation and the data should be downloaded.

Item in **sensorTypes** is stored as
```
sensorTypes['Thermometer'] = new ConfigItem(['temperature'], 'L', new LineGraphC());
```

Then, in **datasetConfig**, the object should be stored as:
```
const animal1Config: {[id: string]: ConfigItem} = {};
animal1Config['Thermometer'] = new ConfigItem(['temperature'], 'N', new NoVisC());
datasetConfig['animal_1_id'] = {customGraphs: animal1Config};
```

Note: While the value measured is an array, line graph and actogram graph always take the first value in the array for process. 


### Example 2: Modify/adding line graph
Modicication for line graphs includes changing the X axis time unit. Available time units can be seen in `AcceptedXUnits` enum in `model.ts`.

```
sensorTypes['Thermometer'] = new ConfigItem(['temperature'], 'L', new LineGraphC());
```

This will create new line graph configuration. The units for x axis are not given here, so it will take the default value `X_AXIS_DEFAULT` defined in `constants.ts`.

To modify to show records hourly, add the argument to the LineGraphC:
```
sensorTypes['Thermometer'] = new ConfigItem(['temperature'], 'L', new LineGraphC(AcceptedXUnits.Hours));
```

### Example 3: Modify actogram colors
Actogram configuration can be seen in `AcrogramConfig` class in `model.ts`. It takes the color string, label of the item
```
const aData: ActogramConfig[] = [];
aData.push(new ActogramConfig('Color 0', 'Label 0', numberFrom, numberFrom)); // if the boundary is one specific number
aData.push(new ActogramConfig('Color 1', 'Label 1', numberFrom, numberTo)); // if the boundary is between numberFrom and numberTo (both including the number)
...
aData.push(new ActogramConfig('Color N', 'Label N', upperBoundary)); // if it is the last value

sensorTypes['Acceleration'] = new ConfigItem(['activity'], 'A', new ActogramC(aData));
```

Or if it should be made for specific dataset, for example adding it to the "animal_1_id" config defined before:
```
const animal1Config: {[id: string]: ConfigItem} = {};
animal1Config['Thermometer'] = new ConfigItem(['temperature'], 'N', new NoVisC());
animal1Config['Acceleration'] = new ConfigItem(['activity'], 'A', new ActogramC(aData));
datasetConfig['animal_1_id'] = {customGraphs: greatSnipesGraph};
```

### Example 4: Addig new map
A general visualisation in ***sensorTypes**:
```
sensorTypes['Tracking radar'] = new ConfigItem(['latitude', 'longitude'], 'M', new MapC());
```

A specific visualisation to extend "animal_1_id" dataset defined above:
```
const animal1Config: {[id: string]: ConfigItem} = {};
animal1Config['Thermometer'] = new ConfigItem(['temperature'], 'N', new NoVisC());
animal1Config['Acceleration'] = new ConfigItem(['activity'], 'A', new ActogramC(aData));
animal1Config['Tracking radar'] = new ConfigItem(['latitude', 'longitude'], 'M', new MapC());
datasetConfig['animal_1_id'] = {customGraphs: greatSnipesGraph};
```


## constants.ts
This file groups all values that can be changed throughout the whole project. Modification of constants here will affect all components in the project which use the constant. The file contains data for 
- url paths for API
- messages displayed in components

</details>