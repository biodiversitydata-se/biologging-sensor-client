import { Event } from '@/api/event/event.typscript';
import './MapGraph.css';
import { CircleMarker, MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { filterRecords } from '@/api/record/api';
import { Record } from '@/api/record/record.interface';

type Coordinates = [number, number][];

export default function MapGraph({ events }: { events: Event[] }) {
    const [data, setData] = useState<Coordinates[]>([]);
    const [center, setCenter] = useState<[number, number]>([62.3875, 16.325556]);

    useEffect(() => {

        const dataFetch = async () => {
            const items = [];

            for (let i = 0; i < 10; i++) {
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

    useEffect(() => {
        if (data.length > 0) {
            setCenter(data[0][0]);
        }
    }, [data])

    function _getColor(): string {
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

        const i = Math.floor(Math.random() * colors.length);
        return colors[i];
    }

    return (
        <div>
            <MapContainer center={center} zoom={5} scrollWheelZoom={true} className='map'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {data.map((itm, index) => {
                    return <Polyline key={index} color={_getColor()} positions={itm} />
                })
                }

                {data.map(e => {
                    const markers: JSX.Element[] = [];
                    e.map((x, i) => {
                        markers.push(<CircleMarker key={i} center={x} ></CircleMarker>);
                    })
                    return markers;
                })}


            </MapContainer>
        </div >
    )
}
