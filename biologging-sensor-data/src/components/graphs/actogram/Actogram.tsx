import { Event } from "@/api/event/event.typscript";
import { filterRecords } from "@/api/record/api";
import { Record } from "@/api/record/record.interface";
import { format, parse, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { AData } from "./interface";
import ActogramGraph from "./ActogramGraph";
import { S } from "./const";
import { ActogramC } from "@/config/model";
import { ActogramLegend } from "./ActogramLegend";
import ErrorComponent from "@/components/Error";
import { AxiosError } from "axios";


export default function Actogram({ events, sensor, config }: { events: Event[], sensor: string, config: ActogramC }) {
    const [data, setData] = useState<AData[]>();
    const [counts, setCounts] = useState<Map<string, number>>(new Map<string, number>());
    const [days, setDay] = useState<number>(0);
    const [showError, setShowError] = useState<boolean>(false);

    useEffect(() => {
        if (!events.length) return;

        const dataFetch = async () => {
            const items: AData[] = [];
            const monthCounts: Map<string, number> = new Map<string, number>();

            const relEvent = events[0];
            const ids = [relEvent.eventID];
            const datasetId = [relEvent.datasetID];

            // load data
            const records: Record[] = [];
            let noRecs = relEvent.numberOfRecords;
            let skip = 0;
            while (noRecs > 0) {
                const take = noRecs < 1000 ? noRecs : 1000;

                const result = await filterRecords({ eventIds: ids, datasetIds: datasetId }, { take: take, skip: skip });
                if (result instanceof AxiosError) {
                    setShowError(true);
                    return;
                }
                records.push(...result.results);

                skip += 1000;
                noRecs -= 1000;
            }

            for (let i = 0; i < records.length; i++) {
                const item = records[i];
                const date = new Date(Date.parse(item.recordStart.slice(0, 19)));
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
            setShowError(false);

        };

        dataFetch();
    }, [events])

    return (
        <div>
            {showError ? <ErrorComponent /> :
                <div>
                    <div className="row">
                        <div className="col-md-9">
                            <ActogramGraph data={data} mCounts={counts} days={days} config={config.config}></ActogramGraph>
                        </div>
                        <div className="col-md-3" style={{ marginTop: "100px" }}>
                            <ActogramLegend config={config.config} ></ActogramLegend>
                        </div>
                    </div>
                </div>
            }
        </div>

    )

}