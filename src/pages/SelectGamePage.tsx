import { NavLink } from "react-router-dom";

export default function SelectGamePage() {
    return (
        <>
            <div>
                <h1>Select Your Game</h1>
                <div className="flex flex-col">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/game/baseball">Baseball</NavLink>
                </div>
            </div>
        </>
    );
}