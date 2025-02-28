import { Dataset } from "@/api/dataset/dataset";
import { DetailLink, VisualisationLink } from "../links";
import './Snippet.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faCircleInfo, faDownload } from "@fortawesome/free-solid-svg-icons";
import { databaseValues } from "@/config/config";
import { URL_DOWNLOADABLE_ARCHIVES } from "@/config/constants";

export default function OverviewSnippet({ data }: { data: Dataset | null }) {
    const downloadDataset = () => {

        const lastVersion = data!.versions.length-1;
        const filenameLastVersion = data!.versions[lastVersion].file;
        //const version = data!.versions[0].number.replace(".", "_");
        const downloadUrl = `${URL_DOWNLOADABLE_ARCHIVES}${data?.datasetID}/${filenameLastVersion}`;

        window.open(downloadUrl);
    };

    var listSensors = "";
    if (typeof data.valuesMeasured !== 'undefined') {
        Object.keys(data.valuesMeasured).forEach(function (key){
            if (listSensors != "") listSensors = listSensors + ", ";

            listSensors = listSensors + data.valuesMeasured[key];

            if (typeof data?.recordsStatistics !== 'undefined' && typeof data?.recordsStatistics.customStatistics !== 'undefined' && data?.recordsStatistics.customStatistics[data.valuesMeasured[key]+"_PUBLIC"] !== "undefined") {    
                listSensors = listSensors + " (" + data?.recordsStatistics.customStatistics[data.valuesMeasured[key]+"_PUBLIC"] + ")";
            }
        })
    }

    return (
        <div>
            <div className="snippet">
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

            <div className="snippet-content">
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
                                <FontAwesomeIcon icon={faCircleInfo} className="snippet-icon" size="3x" />
                            </DetailLink>

                            {data?.numberOfRecords && data?.numberOfRecords > 0 && data.accessRights!=databaseValues["datasetNoAccess"] ? (
                            <div className="ml-10">
                                <VisualisationLink datasetId={data?.datasetID}>
                                    <FontAwesomeIcon icon={faChartLine} className="snippet-icon" size="3x" />
                                </VisualisationLink>
                            </div>
                            ) : null}

                            {data?.numberOfRecords && data?.numberOfRecords > 0 && data.accessRights!=databaseValues["datasetNoAccess"] && data?.versions[data?.versions.length-1]?.file && data?.versions[data.versions.length-1]?.file!="" ? (
                                <div className="ml-10">
                                    <FontAwesomeIcon icon={faDownload} className="snippet-icon downloadable-icon" onClick={() => downloadDataset()} size="3x" style={{ color: "#1E4B75" }} />
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
                    <div className="col-md-2 bold">Sensors (nb records):</div>
                    <div className="col-md-9">{listSensors}</div>
                </div>

                {data?.embargoEndDate ? ( 
                <div className="row">
                    <div className="col-md-2 bold">Embargo end date:</div>
                    <div className="col-md-9">{data.embargoEndDate}</div>
                </div>
                ) : null}

            </div>
        </div>
    )
}