import React, { useEffect, useState } from 'react';
import { Event } from '@/api/event/event.typscript';
import { Line } from 'react-chartjs-2';
import { filterRecords } from '@/api/record/api';
import { Record } from '@/api/record/record.interface';
import { getInstruments } from '@/api/instrument/api'; 

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
import { get } from '@/api/apiService';

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

export default function LineGraph({ events, sensor }: { events: Event[], sensor: string }) {
  const [lineData, setLineData] = useState<LineData>({ labels: [], datasets: []});
  const [colors, setColors] = useState<string[]>([]);
  const [options, setOptions] = useState({
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
          text: sensor,
        },
      },
    },
  });

  useEffect(() => {
    if (colors.length !== events.length) {
      setColors(events.map(() => getRandomColor()));
    }
  }, [events]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get<any>(`dataset/${events[0].datasetID}`);
        const unitOfMeasure = response.unitsReported[events[0].valuesMeasured.indexOf(sensor)];
        setOptions(prevOptions => ({
          ...prevOptions,
          scales: {
            ...prevOptions.scales,
            y: {
              ...prevOptions.scales.y,
              title: {
                display: true,
                text: `${sensor.charAt(0).toUpperCase()}${sensor.slice(1)} (${unitOfMeasure.charAt(0)}${unitOfMeasure.slice(1)})`,
              },
            },
          },
        }));
      } catch (error) {
      }
    };

    fetchData();
  }, [sensor, events]);
  
  
  // useEffect(() => {
  //   setOptions(prevOptions => ({
  //     ...prevOptions,
  //     title: {
  //       ...prevOptions.title,
  //       text: sensor.toUpperCase(),
  //     },
  //   }));
  // }, [sensor]);

  useEffect(() => {
    setOptions(prevOptions => ({
      ...prevOptions,
      plugins: {
        ...prevOptions.plugins,
        title: {
          ...prevOptions.plugins.title,
          text: sensor.toUpperCase(),
        },
      },
    }));
  }, [sensor]);

  
  useEffect(() => {
    setOptions(prevOptions => ({
      ...prevOptions,
      scales: {
        ...prevOptions.scales,
        x: {
          ...prevOptions.scales.x,
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
      },
    }));

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

  return (
    <div className="mx-auto" style={{ marginBottom: '20px', marginLeft: '220px' }}>
       {lineData.labels.length > 0 && lineData.datasets.some(dataset => dataset.data.length > 0) ? (
          <>
            <Line options={options} data={lineData} />
            <h5 style={{color: '#666666'}}>Total number of records is {events.length}</h5>
          </>
        ) : (
            <strong className='mx-auto'>No data available.</strong>
        )}
    </div>
  );
}