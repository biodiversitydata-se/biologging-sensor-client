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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    x: {
      type: 'linear',
      min: 0, // Minimum value on x-axis
      max: 24, // Maximum value on x-axis (24 hours)
      ticks: {
        stepSize: 4, // Interval of 4 hours
      },
    },
  },
};

interface LineDataset {
  label: string;
  data: { x: number, y: number }[]; // Using {x, y} format for data points
}

interface LineData {
  datasets: LineDataset[];
}

export default function LineGraph({ events, sensor }: { events: Event[], sensor: string }) {
  const [lineData, setLineData] = useState<LineData>({ datasets: [] });

  useEffect(() => {
    const dataFetch = async () => {
      const datasets: LineDataset[] = [];

      for (let i = 0; i < 10; i++) {
        const eventIds = [events[i].eventID];
        const datasetIds = [events[i].datasetID];
        const result = await filterRecords({ eventIds, datasetIds });
        const records: Record[] = result.results;

        const dataPoints: { x: number, y: number }[] = [];

        records.forEach(record => {
          const hour = new Date(record.recordStart).getUTCHours();
          const value = record.recordValues[sensor];
          if (value) {
            dataPoints.push({ x: hour, y: value });
          }
        });

        datasets.push({ label: events[i].eventID, data: dataPoints });
      }

      setLineData({ datasets });
    };

    dataFetch();
  }, [events, sensor]);

  return (
    <div>
      <Line options={options} data={lineData} />
    </div>
  );
}