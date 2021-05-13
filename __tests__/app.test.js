import client from '../lib/client.js';
import supertest from 'supertest';
import app from '../lib/app.js';
import { execSync } from 'child_process';

const request = supertest(app);

describe('API Routes', () => {

  afterAll(async () => {
    return client.end();
  });

  describe('/api/me/todos', () => {
    let user;

    beforeAll(async () => {
      execSync('npm run recreate-tables');

      const response = await request
        .post('/api/auth/signup')
        .send({
          name: 'Me the User',
          email: 'me@user.com',
          password: 'password'
        });

      expect(response.status).toBe(200);

      user = response.body;
    });

    let todo = {
      id: 1,
      task: 'wash the dishes',
      completed: false,
      userId: 2
    };

    // append the token to your requests:
    //  .set('Authorization', user.token);
    
    it('GET to /api/todos [with context]', async () => {
      // remove this line, here to not have lint error:
      const todoResponse = await request
        .post('/api/todos');

      user.token;
    
      // expect(response.status).toBe(200);
      // expect(response.body).toEqual(?);
      
    });

  });
});