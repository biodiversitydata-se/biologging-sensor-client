// src/components/DatasetComponent.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DatasetComponent = () => {
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to fetch datasets from the server
        const response = await axios.get('http://canmove-dev.ekol.lu.se:8080/sensorAPI/v1/dataset/LU_trackingradar_Lundfixed_2006-13');
        // Set the fetched datasets in the component's state
        setDatasets(response.data);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once after the initial render

  return (
    <div>
      <h2>Datasets</h2>
      <ul>
        {datasets.map((dataset) => (
          <li key={dataset.datasetID}>{dataset.datasetTitle}</li>
        ))}
      </ul>
    </div>
  );
};

export default DatasetComponent;

