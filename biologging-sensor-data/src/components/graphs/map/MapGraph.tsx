import { Event } from '@/api/event/event';
import { filterRecords } from '@/api/record/api';
import { getOrganism } from '@/api/organism/api';
import { Record } from '@/api/record/record';
import MapComponent from './MapComponent';
import { useState, useEffect } from 'react';
import { MapContainer } from 'react-leaflet';
import { MapC } from '@/config/model';
import ErrorComponent from '@/components/Error';
import { AxiosError } from 'axios';
import './MapGraph.css';
import { NB_LINES, MAX_RECORD_VALUES } from "@/config/constants";

export type Coordinates = [number, number][];
// to store extra data with the coordinates (tag ID, taxon, ,..)
export type CoordinatesExtended = [number, number, string[]][];

export default function MapGraph({ events, sensor, config }: { events: Event[], sensor: string, config: MapC }) {
    const [data, setData] = useState<CoordinatesExtended[]>([]);
    const [center, setCenter] = useState<[number, number]>([62.3875, 16.325556]);
    const [showError, setShowError] = useState<boolean>(false);

    function _getColor(i: number): string {
        const colors: string[] = [
            "#FF5733",
            "#33FF57",
            "#3366FF",
            "#FF33FF",
            "#FFFF33",
            "#33FFFF",
            "#FF3333",
            "#33FF33",
            "#3333FF",
            "#FF6633",
            "#33FF66",
            "#6633FF",
            "#FF33CC",
            "#33CCFF",
            "#CC33FF",
            "#CCFF33",
        ]

        //const i = Math.floor(Math.random() * colors.length);
        return colors[i];
    }

    useEffect(() => {

        if (!events.length) return;

        const dataFetch = async () => {
            const items = [];

            for (let i = 0; i < NB_LINES; i++) {
                const c: CoordinatesExtended = [];

                const ids = [events[i].eventID];
                const result = await filterRecords({ eventIds: ids, datasetIds: [events[i].datasetID], recordValueTypes: ["latitude"] });
                if (result instanceof AxiosError) {
                    setShowError(true);
                    return;
                }

                const organismResponse = await getOrganism(events[i].organismID);
                if (organismResponse instanceof AxiosError) {
                  setShowError(true);
                  return;
                }

                // tag ID + scientifcName
                const labelOrganismTaxon = events[i].eventTaxon[0].taxonScientificName + " - " + organismResponse.internalOrganismId;

                const color = _getColor(i);

                const records: Record[] = result.results;
                records.slice(0, MAX_RECORD_VALUES).filter(itm => itm.recordValues.latitude && itm.recordValues.longitude)
                    .map(itm => {
                        // for some reason, we can add som extra information oin ONE (not more) field, and an array works to store several info.
                        const coor: [number, number, string[]] = [+itm.recordValues.latitude, +itm.recordValues.longitude, [itm.recordStart.toString(), labelOrganismTaxon, color]];
                        c.push(coor);
                    })
                items.push(c);
            }
            setData(items);
            setShowError(false);
        };

        dataFetch();
    }, [events])

    return (
        <div>
            <h4 className="bold">Animal tracks</h4>
            {showError ? <ErrorComponent /> :
                <div>
                    <MapContainer center={center} zoom={5} scrollWheelZoom={true} className='map'>
                        <MapComponent data={data} />
                    </MapContainer>
                </div>}
                <br />
                <h5>Movement data for a random selection of {NB_LINES} animals (tag IDs in legend). 
                Each trajectory displays the first {MAX_RECORD_VALUES} positions derived from tracking radar measurements, starting at black circle (sensor deployment).
                Use mouse over a position to read GPS coordinates, tag ID, date/time.</h5>
        </div >
    )
}
