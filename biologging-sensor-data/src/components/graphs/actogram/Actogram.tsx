import { Event } from "@/api/event/event";
import { filterRecords } from "@/api/record/api";
import { getOrganism } from '@/api/organism/api';
import { Record } from "@/api/record/record";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { AData } from "./interface";
import ActogramGraph from "./ActogramGraph";
import { S, T_LABEL_OFFSET } from "./const";
import { ActogramC } from "@/config/model";
import { ActogramLegend } from "./ActogramLegend";
import ErrorComponent from "@/components/Error";
import { AxiosError } from "axios";
import Loader from "@/components/Loader";
import { A_ERROR_VALUE, A_NO_MEASURED_VALUE, MAX_RECORD_VALUES_ACTOGRAM } from "@/config/constants";


export default function Actogram({ events, valueMeasured, config }: { events: Event[], valueMeasured: string, config: ActogramC }) {
    const [data, setData] = useState<AData[]>();
    const [counts, setCounts] = useState<Map<string, number>>(new Map<string, number>());
    const [days, setDay] = useState<number>(0);
    const [showError, setShowError] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [errorValue, setErrorValue] = useState<number>(-1);
    const [notMeasuredValue, setNotMeasuredValue] = useState<number>(-2);
    const [labelOrganismTaxon, setLabelOrganismTaxon] = useState<string>('');

    useEffect(() => {
        if (!events.length) return;

        const dataFetch = async () => {
            setLoaded(false);

            // set error and not measred values from config
            const errorV = config.errorCase?.value ?? A_ERROR_VALUE;
            const notMeasuredV = config.notMeasuredCase?.value ?? A_NO_MEASURED_VALUE;

            const items: AData[] = [];
            const monthCounts: Map<string, number> = new Map<string, number>();

            // take first event
            const indexEvent=0;
            const relEvent = events[indexEvent];
            const ids = [relEvent.eventID];
            const datasetId = [relEvent.datasetID];

            // check if value measured present in events
            if (!relEvent.valuesMeasured.some(itm => itm === valueMeasured)) {
                return;
            }

            // load data
            const records: Record[] = [];
            let noRecs = relEvent.numberOfRecordsDatabase;
            // maximum number of records to be displayed
            if (noRecs>MAX_RECORD_VALUES_ACTOGRAM) noRecs=MAX_RECORD_VALUES_ACTOGRAM;
            let skip = 0;
            while (noRecs > 0) {
                const take = noRecs < 1000 ? noRecs : 1000;

                const result = await filterRecords({ eventIds: ids, datasetIds: datasetId }, { take: take, skip: skip });
                if (result instanceof AxiosError) {
                    setShowError(true);
                    return;
                }
                // slice to the maximum number of records
                records.push(...result.results.slice(0,MAX_RECORD_VALUES_ACTOGRAM));

                skip += 1000;
                noRecs -= 1000;
            }

            for (let i = 0; i < records.length; i++) {
                const item = records[i];
                const date = new Date(Date.parse(item.recordStart.slice(0, 19)));
                let score = item.recordValues.activity.acc_sum;

                // validate if measured correctly 
                let sum = 0;
                for (let i = 0; i < 6; i++) {
                    sum += i * (item.recordValues.activity[`acc_${i}`]);
                }

                if (sum.toString() !== score) {
                    score = errorV;
                }

                // make key for dictionary
                const currentMonth = format(date, 'LLLL');
                const currentYear = format(date, "yy");
                const currentHour = date.getHours();
                const dayKey: string = currentMonth + currentYear;

                if (i === 0) { // first entry, pad with empty until the current hour
                    for (let j = 0; j < currentHour; j++) {
                        const itm: AData = {
                            x: (j * S),
                            y: 0,
                            value: notMeasuredV, // not masure value for now
                        }

                        items.push(itm);
                    }
                }

                // create new data point with proper coordinates
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


            const organismResponse = await getOrganism(events[indexEvent].organismID);
            if (organismResponse instanceof AxiosError) {
              setShowError(true);
              return;
            }

            const labelOrganismTaxon = events[indexEvent].eventTaxon[0].taxonScientificName + " - " + organismResponse.internalOrganismId

            setData(items);
            setCounts(monthCounts);
            setShowError(false);
            setLoaded(true);
            setNotMeasuredValue(notMeasuredV);
            setErrorValue(errorV);
            setLabelOrganismTaxon(labelOrganismTaxon);
        };

        dataFetch();
    }, [events, config.errorCase?.value, config.notMeasuredCase?.value, valueMeasured])

    return (
        <div>
            {
                !loaded && <Loader />
            }
            {
                loaded &&
                    showError ? <ErrorComponent /> :
                    <div>
                        <div className="row">
                            {<div className="col-md-9">
                                <ActogramGraph
                                    data={data}
                                    mCounts={counts}
                                    days={days}
                                    config={config}
                                    errorValue={errorValue}
                                    notMeasuredValue={notMeasuredValue} />
                            </div>}
                            {loaded && <div className="col-md-3" style={{ marginTop: T_LABEL_OFFSET }}>
                                <ActogramLegend config={config} labelOrganismTaxon={labelOrganismTaxon} ></ActogramLegend>
                            </div>}
                        </div>

                        <br />

                        <div className="legendGraph">Activity data for one randomly selected animal (taxon and animal ID in figure legend) 
                        showing the first {MAX_RECORD_VALUES_ACTOGRAM} measurements, starting at top from the time of sensor deployment. 
                        Each horizontal row shows data from two consecutive days with blocks corresponding to one hour. 
                        The second day is repeated as the first day in the next row to enable better views of night periods between days. 
                        The colour of blocks corresponds to the mean activity level calculated for that hour, ranging from no activity to continuous activity.
                        <br />See Bäckman et al. (2017, DOI: <a href="https://doi.org/10.1111/jav.01068" target="_blank">10.1111/jav.01068</a>) for more details on methodology being the basis for activity measurements and the data displayed in an actogram.
                        </div>
                    </div>

            }
        </div>

    )

}