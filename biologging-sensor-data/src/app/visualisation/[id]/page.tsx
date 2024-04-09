'use client'

import { Dataset } from "@/api/dataset/dataset.interface";
import DatasetsList from "./DatasetsList";
import { useEffect, useState } from "react";
import { Event } from "@/api/event/event.typscript";
import { filterEvents } from "@/api/event/api";
import SensorsList from "./SensorsList";
import { SensorSelectionProvider } from "@/hooks/sensorSelectContext/sensorSelectContext";
import Visualisation from "./Visualisation";
import './visualisation.css';

export default function Visualize({ params }: { params: { id: string } }) {
  const [events, setEvent] = useState<Event[]>([]);
  const [dataset, setDataset] = useState<Dataset>();


  async function _updateEvents(d: Dataset) {
    if (!d) {
      return;
    }
    setDataset(d);
    const id = [d.datasetID];
    const result = await filterEvents({ datasetIds: id });

    setEvent(result.results.slice(0, 30));
  }

  return (
    <div className="container-fluid mt-n3">
      <SensorSelectionProvider>
        <div className="row">
          <div className="col-md-6">
            <div className="vis-list">
              <DatasetsList initDataset={params.id} onSelect={(itm: Dataset) => _updateEvents(itm)} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="vis-list">
              <SensorsList dataset={dataset} />
            </div>
          </div>
        </div>
        <div className="col-md-10" style={{ textAlign: 'center' }}>
          <Visualisation events={events} />
        </div>
      </SensorSelectionProvider>
    </div>
  )
}