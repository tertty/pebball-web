// import { useState } from "react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { WSPayload } from "../types/WSPayload";
import { WSEvent } from "../types/WSEvent";

// interface Props {
//     swingStatus: string
// }

const BaseballPage = () => {
    // const [swingStatus, setSwingStatus] = useState("");
    const [sessionId, setSessionId] = useState<number>();
    // const [startGame, setStartGame] = useState(false);
    const websocket: React.RefObject<WebSocket | null> = useRef(null);

    // useEffect(() => {
    //     websocket.current = new WebSocket("ws://localhost:3000");
    
    //     let payload: WSPayload = {
    //       client: 'client',
    //       msg: "ping!"
    //     };
    //     websocket.current.onopen = () => {
    //       console.log("app loaded, pinging the server");
    //       websocket.current?.send(JSON.stringify(payload));
    //     }
    
    //     websocket.current.onmessage = (event) => {
    //       let packet = JSON.parse(event.data);
    //       console.log(packet.msg);
    //       if ( packet.msg === "Broadcast: swung!") {
    //         setSwingStatus(() => Math.random() > 0.5 ? "hit!" : "missed!");
    //       }
    //     }
    
    //     return () => {
    //       websocket.current?.close();
    //     }
    //   }, []);

    //gen session ID on load
    useEffect(()=>{
        generateSession().then(data => {
            // setSessionId(() => data);
            // startGame(data);
            websocket.current = new WebSocket("ws://localhost:3000/"+data);
            let payload: WSPayload = {
                client: 'client',
                msg: "ping!"
            };
            websocket.current.onopen = () => {
                console.log("app loaded, pinging the server");
                websocket.current?.send(JSON.stringify(payload));
            }
        
            websocket.current.onmessage = (event) => {
                let packet = JSON.parse(event.data);
                console.log(packet.msg);
                // if ( packet.msg === "Broadcast: swung!") {
                //     setSwingStatus(() => Math.random() > 0.5 ? "hit!" : "missed!");
                // }
                if ( packet.event ) {
                    gameManager(packet);
                }
            }
        });
        return () => {
            websocket.current?.close();
        }
    }, []);

    async function generateSession() {
        try {
            const response = await fetch("/getID");
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setSessionId(() => data.id);
            return data.id;
        } catch (e: any) {
            console.error(e.message);
        }
    }

    function gameManager(payload: WSEvent) {
        try {
            switch (payload.event) {
                case 16:
                    break;
                case 17:
                    break;
                case 18:
                    break;
                case 19:
                    break;
                case 20:
                    break;
                case 21:
                    break;
                default:
                    throw new Error("event doesn't match api!");
            }
        }
        catch (e: any) {
            console.error(e.message);
        }
    }

    return (
        <>
            <div>
                <NavLink to="/" className={"underline"}>Home</NavLink>
                <h1>baseball page</h1>
                {/* <p>swing status: {swingStatus}</p> */}
                <div>
                    <h2>Session ID: {sessionId}</h2>
                    <p>Set this session Id on your pebble to get started!</p>
                </div>
                {}
            </div>
        </>
    );
}

export default BaseballPage;