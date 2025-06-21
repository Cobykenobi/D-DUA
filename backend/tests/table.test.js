const request = require('supertest');
const express = require('express');

jest.mock('../src/middlewares/authMiddleware', () => jest.fn((req, res, next) => {
  req.user = { _id: 'u1', role: 'gm' };
  next();
}));

jest.mock('../src/middlewares/onlyMaster', () => jest.fn((req, res, next) => next()));

const Table = require('../src/models/Table');

jest.mock('../src/models/Table');

const tableRouter = require('../src/routes/table');

const app = express();
app.use(express.json());
app.use('/api/table', tableRouter);

describe('Table Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/table/:id returns extended fields', async () => {
    Table.findOne.mockResolvedValue({
      tableId: 't1',
      gm: 'u1',
      players: [],
      state: 'active',
      mapUrl: 'map.png',
      musicTrack: 'song.mp3',
      playerInfo: { u1: { hp: 5, status: 'ok' } }
    });

    const res = await request(app).get('/api/table/t1');

    expect(res.statusCode).toBe(200);
    expect(res.body.mapUrl).toBe('map.png');
    expect(res.body.musicTrack).toBe('song.mp3');
    expect(res.body.playerInfo.u1.hp).toBe(5);
    expect(Table.findOne).toHaveBeenCalledWith({ tableId: 't1' });
  });

  it('PUT /api/table/:id updates allowed fields', async () => {
    Table.findOneAndUpdate.mockResolvedValue({
      tableId: 't1',
      gm: 'u1',
      players: [],
      state: 'active',
      mapUrl: 'new.png',
      musicTrack: 'new.mp3',
      playerInfo: { u1: { hp: 1, status: 'down' } }
    });

    const payload = { mapUrl: 'new.png', musicTrack: 'new.mp3', playerInfo: { u1: { hp: 1, status: 'down' } } };

    const res = await request(app).put('/api/table/t1').send(payload);

    expect(res.statusCode).toBe(200);
    expect(Table.findOneAndUpdate).toHaveBeenCalledWith(
      { tableId: 't1' },
      payload,
      { new: true }
    );
    expect(res.body.mapUrl).toBe('new.png');
  });
});
