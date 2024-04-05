  type Column = ColDef<{ datasetTitle: string; animalCount: string; taxonomicCoverage: Taxon[]; instrumentTypes: string; institutionCode: string; temporalCoverage: RangeDateTime; numberOfRecords: string; }, any> | ColGroupDef;
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

  const TaxonomicCoverageRenderer = ({ value }) => {
    if (Array.isArray(value)) {
      return (
      value.map((itm: any, index: number) => (
              <div key={index} onClick={(e) => e.stopPropagation()}>
                  <a target="_blank" href={`https://species.biodiversitydata.se/species/${itm.taxonGuid}`}>{itm.taxonCommonName}</a>
                </div>
                ))
    )} else {
      return null;
    }
  };

  const TemporalCoverageRenderer = ({ value }) => {
    if (Array.isArray(value)) {
      return (
        <div style={{ width: '150px' }}>
          {value.map((item, index) => (
            <div key={index}>
              <span>{item.startDatetime?.slice(0, 10)}</span>
              {item.endDateTime ? 
                <span> to {item.endDateTime.slice(0, 10)} </span> 
                : null
              }
            </div>
          ))}
        </div>
      );
    } else if (typeof value === 'object' && value !== null) {
        return (
          <div style={{ width: '150px' }}>
            <span>{value.startDatetime?.slice(0, 10)}</span>
            {value.endDateTime ? 
              <span> to {value.endDateTime.slice(0, 10)} </span> 
              : null
            }
          </div>
        );
      } else {
        return null;
      }
    }

  const gridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: true,
    },
    defaultSortModel: [
      {
        colId: "createdDate",
        sort: "desc", // This will sort the createdDate column in descending order by default
      }
    ]
  };

  const rowData = data.map((item, i) => ({
    datasetTitle: item.datasetTitle,
    animalCount: item.animalCount.toLocaleString('en-US').replace(/,/g, ' '),
    taxonomicCoverage: item.taxonomicCoverage,
    instrumentTypes: item?.instrumentTypes?.join(", "),
    institutionCode: item.institutionCode,
    temporalCoverage: item.temporalCoverage,
    numberOfRecords: item.numberOfRecords.toLocaleString('en-US').replace(/,/g, ' '),
  }));

const columns: Column[] = [
  { field: "datasetTitle", cellRenderer: "agTextCellRenderer", headerName: "Title", sortable: true},
  { 
    field: "animalCount", 
    cellRenderer: "agTextCellRenderer", 
    headerName: "Animal count", 
    valueGetter: params => parseInt(params.data.animalCount.replace(/,/g, ''), 10)
  },
  {
    field: 'taxonomicCoverage',
    cellRenderer: TaxonomicCoverageRenderer,
    autoHeight: true,
    headerName: "Taxon",
  },
  { field: "instrumentTypes", cellRenderer: "agTextCellRenderer", headerName: "Instrument type"},
  { field: "institutionCode", cellRenderer: "agTextCellRenderer", headerName: "Institution"},
  {
    field: "temporalCoverage",
    headerName: "Dates",
    cellRenderer: TemporalCoverageRenderer,
    autoHeight: true,
    comparator: (valueA, valueB, nodeA, nodeB, isInverted) => {
      const dateA = new Date(valueA.startDatetime);
      const dateB = new Date(valueB.startDatetime);
      return dateA.getTime() - dateB.getTime();
    }
  },
  { 
    field: "numberOfRecords", 
    cellRenderer: "agTextCellRenderer", 
    headerName: "Total records",
    valueGetter: params => parseInt(params.data.numberOfRecords.replace(/,/g, ''), 10)
  },
];

    return (
      <div className="ag-theme-quartz" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          onRowClicked={(event) => event.data && _selectRow(event.data, event.rowIndex)}
          rowClassRules={{
            'hover-row': true,
            'bold-row': (params) => selected[params.rowIndex]
          }}
          gridOptions={gridOptions}
        />
      </div>
    );

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