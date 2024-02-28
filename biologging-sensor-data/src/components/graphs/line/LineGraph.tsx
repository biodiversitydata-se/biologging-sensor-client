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
}

interface LineData {
  labels: string[],
  datasets: LineDataset[];
}

export default function LineGraph({ events, sensor }: { events: Event[], sensor: string }) {
  const [lineData, setLineData] = useState<LineData>({ labels: [], datasets: []});
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
    const dataFetch = async () => {
      const labels = new Set<string>();
      const datasets: LineDataset[] = [];
      const colors: string[] = [];

      for (let i = 0; i < 10; i++) {
        const eventIds = [events[i].eventID];
        const datasetids = [events[i].datasetID];
        const result = await filterRecords({ eventIds: eventIds, datasetIds: datasetids });
        const records: Record[] = result.results;

        const values: number[] = [];

        records.map(itm => {
          labels.add(_setLabel(itm));
          const value = itm.recordValues[sensor];
          if (value) {
            values.push(value);
          }
        })

        colors.push(getRandomColor());
        datasets.push({ label: events[i].eventID, data: values, backgroundColor: colors[i]});
      }

      setLineData({ ...lineData, labels: Array.from(labels), datasets: datasets})
    }

    dataFetch();

  }, [events])

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
    <div>
      <Line options={options} data={lineData} />
    </div>
  );
}