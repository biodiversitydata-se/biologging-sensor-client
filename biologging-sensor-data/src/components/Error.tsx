import { ERROR_LOAD_DATA } from "@/constants";

export default function ErrorComponent() {
    return (
        <div style={{ backgroundColor: '#6691A4', color: '#fff', padding: '20px', borderRadius: '5px', marginTop: '10px' }}>
            {ERROR_LOAD_DATA}
        </div>
    )
}