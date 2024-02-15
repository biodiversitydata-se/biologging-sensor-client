import { Event } from '@/api/event/event.typscript';
import './MapGraph.css';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { filterRecords } from '@/api/record/api';
import { Record } from '@/api/record/record.interface';

type Coordinates = [number, number][];

export default function MapGraph({ events }: { events: Event[] }) {
    const [data, setData] = useState<Coordinates[]>([]);
    const center: [number, number] = [62.3875, 16.325556];

    useEffect(() => {

        const dataFetch = async () => {
            const items = [];

            for (let i = 0; i < 10; i++) {
                const c: Coordinates = [];

                const ids = [events[i].eventID];
                const result = await filterRecords({ eventIds: ids, datasetIds: ["dataset_wram_moose_2003"] });
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
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {data.map((itm, index) => {
                    return <Polyline key={index} positions={itm} />
                })
                }
            </MapContainer>
        </div>
    )
}