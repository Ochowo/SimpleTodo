import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  env: process.env.NODE_ENV,
  port: 3000,
  mongoose: {
    url: process.env.DATABASE_URL + (process.env.NODE_ENV === 'test' ? '-test' : '-dev'),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
