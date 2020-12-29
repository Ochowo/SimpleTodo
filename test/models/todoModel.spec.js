import mongoose from 'mongoose';
import dotenv from 'dotenv';
import '@babel/polyfill';
import { TodoModel } from '../../src/models';
import setupTestDB from '../utils/setupTestDb';
import { todo, emptyTodo } from '../../src/helpers/dummyData';

dotenv.config();
setupTestDB();

describe('Todo Model Test', () => {
  it('create & save todo successfully', async () => {
    console.log(todo, 'i');
    const createTodo = new TodoModel(todo);
    const savedTodo = await createTodo.save();
    expect(savedTodo.task).toEqual(createTodo.task);
  });

  it('create todo without required field should fail', async () => {
    const todoWithoutRequiredField = new TodoModel(emptyTodo);
    let err;
    try {
      const savedTodorWithoutRequiredField = await todoWithoutRequiredField.save();
      err = savedTodorWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.task).toBeDefined();
  });
});
