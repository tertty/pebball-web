// import { NavLink } from 'react-router-dom'
import '../App.css'
import Button from '../Components/Button';

export default function LandingPage() {
    return (
        <>
          <div className="flex flex-col justify-center rounded-md bg-white w-[80vw] h-[70vh]">
            <h1 className="text-[#272F3F] mb-4">Pebball!</h1>
            <p className="read-the-docs">
                Games for the Pebble Watch
            </p>
            <p className="read-the-docs">
                Have your Peb-bat ready!
            </p>
            <div className="mt-5">
                <Button light={true} to="/game-select" text="Play" />
            </div>
          </div>
        </>
      );
}