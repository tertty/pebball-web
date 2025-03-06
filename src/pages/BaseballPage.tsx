// import { useState } from "react";
import { NavLink } from "react-router-dom";

interface Props {
    swingStatus: string
}

const BaseballPage: React.FC<Props> = ({swingStatus}) => {
    // const [swingStatus, setSwingStatus] = useState("");
    return (
        <>
            <div>
                <NavLink to="/" className={"underline"}>Home</NavLink>
                <h1>baseball page</h1>
                <p>swing status: {swingStatus}</p>
            </div>
        </>
    );
}

export default BaseballPage;