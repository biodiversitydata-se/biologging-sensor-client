import { useEffect, useMemo, useState } from 'react';
import './Table.css';
import { Dataset } from "@/api/dataset/dataset.interface";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { ERROR_LOAD_DATA } from '@/constants';

export default function OverviewTable({ data, onSelect }: { data: Dataset[], onSelect: (item: Dataset) => void }) {
  const [selected, setSelected] = useState<boolean[]>([]);
  const [fullData, setFullData] = useState<Dataset[]>([]);


  useEffect(() => {
    setSelected(new Array<boolean>(data.length).fill(false));
    setFullData(data);
  }, [data])

  const _selectRow = (dataID: string) => {
    const dataIndex = fullData.findIndex(data => data.dataID === dataID);
    const selected = new Array<boolean>(fullData.length).fill(false);
    selected[dataIndex] = true;
    setSelected(selected);
    onSelect(fullData.find(data => data.datasetID === dataID));
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
      autoHeaderHeight: true,
      wrapHeaderText: true,
    },
    defaultSortModel: [
      {
        colId: "createdDate",
        sort: "desc", // This will sort the createdDate column in descending order by default
      }
    ],
    domLayout: 'autoHeight',
    pagination: true,
    paginationPageSizeSelector: [5, 10, 20],
    paginationPageSize: 5,
    animateRows: false,
    suppressMenuHide: true,
    unSortIcon: true,
  };

  const rowData = data.map((item, i) => ({
    datasetTitle: item.datasetTitle,
    animalCount: item.animalCount,
    taxonomicCoverage: item.taxonomicCoverage,
    instrumentTypes: item?.instrumentTypes?.join(", "),
    institutionCode: item.institutionCode,
    temporalCoverage: item.temporalCoverage,
    numberOfRecords: item.numberOfRecords.toLocaleString('en-US').replace(/,/g, ' '),
    dataID: item.datasetID
  }));

  const columns = [
    { field: "datasetTitle", cellRenderer: "agTextCellRenderer", headerName: "Title", sortable: true, flex: 1, tooltipField: "datasetTitle", },
    {
      field: "animalCount",
      cellRenderer: "agTextCellRenderer",
      headerName: "Animal count",
      width: 135,
      valueGetter: params => params.data.animalCount,
      sortable: true,
      valueFormatter: ({ value }) => value.toLocaleString('en-US').replace(/,/g, ' '),
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
    { field: "instrumentTypes", cellRenderer: "agTextCellRenderer", headerName: "Instrument type", flex: 1, tooltipField: "instrumentTypes", },
    { field: "institutionCode", cellRenderer: "agTextCellRenderer", headerName: "Institution", tooltipField: "institutionCode", },
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
        onRowClicked={({ data: { dataID } }) => _selectRow(dataID)}
        tooltipShowDelay={500}
        rowClassRules={{
          'hover-row': true,
          'bold-row': (params) => {
            const dataIndex = fullData.findIndex(data => data.dataID === params.data.dataID);
            return selected[dataIndex];
          }
        }}
        overlayNoRowsTemplate={ERROR_LOAD_DATA}
        gridOptions={gridOptions}
      />
    </div>
  );
}