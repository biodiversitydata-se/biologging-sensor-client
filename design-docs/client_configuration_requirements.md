# Configuration objects required at the client side

[Updated the 7th of February 2024 - 08:30]

## Default visualization and settings for sensorTypes and datasets

The client should store the default vizualisation tool for each sensorType (field stored in the [dataset](https://github.com/biodiversitydata-se/biologging-sensor-datamodel/blob/main/pages/dataset.md) object ). 
It may be possible to have a specific set of parameters for a specific dataset.
And a default vizualisation tool is needed when the sensorType is new or not defined.

So from my pov there should be three different types of rows in this config table: for a specific dataset, for a specific sensor type, a default for all the other cases. And they should apply in this order :
1- Settings for the specific dataset. 
2- If no specific settings for this dataset, settings for the sensorType.
3- If no specific settings for this sensorType, default settings

Req = requirement: R = required, r = recommended, o = optional.


| Field name | Format | Req | Definition | Example | Reference |
| ---------- | ------ | --- | ---------- | ------- | --------- |
| datasetID | string | o | Unique identifier of a dataset. Can be null. | geolocator_great_snipes_AL |
| sensorType | string | o | Unique identifier for a sensorType. Can be null | Activity |
| vizualisationTool | string | R | Unique identifier for a vizualitaion tool | Actogram |
| defaultSettings | array of strings | r | Array of settings needed to configure the vizualisation tool | ["X-scale" => "0-1000", "X-unit" => "sensorTypeUnit", "Y-scale" => "0-1000"] |

I guess all the default configuration can be stored here. Including the colors for the actograms for instance. 
One question : if the sensorType settings are more complete than the dataset settings, should they be taken in consideration as well ? Example : we have a row for one specific dataset/sensorType (for instance geolocator_great_snipes_AL/Temperature) that describes only the X axis. Should the script check as well the default settings for this sensorType to get the default settings for the Y-axis ?