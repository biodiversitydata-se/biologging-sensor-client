import { Dataset } from "@/interfaces/dataset";
import Link from "next/link";

export default function OverviewSnippet({data}: {data: Dataset|null}) {
    return(
        <div>
            {/* HEADER */}
            <div>
                <div>
                    Dataset record:
                </div>

                <div>
                    <Link href="/detail"> Show all information about this dataset</Link>                    
                </div>

                <div>
                    <Link href="/visual">Data visualisation tool</Link> 
                </div>

            </div>

            {/* CONTENT */}
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
        </div>
    )
}
