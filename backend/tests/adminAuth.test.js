const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminAuthRouter = require('../src/routes/adminAuth');
const User = require('../src/models/User');

jest.mock('../src/models/User');

const app = express();
app.use(express.json());
app.use('/api/admin/auth', adminAuthRouter);

beforeEach(() => {
  jest.clearAllMocks();
  process.env.JWT_SECRET = 'testsecret';
});

describe('Admin Auth Routes', () => {
  describe('POST /api/admin/auth/login', () => {
    it('logs in admin with correct credentials', async () => {
      User.findOne.mockResolvedValue({
        _id: '1',
        login: 'admin',
        username: 'Admin',
        password: 'hashed',
        role: 'admin',
      });
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(jwt, 'sign').mockReturnValue('token123');

      const res = await request(app)
        .post('/api/admin/auth/login')
        .send({ login: 'admin', password: 'pass' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        token: 'token123',
        user: {
          _id: '1',
          login: 'admin',
          username: 'Admin',
          role: 'admin',
        },
      });
    });

    it('fails when password is incorrect', async () => {
      User.findOne.mockResolvedValue({
        _id: '1',
        login: 'admin',
        username: 'Admin',
        password: 'hashed',
        role: 'admin',
      });
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const res = await request(app)
        .post('/api/admin/auth/login')
        .send({ login: 'admin', password: 'wrong' });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Invalid password');
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it('fails when user is not an admin', async () => {
      User.findOne.mockResolvedValue({
        _id: '1',
        login: 'user',
        username: 'Player',
        password: 'hashed',
        role: 'player',
      });

      const res = await request(app)
        .post('/api/admin/auth/login')
        .send({ login: 'user', password: 'pass' });

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Admin not found');
    });
  });
});
