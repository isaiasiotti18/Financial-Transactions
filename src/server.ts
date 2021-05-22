import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (request, response) =>
  response.json({
    message: 'Meu server Express, Typescript e ESLint!',
  }),
);

app.listen(3333, () => {
  console.log('Back-end started in 3333 port!');
});
