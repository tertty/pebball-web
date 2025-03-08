import { FunctionComponent, useEffect } from "react";

interface PlayerMissedProps {
    callback: Function,
    updateGameState: Function,
    pitchWasThrown: Function
}
 
const PlayerMissed: FunctionComponent<PlayerMissedProps> = ({callback, updateGameState, pitchWasThrown}) => {
    useEffect(()=>{
        setTimeout(()=>{
            callback();
            updateGameState(19);
            pitchWasThrown();
        }, 1500);
    },[]);
    return ( 
        <>
            <div><h3>Missed!</h3></div>
        </> 
    );
}
 
export default PlayerMissed;