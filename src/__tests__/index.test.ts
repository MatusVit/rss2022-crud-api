import { startApp as app } from '../index';
import request from 'supertest';

console.log('supertest');

describe('GET / - a simple api endpoint', () => {
  test('should respond with 200', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
  });
  // it('Hello API Request', async () => {
  //   const result = await request(app).get('/');
  //   expect(result.text).toEqual('hello');
  //   expect(result.statusCode).toEqual(200);
  // });
});
