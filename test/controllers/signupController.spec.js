import dotenv from 'dotenv';
import supertest from 'supertest';
import signUp from '../../src/controllers/userController';
import setupTestDB from '../utils/setupTestDb';
import app from '../../app';
import '@babel/polyfill';

import {
  newUser, emptyUserData,
} from '../../src/helpers/dummyData';

setupTestDB();
dotenv.config();
const request = supertest(app);
const srv = app.listen();

let error = null;
describe('Signup Controller Test', () => {
  it('register user successfully', async (done) => {
    const res = await request.post('/api/v1/auth/signup').send(newUser);
    // Object Id should be defined when successfully saved to MongoDB.
    expect(res.status).toBe(201);
    done();
    srv.close();
  });

  it('should not log in an existing user', async (done) => {
    await request.post('/api/v1/auth/signup').send(newUser);
    const resp = await request.post('/api/v1/auth/signup').send(newUser);
    // Object Id should be defined when successfully saved to MongoDB.
    expect(resp.status).toBe(409);
    done();
  });

  it('should not log in with empty data', async (done) => {
    const res = await request.post('/api/v1/auth/signup').send(emptyUserData);
    // Object Id should be defined when successfully saved to MongoDB.
    expect(res.status).toBe(422);
    done();
  });
  it('tests error with async/await', async (done) => {
    const req = { body: { password: 123456 }, formattedValues: newUser };
    const res = {
      status() {},
      json() {},
    };
    expect.assertions(1);
    try {
      await signUp.registerUser(req, res);
    } catch (err) {
      error = err;
      expect(error).not.toBeNull();
      done();
    }
    done();
  });
});
