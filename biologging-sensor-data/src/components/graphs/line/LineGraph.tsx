// NEW CODE WITH HOURLY TIME SCALE

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


// // PREVIOUS CODE WITH ORIGINAL TIMESTAMP

// import React, { useEffect, useState } from 'react';
// import { Event } from '@/api/event/event.typscript';
// import { Line } from 'react-chartjs-2';
// import { filterRecords } from '@/api/record/api';
// import { Record } from '@/api/record/record.interface';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//     },
//   },
// };

// interface LineDataset {
//   label: string;
//   data: number[];
// }

// interface LineData {
//   labels: string[],
//   datasets: LineDataset[];
// }

// export default function LineGraph({ events, sensor }: { events: Event[], sensor: string }) {
//   const [lineData, setLineData] = useState<LineData>({ labels: [], datasets: [] });

//   useEffect(() => {
//     const dataFetch = async () => {
//       const labels = new Set<string>();
//       const datasets: LineDataset[] = [];

//       for (let i = 0; i < 10; i++) {
//         const eventIds = [events[i].eventID];
//         const datasetids = [events[i].datasetID];
//         const result = await filterRecords({ eventIds: eventIds, datasetIds: datasetids });
//         const records: Record[] = result.results;

//         const values: number[] = [];

//         records.map(itm => {
//           labels.add(_setLabel(itm));
//           const value = itm.recordValues[sensor];
//           if (value) {
//             values.push(value);
//           }
//         })

//         datasets.push({ label: events[i].eventID, data: values });
//       }

//       setLineData({ ...lineData, labels: Array.from(labels), datasets: datasets })
//     }

//     dataFetch();

//   }, [events])

//   function _setLabel(itm: Record): string {
//     const date = new Date(itm.recordStart);
//     const hours = String(date.getUTCHours()).padStart(2, '0');
//     const minutes = String(date.getUTCMinutes()).padStart(2, '0');
//     const seconds = String(date.getUTCSeconds()).padStart(2, '0');
//     return `${hours}:${minutes}:${seconds}`;

//   }


//   // useEffect(() => {
//   //   // Reset labels and dataValues
//   //   setLabels([]);
//   //   setDataValues([]);

//   //   const dataFetch = async () => {
//   //     for (let i = 0; i < 3; i++) {
//   //       if (true) {
//   //         const ids = [events[i].eventID];
//   //         const ids2 = [events[i].datasetID];
//   //         const result = await filterRecords({ eventIds: ids, datasetIds: ids2 });
//   //         const records: Record[] = result.results;
//   //         if (selectedSensor?.sensor) {
//   //           const sensor = selectedSensor.sensor;
//   //           records.slice(0, 30).filter(itm => itm.recordValues[sensor])
//   //             .map(itm => {
//   //               setLabels(oldLabels => {
//   //                 let date = new Date(itm.recordStart);
//   //                 let hours = String(date.getUTCHours()).padStart(2, '0');
//   //                 let minutes = String(date.getUTCMinutes()).padStart(2, '0');
//   //                 let seconds = String(date.getUTCSeconds()).padStart(2, '0');
//   //                 let newLabel = `${hours}:${minutes}:${seconds}`;
//   //                 if (!oldLabels.includes(newLabel)) {
//   //                   return [...oldLabels, newLabel];
//   //                 } else {
//   //                   return oldLabels;
//   //                 }
//   //               });
//   //               setSensorData(oldData => {
//   //                 const sensorIndex = oldData.findIndex(data => data.sensor === sensor);
//   //                 if (sensorIndex !== -1) {
//   //                   const newData = [...oldData];
//   //                   newData[sensorIndex].dataValues.push(itm.recordValues[sensor]);
//   //                   return newData;
//   //                 } else {
//   //                   return [...oldData, { sensor, dataValues: [itm.recordValues[sensor]] }];
//   //                 }
//   //               });
//   //             });
//   //         }
//   //       }

//   //     }
//   //   };
//   //   dataFetch();
//   // }, [events, selectedSensor]);

//   return (
//     <div>
//       <Line options={options} data={lineData} />
//     </div>
//   );
// }