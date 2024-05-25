import React, { useEffect, useState } from 'react';
import { Event } from '@/api/event/event.typscript';
import { Line } from 'react-chartjs-2';
import { filterRecords } from '@/api/record/api';
import { Record } from '@/api/record/record.interface';
import { getInstrument } from '@/api/instrument/api';
import { getDataset } from '@/api/dataset/api';
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
import axios, { AxiosError } from 'axios';
import { sensorTypes, valuesMeasured } from '@/config/config';
import { LineGraphC } from '@/config/model';

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
          text: (valuesMeasured[sensorTypes[sensor].valuesMeasured[0]] as LineGraphC).x,
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
  const [error, setError] = useState<string | null>(null); // State to store error message

  useEffect(() => {
    const colors = ['blue', 'green', 'red', 'orange', 'purple'];
    const valueMeasured = sensorTypes[sensor].valuesMeasured[0];

    const setUnitsOfMeasurement = async () => {
      try {
        const response = await getDataset(events[0].datasetID);
        const unitOfMeasure = response?.unitsReported[response.valuesMeasured.indexOf(valueMeasured)];
        if (unitOfMeasure instanceof AxiosError) {
          setError('Data cannot be loaded. Please contact biologging@biodiversitydata.se');
          return;
        }

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

      } catch (error) {
        setError('Data cannot be loaded. Please contact biologging@biodiversitydata.se');
      }

    };

    const dataFetch = async () => {
      try {
        const labels = new Set<string>();
        const datasets: LineDataset[] = [];

        for (let i = 0; i < 5; i++) {
          const eventIds = [events[i].eventID];
          const datasetIds = [events[i].datasetID];
          const result = await filterRecords({ eventIds: eventIds, datasetIds: datasetIds });
          if (result instanceof AxiosError) {
            setError('Data cannot be loaded. Please contact biologging@biodiversitydata.se');
            return;
          }

          if (result instanceof AxiosError && result.response?.status === 404) {
            setError('Records not found. Please try again later.');
            return;
          }

          const records: Record[] = result.results;

          const values: number[] = [];

          records.map((itm: Record) => {
            const value = itm.recordValues[valueMeasured];
            if (value) {
              labels.add(String(_setLabel(itm)));
              values.push(value);
            }
          });

          const instrumentResponse = await getInstrument(events[i].instrumentID);
          if (instrumentResponse instanceof AxiosError) {
            setError('Data cannot be loaded. Please contact biologging@biodiversitydata.se');
            return;
          }
          const instrumentSerialNumber = instrumentResponse.instrumentSerialNumber;

          datasets.push({ label: instrumentSerialNumber, data: values, backgroundColor: colors[i], borderColor: colors[i] });
        }

        setLineData({ labels: Array.from(labels), datasets: datasets });
      } catch (error) {
        setError('Data cannot be loaded. Please contact biologging@biodiversitydata.se');
      }
    };

    setUnitsOfMeasurement();
    dataFetch();
  }, [events, sensor]);

  function _setLabel(itm: Record): string {
    const date = new Date(itm.recordStart);
    date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
    date.setMinutes(0, 0, 0);
    return String(date);
  }

  return (
    <div>
      <Line options={options} data={lineData} />
      <h5 style={{ color: '#666666' }}>Total number of records is {events.length}</h5>
    </div>
  )

  return (
    <div className="mx-auto" style={{ marginBottom: '20px', marginLeft: '220px' }}>
      {error ? (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#6691A4', color: '#fff', padding: '20px', borderRadius: '5px', zIndex: 999 }}>
          {error}
        </div>
      ) : (
        <>
          {lineData.labels.length > 0 && lineData.datasets.some(dataset => dataset.data.length > 0) ? (
            <>
              <Line options={options} data={lineData} />
              <h5 style={{ color: '#666666' }}>Total number of records is {events.length}</h5>
            </>
          ) : (
            <strong className='mx-auto'>No data available.</strong>
          )}
        </>
      )}
    </div>
  );
}