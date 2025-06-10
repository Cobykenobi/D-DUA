const request = require('supertest');
const express = require('express');

jest.mock('../src/utils/ai', () => ({
  generateCharacterImage: jest.fn().mockResolvedValue('http://image.test/avatar.png')
}));

const aiRouter = require('../src/routes/ai');

const app = express();
app.use(express.json());
app.use('/api/ai', aiRouter);

describe('AI Routes', () => {
  describe('POST /api/ai/avatar', () => {
    it('should return generated image url', async () => {
      const res = await request(app).post('/api/ai/avatar').send({ description: 'hero' });
      expect(res.statusCode).toBe(200);
      expect(res.body.url).toBe('http://image.test/avatar.png');
    });
  });
});
