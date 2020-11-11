import express, { Express } from 'express';
import cors from 'cors';

export const createApp = (): Express => {
  const app = express();

  const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: 'https://studio.apollographql.com',
    preflightContinue: false,
  };

  app.use(cors(options));

  app.get('/', (req, res) => {
    res.send('It works x 1');
  });
  app.post('/', (req, res) => {
    res.send('It works x 1');
  });

  return app;
};
