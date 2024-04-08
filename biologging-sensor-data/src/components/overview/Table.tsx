import { useEffect, useState } from 'react';
import './Table.css'
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
  { field: "datasetTitle", cellRenderer: "agTextCellRenderer", headerName: "Title", sortable: true},
  { 
    field: "animalCount", 
    cellRenderer: "agTextCellRenderer", 
    headerName: "Animal count", 
    width: 135,
    valueGetter: params => parseInt(params.data.animalCount.replace(/,/g, ''), 10)
  },
  {
    field: 'taxonomicCoverage',
    cellRenderer: 'taxonomicCoverageRenderer',
    autoHeight: true,
    headerName: "Taxon",
    width: 110,
    valueGetter: (params) => params.data.taxonomicCoverage[0].taxonCommonName,
  },
  { field: "instrumentTypes", cellRenderer: "agTextCellRenderer", headerName: "Instrument type"},
  { field: "institutionCode", cellRenderer: "agTextCellRenderer",  width: 150, headerName: "Institution"},
  {
    field: "temporalCoverage",
    headerName: "Dates",
    cellRenderer: TemporalCoverageRenderer,
    autoHeight: true,
    width: 195,
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
    width: 130,
    valueGetter: params => parseInt(params.data.numberOfRecords.replace(/,/g, ''), 10)
  },
];

    return (
      <div className="ag-theme-quartz" style={{ height: 263, width: '100%' }}>
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