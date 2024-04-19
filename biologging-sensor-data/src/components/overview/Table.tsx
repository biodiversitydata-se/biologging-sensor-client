import { useEffect, useState } from 'react';
import './Table.css';
import { Dataset } from "@/api/dataset/dataset.interface";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

export default function OverviewTable({ data, onSelect }: { data: Dataset[], onSelect: (item: Dataset) => void }) {
  const [selected, setSelected] = useState<boolean[]>([]);
  const [fullData, setFullData] = useState<Dataset[]>([]);

  useEffect(() => {
    setSelected(new Array<boolean>(data.length).fill(false));
    setFullData(data);
  }, [data])

  const _selectRow = (i: number) => {
    const selected = new Array<boolean>(data.length).fill(false);
    selected[i] = true;
    setSelected(selected);
    onSelect(fullData[i]);
  }

  const TemporalCoverageRenderer = ({ value }) => {
    if (Array.isArray(value)) {
      return (
        <div style={{ width: '20px' }}>
          {value.map((item, index) => (
            <div key={index}>
              <div>{item.startDatetime?.slice(0, 10)}</div>
              {item.endDateTime ? 
                <div> to {item.endDateTime.slice(0, 10)} </div> 
                : null
              }
            </div>
          ))}
        </div>
      );
    } else if (typeof value === 'object' && value !== null) {
        return (
          <div style={{ width: '20px' }}>
            <div>{value.startDatetime?.slice(0, 10)}</div>
            {value.endDateTime ? 
              <div> to {value.endDateTime.slice(0, 10)} </div> 
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
      resizable: false,
      sortable: true,
      filter: true,
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

const columns = [
  { field: "datasetTitle", cellRenderer: "agTextCellRenderer", headerName: "Title", sortable: true, flex: 1},
  { 
    field: "animalCount", 
    cellRenderer: "agTextCellRenderer", 
    headerName: "Animal count", 
    flex: 1,
    valueGetter: params => parseInt(params.data.animalCount.replace(/,/g, ''), 10),
    cellStyle: { textAlign: "right" }
  },
  {
    field: 'taxonomicCoverage',
    cellRenderer: 'taxonomicCoverageRenderer',
    autoHeight: true,
    headerName: "Taxon",
    flex: 1,
    valueGetter: (params) => params.data.taxonomicCoverage[0].taxonCommonName,
  },
  { field: "instrumentTypes", cellRenderer: "agTextCellRenderer", headerName: "Instrument type", flex: 1},
  { field: "institutionCode", cellRenderer: "agTextCellRenderer", flex: 1, headerName: "Institution"},
  {
    field: "temporalCoverage",
    headerName: "Dates",
    cellRenderer: TemporalCoverageRenderer,
    autoHeight: true,
    flex: 1,
    comparator: (valueA, valueB) => {
      const dateA = new Date(valueA.startDatetime);
      const dateB = new Date(valueB.startDatetime);
      return dateA.getTime() - dateB.getTime();
    }
  },
  { 
    field: "numberOfRecords", 
    cellRenderer: "agTextCellRenderer", 
    headerName: "Total records", 
    flex: 1,
    valueGetter: params => parseInt(params.data.numberOfRecords.replace(/,/g, ''), 10),
    cellStyle: { textAlign: "right" }
  },
];

    return (
      <div className="ag-theme-quartz" style={{ height: '100vh', width: '100wh' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          onRowClicked={({ rowIndex: i }) => _selectRow(i)}
          rowClassRules={{
            'hover-row': true,
            'bold-row': (params) => selected[params.rowIndex]
          }}
          gridOptions={gridOptions}
        />
      </div>
    );
}