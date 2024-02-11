import { Event } from '@/api/event/event.typscript';
import './MapGraph.css';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { filterRecords } from '@/api/record/api';
import { Record } from '@/api/record/record.interface';

export default function MapGraph({ events }: { events: Event[] }) {
    const [coordinates, setCoordinates] = useState<[number, number][]>([])
    const redOptions = { color: 'red' }
    const center: [number, number] = [64, 17];

    const c: [number, number][] = [
        [64.1611872, 17.2607195],
        [64.1615473, 20.2616377],
        [64.1618952, 30.2627271]

    ]

    useEffect(() => {
        const c: [number, number][] = [];

        const dataFetch = async () => {
            const ids = [events[0].eventID];
            const result = await filterRecords({ eventIds: ids, datasetIds: ["dataset_wram_moose_2003"] });
            const records: Record[] = result.results;

            records.filter(itm => itm.recordValues.latitude && itm.recordValues.longitude)
                .map(itm => {
                    const coor: [number, number] = [+itm.recordValues.latitude, +itm.recordValues.longitude];
                    c.push(coor);
                })

            setCoordinates(c)


        };

        dataFetch();

    }, [events])

    return (
        <div style={{ height: "300px", }}>
            <MapContainer center={center} zoom={2} scrollWheelZoom={true} style={{ height: "100vh" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline pathOptions={redOptions} positions={coordinates} />
            </MapContainer>
        </div>
    )
}