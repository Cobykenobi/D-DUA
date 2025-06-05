// backend/src/app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://d-dua-1.onrender.com'], // додай свій фронт
  credentials: true
}));
app.use(cookieParser());

// !!! Шлях до роутів може відрізнятися — перевір структуру проекту
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

// Підключення до MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
