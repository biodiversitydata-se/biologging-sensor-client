import Link from "next/link";
import './Table.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Dataset } from "@/api/dataset/dataset.interface";

export default function OverviewTable({ data, onSelect }: { data: Dataset[], onSelect: (item: Dataset) => void }) {
  const baseUrl = process.env.NEXT_PUBLIC_NODE_ENV === 'test' ? TEST_URL_BASE : '/';

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
            <tr key={i} onClick={() => { onSelect(item) }}>
              <td>{item.datasetTitle}</td>
              <td>{item.datasetDescription}</td>
              <td>{item.owner[0].firstName}</td>
              <td>{item.animalCount}</td>
              <td>{item.taxonomicCoverage[0].commonName}</td>
              <td>{item.institutionCode}</td>
              <td>{item.temporalCoverage?.startDatetime?.slice(0, 10)}</td>
              <td>{item.temporalCoverage?.endDateTime?.slice(0, 10)}</td>
              <td>
                <div className="row " onClick={(e) => e.stopPropagation()}>
                  <div className="col-xs-1">
                    <Link
                      href={{
                        pathname: `/detail/[id]`,
                        query: {
                          id: item.datasetID,
                        },
                      }}
                      as={`${baseUrl}detail/${item.datasetID}`}
                    >
                      <FontAwesomeIcon icon={faInfo} />
                    </Link>
                  </div>

                  <div className="col-xs-auto">
                    <Link href={{
                      pathname: `/visualisation`,
                      query: {
                        search: item.datasetID,
                      },
                    }}
                      as={`${baseUrl}visualisation`}
                    >
                      <FontAwesomeIcon icon={faMapLocationDot} />
                    </Link>
                  </div>
                </div>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

}