import { Event } from '@/api/event/event';
import { filterRecords } from '@/api/record/api';
import { Record } from '@/api/record/record';
import MapComponent from './MapComponent';
import { useState, useEffect } from 'react';
import { MapContainer } from 'react-leaflet';
import { MapC } from '@/config/model';
import ErrorComponent from '@/components/Error';
import { AxiosError } from 'axios';
import './MapGraph.css';

export type Coordinates = [number, number][];

export default function MapGraph({ events, config }: { events: Event[], config: MapC }) {
    const [data, setData] = useState<Coordinates[]>([]);
    const [center, setCenter] = useState<[number, number]>([62.3875, 16.325556]);
    const [showError, setShowError] = useState<boolean>(false);

    useEffect(() => {

        if (!events.length) return;

        const dataFetch = async () => {
            const items = [];

            for (let i = 0; i < 5; i++) {
                const c: Coordinates = [];

                const ids = [events[i].eventID];
                const result = await filterRecords({ eventIds: ids, datasetIds: [events[i].datasetID] });
                if (result instanceof AxiosError) {
                    setShowError(true);
                    return;
                }
                const records: Record[] = result.results;
                records.slice(0, 100).filter(itm => itm.recordValues.latitude && itm.recordValues.longitude)
                    .map(itm => {
                        const coor: [number, number] = [+itm.recordValues.latitude, +itm.recordValues.longitude];
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
            {showError ? <ErrorComponent /> :
                <div>
                    <MapContainer center={center} zoom={5} scrollWheelZoom={true} className='map'>
                        <MapComponent data={data} />
                    </MapContainer>
                    <div id="mapLegend">
                        <h5>The black dot is the final point of a track.</h5>
                    </div>
                </div>}
        </div >
    )
}
