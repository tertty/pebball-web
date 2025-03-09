import { FunctionComponent, useEffect } from "react";

interface PlayerHitProps {
    callback: Function,
    updateGameState: Function,
    pitchWasThrown: Function
}

const PlayerHit: FunctionComponent<PlayerHitProps> = ({callback, updateGameState, pitchWasThrown}) => {

    useEffect(()=>{
        setTimeout(()=>{
            callback();
            updateGameState(19);
            pitchWasThrown();
        }, 1500);
    },[]);
    return ( 
        <>
            <div id="ball_hit"></div>
        </>
    );
}
 
export default PlayerHit;