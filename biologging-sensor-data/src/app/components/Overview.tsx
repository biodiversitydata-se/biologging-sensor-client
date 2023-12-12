import { useEffect, useState } from "react";

export default function Overview() {
    const [data, setData] = useState<any[]>([]);

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
        <div>{data?.map(i => <div>{i.datasetID}</div>)}</div>
    )

}