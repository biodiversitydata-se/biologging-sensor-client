import { useEffect, useState } from 'react';
import './Table.css';
import { Dataset } from "@/api/dataset/dataset.interface";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { AxiosError } from 'axios';

export default function OverviewTable({ data, onSelect }: { data: Dataset[], onSelect: (item: Dataset) => void }) {
  const [selected, setSelected] = useState<boolean[]>([]);
  const [fullData, setFullData] = useState<Dataset[]>([]);
  const [error, setError] = useState<string | null>(null);
    
  useEffect(() => {
      if (data instanceof AxiosError) {
          setError('Data cannot be loaded. Please contact biologging@biodiversitydata.se');
      } else if (data instanceof AxiosError && data.response?.status === 404) {
          setError('Records not found. Please try again later.');
      } else {
          setError(null);
      }
  }, [data]);

  if (error) {
      return (
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#6691A4', color: '#fff', padding: '20px', borderRadius: '5px', zIndex: 999 }}>
              {error}
          </div>
      );
  }


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
    ],
    domLayout: 'autoHeight',
  };

  const rowData = data.map((item, i) => ({
    datas: console.log(item.numberOfRecords),
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
    width: 135,
    valueGetter: params => params.data.animalCount,
    cellStyle: { textAlign: "right" }
  },
  {
    field: 'taxonomicCoverage',
    cellRenderer: 'taxonomicCoverageRenderer',
    autoHeight: true,
    headerName: "Taxon",
    width: 130,
    valueGetter: (params) => params.data.taxonomicCoverage[0].taxonCommonName,
  },
  { field: "instrumentTypes", cellRenderer: "agTextCellRenderer", headerName: "Instrument type", flex: 1},
  { field: "institutionCode", cellRenderer: "agTextCellRenderer", width: 130, headerName: "Institution"},
  {
    field: "temporalCoverage",
    headerName: "Dates",
    cellRenderer: TemporalCoverageRenderer,
    autoHeight: true,
    width: 130,
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
    valueGetter: params => params.data.numberOfRecords,
    cellStyle: { textAlign: "right" }
  },
];

    return (
      <div className="ag-theme-quartz" style={{ width: '100wh' }}>
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