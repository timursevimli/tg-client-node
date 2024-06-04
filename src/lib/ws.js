'use strict';

const WebSocket = require('ws');

const createConnection = ({ host, port, apiKey }) =>
  new Promise((resolve, reject) => {
    const url = `wss://${host}:${port}`;
    const socket = new WebSocket(url, {
      rejectUnauthorized: false,
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    socket.once('error', reject);
    socket.once('open', () => {
      const isOpened = socket.readyState === WebSocket.OPEN;
      if (isOpened) return void resolve(socket);
      const message = `Connection server error, state: ${socket.readyState}`;
      reject(new Error(message));
    });
  });

module.exports = {
  createConnection,
};
