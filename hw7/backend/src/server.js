import http from 'http';
import express from 'express';
import mongoose from 'mongoose'
import WebSocket from 'ws';
import mongo from './mongo.js';
import wsConnect from './wsConnect.js';

mongo.connect();
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const db = mongoose.connection;

db.once('open', () => {
    console.log("MongoDB connected!");
    wss.on('connection', (ws) => {
        console.log('connected');
        ws.box = '';
        ws.onmessage = wsConnect.onMessage(ws);
    });
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => { console.log(`listening on PORT ${PORT}`) });