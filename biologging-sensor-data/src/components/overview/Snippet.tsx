import { Dataset } from "@/api/dataset/dataset.interface";
import Link from "next/link";

// #f2f2f2 - table header
// #fafafa table content

export default function OverviewSnippet({data}: {data: Dataset|null}) {
    const bold = {
        fontWeight: "bold",
    }
    return(
        <div>
            {/* HEADER */}
            <div style={{backgroundColor: "#f2f2f2", display: "flex", flexDirection:"row", justifyContent: "space-between", paddingLeft: "15px", paddingRight: "15px"}}>
                <div>
                    Dataset record: <span style={bold}>{data?.datasetID}</span>
                </div>

                <div>
                    <Link href={{
                          pathname: `/detail/[id]`,
                          query: {
                            id: data?.datasetID,
                          },
                        }}
                        as={`/detail/${data?.datasetID}`}> Show all information about this dataset</Link>                    
                </div>

                <div>
                    <Link href="/visual">Data visualisation tool</Link> 
                </div>

            </div>

            {/* CONTENT */}
            <div style={{backgroundColor: "#fafafa", paddingLeft: "15px", paddingRight: "15px"}}>
                <div className="row">
                    <div className="col-md-2" style={bold}>Title:</div>
                    <div>{data?.datasetTitle}</div>
                </div>

                <div className="row">
                    <div className="col-md-2" style={bold}>Description:</div>
                    <div>{data?.datasetDescription}</div>
                </div>

                <div className="row">
                    <div className="col-md-2" style={bold}>Instruments:</div>
                    <div>{data?.instrumentTypes?.join(", ")}</div>
                </div>

                <div className="row">
                    <div className="col-md-2" style={bold}>Sensors:</div>
                    <div>{data?.sensorTypes?.join(", ")}</div>
                </div>                
            </div>
        </div>
    )
}
