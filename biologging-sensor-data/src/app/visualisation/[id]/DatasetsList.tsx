import { getDatasets } from "@/api/dataset/api";
import { useEffect, useState } from "react";
import './visualisation.css';
import { Dataset } from "@/api/dataset/dataset";


interface Args {
  initDataset: string | null;
  onSelect: (itm: Dataset) => void;
}


export default function DatasetsList({ initDataset, onSelect }: Args) {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selected, setSelected] = useState<Dataset>();

  useEffect(() => {
    const fetchDataset = async () => {
      const response = await getDatasets();

      const sorted: Dataset[] = response.sort((a: Dataset, b: Dataset) =>
        a.datasetTitle.localeCompare(b.datasetTitle)
      );

      setDatasets(sorted);
    }

    fetchDataset();

  }, []);

  useEffect(() => {
    if (initDataset) {
      const i = datasets.findIndex(itm => itm.datasetID === initDataset);
      const dataset = datasets[i];
      setSelected(dataset)
      onSelect(dataset);
    }

  }, [datasets])

  function _selectDataset(i: number) {
    const dataset = datasets[i];
    setSelected(dataset)
    onSelect(dataset);
  }

  function _isSelected(i: number): boolean {
    return selected?.datasetID === datasets[i].datasetID;
  }

  return (
    <div>
      <h5>Select dataset</h5>
      <div className="vis-list-items">
        {datasets.map((item, index) => {
          return <div key={index}
            style={_isSelected(index) ? { backgroundColor: "lightblue" } : undefined}
            onClick={() => _selectDataset(index)}
          >
            {item.datasetTitle}
          </div>
        })}
      </div>
    </div>
  )
}


