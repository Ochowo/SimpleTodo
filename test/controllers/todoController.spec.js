import dotenv from 'dotenv';
import supertest from 'supertest';
import toDo from '../../src/controllers/todosController';
import setupTestDB from '../utils/setupTestDb';
import app from '../../app';
import '@babel/polyfill';

import {
  todo, emptyTodo, goodUserData, goodUserObj
} from '../../src/helpers/dummyData';

setupTestDB();
dotenv.config();
const request = supertest(app);

let error = null;
let newToken;
let id;
let wrongId = '5febb2a3df593c39c07cb758';
let token;
const unknownToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
describe('Todo Controller Test', () => {
  it('register user successfully', async (done) => {
    const res = await request.post('/api/v1/auth/signup').send(goodUserData);
    token = res.body.data.token;
    done();
  });
  it('create todo successfully', async (done) => {
    const res = await request.post('/api/v1/todos').send(todo).set('authorization', token);
    expect(res.status).toBe(201);
    done();
  });

  it('should not create todo without authentication token', async (done) => {
    const res = await request.post('/api/v1/todos').send(todo);
    expect(res.status).toBe(401);
    done();
  });

  it('should not create todo with  wrong authentication token', async (done) => {
    const res = await request.get('/api/v1/todos').send(todo).set('authorization', unknownToken);
    console.log('ppppppp', 'ollo', res.body);
    expect(res.status).toBe(401);
    done();
  });

  it('should not create todo with empty data', async (done) => {
    const res = await request.post('/api/v1/todos').send(emptyTodo);
    expect(res.status).toBe(422);
    done();
  });
  it('tests error with async/await', async (done) => {
    const req = { body: { task: 'new' }, formattedValues: todo, user: { userId: '5febb2a3df593c39c07cb758' } };
    const res = {
      status() {},
      json() {},
    };
    expect.assertions(1);
    try {
      await toDo.createTodo(req, res);
    } catch (err) {
      error = err;
      expect(error).not.toBeNull();
      done();
    }
    done();
  });

  it('get todos successfully', async (done) => {
    await request.post('/api/v1/todos').send(todo).set('authorization', token);

    const res = await request.get('/api/v1/todos').set('authorization', token);
    console.log(res, 'ddd');
    // Object Id should be defined when successfully saved to MongoDB.
    expect(res.status).toBe(200);
    done();
  });

  it('should return an empty array if there are no todos for the user', async (done) => {
    const resp = await request.post('/api/v1/auth/signup').send(goodUserObj);
    newToken = resp.body.data.token;
    const res = await request.get('/api/v1/todos').set('authorization', newToken);
    console.log(res, 'ddd');
    // Object Id should be defined when successfully saved to MongoDB.
    expect(res.status).toBe(404);
    done();
  });
  it('should not get todo without authentication token', async (done) => {
    const res = await request.get('/api/v1/todos');
    console.log('ppppppp', 'ollo', res.body);
    expect(res.status).toBe(401);
    done();
  });

  it('tests error with async/await', async (done) => {
    const req = { body: { task: 'new' }, formattedValues: todo };
    const res = {
      status() {},
      json() {},
    };
    expect.assertions(1);
    try {
      await toDo.getToDos(req, res);
    } catch (err) {
      error = err;
      expect(error).not.toBeNull();
      done();
    }
    done();
  });

  it('get todo successfully', async (done) => {
    const resp = await request.post('/api/v1/todos').send(todo).set('authorization', token);
    const { _id } = resp.body.data;
    id = _id;
    const res = await request.get(`/api/v1/todos/${id}`).set('authorization', token);
    console.log(res, 'ddd');
    // Object Id should be defined when successfully saved to MongoDB.
    expect(res.status).toBe(200);
    done();
  });

  it('should return an empty array if the todo does not exist', async (done) => {
    const res = await request.get(`/api/v1/todos/${wrongId}`).set('authorization', token);
    console.log(res, 'ddd');
    // Object Id should be defined when successfully saved to MongoDB.
    expect(res.status).toBe(404);
    done();
  });

  it('should not get todo without authentication token', async (done) => {
    const res = await request.get(`/api/v1/todos/${id}`);
    console.log('ppppppp', 'ollo', res.body);
    expect(res.status).toBe(401);
    done();
  });

  it('tests error with async/await', async (done) => {
    const req = { param: { id: '5feba4b7f0953241cce1e96a' }, formattedValues: todo };
    const res = {
      status() {},
      json() {},
    };
    expect.assertions(1);
    try {
      await toDo.getToDo(req, res);
    } catch (err) {
      error = err;
      expect(error).not.toBeNull();
      done();
    }
    done();
  });

  it('update todo successfully', async (done) => {
    const resp = await request.post('/api/v1/todos').send(todo).set('authorization', token);
    const { _id } = resp.body.data;
    id = _id;
    const res = await request.put(`/api/v1/todos/${id}`).set('authorization', token);
    console.log(res, 'ddd');
    // Object Id should be defined when successfully saved to MongoDB.
    expect(res.status).toBe(200);
    done();
  });
  it('should return an empty array if the todo does not exist', async (done) => {
    const res = await request.put(`/api/v1/todos/${wrongId}`).set('authorization', token);
    console.log(res, 'ddd');
    // Object Id should be defined when successfully saved to MongoDB.
    expect(res.status).toBe(404);
    done();
  });
  it('should not update todo without authentication token', async (done) => {
    const res = await request.put(`/api/v1/todos/${id}`);
    console.log('ppppppp', 'ollo', res.body);
    expect(res.status).toBe(401);
    done();
  });

  it('tests error with async/await', async (done) => {
    const req = { param: { id: '5feba4b7f0953241cce1e96a' }, formattedValues: todo };
    const res = {
      status() {},
      json() {},
    };
    expect.assertions(1);
    try {
      await toDo.updateToDo(req, res);
    } catch (err) {
      error = err;
      expect(error).not.toBeNull();
      done();
    }
    done();
  });

  it('delete todo successfully', async (done) => {
    const resp = await request.post('/api/v1/todos').send(todo).set('authorization', token);
    const { _id } = resp.body.data;
    id = _id;
    const res = await request.delete(`/api/v1/todos/${id}`).set('authorization', token);
    console.log(res, 'ddd');
    // Object Id should be defined when successfully saved to MongoDB.
    expect(res.status).toBe(200);
    done();
  });
  it('should return an empty array if the todo does not exist', async (done) => {
    const res = await request.delete(`/api/v1/todos/${wrongId}`).set('authorization', token);
    console.log(res, 'ddd');
    // Object Id should be defined when successfully saved to MongoDB.
    expect(res.status).toBe(404);
    done();
  });
  it('should not delete todo without authentication token', async (done) => {
    const res = await request.delete(`/api/v1/todos/${id}`);
    console.log('ppppppp', 'ollo', res.body);
    expect(res.status).toBe(401);
    done();
  });

  it('tests error with async/await', async (done) => {
    const req = { param: { id: '5feba4b7f0953241cce1e96a' }, formattedValues: todo };
    const res = {
      status() {},
      json() {},
    };
    expect.assertions(1);
    try {
      await toDo.deleteToDo(req, res);
    } catch (err) {
      error = err;
      expect(error).not.toBeNull();
      done();
    }
    done();
  });
});
