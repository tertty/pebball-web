import WebSocket from 'ws';
import { WSPayload } from './src/types/WSPayload'
import { WSEvent } from './src/types/WSEvent';
// import { WSEvent } from './src/types/WSEvent'

export function testPebbleClient(sessId: number) {
    const ws = new WebSocket('ws://localhost:3000/'+sessId);
    let swingInterval;

    ws.on('open', () => {
        console.log('fake pebble connected to server');

        // ws.send(JSON.stringify({msg: 'Hello from pebble!'}));
        ws.send(JSON.stringify(eventPayload(16)));

        let count = 17;
        swingInterval = setInterval(() => {
            ws.send(JSON.stringify(eventPayload(count)));
            count++;
            if(count == 23){ count = 17; }
        }, 2000);
    });


    ws.on('message', (message: string) => {
        // console.log(`Received message from server: ${message}`);
        console.log('Received message from server. Message: ');
        console.log(message);
    });

    ws.on('close', () => {
        console.log('Disconnected from server');
        // clearInterval(swingInterval);
    });
}

function eventPayload(num: number, ackd_event = num, wrist_position = "L", pitch_reach_time = 8, swing_epoch = 8) {
    let p: WSEvent = {
        event: num,
        ackd_event,
        wrist_position,
        pitch_reach_time,
        swing_epoch
    };
    return p;
}