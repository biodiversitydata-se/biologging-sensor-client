'use client'

import DatasetsList from "./DatasetsList";
import { useState } from "react";
import { filterEvents } from "@/api/event/api";
import SensorsList from "./SensorsList";
import Visualisation from "./Visualisation";
import { SensorList } from "./interface";
import { Dataset } from "@/api/dataset/dataset";
import { Event } from "@/api/event/event";

/**
 * Main page for visualisations
 * @param 
 * @returns 
 */
export default function Visualize({ params }: { params: { id: string } }) {
  const [events, setEvent] = useState<Event[]>([]);
  const [dataset, setDataset] = useState<Dataset>();
  const [selectedSensors, updateSelectedSensors] = useState<SensorList>({});

  async function _updateEvents(selectedDataset: Dataset) {
    if (!selectedDataset) {
      return;
    }

    setDataset(selectedDataset);
    const id = [selectedDataset.datasetID];
    const result = await filterEvents({ datasetIds: id });

    // keep only the first 30 lines. WHY ??
    setEvent(result.results.slice(0, 30));
  }

  return (
    <div className="container mt-n3">
      <div className="row">
        <div className="col-md-6">
          <div className="vis-list">
            <DatasetsList initDataset={params.id} onSelect={(itm: Dataset) => _updateEvents(itm)} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="vis-list">
            <SensorsList dataset={dataset} onSelect={(sensors: SensorList) => updateSelectedSensors(sensors)} />
          </div>
        </div>
      </div>
      <div className="col-md-10 text-align-center">
        <Visualisation events={events} sensors={selectedSensors} />
      </div>
    </div>
  )
}