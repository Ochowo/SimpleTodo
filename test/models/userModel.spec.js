import mongoose from 'mongoose';
import dotenv from 'dotenv';
import '@babel/polyfill';
import { UserModel } from '../../src/models';
import setupTestDB from '../utils/setupTestDb';
import { goodUserData, emptyUserData } from '../../src/helpers/dummyData';

dotenv.config();
setupTestDB();

describe('User Model Test', () => {
  it('create & save user successfully', async () => {
    console.log(goodUserData, 'i');
    const validUser = new UserModel(goodUserData);
    const savedUser = await validUser.save();
    console.log(savedUser, 'saved');
    expect(savedUser.firstName).toEqual(goodUserData.firstName);
  });

  it('create user without required field should fail', async () => {
    const userWithoutRequiredField = new UserModel(emptyUserData);
    let err;
    try {
      const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
      err = savedUserWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.firstName).toBeDefined();
  });
});
