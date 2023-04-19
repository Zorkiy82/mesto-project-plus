import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
// import User from './models/user';
// import Card from './models/card';

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use('/', usersRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Приложение запущено на порту ${PORT}`);
});
