const { Server } = require('socket.io');
const Character = require('./models/Character');

let io;
const sessions = {};

function getSession(id) {
  if (!sessions[id]) {
    sessions[id] = {
      gm: null,
      players: [],
      monsters: [],
      initiative: [],
      map: '',
      chat: [],
      hp: {},
      mp: {},
      inventory: {},
      music: null,
      state: 'lobby'
    };
  }
  return sessions[id];
}

function init(httpServer) {
  io = new Server(httpServer, {
    cors: { origin: '*' }
  });

  io.on('connection', (socket) => {
    socket.on('join-lobby', async ({ tableId, user, characterId }) => {
      if (!tableId || !user) return;
      const sess = getSession(tableId);
      socket.join(tableId);
      socket.data.tableId = tableId;
      socket.data.userId = user._id;
      let player = sess.players.find(p => p.user === user._id);
      if (!player) {
        let character = null;
        if (characterId) {
          character = await Character.findById(characterId)
            .populate('race', 'name code')
            .populate('profession', 'name code')
            .select('name image race profession stats inventory description')
            .lean();
        }
        player = { user: user._id, name: user.username, role: user.role, character, online: true };
        sess.players.push(player);
      } else {
        player.online = true;
        if (characterId && !player.character) {
          player.character = await Character.findById(characterId)
            .populate('race', 'name code')
            .populate('profession', 'name code')
            .select('name image race profession stats inventory description')
            .lean();
        }
      }
      if (user.role === 'gm' || !sess.gm) {
        sess.gm = user._id;
        socket.emit('gm-assigned');
      }
      io.to(tableId).emit('lobby-players', { players: sess.players, gm: sess.gm });
    });

    socket.on('start-game', ({ tableId }) => {
      const sess = getSession(tableId);
      sess.state = 'active';
      io.to(tableId).emit('game-started');
    });

    socket.on('join-table', async ({ tableId, user, characterId }) => {
      if (!tableId || !user) return;
      const sess = getSession(tableId);
      socket.join(tableId);
      socket.data.tableId = tableId;
      socket.data.userId = user._id;
      let player = sess.players.find(p => p.user === user._id);
      if (!player) {
        let character = null;
        if (characterId) {
          character = await Character.findById(characterId)
            .populate('race', 'name code')
            .populate('profession', 'name code')
            .select('name image race profession stats inventory description')
            .lean();
        }
        player = { user: user._id, character, online: true };
        sess.players.push(player);
      } else {
        player.online = true;
        if (characterId && !player.character) {
          player.character = await Character.findById(characterId)
            .populate('race', 'name code')
            .populate('profession', 'name code')
            .select('name image race profession stats inventory description')
            .lean();
        }
      }
      socket.emit('chat-history', sess.chat);
      io.to(tableId).emit('table-players', {
        players: sess.players,
        gm: sess.gm,
        monsters: sess.monsters,
        initiative: sess.initiative
      });
      if (sess.map) socket.emit('map-update', sess.map);
      socket.emit('hp-update-all', sess.hp);
      socket.emit('mp-update-all', sess.mp);
      socket.emit('inventory-update-all', sess.inventory);
      if (sess.music) socket.emit('music-change', sess.music);
    });

    socket.on('monster-add', ({ tableId, monster }) => {
      const sess = getSession(tableId);
      sess.monsters.push(monster);
      io.to(tableId).emit('monsters-update', sess.monsters);
    });

    socket.on('monster-remove', ({ tableId, idx }) => {
      const sess = getSession(tableId);
      if (sess.monsters[idx]) sess.monsters.splice(idx, 1);
      io.to(tableId).emit('monsters-update', sess.monsters);
    });

    socket.on('initiative-start', ({ tableId, items }) => {
      const sess = getSession(tableId);
      sess.initiative = items || [];
      io.to(tableId).emit('initiative-update', sess.initiative);
    });

    socket.on('map-update', ({ tableId, map }) => {
      const sess = getSession(tableId);
      sess.map = map;
      io.to(tableId).emit('map-update', sess.map);
    });

    socket.on('player-hp-update', ({ tableId, userId, hp }) => {
      const sess = getSession(tableId);
      sess.hp[userId] = hp;
      io.to(tableId).emit('player-hp-update', { userId, hp });
    });

    socket.on('player-mp-update', ({ tableId, userId, mp }) => {
      const sess = getSession(tableId);
      sess.mp[userId] = mp;
      io.to(tableId).emit('player-mp-update', { userId, mp });
    });

    socket.on('inventory-update', ({ tableId, characterId, inventory }) => {
      const sess = getSession(tableId);
      sess.inventory[characterId] = inventory;
      io.to(tableId).emit('inventory-update', { characterId, inventory });
    });

    socket.on('music-change', ({ tableId, track }) => {
      const sess = getSession(tableId);
      sess.music = track;
      io.to(tableId).emit('music-change', track);
    });

    socket.on('kick-player', ({ tableId, userId }) => {
      const sess = getSession(tableId);
      sess.players = sess.players.filter(p => p.user !== userId);
      io.to(tableId).emit('table-players', {
        players: sess.players,
        gm: sess.gm,
        monsters: sess.monsters,
        initiative: sess.initiative
      });
    });

    socket.on('chat-message', ({ tableId, user, text }) => {
      const sess = getSession(tableId);
      const msg = { user: user.username || user.login, text, timestamp: Date.now() };
      sess.chat.push(msg);
      io.to(tableId).emit('chat-message', msg);
    });

    socket.on('disconnect', () => {
      const { tableId, userId } = socket.data;
      if (!tableId || !userId) return;
      const sess = getSession(tableId);
      const player = sess.players.find(p => p.user === userId);
      if (player) {
        player.online = false;
        const event = sess.state === 'lobby' ? 'lobby-players' : 'table-players';
        const payload = event === 'lobby-players'
          ? { players: sess.players, gm: sess.gm }
          : { players: sess.players, gm: sess.gm, monsters: sess.monsters, initiative: sess.initiative };
        io.to(tableId).emit(event, payload);
      }
    });
  });

  return io;
}

function getIO() {
  return io;
}

module.exports = { init, getIO };
