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

export default function Visualize() {
  const [events, setEvent] = useState<Event[]>([]);

  async function _updateEvents(d: Dataset) {
    const id = [d.datasetID];
    const result = await filterEvents({ datasetIds: id });

    setEvent(result.results.slice(0, 30));
  }

  return (
    <div className="container-fluid">
      <SensorSelectionProvider>
        <div className="row">
          <div className="col-md-3">
            <div className="vis-list">
              <DatasetsList initDataset={null} onSelect={(itm: Dataset) => _updateEvents(itm)} />
            </div>

            <div className="vis-list">
              <SensorsList events={events} />
            </div>
          </div>
          <div className="col-md-7">
            <Visualisation events={events} />
          </div>
        </div>
      </SensorSelectionProvider>
    </div>
  )
}