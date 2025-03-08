// import { useState } from "react";
import { useEffect, useRef, useState } from "react";
// import { NavLink } from "react-router-dom";
import { WSPayload } from "../types/WSPayload";
import { WSEvent } from "../types/WSEvent";
import GetIntoPosition from "../games/baseball/GetIntoPosition";
import WaitingForThrow from "../games/baseball/WaitingForThrow";
import PitchThrown from "../games/baseball/PitchThrown";
import PlayerHit from "../games/baseball/PlayerHit";
import PlayerMissed from "../games/baseball/PlayerMissed";
import Button from '../Components/Button';

// interface Props {
//     swingStatus: string
// }

const BaseballPage = () => {
    const [sessionId, setSessionId] = useState<number>();
    const [gameStart, setGameStart] = useState(false);
    const [_isInPosition, setIsInPosition] = useState(false);
    const [_pitchThrown, setPitchThrown] = useState(false);
    const [_playerHit, setPlayerHit] = useState(false);
    const [_playerMiss, setPlayerMiss] = useState(false);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState(0);
    const websocket: React.RefObject<WebSocket | null> = useRef(null);

    let url = import.meta.env.VITE_DOMAIN!;
    let port = import.meta.env.VITE_PORT!;

    //gen session ID on load
    useEffect(()=>{
        generateSession().then(data => {
            // setSessionId(() => data);
            // startGame(data);
            // websocket.current = new WebSocket("ws://localhost:3000/"+data);
            websocket.current = new WebSocket("ws://" + url + ":" + port + "/" + data);
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
                if ( packet.msg ) {
                    console.log(packet.msg);
                } else {
                    console.log(packet);
                }
                if ( packet.event ) {
                    gameManager(packet);
                }
            }
        });
        return () => {
            websocket.current?.close();
        }
    }, []);

    // set game start to false when component unmounts
    useEffect(()=>{
        return ()=>{
            setGameStart(()=>false);
        };
    },[gameStart]);

    async function generateSession() {
        try {
            // const response = await fetch("http://localhost:3000/getID", { cache: 'no-store' });
            // let url = import.meta.env.VITE_DOMAIN!;
            // let port = import.meta.env.VITE_PORT!;
            const response = await fetch("http://" + url + ":" + port + "/getID", { cache: 'no-store' });
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
                    setGameState(()=>payload.event);
                    break;
                case 17:
                    setGameState(()=>payload.event);
                    break;
                case 18:
                    setGameState(()=>payload.event);
                    setGameStart(()=>true);
                    break;
                case 19:
                    setGameState(()=>payload.event);
                    // setGameStart(()=>false);
                    setIsInPosition(()=>true);
                    break;
                case 20:
                    setGameState(()=>payload.event);
                    setIsInPosition(()=>false);
                    setPitchThrown(()=>true);
                    break;
                case 21: // batter hit
                    setGameState(()=>payload.event);
                    playerDidHit();
                    setScore(score=>score++);
                    break;
                case 22: // batter miss event
                    setGameState(()=>payload.event);
                    playerDidMiss();
                    setScore(score=>score > 0 ? score-- : score);
                    break;
                default:
                    throw new Error("event doesn't match api!");
            }
        }
        catch (e: any) {
            console.error(e.message);
        }
    }

    function playerDidHit() {
        setPlayerHit(hit=>!hit);
    }

    function playerDidMiss() {
        setPlayerMiss(miss=>!miss);
    }

    function updateGameState(num: number) {
        setGameState(()=>num);
    }

    function pitchWasThrown() {
        setPitchThrown(pitch=>!pitch);
    }

    return (
        <>
            <div className="w-[100vw] h-[100vh]">
                <div className="flex justify-end me-1">
                    <Button to="/" text="Home" light={false}/>
                </div>
                <h1>baseball page</h1>
                <p>score: {score}</p>
                { (gameState == 0 || gameState == 17) && <div>
                    <h2>Session ID: {sessionId}</h2>
                    <p>Set this session Id on your pebble to get started!</p>
                </div>}
                { gameState == 18 && <GetIntoPosition />}
                {/* { (isInPosition || gameState == 19) && <WaitingForThrow />} */}
                { (gameState == 19) && <WaitingForThrow />}
                {/* { pitchThrown && <PitchThrown />} */}
                { (gameState == 20 || gameState == 21 || gameState == 22) && <PitchThrown />}
                {/* { playerHit && <PlayerHit callback={playerDidHit} updateGameState={updateGameState} pitchWasThrown={pitchWasThrown} />} */}
                { gameState == 21 && <PlayerHit callback={playerDidHit} updateGameState={updateGameState} pitchWasThrown={pitchWasThrown} />}
                {/* { playerMiss && <PlayerMissed callback={playerDidMiss} updateGameState={updateGameState} pitchWasThrown={pitchWasThrown} />} */}
                { gameState == 22 && <PlayerMissed callback={playerDidMiss} updateGameState={updateGameState} pitchWasThrown={pitchWasThrown} />}
            </div>
        </>
    );
}

export default BaseballPage;
