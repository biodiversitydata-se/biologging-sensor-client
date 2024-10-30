import { getDatasets } from "@/api/dataset/api";
import { useEffect, useState } from "react";
import { Dataset } from "@/api/dataset/dataset";
import Loader from "@/components/Loader";
import { databaseValues } from "@/config/config";


interface Args {
  initDataset: string | null;
  onSelect: (itm: Dataset) => void;
}

/**
 * To display and choose dataset from list 
 * @param 
 * @returns 
 */
export default function DatasetsList({ initDataset, onSelect }: Args) {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selected, setSelected] = useState<Dataset>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDataset = async () => {
      setLoading(true);
      const response = await getDatasets();

      const sorted: Dataset[] = response.sort((a: Dataset, b: Dataset) =>
        a.datasetTitle.localeCompare(b.datasetTitle)
      );

      setDatasets(sorted);
      setLoading(false);
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
      {
        loading ? <Loader /> : null
      }
      <div className="vis-list-items">
        {datasets.map((item, index) => {
          // display only if data available to display
          if (item?.accessRights != databaseValues["datasetNoAccess"] ) {
            return <div key={index}
              style={_isSelected(index) ? { backgroundColor: "lightblue" } : undefined}
              onClick={() => _selectDataset(index)}
            >
              {item.datasetTitle}
            </div>
          }
        })}
      </div>
    </div>
  )
}


