import WebSocket from 'ws';
import { WSPayload } from './src/types/WSPayload'

export function testPebbleClient(msg:string) {
    const ws = new WebSocket('ws://localhost:3000');
    let swingInterval;
    
    let payload: WSPayload = {
        client: 'pebble',
        msg
    };

    ws.on('open', () => {
        console.log('Connected to server');

        ws.send(JSON.stringify({msg: 'Hello from pebble!'}));

        swingInterval = setInterval(() => {
            ws.send(JSON.stringify(payload));
        }, 2000);
    });


    ws.on('message', (message: string) => {
        console.log(`Received message from server: ${message}`);
    });

    ws.on('close', () => {
        console.log('Disconnected from server');
        // clearInterval(swingInterval);
    });
}