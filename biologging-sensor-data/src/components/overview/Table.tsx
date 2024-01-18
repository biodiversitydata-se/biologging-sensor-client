import { Dataset } from "@/interfaces/dataset";
import Link from "next/link";
import './Table.css'

export default function OverviewTable({data, onSelect}: {data: Dataset[], onSelect: (item: Dataset) => void}) {
    return (
        <div className="container overview"> 
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Owner</th>
                <th>Animal count</th>
                <th>Taxon</th>
                <th>Institution</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
            {data.map((item, i) => (
              <tr key={i} onClick={() => {onSelect(item)}}>
                <td>{item.datasetTitle}</td>
                <td>{item.datasetDescription}</td>
                <td>{item.owner[0].firstName}</td>
                <td>{item.animalCount}</td>
                <td>{item.taxonomicCoverage[0].commonName}</td>
                <td>{item.institutionCode}</td>
                <td>{item.dateCreated.slice(0, 10)}</td>
                <td>{item.embargoEndDate?.slice(0, 10)}</td>
                <td>
                  <div>
                    <Link  
                      href={{
                        pathname: `/detail/[id]`,
                        query: {
                          id: item.datasetID,
                        },
                      }}
                      as={`/detail/${item.datasetID}`}
                    >
                      D
                    </Link>

                    <Link href="/visual">
                      V
                    </Link>
                  </div>

                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
    )

}