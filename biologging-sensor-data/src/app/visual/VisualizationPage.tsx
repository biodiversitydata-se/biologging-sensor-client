'use client'

import {  Dataset as Dataset1  } from "@/api/dataset/dataset.interface";
import DatasetsList from "@/app/visualisation/DatasetsList";
// import { useState } from "react";
import { Event } from "@/api/event/event.typscript";
import { filterEvents } from "@/api/event/api";
import SensorsList from "@/app/visualisation/SensorsList";
import { SensorSelectionProvider } from "@/hooks/sensorSelectContext/sensorSelectContext";
import Visualisation from "@/app/visualisation/Visualisation";
import '@/app/visualisation/visualisation.css';

import { Dataset, SelectedData } from "@/interfaces/dataset";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto'; // Import Chart.js library

// Main SensorApp component
const SensorApp: React.FC = () => {
  const [sensors, setSensors] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uniqueDatasetIDs, setUniqueDatasetIDs] = useState<Set<string>>(new Set());

  const [events, setEvent] = useState<Event[]>([]);


  async function _updateEvents(d: Dataset1) {
    const id = [d.datasetID];
    const result = await filterEvents({ datasetIds: id });

    setEvent(result.results.slice(0, 30));
  }


  // Fetch data from APIs on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sensor data
        const sensorsResponse = await axios.get(
          // 'http://canmove-dev.ekol.lu.se:8080/sensorAPI/v1/record/7662-0ac3-678f-cabd6ad3c'
          'http://canmove-dev.ekol.lu.se:8080/sensorAPI/v1/record'
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
      <div style={{ flex: 100, marginRight: '10px', height: '100%', overflowY: 'auto' }}>
        {/* Set flex to 0.1 for 10% width */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
                  <div className="container-fluid">
                <SensorSelectionProvider>
                  <div className="row">
                    <div className="col-md-5">
                      <div className="vis-list">
                        <DatasetsList onSelect={(itm: Dataset1) => _updateEvents(itm)} />
                      </div>

                      <div className="vis-list">
                        <SensorsList events={events} />
                      </div>
                    </div>
                    <div className="col-md-7">
                      <Visualisation events={events} />
                    </div>
                  </div>
                </SensorSelectionProvider>
                </div>
          </>
        )}
      </div>
  
          </div>
          
      );
};

export default SensorApp;
