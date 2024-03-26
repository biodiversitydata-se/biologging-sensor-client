import { useEffect, useState } from 'react';
import './Table.css'
import { Dataset } from "@/api/dataset/dataset.interface";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

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

  const TaxonomicCoverageRenderer = ({ value }) => (
    console.log(value),
    <>
      {value.map(itm => (
        <div key={itm.taxonGuid} onClick={(e) => e.stopPropagation()}>
          <a target="_blank" href={`https://species.biodiversitydata.se/species/${itm.taxonGuid}`}>{itm.taxonCommonName}</a>
        </div>
      ))}
    </>
  );

    const [rowData, setRowData] = useState(data.map((item, i) => ({
      datasetTitle: item.datasetTitle,
      animalCount: item.animalCount.toLocaleString('en-US').replace(/,/g, ' '),
      taxonomicCoverage: item.taxonomicCoverage,
      instrumentTypes: item?.instrumentTypes?.join(", "),
      institutionCode: item.institutionCode,
      temporalCoverage: item.temporalCoverage,
      numberOfRecords: item.numberOfRecords.toLocaleString('en-US').replace(/,/g, ' '),
    })));

    const colDefs = [
      { field: "datasetTitle", cellRenderer: "agTextCellRenderer" },
      { field: "animalCount", cellRenderer: "agTextCellRenderer" },
      { 
        field: "taxonomicCoverage", 
        cellRendererFramework: TaxonomicCoverageRenderer
      },
      { field: "instrumentTypes", cellRenderer: "agTextCellRenderer" },
      { field: "institutionCode", cellRenderer: "agTextCellRenderer" },
      { 
        field: "temporalCoverage", 
        cellRendererFramework: (params) => (
          <div style={{ width: '150px' }}>
            {params.value?.startDatetime?.slice(0, 10)} 
            {params.value?.endDateTime ? 
            <div> to {params.value?.endDateTime.slice(0, 10)} </div> 
            : null
            }
          </div>
        )
      },
      { field: "numberOfRecords", cellRenderer: "agTextCellRenderer" },
    ];
  

   return (
    // wrapping container with theme & size
    <div
     className="ag-theme-quartz" // applying the grid theme
     style={{ height: 500 }} // the grid will fill the size of the parent container
    >
      <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
      />
    </div>
   )

  // return (
  //   <div className="container overview">
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>Title</th>
  //           <th>Animal count</th>
  //           <th>Taxon</th>
  //           <th>Instrument type</th>
  //           <th>Institution</th>
  //           <th>Dates</th>
  //           <th>Total records</th>
  //         </tr>
  //       </thead>

  //       <tbody>
  //         {data.map((item, i) => (
  //           <tr
  //             key={i}
  //             onClick={() => { _selectRow(item, i) }}
  //             className="cursor-pointer hover-row"
  //             style={selected[i] ? { fontWeight: "bold", backgroundColor: isHovered ? '#f5f5f5' : 'transparent' } : { backgroundColor: isHovered ? '#f5f5f5' : 'transparent' }}
  //             onMouseEnter={() => setIsHovered(true)}
  //             onMouseLeave={() => setIsHovered(false)}
  //           >
  //             <td>{item.datasetTitle}</td>
  //             <td>{item.animalCount.toLocaleString('en-US').replace(/,/g, ' ')}</td>
  //             <td>{item.taxonomicCoverage.map(itm => (
  //             <div key={i} onClick={(e) => e.stopPropagation()}>
  //                 <a target="_blank" href={`https://species.biodiversitydata.se/species/${itm.taxonGuid}`}>{itm.taxonCommonName}</a>
  //               </div>
  //             ))}</td>
  //             <td>{item?.instrumentTypes?.join(", ")}</td>
  //             <td>{item.institutionCode}</td>
  //             <td style={{ width: '150px' }}>
  //               {item.temporalCoverage?.startDatetime?.slice(0, 10)} 
  //               {item.temporalCoverage?.endDateTime ? 
  //               <div> to {item.temporalCoverage?.endDateTime.slice(0, 10)} </div> 
  //               : null
  //               }
  //             </td>
  //             <td>{item.numberOfRecords.toLocaleString('en-US').replace(/,/g, ' ')}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div >
  // )

}