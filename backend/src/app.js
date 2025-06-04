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

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log('Server started on port', PORT));
  })
  .catch(err => console.error('MongoDB error:', err));
