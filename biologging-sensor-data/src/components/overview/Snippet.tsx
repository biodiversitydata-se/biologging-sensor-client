import { Dataset } from "@/interfaces/dataset";
import Link from "next/link";

export default function OverviewSnippet({data}: {data: Dataset|null}) {
    return(
        <div className="container">
            {/* HEADER */}
            <div className="row">
                <div className="col-md-6">
                    Dataset record: {data?.datasetID}
                </div>

                <div className="col-md-3">
                    <Link href="/detail"> Show all information about this dataset</Link>                    
                </div>

                <div className="col-md-3 ml-auto">
                    <Link href="/visual">Data visualisation tool</Link> 
                </div>

            </div>

            {/* CONTENT */}
            <div>
                <div className="row">
                    <div className="col-md-2">Title:</div>
                    <div>{data?.datasetTitle}</div>
                </div>

                <div className="row">
                    <div className="col-md-2">Description:</div>
                    <div>{data?.datasetDescription}</div>
                </div>

                <div className="row">
                    <div className="col-md-2">Instruments:</div>
                    <div>{data?.instrumentTypes?.join(", ")}</div>
                </div>

                <div className="row">
                    <div className="col-md-2">Sensors:</div>
                    <div>{data?.sensorTypes?.join(", ")}</div>
                </div>                
            </div>
        </div>
    )
}
