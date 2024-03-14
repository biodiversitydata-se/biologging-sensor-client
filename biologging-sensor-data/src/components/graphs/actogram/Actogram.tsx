import { Event } from "@/api/event/event.typscript";
import { filterRecords } from "@/api/record/api";
import { Record } from "@/api/record/record.interface";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export interface ActData {
    [date: string]: ActItem[];

    // date: Date;
    // score: number;
}

export interface ActItem {
    hour: any;
    score: number;
}

export interface ActDaysData {
    [month: string]: number;
    // date: Date;
    // days: number;
}

export default function Actogram({ events }: { events: Event[] }) {
    const [data, setData] = useState<ActData>();
    const [daysDate, setDaysData] = useState<ActDaysData>();
    useEffect(() => {

        const dataFetch = async () => {
            const days: ActDaysData = {};
            const items: ActData = {};

            const relEvent = events[0];
            const ids = [relEvent.eventID];
            const datasetId = [relEvent.datasetID]

            const result = await filterRecords({ eventIds: ids, datasetIds: datasetId });
            const records: Record[] = result.results;

            for (const item of records) {
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
        };

        dataFetch();
    }, [events])

}