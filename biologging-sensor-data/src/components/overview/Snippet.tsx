import { Dataset } from "@/api/dataset/dataset.interface";
import { DetailLink, VisualisationLink } from "../links";
import './Snippet.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faCircleInfo, faDownload } from "@fortawesome/free-solid-svg-icons";

export default function OverviewSnippet({ data }: { data: Dataset | null }) {
    const downloadDataset = () => {
        const baseUrl = "http://canmove-dev.ekol.lu.se/biologgingPublicArchives/";
        const version = data.versions[0].number.replace(".","_");
        const downloadUrl = `${baseUrl}${data?.datasetID}/${data?.datasetID}_json_${version}.zip`;

        window.open(downloadUrl);
    };

    const firstVersion = data?.versions && data.versions[0];


    return (
        <div>
            <div style={{ backgroundColor: "#f2f2f2", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingLeft: "15px", paddingRight: "15px" }}>
                <div>
                    Dataset overview:
                </div>

                <DetailLink datasetId={data?.datasetID}>More information</DetailLink>

                <div>
                    {data?.numberOfRecords && data?.numberOfRecords > 0 ?
                        <VisualisationLink datasetId={data?.datasetID}>Visualisation</VisualisationLink> : null
                    }
                </div>

            </div>

            <div style={{ backgroundColor: "#fafafa", paddingLeft: "15px", paddingRight: "15px" }}>
                <div className="row">
                    <div className="col-md-2 bold">Title:</div>
                    <div className="col-md-8">{data?.datasetTitle}</div>
                </div>

                <div className="row">
                    <div className="col-md-2 bold">Description:</div>
                    <div className="col-md-8">{data?.datasetDescription}</div>
                    <div className="col-md-2">
                        <div className="row" style={{ display: "flex", justifyContent: "space-between" }}>
                            <DetailLink datasetId={data?.datasetID}>
                                <FontAwesomeIcon icon={faCircleInfo} className="snippet-icon" size="3x"/>
                            </DetailLink>
                                    
                                <div style={{ marginLeft: "10px" }}>
                                    <VisualisationLink datasetId={data?.datasetID}>
                                        <FontAwesomeIcon icon={faChartLine} className="snippet-icon" size="3x"/>
                                    </VisualisationLink>
                                </div>

                                {data?.numberOfRecords && data?.numberOfRecords > 0 ? (
                                 <div style={{ marginLeft: "10px" }}>
                                    <FontAwesomeIcon icon={faDownload} className="snippet-icon" onClick={() => downloadDataset(data?.datasetID || '')} size="3x" style={{ color: "#1E4B75" }} />

                                </div>
                            ) : null}

                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-2 bold">Instruments:</div>
                    <div className="col-md-10">{Array.isArray(data?.instrumentTypes) ? data.instrumentTypes.join(", ") : data?.instrumentTypes}</div>
                </div>

                <div className="row">
                    <div className="col-md-2 bold">Sensors:</div>
                    <div className="col-md-9">{data?.valuesMeasured?.join(", ")}</div>
                </div>
            </div>
        </div>
    )
}