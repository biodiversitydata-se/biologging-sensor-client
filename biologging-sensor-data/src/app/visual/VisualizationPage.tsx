import { Dataset, SelectedData } from "@/interfaces/dataset";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Import statements for SensorCheckbox and DatasetCheckbox
import SensorCheckbox from './SensorCheckbox';
import DatasetCheckbox from './DatasetCheckbox';

// Main SensorApp component
const SensorApp: React.FC = () => {
  const [sensors, setSensors] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedSensors, setSelectedSensors] = useState<string[]>([]);
  const [selectedDatasets, setSelectedDatasets] = useState<SelectedData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [top30DataDisplayed, setTop30DataDisplayed] = useState<boolean>(false);
  const [uniqueDatasetIDs, setUniqueDatasetIDs] = useState<Set<string>>(new Set());

  // Fetch data from APIs on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sensor data
        const sensorsResponse = await axios.get(
          'http://canmove-dev.ekol.lu.se:8080/sensorAPI/v1/record/7662-0ac3-678f-cabd6ad3c'
        );
        console.log('Sensors API Response:', sensorsResponse.data);

        // Extract sensor keys and set state
        const recordValuesData = sensorsResponse.data.recordValues;
        const recordValuesKeys = Object.keys(recordValuesData).sort();
        setSensors(recordValuesKeys);

        // Fetch dataset data
        const datasetsResponse = await axios.get<Dataset[]>('http://canmove-dev.ekol.lu.se:8080/sensorAPI/v1/datasets');
        console.log('Datasets API Response:', datasetsResponse.data);

        // Sort datasets by title and set state
        const sortedDatasets = datasetsResponse.data.sort((a: Dataset, b: Dataset) =>
          a.datasetTitle.localeCompare(b.datasetTitle)
        );
        setDatasets(sortedDatasets);

        // Update the set of unique dataset IDs
        const newUniqueDatasetIDs = new Set(sortedDatasets.map((dataset) => dataset.datasetID));
        setUniqueDatasetIDs(newUniqueDatasetIDs);

        // Set loading to false
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
 
  // Handle sensor checkbox change
    const handleSensorChange = (sensorID: string, isChecked: boolean) => {
      const updatedSelectedSensors = isChecked
        ? [...selectedSensors, sensorID] // Add the sensorID to the array
        : selectedSensors.filter((selectedSensor) => selectedSensor !== sensorID); // Remove the sensorID from the array

      setSelectedSensors(updatedSelectedSensors);
      setTop30DataDisplayed(false);
    };


  // Handle dataset checkbox change
  const handleDatasetChange = async (selected: string[], isChecked: boolean) => {
    const datasetID = selected[0];
    try {
      console.log('Selected Dataset:', datasetID);

      // Find the selected dataset
      const selectedDataset = datasets.find((d) => d.datasetID === datasetID);

      if (selectedDataset) {
        console.log('Selected Dataset Details:', selectedDataset);

        if (isChecked) {
          // If checkbox is checked, fetch sensor data and update state
          const sensorResponse = await axios.get<Dataset>(
            `http://canmove-dev.ekol.lu.se:8080/sensorAPI/v1/record/${selectedDataset.recordID}`
          );

          console.log('Sensor API Response:', sensorResponse.data);

          setSelectedDatasets([{ dataset: selectedDataset, sensor: sensorResponse.data }]);
          setTop30DataDisplayed(true);
        } else {
          // If checkbox is unchecked, clear the selected datasets
          setSelectedDatasets([]);
          setTop30DataDisplayed(false);
        }
      } else {
        console.error(`Dataset with ID ${datasetID} not found`);
        setTop30DataDisplayed(false);
      }
    } catch (error) {
      console.error(`Error fetching sensor details for ${datasetID}:`, error);
      setTop30DataDisplayed(false);
    }
  };

   // Render the UI with only unique datasets
   return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 0.1, marginRight: '20px', height: '100%', overflowY: 'auto' }}>
        {/* Set flex to 0.1 for 10% width */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div>
              <h5>Select Datasets:</h5>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column', // Set flexDirection to 'column' for vertical arrangement
                  border: '1px solid #ccc',
                  padding: '10px',
                  borderRadius: '5px',
                  marginBottom: '10px',
                  height: '300px',
                  overflowY: 'auto',
                }}
              >
                {/* Wrap DatasetCheckbox components inside a container */}
                {datasets
                  .filter((dataset) => uniqueDatasetIDs.has(dataset.datasetID))
                  .map((dataset) => (
                    <DatasetCheckbox
                      key={dataset.datasetID}
                      dataset={dataset}
                      isChecked={selectedDatasets.some((data) => data.dataset.datasetID === dataset.datasetID)}
                      onChange={handleDatasetChange}
                    />
                  ))}
              </div>
            </div>
  
            <div>
              <h5>Select Sensors:</h5>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column', // Set flexDirection to 'column' for vertical arrangement
                  border: '1px solid #ccc',
                  padding: '10px',
                  borderRadius: '5px',
                  marginBottom: '10px',
                  height: '200px',
                  overflowY: 'auto',
                }}
              >
                {sensors.map((sensorID) => (
                  <SensorCheckbox
                    key={sensorID}
                    sensorID={sensorID}
                    isChecked={selectedSensors.includes(sensorID)}
                    onChange={handleSensorChange}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
  
      <div style={{ flex: 0.9, height: '100%', overflowY: 'auto' }}>
        {/* Set flex to 0.9 for 90% width */}
        <div>
          <h2>Selected Sensors and Datasets</h2>
          <ul>
            {selectedDatasets.map((data, index) => (
              <li key={index}>
                <p>Dataset Title: {data.dataset.datasetTitle}</p>
                <p>Sensor Data:</p>
                <pre>
                  {data.sensor ? (
                    JSON.stringify(data.sensor, null, 2)
                  ) : (
                    `No sensor data available for dataset ${data.dataset.datasetTitle}`
                  )}
                </pre>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

};

export default SensorApp;
