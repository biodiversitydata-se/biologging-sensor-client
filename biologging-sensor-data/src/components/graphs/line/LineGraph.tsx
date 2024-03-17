import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Event } from '@/api/event/event.typscript';
import { Line } from 'react-chartjs-2';
import { filterRecords } from '@/api/record/api';
import { Record } from '@/api/record/record.interface';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
}

interface LineData {
  labels: string[],
  datasets: LineDataset[];
}

interface InstrumentData {
  sensors: {
    valuesMeasured: string[];
    unitsReported: string[];
  };
}

export default function LineGraph({ events, sensor }: { events: Event[], sensor: string }) {
  const [lineData, setLineData] = useState<LineData>({ labels: [], datasets: []});
  const [colors, setColors] = useState<string[]>([]);
  const [unit, setUnit] = useState<string | null>(null);
  const instrumentID = '1c30-47f5-9f1d-a3e7dc1a1'; // Now the Y-Axis satisfies our requirement. However, we should replace this instrument ID with dynamic instrumentID.

  useEffect(() => {
    const fetchInstrumentData = async () => {
      try {
        const response = await axios.get<InstrumentData>(`http://canmove-dev.ekol.lu.se:8080/biologgingAPI/v1/instrument/${instrumentID}`); // Maybe seperate API componenet is created for this instrument API. 
        const { sensors } = response.data;
        const sensorIndex = sensors.valuesMeasured.findIndex(value => value === sensor);
        if (sensorIndex !== -1) {
          setUnit(sensors.unitsReported[sensorIndex]);
        } else {
          setUnit(null);
        }
      } catch (error) {
        console.error('Error fetching instrument data:', error);
      }
    };

    fetchInstrumentData();
  }, [sensor]);

  useEffect(() => {
    if (colors.length !== events.length) {
      setColors(events.map(() => getRandomColor()));
    }
  }, [events]);

  useEffect(() => {
    const dataFetch = async () => {
      const labels = new Set<string>();
      const datasets: LineDataset[] = [];

      for (let i = 0; i < 5; i++) {
        const eventIds = [events[i].eventID];
        const datasetIds = [events[i].datasetID];
        const result = await filterRecords({ eventIds: eventIds, datasetIds: datasetIds });
        const records: Record[] = result.results;

        const values: number[] = [];

        records.map(itm => {
          labels.add(_setLabel(itm));
          const value = itm.recordValues[sensor];
          if (value) {
            values.push(value);
          }
        });
        
        datasets.push({ label: events[i].eventID, data: values, backgroundColor: colors[i], borderColor: colors[i]});
      }

      setLineData({ labels: Array.from(labels), datasets: datasets})
    }

    dataFetch();

  }, [events, sensor, lineData, colors]);

  function _setLabel(itm: Record): string {
    const date = new Date(itm.recordStart);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: sensor.toUpperCase(),
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
        ticks: {
          callback: function(value, index, values) {
            return value;
          }
        }
      },
      y: {
        title: {
          display: true,
          text: unit !== null ? unit : 'Unit is Not Available',
        },
      },
    },
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Line options={options} data={lineData} />
    </div>
  );
}
