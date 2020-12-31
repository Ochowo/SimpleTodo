import mongoose from 'mongoose';
import config from '../../src/helpers/config';

const setupTestDB = () => {
  console.log(config.mongoose.url)
  beforeAll(async () => {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
  });

  beforeEach(async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map(
      async (collection) => collection.deleteMany(),
    ));
  });

  afterAll(async () => {
    
  console.log(config.mongoose.url, 'ewq')
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
    await mongoose.disconnect();
  });
};

module.exports = setupTestDB;
