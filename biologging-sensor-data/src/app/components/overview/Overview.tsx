import { Dataset } from "@/app/interfaces/dataset";
import { useEffect, useState } from "react";

export default function Overview() {
    const [data, setData] = useState<Dataset[]>([]);

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
          {/* {data.map(i => <div>{i.datasetTitle}</div>)} */}
          <table>
            <thead>
              <th>Title</th>
              <th>Description</th>
              <th>Owner</th>
              <th>Animal count</th>
              <th>Taxon</th>
              <th>Institution</th>
              <th>Start Date</th>
              <th>End Date</th>
            </thead>
          </table>

          <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.datasetTitle}</td>
              <td>{item.datasetDescription}</td>
              <td>{item.owner[0].firstName}</td>
              <td>{item.individualCount}</td>
              <td>{item.taxonomicCoverage[0].commonName}</td>
              <td>{item.institutionCode}</td>
              <td>{item.dateCreated}</td>
              <td>{item.embargoEndDate}</td>
            </tr>
          ))}
          </tbody>

        </div>
    )

}