import { ERROR_LOAD_DATA } from "@/config/constants";

export default function ErrorComponent() {
    return (
        <div className="error-component">
            {ERROR_LOAD_DATA}
        </div>
    )
}