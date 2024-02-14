import { Dataset, SelectedData } from "@/interfaces/dataset";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto'; // Import Chart.js library

// Import statements for SensorCheckbox and DatasetCheckbox
import SensorCheckbox from '@/app/visual/SensorCheckbox';
import DatasetCheckbox from '@/app/visual/DatasetCheckbox';

// Main SensorApp component
const SensorApp: React.FC = () => {
  const [selectedDatasets, setSelectedDatasets] = useState<SelectedData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  

  // Render the UI with only unique datasets
  useEffect(() => {
    // Create dummy data for the line chart
    const dummyData = Array.from({ length: 12 }, (_, i) => ({
      x: i,
      y: Math.random() * 100 // Generate random y values
    }));

    // Render the line chart using Chart.js
    const ctx = document.getElementById('line-chart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: 12 }, (_, i) => `Time ${i}`), // Generate labels for x-axis
          datasets: [{
            label: 'Altitude',
            data: dummyData,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Values'
              }
            }
          }
        }
      });
    }
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>

  
      <div style={{ flex: 0.9, height: '100%', overflowY: 'auto' }}>
        {/* Set flex to 0.9 for 90% width */}
        <div>
          <h2>Altitude of the Selected Dataset</h2>
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

        {/* Canvas for Chart.js line graph */}
        <canvas id="line-chart" width="800" height="400"></canvas>
      </div>
    </div>
  );
};

export default SensorApp;
