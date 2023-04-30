import express, { json } from 'express';
import mongoose from 'mongoose';
import { createUser, login } from './controllers/users';
import handleError from './middlewares/handle-errors';
import auth from './middlewares/auth';
import router from './routes/index';
import { errorLogger, requestLogger } from './middlewares/logger';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(json());
app.use(requestLogger);
app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', router);

app.use(errorLogger);

app.use(handleError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Приложение запущено на порту ${PORT}`);
});
