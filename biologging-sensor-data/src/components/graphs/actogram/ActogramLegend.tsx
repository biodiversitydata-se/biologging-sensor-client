import { A_ERROR_COLOR, A_NO_MEASURED_COLOR } from "@/config/constants";
import { ActogramC } from "@/config/model";

export function ActogramLegend({ config, labelOrganismTaxon }: { config: ActogramC, labelOrganismTaxon: string }) {
    return (
        <div>
            {config.config.map((itm, index) => (
                <div className="row" key={index}>
                    <div className="col-md-2 legend-color" style={{ backgroundColor: itm.color }}></div>
                    <div className="col-md-10 legend-label">{itm.label}</div>
                </div>
            ))}
            <div className="row">
                <div className="col-md-2 legend-color" style={{ backgroundColor: config.errorCase?.color ?? A_ERROR_COLOR }}></div>
                <div className="col-md-10 legend-label">Error value</div>

            </div>
            <div className="row">
                <div className="col-md-2 legend-color" style={{ backgroundColor: config.notMeasuredCase?.color ?? A_NO_MEASURED_COLOR }}></div>
                <div className="col-md-10 legend-label">Not measured value</div>
            </div>

            <br />
            <div className="legendGraph">{labelOrganismTaxon}</div>
        </div>
    )
}