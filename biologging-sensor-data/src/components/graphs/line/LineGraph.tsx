import { Dataset, SelectedData } from "@/interfaces/dataset";
import { Record } from "@/api/record/record.interface";
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {Chart, registerables} from 'chart.js/auto'; // Import Chart.js library

// Main SensorApp component
export default function LineGraph({dataAPI}: {dataAPI: any[]}) {
  const chartRef = useRef<Chart | null>(null);

  const [selectedDatasets, setSelectedDatasets] = useState<SelectedData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
//   // Time data for x-axis
//   const timeData = [
//     "2006-03-21 17:51:01",
//     "2006-03-21 17:53:15",
//     "2006-03-21 18:04:12",
//     "2006-03-21 18:16:57",
//     "2006-03-21 20:30:25",
//     "2006-03-21 18:43:25",
//     "2006-03-21 18:21:15",
//     "2006-03-21 22:01:17",
//     "2006-03-22 0:01:00",
//     "2006-03-22 4:00:56",
//     "2006-03-22 2:00:45",
//     "2006-03-22 6:01:15",
//     "2006-03-22 10:01:01",
//     "2006-03-22 12:01:21",
//     "2006-03-22 18:01:09"
//   ];

  // Time data for x-axis in minutes
  const timeData = [
    0, // 12:00 AM
    120, // 2:00 AM
    240, // 4:00 AM
    360, // 6:00 AM
    600, // 10:00 AM
    720, // 12:00 PM
    1080, // 6:00 PM
    1200 // 8:00 PM
  ];

  // Render the UI with only unique datasets
  useEffect(() => {
    // Render the line chart using Chart.js
    const ctx = document.getElementById('line-chart') as HTMLCanvasElement;
    if (ctx) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: timeData, // Using timeData for x-axis labels
          datasets: [{
            label: 'Altitude',
            data: Array.from({ length: timeData.length }, (_, i) => Math.random() * 100), // Generate random y values
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

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
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
