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

jest.setTimeout(10000);

test('GM updates propagate to players', (done) => {
  const url = `http://localhost:${addr.port}`;
  const tableId = 't1';
  const gm = { _id: 'g1', username: 'GM', role: 'gm' };
  const player = { _id: 'p1', username: 'PL', role: 'player' };

  const c1 = Client(url);
  const c2 = Client(url);

  c1.emit('join-table', { tableId, user: gm });
  c2.emit('join-table', { tableId, user: player });

  let gotMap = false;
  let gotHp = false;
  let gotMusic = false;

  const check = () => {
    if (gotMap && gotHp && gotMusic) {
      c1.close();
      c2.close();
      done();
    }
  };

  c2.on('map-update', (m) => { expect(m).toBe('url1'); gotMap = true; check(); });
  c2.on('player-hp-update', (d) => { expect(d.userId).toBe('p1'); expect(d.hp).toBe(3); gotHp = true; check(); });
  c2.on('music-change', (t) => { expect(t).toBe('song.mp3'); gotMusic = true; check(); });

  setTimeout(() => {
    c1.emit('map-update', { tableId, map: 'url1' });
    c1.emit('player-hp-update', { tableId, userId: 'p1', hp: 3 });
    c1.emit('music-change', { tableId, track: 'song.mp3' });
  }, 100);
});
