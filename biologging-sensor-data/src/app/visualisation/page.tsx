'use client'

import { getDatasets } from "@/api/dataset/api";
import { Dataset } from "@/api/dataset/dataset.interface"
import { filterRecords } from "@/api/record/api";
import { Record } from "@/api/record/record.interface";
import { useEffect, useState } from "react"

// 1. fetch all datasets
// 2. after choosing dataset - get records and identify sensots from top 30

interface DatasetList {
  data: Dataset;
  selected: boolean;
}

interface SensorList {
  data: string;
  selected: boolean;
}

export default function Visualize() {
  const [datasets, setDatasets] = useState<DatasetList[]>([]);
  const [sensors, setSensors] = useState<SensorList[]>([]);

  useEffect(() => {
    const fetchDataset = async () => {
      const response = await getDatasets();

      const sorted: Dataset[] = response.sort((a: Dataset, b: Dataset) =>
          a.datasetTitle.localeCompare(b.datasetTitle)
        );

      const data: DatasetList[] = sorted.map(item => ({
        data: item,
        selected: false,
      }))
      
      setDatasets(data);
    }

    fetchDataset();

  }, []);

  function _selectDataset(i: number) {
    const dataset = datasets[i];
    dataset.selected = !dataset.selected;
    _updateRecValues(dataset.data);
  }

  async function _updateRecValues(dataset: Dataset) {
    // fetch records for given dataset
    const ids = [dataset.datasetID];
    const result = await filterRecords({datasetIds: ids});
    const records: Record[] = result.results.splice(0, 30);

    // take rec values from the first 30
    const values = new Set<string>();
    for (const record of records) {
      const recordValuesData = record.recordValues;
      const keys = Object.keys(recordValuesData);

      for (const k of keys) {
        values.add(k);
      }
    }

    const sorted = Array.from(values).sort();
    const recordedValues = sorted.map(item => ({
      data: item,
      selected: false,
    }));

    setSensors(recordedValues);
  }

  function _selectSensor(i: number) {
    const sensor = sensors[i];
    sensor.selected = !sensor.selected;
  }
    
  return (
        <div>
          <div>
            <div style={{
                  display: 'flex',
                  flexDirection: 'column', // Set flexDirection to 'column' for vertical arrangement
                  border: '1px solid #ccc',
                  padding: '10px',
                  borderRadius: '5px',
                  marginBottom: '10px',
                  height: '300px',
                  overflowY: 'auto',
                }}>
              <div>Select dataset</div>
              {datasets.map((item, index) => {
                return <div key={index} onClick={() => _selectDataset(index)}>{item.data.datasetTitle}</div>
              })}
            </div>

            <div style={{
                  display: 'flex',
                  flexDirection: 'column', // Set flexDirection to 'column' for vertical arrangement
                  border: '1px solid #ccc',
                  padding: '10px',
                  borderRadius: '5px',
                  marginBottom: '10px',
                  height: '200px',
                  overflowY: 'auto',
                }}>
              <div>Select sensor</div>
              {sensors.map((item, index) => {
                return <div key={index} onClick={() => _selectSensor(index)}>{item.data}</div>
              })}
            </div>
          </div>

          <div style={{ flex: 0.9, height: '100%', overflowY: 'auto' }}>
        {/* Set flex to 0.9 for 90% width */}
        <div>
          <div>Selected Sensors and Datasets</div>
          {datasets.map((data, index) => (
              <div key={index}>
                {data.selected && <p>Dataset Title: {data.data.datasetTitle}</p>}
              </div>
            ))}
        </div>
      </div>
    </div>
    )
}