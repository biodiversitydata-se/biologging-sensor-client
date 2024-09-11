import { useEffect, useState } from 'react';
import { Dataset, RangeDateTime } from "@/api/dataset/dataset";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { ERROR_LOAD_DATA } from '@/config/constants';

export default function OverviewTable({ data, onSelect }: { data: Dataset[], onSelect: (item: Dataset) => void }) {
  const [fullData, setFullData] = useState<Dataset[]>([]);

  useEffect(() => {
    setFullData(data);
  }, [data])

  const gridOptions: any = {
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
    paginationPageSizeSelector: [10, 20, 50],
    paginationPageSize: 20,
    animateRows: false,
    suppressMenuHide: true,
    unSortIcon: true,
  };

  const _selectRow = (data: Dataset) => {
    onSelect(data);
  }

  const TemporalCoverageRenderer = (props: any) => {
    const date = props.value;
    return (
      <div>
        {date.startDatetime?.slice(0, 10)}
        {date.endDateTime ?
          <div> to {date.endDateTime.slice(0, 10)} </div>
          : null
        }
      </div>
    )
  }

  const [columnsDef, setColumnsDef] = useState<any>(
    [
      {
        field: "datasetTitle",
        headerName: "Title",
        sortable: true,
        flex: 1,
        tooltipField: "datasetTitle",
        filterParams: { buttons: ["clear"]}
      },
      {
        field: "animalCount",
        headerName: "Animal count",
        width: 135,
        sortable: true,
        valueFormatter: (props: any) => props.value.toLocaleString('en-US').replace(/,/g, ' '),
        cellStyle: { textAlign: "right" },
        filterParams: { buttons: ["clear"]}
      },
      {
        field: 'taxonomicCoverage',
        autoHeight: true,
        headerName: "Taxon",
        width: 130,
        valueGetter: (params: any) => params.data.taxonomicCoverage[0].taxonCommonName,
        filterParams: { buttons: ["clear"]}
      },
      {
        field: "instrumentTypes",
        headerName: "Instrument type",
        flex: 1,
        tooltipField: "instrumentTypes",
        filterParams: { buttons: ["clear"]}
      },
      {
        field: "institutionCode",
        headerName: "Institution",
        tooltipField: "institutionCode",
        filterParams: { buttons: ["clear"]}
      },
      {
        field: "temporalCoverage",
        headerName: "Dates",
        cellRenderer: TemporalCoverageRenderer,
        autoHeight: true,
        width: 130,
        comparator: (valueA: RangeDateTime, valueB: RangeDateTime) => {
          const dateA = new Date(valueA.startDatetime);
          const dateB = new Date(valueB.startDatetime);
          return dateA.getTime() - dateB.getTime();
        },
        filterParams: { buttons: ["clear"]}
      },
      {
        field: "numberOfRecords",
        headerName: "Total records",
        width: 130,
        /*valueGetter: (params: any) => params.data.numberOfRecords,*/ /* remove to display the "greater than" filter */
        valueFormatter: (props: any) => props.value.toLocaleString('en-US').replace(/,/g, ' '),
        cellStyle: { textAlign: "right" },
        filterParams: { buttons: ["clear"]}
      },
    ]

  )

  return (
    <div className="ag-theme-quartz">
      <AgGridReact
        gridOptions={gridOptions}
        rowData={fullData}
        columnDefs={columnsDef}
        onRowClicked={(e) => _selectRow(e.data!)}
        tooltipShowDelay={500}
        rowSelection='single'
        overlayNoRowsTemplate={ERROR_LOAD_DATA}
      />
    </div>
  );
}