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
  const [selectedDataset, setSelectedDataset] = useState("");
  const [options, setOptions] = useState<ChartOptions>({
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        onClick: (evt, legendItem) => {
          setSelectedDataset(legendItem.text);
        },
      },
      title: {
        display: true,
        text: 'Altitude, Temperature, and Pressure of the Selected Dataset',
        font: {
          size: 16,
        },
      },
    },
  });

  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<any[]>([]);
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  useEffect(() => {
    const dataFetch = async () => {
      let newLabels = [];
      let newAltitudes = [];
      let newTemperatures = [];
      let newPressures = [];

      for (let i = 0; i < events.length; i++) {
        const ids = [events[i].eventID];
        const ids2 = [events[i].datasetID];
        const result = await filterRecords({ eventIds: ids, datasetIds: ids2 });
        const records: Record[] = result.results;

        records.slice(0, 30).filter(itm => itm.recordValues.altitude || itm.recordValues.temperature || itm.recordValues.pressure).map(itm => {
          if(!(newLabels.includes(itm.recordStart))) {
            let date = new Date(itm.recordStart);
            let hours = String(date.getUTCHours()).padStart(2, '0');
            let minutes = String(date.getUTCMinutes()).padStart(2, '0');
            let seconds = String(date.getUTCSeconds()).padStart(2, '0');
            newLabels.push(`${hours}:${minutes}:${seconds}`);
          }
          newAltitudes.push(itm.recordValues.altitude);
          newTemperatures.push(itm.recordValues.temperature);
          newPressures.push(itm.recordValues.pressure);
        });
      }

      const newDatasets = [
        {
          label: `Altitude`,
          data: newAltitudes,
          borderColor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          fill: false,
        },
        {
          label: `Temperature`,
          data: newTemperatures,
          borderColor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          fill: false,
        },
        {
          label: `Pressure`,
          data: newPressures,
          borderColor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          fill: false,
        }
      ];

      // Filter datasets based on selectedDataset
      const filteredDatasets = newDatasets.filter(dataset => selectedDataset === "" || dataset.label === selectedDataset);

      setLabels(newLabels);
      setDatasets(filteredDatasets);
    };
    dataFetch();
  }, [events, selectedDataset]);

  const data = {
    labels,
    datasets,
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  )
}