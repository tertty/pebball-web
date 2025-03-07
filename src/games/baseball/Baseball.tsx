import { FunctionComponent } from "react";

interface BaseballGameProps {
    
}
 
const BaseballGame: FunctionComponent<BaseballGameProps> = () => {

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
    return ( <></> );
}
 
export default BaseballGame;