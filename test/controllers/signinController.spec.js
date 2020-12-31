import dotenv from 'dotenv';
import supertest from 'supertest';
import setupTestDB from '../utils/setupTestDb';
import app from '../../app';
import '@babel/polyfill';

import {
  newUser, emptyUserData, wrongCredentials,
} from '../../src/helpers/dummyData';

setupTestDB();
dotenv.config();
const request = supertest(app);

describe('Signup Controller Test', () => {
  it('login user successfully', async (done) => {
    await request.post('/api/v1/auth/signup').send(newUser);
    const res = await request.post('/api/v1/auth/signin').send(newUser);
    expect(res.status).toBe(200);
    done();
  });

  it('should not log in an unexisting user', async (done) => {
    const res = await request.post('/api/v1/auth/signin').send({ email: 'nouser@gmail.com', password: 'passwordd' });
    // Object Id should be defined when successfully saved to MongoDB.
    expect(res.status).toBe(404);
    done();
  });

  it('should not log in with empty data', async (done) => {
    const res = await request.post('/api/v1/auth/signin').send(emptyUserData);
    // Object Id should be defined when successfully saved to MongoDB.
    expect(res.status).toBe(422);
    done();
  });

  it('should not log in auser with invalid credentials', async (done) => {
    await request.post('/api/v1/auth/signup').send(newUser);
    const res = await request.post('/api/v1/auth/signin').send(wrongCredentials);
    // Object Id should be defined when successfully saved to MongoDB.
    expect(res.status).toBe(401);
    done();
  });
});
