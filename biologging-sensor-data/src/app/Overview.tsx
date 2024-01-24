import { Dataset } from "@/interfaces/dataset";
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
      
            setData(data);
          };
      
          dataFetch();
    }, [])

    return (
        <div className="container">
            <OverviewTable data={data} onSelect={(itm) => setSelected(itm)}/>

            <div className="container" style={{height: "120px", marginTop: "20px", paddingLeft: "15px", paddingRight: "15px"}}>
              {selected && <OverviewSnippet data={selected}/>}
            </div>
        </div>
    )

}