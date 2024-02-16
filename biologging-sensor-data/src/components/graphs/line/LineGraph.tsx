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
import { handleSensorSelection } from "@/hooks/sensorSelectContext/sensorSelectContext";

export default function LineGraph({ events }: { events: Event[] }) {
  const [options, setOptions] = useState<ChartOptions>({
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Sensor of the Selected Dataset',
        font: {
          size: 16,
        },
      },
    },
  });

  const [labels, setLabels] = useState<string[]>([]);
  const [dataValues, setDataValues] = useState<number[]>([]);
  const [sensorData, setSensorData] = useState<{ sensor: string, dataValues: number[] }[]>([]);
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const { sensors } = handleSensorSelection();
  const selectedSensor = sensors.find(sensor => sensor.selected);

  const data = {
    labels,
    datasets: selectedSensor ? [{
      label: selectedSensor.sensor,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      data: sensorData.find(data => data.sensor === selectedSensor.sensor)?.dataValues || [],
    }] : [],
  };

  useEffect(() => {
    // Reset labels and dataValues
    setLabels([]);
    setDataValues([]);

    const dataFetch = async () => {
      for (let i = 0; i < 3; i++) {
        if (events[i]) {
          const ids = [events[i].eventID];
          const ids2 = [events[i].datasetID];
          const result = await filterRecords({ eventIds: ids, datasetIds: ids2 });
        const records: Record[] = result.results;
        if (selectedSensor?.sensor) {
          const sensor = selectedSensor.sensor;
          records.slice(0, 30).filter(itm => itm.recordValues[sensor])
                .map(itm => {
                  setLabels(oldLabels => {
                    let date = new Date(itm.recordStart);
                    let hours = String(date.getUTCHours()).padStart(2, '0');
                    let minutes = String(date.getUTCMinutes()).padStart(2, '0');
                    let seconds = String(date.getUTCSeconds()).padStart(2, '0');
                    let newLabel = `${hours}:${minutes}:${seconds}`;
                    if(!oldLabels.includes(newLabel)) {
                      return [...oldLabels, newLabel];
                    } else {
                      return oldLabels;
                    }
                  });
                  setSensorData(oldData => {
                    const sensorIndex = oldData.findIndex(data => data.sensor === sensor);
                    if (sensorIndex !== -1) {
                      const newData = [...oldData];
                      newData[sensorIndex].dataValues.push(itm.recordValues[sensor]);
                      return newData;
                    } else {
                      return [...oldData, { sensor, dataValues: [itm.recordValues[sensor]] }];
                    }
                  });
                });
        }
        }
        
      }
    };
    dataFetch();
  }, [events, selectedSensor]);

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}