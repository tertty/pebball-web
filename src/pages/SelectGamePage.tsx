// import { NavLink } from "react-router-dom";
import Button from "../Components/Button";

export default function SelectGamePage() {
    return (
        <>
                <div className="flex flex-col rounded-md bg-white w-[80vw] h-[70vh]">
                    <div className="mt-5 me-1 mb-auto flex justify-end">
                        <Button to="/" text="Home" light={true}/>
                    </div>
                    <h1 className="text-[#272F3F]">Select Your Game</h1>
                    <div className="flex flex-col h-[100px] justify-between mb-auto">
                        <div className="mt-5">
                            <Button to="/game/baseball" text="Baseball" light={true}/>
                        </div>
                    </div>
                </div>
        </>
    );
}