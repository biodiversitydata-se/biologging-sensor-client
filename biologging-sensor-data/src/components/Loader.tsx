import { CSSProperties } from "react";
import { MoonLoader } from "react-spinners";

const override: CSSProperties = {
    display: "block",
    marginLeft: "50%",
    marginTop: "25px",
    borderColor: "red",
};

export default function Loader() {

    return (
        <MoonLoader
            size={30}
            cssOverride={override}
        />
    )
}