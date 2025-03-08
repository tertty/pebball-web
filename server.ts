import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import path from 'path';
import { testPebbleClient } from './test-pebble';
import { WSEvent } from './src/types/WSEvent';

const app = express();
const server = http.createServer(app);
// const wss = new WebSocketServer({ noServer: true });
const port = process.env.PORT || 3000;

app.use(express.static(path.join(path.dirname(''), 'dist')));

interface User {
    game?: string,
    sessId: number | null,
    hits?: number,
    score?: number
}
// let store: Array<User> = {

// };
let store: User = {
    game: 'baseball',
    sessId: null,
    hits: 0,
    score: 0
};

let allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
};

app.use(allowCrossDomain);

app.get("/getID", (req, res) => {
    console.log("generating session Id...");
    const sessId = store.sessId ?? Math.floor(Math.random()*(999-100+1)+100);
    console.log("session Id: " + sessId);
    if ( !store.sessId ) {
        startWebSocketServer(sessId);
        // testPebbleClient();
    }
    res.status(200).json({id: sessId});
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    console.log("ctrl + c to quit");
});

// functions

function startWebSocketServer(sessId: number) {
    console.log("starting websocket server...");
    let wsPath = "";
    if (!store.sessId) {
        wsPath = "/" + sessId.toString();
        store.sessId = sessId;
    } else {
        wsPath = "/" + store.sessId.toString();
    }
    const wss = new WebSocketServer({ noServer: true, path: wsPath });
    // const wss = new WebSocketServer({ noServer: true });
    // Handle WebSocket connections
    wss.on('connection', ws => {
        console.log('Client connected');
    
        ws.on('message', (message: string) => {
            let packet = JSON.parse(message);
            if ( packet.msg ) {
                console.log(`Received: ${packet.msg}`);
            } else {
                console.log(`Received event: ${packet.event}`);
            }

            // Broadcast the message to all connected clients (the gui)
            wss.clients?.forEach(client => {
                if (client !== ws && client.readyState === 1) {
                    // client.send(JSON.stringify({msg: `Broadcast: ${packet.msg}`}));
                    if ( packet.msg ) {
                        client.send(JSON.stringify({msg: `Broadcast: ${packet.msg}`}));
                    } else {
                        client.send(JSON.stringify(packet));
                    }
                }
            });
        });

        ws.on('open', ()=>{
            let connectEvent: WSEvent = {
                event: 16,
                ackd_event: 16
            };
            ws.send(JSON.stringify(connectEvent));
        });
    
        ws.on('close', () => {
            console.log('Client disconnected');
            // wss.close();
            // store.sessId = null;
        });
    
        ws.on('error', error => {
            console.error('WebSocket error:', error);
        });
    });

    server.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (ws) => {
          wss.emit('connection', ws, request);
        });
    });

    console.log("starting faked pebble client");
    testPebbleClient(sessId);
}
