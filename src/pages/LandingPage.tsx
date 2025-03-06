import { NavLink } from 'react-router-dom'
import '../App.css'

export default function LandingPage() {
    return (
        <>
          <h1>Pebball!</h1>
          <div className="card">
            <NavLink to="/game-select" className="underline">Play</NavLink>
          </div>
          <p className="read-the-docs">
            Have your Pebble ready!
          </p>
        </>
      );
}