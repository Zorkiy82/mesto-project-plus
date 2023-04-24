import express, { json } from 'express';
import mongoose from 'mongoose';
import { fakeAuthorization, handleError } from './utils';
import router from './routes/index';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(fakeAuthorization);
app.use(json());
app.use('/', router);

app.use(handleError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Приложение запущено на порту ${PORT}`);
});
