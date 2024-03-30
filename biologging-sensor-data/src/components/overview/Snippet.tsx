import { Dataset } from "@/api/dataset/dataset.interface";
import { DetailLink, VisualisationLink } from "../links";
import './Snippet.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faCircleInfo } from "@fortawesome/free-solid-svg-icons";


export default function OverviewSnippet({ data }: { data: Dataset | null }) {
    return (
        <div>
            <div style={{ backgroundColor: "#f2f2f2", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingLeft: "15px", paddingRight: "15px" }}>
                <div>
                    Dataset record:
                </div>

                <DetailLink datasetId={data?.datasetID}>More information</DetailLink>

                <div>
                    {data?.numberOfRecords && data?.numberOfRecords > 0 && (
                        <VisualisationLink datasetId={data?.datasetID}>Visualisation</VisualisationLink>
                    )}
                </div>

            </div>

            <div style={{ backgroundColor: "#fafafa", paddingLeft: "15px", paddingRight: "15px" }}>
                <div className="row">
                    <div className="col-md-2 bold">Title:</div>
                    <div className="col-md-9">{data?.datasetTitle}</div>
                </div>

                <div className="row">
                    <div className="col-md-2 bold">Description:</div>
                    <div className="col-md-8">{data?.datasetDescription}</div>
                    <div className="col-md-2">
                        <div className="row" style={{ display: "flex", justifyContent: "space-between" }}>
                            <DetailLink datasetId={data?.datasetID}>
                                <FontAwesomeIcon icon={faCircleInfo} className="snippet-icon" style={{ marginRight: "20px" }} />
                            </DetailLink>

                            {data?.numberOfRecords && data?.numberOfRecords > 0 && (
                                <VisualisationLink datasetId={data?.datasetID}>
                                    <FontAwesomeIcon icon={faChartLine} className="snippet-icon" />
                                </VisualisationLink>
                            )}

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-2 bold">Instruments:</div>
                    <div className="col-md-9">{data?.instrumentTypes?.join(", ")}</div>
                </div>

                <div className="row">
                    <div className="col-md-2 bold">Sensors:</div>
                    <div className="col-md-9">{data?.valuesMeasured?.join(", ")}</div>
                </div>
            </div>
        </div>
    )
}
