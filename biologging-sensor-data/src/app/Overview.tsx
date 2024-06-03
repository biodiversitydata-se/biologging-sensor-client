import { useEffect, useState } from "react";
import OverviewTable from "../components/overview/Table";
import OverviewSnippet from "../components/overview/Snippet";
import { Dataset } from "@/api/dataset/dataset.interface";
import { getDatasets } from "@/api/dataset/api";
import { AxiosError } from "axios";

export default function Overview() {
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

      <div className="container" style={{ height: "120px", marginTop: "20px", paddingLeft: "15px", paddingRight: "15px" }}>
        {selected && <OverviewSnippet data={selected} />}
      </div>
    </div>
  )

}
