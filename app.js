import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './src/routes';


dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);
app.get('/', (req, res) => {
  res.json({ message: 'welcome' });
});

export default app;
