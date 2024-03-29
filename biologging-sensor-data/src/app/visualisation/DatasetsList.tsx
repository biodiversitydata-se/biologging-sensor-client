import { getDatasets } from "@/api/dataset/api";
import { Dataset } from "@/api/dataset/dataset.interface";
import { useEffect, useState } from "react";


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

      if (initDataset) {
        _selectDataset(datasets.findIndex(itm => itm.datasetID === initDataset));
      }
    }

    fetchDataset();

  }, []);

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
      {datasets.map((item, index) => {
        return <div key={index}
          style={_isSelected(index) ? { backgroundColor: "lightblue" } : undefined}
          onClick={() => _selectDataset(index)}
        >
          {item.datasetTitle}
        </div>
      })}
    </div>
  )
}


