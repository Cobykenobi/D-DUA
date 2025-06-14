const { Server } = require('socket.io');
const { createServer } = require('http');
const ioClient = require('socket.io-client');

let io, server, port;

beforeAll(done => {
  server = createServer();
  io = new Server(server);
  const sessions = {};
  io.on('connection', socket => {
    socket.on('join-lobby', ({ tableId, user }) => {
      if (!sessions[tableId]) sessions[tableId] = [];
      if (!sessions[tableId].find(u => u._id === user._id)) {
        sessions[tableId].push(user);
      }
      socket.join(tableId);
      io.to(tableId).emit('lobby-players', { players: sessions[tableId] });
    });
  });
  server.listen(() => {
    port = server.address().port;
    done();
  });
});

afterAll(done => {
  io.close();
  server.close(done);
});

test('clients with same tableId see each other', done => {
  const tableId = 'test123';
  const client1 = ioClient(`http://localhost:${port}`);
  const client2 = ioClient(`http://localhost:${port}`);
  const user1 = { _id: '1', username: 'One', role: 'player' };
  const user2 = { _id: '2', username: 'Two', role: 'player' };
  let players1, players2;

  function check() {
    if (players1 && players2 && players1.length === 2 && players2.length === 2) {
      try {
        expect(players1).toHaveLength(2);
        expect(players2).toHaveLength(2);
        const ids1 = players1.map(p => p._id);
        const ids2 = players2.map(p => p._id);
        expect(ids1).toEqual(expect.arrayContaining(['1', '2']));
        expect(ids2).toEqual(expect.arrayContaining(['1', '2']));
        done();
      } finally {
        client1.close();
        client2.close();
      }
    }
  }

  client1.on('lobby-players', data => { players1 = data.players; check(); });
  client2.on('lobby-players', data => { players2 = data.players; check(); });

  client1.emit('join-lobby', { tableId, user: user1 });
  client2.emit('join-lobby', { tableId, user: user2 });
});
