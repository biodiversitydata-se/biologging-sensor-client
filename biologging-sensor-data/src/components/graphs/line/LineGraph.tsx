import React, { useEffect, useState } from 'react';
import { Event } from '@/api/event/event.typscript';
import { Line } from 'react-chartjs-2';
import { filterRecords } from '@/api/record/api';
import { Record } from '@/api/record/record.interface';
import { getInstrument } from '@/api/instrument/api';

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
import { getDataset } from '@/api/dataset/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
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
  const [lineData, setLineData] = useState<LineData>({ labels: [], datasets: [] });
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
          callback: function (value: any) {
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
    const colors = ['blue', 'green', 'red', 'orange', 'purple'];

    const setUnitsOfMeasurement = async () => {
      const response = await getDataset(events[0].datasetID);
      const unitOfMeasure = response?.unitsReported[response.valuesMeasured.indexOf(sensor)];

      setOptions(prevOptions => ({
        ...prevOptions,
        scales: {
          ...prevOptions.scales,
          y: {
            ...prevOptions.scales.y,
            title: {
              display: true,
              text: `${sensor?.charAt(0).toUpperCase()}${sensor?.slice(1)} (${unitOfMeasure?.charAt(0)}${unitOfMeasure?.slice(1)})`,
            },
          },
        },
      }));
    };

    const dataFetch = async () => {
      const labels = new Set<string>();
      const datasets: LineDataset[] = [];

      for (let i = 0; i < 5; i++) {
        const eventIds = [events[i].eventID];
        const datasetIds = [events[i].datasetID];
        const result = await filterRecords({ eventIds: eventIds, datasetIds: datasetIds });
        const records: Record[] = result.results;

        const values: number[] = [];

        records.map((itm: Record) => {
          const value = itm.recordValues[sensor];
          if (value) {
            labels.add(String(_setLabel(itm)));
            values.push(value);
          }
        });

        const instrumentResponse = await getInstrument(events[i].instrumentID);
        const instrumentSerialNumber = instrumentResponse.instrumentSerialNumber;

        datasets.push({ label: instrumentSerialNumber, data: values, backgroundColor: colors[i], borderColor: colors[i] });
      }

      setLineData({ labels: Array.from(labels), datasets: datasets });
    };

    setUnitsOfMeasurement();
    dataFetch();
  }, [events, sensor]);

  function _setLabel(itm: Record): string {
    const date = new Date(itm.recordStart);
    date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
    date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds
    return String(date);
  }


  return (
    <div className="mx-auto" style={{ marginBottom: '20px', marginLeft: '220px' }}>
      {lineData.labels.length > 0 && lineData.datasets.some(dataset => dataset.data.length > 0) ? (
        <>
          <Line options={options} data={lineData} />
          <h5 style={{ color: '#666666' }}>Total number of records is {events.length}</h5>
        </>
      ) : (
        <strong className='mx-auto'>No data available.</strong>
      )}
    </div>
  );
}