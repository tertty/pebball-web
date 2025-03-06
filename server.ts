import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import path from 'path';
import { testPebbleClient } from './test-pebble';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });
const port = process.env.PORT || 3000;

app.use(express.static(path.join(path.dirname(''), 'dist')));

// Handle WebSocket connections
wss.on('connection', ws => {
    console.log('Client connected');
  
    ws.on('message', (message: string) => {
        let packet = JSON.parse(message);
        console.log(`Received: ${packet.msg}`);

        // Broadcast the message to all connected clients
        wss.clients?.forEach(client => {
            if (client !== ws && client.readyState === 1) {
            client.send(JSON.stringify({msg: `Broadcast: ${packet.msg}`}));
            }
        });
    });
  
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  
    ws.on('error', error => {
      console.error('WebSocket error:', error);
    });
});

// spoofing the websocket connection from the pebble
// remove when connecting pebble
testPebbleClient("swung!");

// Upgrade HTTP connection to WebSocket
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
});

// app.listen(port, () => {
//     console.log("app starting on port: " + port);
//     console.log("ctrl + c to quit");
// });

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    console.log("ctrl + c to quit");
});
