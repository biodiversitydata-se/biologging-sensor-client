import { useEffect, useState } from 'react';
import './Table.css'
import { Dataset } from "@/api/dataset/dataset.interface";

export default function OverviewTable({ data, onSelect }: { data: Dataset[], onSelect: (item: Dataset) => void }) {
  const [selected, setSelected] = useState<boolean[]>([]);

  useEffect(() => {
    const selected = new Array<boolean>(data.length).fill(false);
    setSelected(selected);
  }, [data])

  function _selectRow(dataset: Dataset, i: number) {
    const selected = new Array<boolean>(data.length).fill(false);
    selected[i] = true;
    setSelected(selected);

    onSelect(dataset);
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
            <tr key={i} onClick={() => { _selectRow(item, i) }} className="cursor-pointer" style={selected[i] ? { fontWeight: "bold" } : undefined}>
              <td>{item.datasetTitle}</td>
              <td>{item.animalCount.toLocaleString('en-US').replace(/,/g, ' ')}</td>
              <td>{item.taxonomicCoverage.map(itm => (
                <div onClick={(e) => e.stopPropagation()}>
                  <a target="_blank" href={`https://species.biodiversitydata.se/species/${itm.taxonGuid}`}>{itm.taxonCommonName}</a>
                </div>
              ))}</td>
              <td>{item?.instrumentTypes?.join(", ")}</td>
              <td>{item.institutionCode}</td>
              <td style={{ width: '150px' }}>
                {item.temporalCoverage?.startDatetime?.slice(0, 10)} 
                {item.temporalCoverage?.endDateTime ? 
                <div> to {item.temporalCoverage?.endDateTime.slice(0, 10)} </div> 
                : null
                }
              </td>
              <td>{item.numberOfRecords.toLocaleString('en-US').replace(/,/g, ' ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  )

}