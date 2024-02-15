import React, { useEffect, useState } from 'react';
import { Event } from '@/api/event/event.typscript';
import type { ChartOptions } from 'chart.js';
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
import { Line } from 'react-chartjs-2';
import { filterRecords } from '@/api/record/api';
import { Record } from '@/api/record/record.interface';

export default function LineGraph({ events }: { events: Event[] }) {
  const [options, setOptions] = useState<ChartOptions>({
    responsive: true,
    plugins: {
      legend: {
        position: 'center' as const,
      },
      title: {
        display: true,
        text: 'Altitude of the Selected Dataset',
        font: {
          size: 16,
        },
      },
    },
  });

  const [labels, setLabels] = useState<string[]>([]);
  const [altitudes, setAltitudes] = useState<number[]>([]);
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Altitude',
        data: altitudes,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  useEffect(() => {
    const dataFetch = async () => {

      for (let i = 0; i < 3; i++) {
        const ids = [events[i].eventID];
        const ids2 = [events[i].datasetID];
        const result = await filterRecords({ eventIds: ids, datasetIds: ids2 });
        const records: Record[] = result.results;

        const newLabels = [...labels];
        const newAltitudes = [...altitudes];

        records.slice(0, 30).filter(itm => itm.recordValues.altitude)
              .map(itm => {
                if(!(newLabels.includes(itm.recordStart))) {
                  let date = new Date(itm.recordStart);
                  let hours = String(date.getUTCHours()).padStart(2, '0');
                  let minutes = String(date.getUTCMinutes()).padStart(2, '0');
                  let seconds = String(date.getUTCSeconds()).padStart(2, '0');
                  newLabels.push(`${hours}:${minutes}:${seconds}`);
                }
                newAltitudes.push(itm.recordValues.altitude);
              });
              
              setLabels(newLabels);
              setAltitudes(newAltitudes);
      }
    };
    dataFetch();
  }, [events]);

    return (
        <div>
             <Line options={options} data={data} />
        </div>
    )
}