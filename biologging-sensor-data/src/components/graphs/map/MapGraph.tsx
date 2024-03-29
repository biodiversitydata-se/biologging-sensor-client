import { Event } from '@/api/event/event.typscript';
import './MapGraph.css';
import { filterRecords } from '@/api/record/api';
import { Record } from '@/api/record/record.interface';
import MapComponent from './MapComponent';
import { useState, useEffect } from 'react';
import { MapContainer } from 'react-leaflet';

export type Coordinates = [number, number][];

export default function MapGraph({ events }: { events: Event[] }) {
    const [data, setData] = useState<Coordinates[]>([]);
    const [center, setCenter] = useState<[number, number]>([62.3875, 16.325556]);

    useEffect(() => {

        const dataFetch = async () => {
            const items = [];

            for (let i = 0; i < 5; i++) {
                const c: Coordinates = [];

                const ids = [events[i].eventID];
                const result = await filterRecords({ eventIds: ids, datasetIds: [events[i].datasetID] });
                const records: Record[] = result.results;
                records.slice(0, 100).filter(itm => itm.recordValues.latitude && itm.recordValues.longitude)
                    .map(itm => {
                        const coor: [number, number] = [+itm.recordValues.latitude, +itm.recordValues.longitude];
                        c.push(coor);
                    })
                items.push(c);
            }

            setData(items);
        };

        dataFetch();
    }, [events])

    return (
        <div>
            <MapContainer center={center} zoom={5} scrollWheelZoom={true} className='map'>
                <MapComponent data={data} />
            </MapContainer>
        </div >
    )
}
