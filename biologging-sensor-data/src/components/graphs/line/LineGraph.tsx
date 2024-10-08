import React, { useEffect, useState } from 'react';
import 'chartjs-adapter-date-fns';
import { Event } from '@/api/event/event';
import { Line } from 'react-chartjs-2';
import { filterRecords } from '@/api/record/api';
import { Record } from '@/api/record/record';
import { getInstrument } from '@/api/instrument/api';
import { getOrganism } from '@/api/organism/api';
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
  ChartOptions,
} from 'chart.js';
import { AxiosError } from 'axios';
import { sensorTypes } from '@/config/config';
import { AcceptedXUnits, LineGraphC } from '@/config/model';
import ErrorComponent from '@/components/Error';
import Loader from '@/components/Loader';
import { NB_LINES, MAX_RECORD_VALUES } from "@/config/constants";

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
  unit: string;
}

interface LineData {
  datasets: LineDataset[];
}

export default function LineGraph({ events, sensor, config }: { events: Event[], sensor: string, config: LineGraphC }) {

  let graphTitle = sensorTypes[sensor]?.valuesMeasured[0];
  graphTitle = graphTitle.charAt(0).toUpperCase() + graphTitle.slice(1);
  
  const [showError, setShowError] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [lineData, setLineData] = useState<LineData>({ datasets: [] });
  const [options, setOptions] = useState<ChartOptions<'line'>>({
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label;
            let unit;

            if (typeof context?.dataset === "object" && context?.dataset !== null && "unit" in context.dataset)
              unit = String(context.dataset?.unit);
            label = [String(context.dataset.label) , graphTitle + " : "+context.formattedValue+" "+unit];
            return label;
          },
          title: function(context) {
            let title;
            try {
              if (typeof context[0]?.raw === "object" && context[0]?.raw !== null && "x" in context[0]?.raw) {
                let date = new Date(String(context[0]?.raw?.x)); // get the date
                title = date.toISOString();
              }
              else {
                title = "dateError";
              }
            }
            catch (e) {
              title = "dateError";
              if (e instanceof Error) {
                  console.log(e.message)
              }
            }
            return title;
          }
          
          
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
        type: 'time',
        time: {
          unit: config.x as AcceptedXUnits ?? AcceptedXUnits.Days,
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
    let unitMeasured = "unit error";
    const setUnitsOfMeasurement = async () => {
      setLoaded(false);
      const response = await getDataset(events[0].datasetID);
      const unitOfMeasure = valueMeasured ? response?.unitsReported[response.valuesMeasured.indexOf(valueMeasured)] : '';

      setOptions(prevOptions => ({
        ...prevOptions,
        scales: {
          ...prevOptions.scales,
          y: {
            ...prevOptions.scales!.y,
            title: {
              display: true,
              text: `${valueMeasured?.charAt(0).toUpperCase()}${valueMeasured?.slice(1)} (${unitOfMeasure?.charAt(0)}${unitOfMeasure?.slice(1)})`,
            },
          },
        },
      }));
    };

    const dataFetch = async () => {
      setLoaded(false);
      const datasets: LineDataset[] = [];

      for (let i = 0; i < NB_LINES; i++) { // get all the lines as defined in NB_LINES
        const eventIds = [events[i].eventID];
        const datasetIds = [events[i].datasetID];
        const result = await filterRecords({ eventIds: eventIds, datasetIds: datasetIds, recordValueTypes: [valueMeasured] });
        if (result instanceof AxiosError) {
          setShowError(true);
          return;
        }

        const records: Record[] = result.results;

        const values: { x: string, y: number }[] = [];

        records.map((itm: Record) => {
          const value = itm.recordValues[valueMeasured];
          if (value) {
            values.push({ x: itm.recordStart, y: itm.recordValues[valueMeasured] });
          }
        });

        const instrumentResponse = await getInstrument(events[i].instrumentID);
        if (instrumentResponse instanceof AxiosError) {
          setShowError(true);
          return;
        }

        const organismResponse = await getOrganism(events[i].organismID);
        if (organismResponse instanceof AxiosError) {
          setShowError(true);
          return;
        }

        // animal ID + scientifcName
        const labelAnimalTaxon = events[i].eventTaxon[0].taxonScientificName + " - " + organismResponse.internalOrganismId;

        // get unit index
        let unit;
        let okIndex;
        instrumentResponse?.sensors?.forEach(function (sensorData:any, sensorValue:any) {
          // get the right sensor
          if (Array.isArray(sensorData.sensorType)) {
            sensorData.sensorType.forEach(function (valueS:any, indexS:any) {
              if (sensor == valueS) {
                unitMeasured=sensorData?.unitsReported[indexS];
              }
            });

          }
          else {
            if (sensor == sensorData.sensorType) {
              unitMeasured=sensorData?.unitsReported[0];
            }
          }
          
        });


        datasets.push({ label: labelAnimalTaxon, data: values, backgroundColor: colors[i], borderColor: colors[i], unit: unitMeasured });
      }

      setLineData({ datasets: datasets });
      setShowError(false);
      setLoaded(true);
    };

    setUnitsOfMeasurement();
    dataFetch();
  }, [events]);

  return (
    <div>
      <h4 className="bold">{graphTitle}</h4>
      {
        !loaded && <Loader />
      }
      {loaded && (showError ? <ErrorComponent /> :
        <div>
          <Line options={options} data={lineData} />
          <h5>{sensor} data for a random selection of {NB_LINES} animals (tag IDs in legend). 
          Each line displays a series of the first {MAX_RECORD_VALUES} measurements, starting at sensor deployment. 
          Use mouse over a measurement to read {sensor} value, tag ID, date/time. </h5>
        </div>
      )}
    </div>
  )
}