// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get('/', (req, res) => {
  res.send('Server is running');
});

wss.on('connection', (ws) => {
    console.log('Client connected');
  
    // Listen for messages from clients
    ws.on('message', (message) => {
      console.log(`Received: ${message}`);
    });
  
    // Send a welcome message to the client
    ws.send('Welcome to the server!');
  });

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
