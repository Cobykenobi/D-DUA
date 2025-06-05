const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const characterRoutes = require('./routes/character');
const raceRoutes = require('./routes/race');
const professionRoutes = require('./routes/profession');
const characteristicRoutes = require('./routes/characteristic');
const mapRoutes = require('./routes/map');
const rollRoutes = require('./routes/roll');
const musicRoutes = require('./routes/music');
const sessionRoutes = require('./routes/session');
const inventoryRoutes = require('./routes/inventory');

const GameSession = require('./models/GameSession');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/races', raceRoutes);
app.use('/api/professions', professionRoutes);
app.use('/api/characteristics', characteristicRoutes);
app.use('/api/maps', mapRoutes);
app.use('/api/rolls', rollRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/inventory', inventoryRoutes);

const PORT = process.env.PORT || 5000;

// === SOCKET.IO ===
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });

// === ВСЯ ГРА ЖИВЕ ТУТ ===
io.on("connection", socket => {
  // 1. Лобі: підключення до столу
  socket.on("join-lobby", async ({ tableId, user }) => {
    socket.join(tableId);
    let session = await GameSession.findOne({ tableId });
    if (!session) {
      session = new GameSession({ 
        tableId, 
        gm: user._id, 
        players: [{ user: user._id, name: user.username, characterId: user.characterId, online: true }],
        monsters: [], initiative: [], map: '', chat: []
      });
      await session.save();
      socket.emit("gm-assigned");
    } else {
      // GM вже існує, просто додаємо гравця
      if (!session.players.find(p => p.user.toString() === user._id)) {
        session.players.push({ user: user._id, name: user.username, characterId: user.characterId, online: true });
        await session.save();
      }
    }
    io.to(tableId).emit("lobby-players", { players: session.players, gm: session.gm });
  });

  // 2. Початок гри
  socket.on("start-game", async ({ tableId }) => {
    let session = await GameSession.findOne({ tableId });
    session.state = "active";
    await session.save();
    io.to(tableId).emit("game-started");
    io.to(tableId).emit("table-players", { players: session.players, gm: session.gm, monsters: session.monsters });
  });

  // 3. Підключення до столу
  socket.on("join-table", async ({ tableId, user }) => {
    socket.join(tableId);
    let session = await GameSession.findOne({ tableId });
    if (session) {
      let p = session.players.find(p => p.user.toString() === user._id);
      if (p) p.online = true;
      await session.save();
      io.to(tableId).emit("table-players", { players: session.players, gm: session.gm, monsters: session.monsters, initiative: session.initiative });
      io.to(tableId).emit("chat-history", session.chat);
      io.to(tableId).emit("map-update", session.map);
    }
  });

  // 4. Додавання монстра (GM)
  socket.on("monster-add", async ({ tableId, monster }) => {
    let session = await GameSession.findOne({ tableId });
    session.monsters.push(monster);
    await session.save();
    io.to(tableId).emit("monsters-update", session.monsters);
  });

  // 5. Видалення монстра
  socket.on("monster-remove", async ({ tableId, idx }) => {
    let session = await GameSession.findOne({ tableId });
    session.monsters.splice(idx, 1);
    await session.save();
    io.to(tableId).emit("monsters-update", session.monsters);
  });

  // 6. Кік гравця (GM)
  socket.on("kick-player", async ({ tableId, userId }) => {
    let session = await GameSession.findOne({ tableId });
    session.players = session.players.filter(p => p.user.toString() !== userId);
    await session.save();
    io.to(tableId).emit("lobby-players", { players: session.players, gm: session.gm });
  });

  // 7. Ініціатива (GM або авто)
  socket.on("initiative-start", async ({ tableId, items }) => {
    let session = await GameSession.findOne({ tableId });
    session.initiative = items;
    await session.save();
    io.to(tableId).emit("initiative-update", session.initiative);
  });

  // 8. Зміна карти (GM)
  socket.on("map-update", async ({ tableId, map }) => {
    let session = await GameSession.findOne({ tableId });
    session.map = map;
    await session.save();
    io.to(tableId).emit("map-update", session.map);
  });

  // 9. Чат збереження та live-оновлення
  socket.on("chat-message", async ({ tableId, user, text }) => {
    let session = await GameSession.findOne({ tableId });
    const msg = { user: user.username, text, timestamp: new Date() };
    session.chat.push(msg);
    if (session.chat.length > 100) session.chat = session.chat.slice(-100); // обмеження історії
    await session.save();
    io.to(tableId).emit("chat-message", msg);
  });

  // 10. Вихід з гри (offline)
  socket.on("disconnecting", async () => {
    // Можна додати логіку offline (не обов'язково для початку)
  });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => console.log('Server started on port', PORT));
  })
  .catch(err => console.error('MongoDB error:', err));
