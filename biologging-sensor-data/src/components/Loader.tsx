import { CSSProperties } from "react";
import { ClipLoader } from "react-spinners";

const override: CSSProperties = {
    display: "block",
    marginLeft: "50%",
    marginTop: "25px",
    borderColor: "red",
};

export default function Loader() {

    return (
        <ClipLoader
            size={30}
            cssOverride={override}
        />
    )
}