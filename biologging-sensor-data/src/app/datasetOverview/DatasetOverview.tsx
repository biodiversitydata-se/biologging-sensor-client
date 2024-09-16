import { useEffect, useState } from "react";
import OverviewTable from "@/components/overview/Table";
import OverviewSnippet from "@/components/overview/Snippet";
import { getDatasets } from "@/api/dataset/api";
import { AxiosError } from "axios";
import { Dataset } from "@/api/dataset/dataset";

/**
 * DatasetOverview page, providing list/overview of datasets
 * @returns 
 */
export default function DatasetOverview() {
  const [data, setData] = useState<Dataset[]>([]);
  const [selected, setSelected] = useState<Dataset>();

  useEffect(() => {

    const dataFetch = async () => {
      const data = await getDatasets();

      if (data instanceof AxiosError)
        return;
      setData(data);
    };

    dataFetch();

  }, []);


  return (
    <div className="container">
      <OverviewTable data={data} onSelect={(itm) => setSelected(itm)} />

      <div className="container snippet-wrapper">
        {selected && <OverviewSnippet data={selected} />}
      </div>
    </div>
  )

}
