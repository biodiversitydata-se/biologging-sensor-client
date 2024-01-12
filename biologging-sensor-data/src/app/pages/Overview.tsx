import { Dataset } from "@/app/interfaces/dataset";
import { useEffect, useState } from "react";
import OverviewTable from "../components/overview/Table";
import OverviewSnippet from "../components/overview/Snippet";

export default function Overview() {
    const [data, setData] = useState<Dataset[]>([]);
    const [selected, setSelected] = useState<Dataset>();

    useEffect(() => {
        const dataFetch = async () => {
            const data = await (
              await fetch(
                'http://canmove-dev.ekol.lu.se:8080/sensorAPI/v1/datasets',
              )
            ).json();
      
            // set state when the data received
            setData(data);
          };
      
          dataFetch();
    }, [])

    return (
        <div>
          <OverviewTable data={data} onSelect={(itm) => setSelected(itm)}/>
          {selected && <OverviewSnippet data={selected}/>}      
        </div>
    )

}