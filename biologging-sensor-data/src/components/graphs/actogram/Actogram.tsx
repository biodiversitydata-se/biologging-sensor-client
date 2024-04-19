import { Event } from "@/api/event/event.typscript";
import { filterRecords } from "@/api/record/api";
import { Record } from "@/api/record/record.interface";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { ActData, ActDaysData, AData } from "./interface";
import ActogramGraph from "./ActogramGraph";
import { S } from "./const";


export default function Actogram({ events }: { events: Event[] }) {
    const [data, setData] = useState<ActData>();
    const [daysDate, setDaysData] = useState<ActDaysData>();
    const [aData, setAData] = useState<AData[]>();
    const [aDays, setADays] = useState<Map<string, number>>();
    useEffect(() => {

        const dataFetch = async () => {
            const days: ActDaysData = {};
            const items: ActData = {};
            const aadata: AData[] = [];

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
                const currentDay = format(date, "dd");
                const currentMonth = format(date, 'LLLL');
                const currentYear = format(date, "yy");
                const currentTime = date.getHours();
                const daysKey: string = currentMonth + currentYear;
                const itemKey: string = currentDay + daysKey;

                if (i === 0) { // first entry,pad with empty until the hour
                    for (let j = 0; j < currentTime; j++) {
                        const itm: AData = {
                            x: (j * S),
                            y: Math.floor(i / 48),
                            value: -10,
                        }

                        aadata.push(itm);

                    }
                }

                const offset = Math.floor(aadata.length / 24) % 2 ? 250 : 0;

                const itm: AData = {
                    x: (currentTime * S) + offset,
                    y: S * Math.floor(aadata.length / 48),
                    value: score,
                }


                aadata.push(itm);

                // if (aadata.length > 80) {
                //     break;
                // }

                // increment number of days for the current month
                if (!days[daysKey]) {
                    days[daysKey] = 0;
                }
                days[daysKey]++;

                // add value to the current day
                if (!items[itemKey]) {
                    items[itemKey] = [];
                }

                items[itemKey].push({ hour: currentTime, score: score });
            }

            setData(items);
            setDaysData(days);
            setAData(aadata);
        };

        dataFetch();
    }, [events])

    return (
        <ActogramGraph data={data} days={daysDate} adata={aData}></ActogramGraph>
    )

}