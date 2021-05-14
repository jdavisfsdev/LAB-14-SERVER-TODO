import client from '../lib/client.js';
import supertest from 'supertest';
import app from '../lib/app.js';
import { execSync } from 'child_process';

const request = supertest(app);

describe('API Routes', () => {

  afterAll(async () => {
    return client.end();
  });

  describe('/api/todos', () => {
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
      // id: expect.any(Number),
      task: 'wash the dishes',
      completed: false,
      userId: 1
    };
    // append the token to your requests:
    //  .set('Authorization', user.token);
    it('POST todo to /api/todos', async () => {
      const response = await request
        .post('/api/todos')
        .set('Authorization', user.token)
        .send(todo);

      console.log(response.text);


      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        userId: user.id,
        ...todo
      });

      todo = response.body;
    });
    
    // it('GET to /api/todos [with context]', async () => {
    //   // remove this line, here to not have lint error:
    //   const todoResponse = await request
    //     .post('/api/todos')
    //     .set('Authorization', user.token)
    //     .send(todo);
      
    //   expect(todoResponse.status).toBe(200);
    //   expect(todoResponse.body).toEqual({ userId: user.id, ...todo });
      
    // });

    
  });
});