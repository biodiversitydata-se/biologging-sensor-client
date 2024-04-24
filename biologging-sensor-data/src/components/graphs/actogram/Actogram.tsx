import { Event } from "@/api/event/event.typscript";
import { filterRecords } from "@/api/record/api";
import { Record } from "@/api/record/record.interface";
import { format, setDay } from "date-fns";
import { useEffect, useState } from "react";
import { AData } from "./interface";
import ActogramGraph from "./ActogramGraph";
import { S } from "./const";


export default function Actogram({ events }: { events: Event[] }) {
    const [data, setData] = useState<AData[]>();
    const [counts, setCounts] = useState<Map<string, number>>(new Map<string, number>());
    const [days, setDay] = useState<number>(0);
    useEffect(() => {

        const dataFetch = async () => {
            const items: AData[] = [];
            const monthCounts: Map<string, number> = new Map<string, number>();

            const relEvent = events[0];
            const ids = [relEvent.eventID];
            const datasetId = [relEvent.datasetID]

            const result = await filterRecords({ eventIds: ids, datasetIds: datasetId });
            const records: Record[] = result.results;

            for (let i = 0; i < records.length; i++) {
                const item = records[i];
                const date = new Date(item.recordStart);
                const score = item.recordValues.activity.acc_sum;

                // validate if measured correctly 

                // make key for dictionary
                const currentMonth = format(date, 'LLLL');
                const currentYear = format(date, "yy");
                const currentHour = date.getHours();
                const dayKey: string = currentMonth + currentYear;

                if (i === 0) { // first entry,pad with empty until the hour
                    for (let j = 0; j < currentHour; j++) {
                        const itm: AData = {
                            x: (j * S),
                            y: 0,
                            value: -10, // not masure value for now
                        }

                        items.push(itm);
                    }
                }

                const itm: AData = {
                    x: (currentHour * S),
                    y: S * Math.floor(items.length / 24),
                    value: score,
                }


                items.push(itm);

                // increment number of days for the current month
                if (!monthCounts.get(dayKey)) {
                    monthCounts.set(dayKey, 0);
                }
                let d = monthCounts.get(dayKey);
                monthCounts.set(dayKey, d! + 1);
            }

            // setting number of days
            monthCounts.forEach((value: number, key: string) => {
                const days = value / 24;
                setDay((prev) => prev + days);
            })

            setDay((prev) => Math.ceil(prev))

            setData(items);
            setCounts(monthCounts);
        };

        dataFetch();
    }, [events])

    return (
        <ActogramGraph data={data} mCounts={counts} days={days}></ActogramGraph>
    )

}