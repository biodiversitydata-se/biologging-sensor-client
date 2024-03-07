import './Table.css'
import { Dataset, Taxon } from "@/api/dataset/dataset.interface";

export default function OverviewTable({ data, onSelect }: { data: Dataset[], onSelect: (item: Dataset) => void }) {
  function _taxonSite(taxon: Taxon): string {
    return `https://species.biodiversitydata.se/species/${taxon.taxonGuid}`

  }
  return (
    <div className="container overview">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Animal count</th>
            <th>Taxon</th>
            <th>Instrument type</th>
            <th>Institution</th>
            <th>Dates</th>
            <th>Total records</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, i) => (
            <tr key={i} onClick={() => { onSelect(item) }} className="cursor-pointer">
              <td>{item.datasetTitle}</td>
              <td>{item.animalCount}</td>
              <td>{item.taxonomicCoverage.map(itm => (
                <div onClick={(e) => e.stopPropagation()}>
                  <a target="_blank" href={`https://species.biodiversitydata.se/species/${itm.taxonGuid}`}>{itm.taxonCommonName}</a>
                </div>
              ))}</td>
              <td>{item?.instrumentTypes?.join(", ")}</td>
              <td>{item.institutionCode}</td>
              <td>{item.temporalCoverage?.startDatetime?.slice(0, 10)} {item.temporalCoverage?.endDateTime ? <span>- {item.temporalCoverage?.endDateTime.slice(0, 10)} </span> : null}</td>
              <td>{item.numberOfRecords}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  )

}