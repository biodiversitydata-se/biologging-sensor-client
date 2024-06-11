import React, { useEffect, useState } from 'react';
import 'chartjs-adapter-date-fns';
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
  TimeScale,
} from 'chart.js';
import { AxiosError } from 'axios';
import { sensorTypes } from '@/config/config';
import { LineGraphC } from '@/config/model';
import ErrorComponent from '@/components/Error';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
);

interface LineDataset {
  label: string;
  data: any[];
  backgroundColor: string;
  borderColor: string;
}

interface LineData {
  //labels: string[],
  datasets: LineDataset[];
}

export default function LineGraph({ events, sensor, config }: { events: Event[], sensor: string, config: LineGraphC }) {
  const [showError, setShowError] = useState<boolean>(false);
  const [lineData, setLineData] = useState<LineData>({ datasets: [] });
  const [options, setOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
        type: 'time',
        time: {
          unit: config.x ?? 'day',
          displayFormats: {
            hour: 'H:mm'
          }
        },
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
    const valueMeasured = sensorTypes[sensor]?.valuesMeasured[0];

    const setUnitsOfMeasurement = async () => {
      const response = await getDataset(events[0].datasetID);
      const unitOfMeasure = valueMeasured ? response?.unitsReported[response.valuesMeasured.indexOf(valueMeasured)] : '';

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
        if (result instanceof AxiosError) {
          setShowError(true);
          return;
        }

        const records: Record[] = result.results;

        //const values: number[] = [];
        const values: { x: string, y: number }[] = [];

        records.map((itm: Record) => {
          const value = itm.recordValues[valueMeasured];
          if (value) {
            labels.add(String(_setLabel(itm)));
            //values.push(value);
            values.push({ x: itm.recordStart, y: itm.recordValues[valueMeasured] });
          }
        });

        const instrumentResponse = await getInstrument(events[i].instrumentID);
        if (instrumentResponse instanceof AxiosError) {
          setShowError(true);
          return;
        }
        const instrumentSerialNumber = instrumentResponse.instrumentSerialNumber;

        datasets.push({ label: instrumentSerialNumber, data: values, backgroundColor: colors[i], borderColor: colors[i] });
      }

      setLineData({ datasets: datasets });
      setShowError(false);
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
      {showError ? <ErrorComponent /> :
        <div>
          <Line options={options} data={lineData} />
          <h5 style={{ color: '#666666' }}>Total number of records is {events.length}</h5>
        </div>
      }
    </div>
  )
}