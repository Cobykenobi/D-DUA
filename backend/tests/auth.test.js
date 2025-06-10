const request = require('supertest');
const express = require('express');

const authRouter = require('../src/routes/auth');

const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);

describe('Auth Routes', () => {
  describe('POST /api/auth/login', () => {
    it('should return 400 if login or password missing', async () => {
      const res = await request(app).post('/api/auth/login').send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Login and password are required');
    });
  });
});
