import { Dataset } from "@/api/dataset/dataset.interface";
import Link from "next/link";

export default function OverviewSnippet({ data }: { data: Dataset | null }) {
        const bold = {
        fontWeight: "bold",
    }
    return (
        <div>
            <div style={{ backgroundColor: "#f2f2f2", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingLeft: "15px", paddingRight: "15px" }}>
                <div>
                    Dataset record: 
                </div>

                <div>
                    <Link href={{
                        pathname: `/detail/[id]`,
                        query: {
                            id: data?.datasetID,
                        },
                    }}
                        as={`/detail/${data?.datasetID}`}>More information</Link>
                </div>

                <div>
                    {data?.numberOfRecords && data?.numberOfRecords > 0 && (
                        <Link href="/visualisation">Visualisation</Link>
                    )}
                </div>

            </div>

            <div style={{ backgroundColor: "#fafafa", paddingLeft: "15px", paddingRight: "15px" }}>
                <div className="row">
                    <div className="col-md-2" style={bold}>Title:</div>
                    <div className="col-md-10">{data?.datasetTitle}</div>
                </div>

                <div className="row">
                    <div className="col-md-2" style={bold}>Description:</div>
                    <div className="col-md-10">{data?.datasetDescription}</div>
                </div>

                <div className="row">
                    <div className="col-md-2" style={bold}>Instruments:</div>
                    <div className="col-md-10">{data?.instrumentTypes?.join(", ")}</div>
                </div>

                <div className="row">
                    <div className="col-md-2" style={bold}>Sensors:</div>
                    <div className="col-md-10">{data?.valuesMeasured?.join(", ")}</div>
                </div>
            </div>
        </div>
    )
}
