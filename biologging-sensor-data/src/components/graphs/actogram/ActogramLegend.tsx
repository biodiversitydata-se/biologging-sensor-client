import { ActogramConfig } from "@/config/model";

export function ActogramLegend({ config }: { config: ActogramConfig[] }) {
    return (
        <div>
            {config.map(itm => (
                <div className="row">
                    <div className="col-md-2" style={{ backgroundColor: itm.color, height: "22px" }}></div>
                    <div className="col-md-10" style={{ textAlign: "left" }}>{itm.label}</div>
                </div>
            ))}
        </div>
    )
}