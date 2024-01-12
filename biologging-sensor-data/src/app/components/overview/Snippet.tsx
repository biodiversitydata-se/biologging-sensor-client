import { Dataset } from "@/app/interfaces/dataset";

export default function OverviewSnippet({data}: {data: Dataset|null}) {
    return(
        <div>
            <div>
                <div>Title:</div>
                <div>{data?.datasetTitle}</div>
            </div>

            <div>
                <div>Description:</div>
                <div>{data?.datasetDescription}</div>
            </div>

            <div>
                <div>Instruments:</div>
                <div>{data?.instrumentTypes?.join(", ")}</div>
            </div>

            <div>
                <div>Sensors:</div>
                <div>{data?.sensorTypes?.join(", ")}</div>
            </div>
        </div>
    )
}
