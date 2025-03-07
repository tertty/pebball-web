import './App.css'
// import { useEffect, useRef, useState } from 'react'
// import { WSPayload } from './types/WSPayload'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SelectGamePage from './pages/SelectGamePage';
import BaseballPage from './pages/BaseballPage';

const App = () => {

  // const [swingStatus, setSwingStatus] = useState("");
  // const websocket: React.RefObject<WebSocket | null> = useRef(null);

  // useEffect(() => {
  //   websocket.current = new WebSocket("ws://localhost:3000");

  //   let payload: WSPayload = {
  //     client: 'client',
  //     msg: "ping!"
  //   };
  //   websocket.current.onopen = () => {
  //     console.log("app loaded, pinging the server");
  //     websocket.current?.send(JSON.stringify(payload));
  //   }

  //   websocket.current.onmessage = (event) => {
  //     let packet = JSON.parse(event.data);
  //     console.log(packet.msg);
  //     if ( packet.msg === "Broadcast: swung!") {
  //       setSwingStatus(() => Math.random() > 0.5 ? "hit!" : "missed!");
  //     }
  //   }

  //   return () => {
  //     websocket.current?.close();
  //   }
  // }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/game-select" element={<SelectGamePage />} />
          <Route path="/game">
            <Route path="baseball" element={<BaseballPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
