const http = require('http');
const express = require('express');
const Client = require('socket.io-client');
const { init } = require('../src/socket');

let ioServer, httpServer, addr;

beforeAll((done) => {
  const app = express();
  httpServer = http.createServer(app);
  ioServer = init(httpServer);
  httpServer.listen(() => {
    addr = httpServer.address();
    done();
  });
});

afterAll((done) => {
  ioServer.close();
  httpServer.close(done);
});

test('start-game notifies all lobby members', (done) => {
  const url = `http://localhost:${addr.port}`;
  const tableId = 'room1';
  const gm = { _id: 'u1', username: 'GM', role: 'master' };
  const player = { _id: 'u2', username: 'P1', role: 'player' };

  const c1 = Client(url);
  const c2 = Client(url);

  let received1 = false;
  let received2 = false;
  const check = () => {
    if (received1 && received2) {
      c1.close();
      c2.close();
      done();
    }
  };

  c1.emit('join-lobby', { tableId, user: gm });
  c2.emit('join-lobby', { tableId, user: player });

  c1.on('game-started', () => {
    received1 = true;
    check();
  });
  c2.on('game-started', () => {
    received2 = true;
    check();
  });

  // Wait a moment to ensure both clients joined before starting
  setTimeout(() => {
    c1.emit('start-game', { tableId });
  }, 50);
});
