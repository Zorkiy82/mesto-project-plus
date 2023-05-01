import express, { json } from 'express';
import { errors } from 'celebrate';
import mongoose from 'mongoose';
import { createUser, login } from './controllers/users';
import errorHandler from './middlewares/error-handler';
import auth from './middlewares/auth';
import router from './routes/index';
import { errorLogger, requestLogger } from './middlewares/logger';
import { userDataValidator } from './utils/validation';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(json());
app.use(requestLogger);

app.post('/signin', userDataValidator, login);
app.post('/signup', userDataValidator, createUser);

app.use(auth);

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Приложение запущено на порту ${PORT}`);
});
