import { ApolloServer } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import { ApolloServerPluginInlineTrace } from 'apollo-server-core';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { schema } from './schema';
import { createContext } from './utils/context';

require('dotenv-flow').config({ path: 'env/' });

const { PORT = 8000 } = process.env;

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
  origin: '*',
  preflightContinue: false,
};
app.use(cors(options));
app.get('/', (req, res) => {
  res.send('It works x 1');
});

const server = createServer(app);

const apollo = new ApolloServer({
  schema,
  context: createContext,
  playground: true,
  tracing: true,
  introspection: true,
  debug: true,
  plugins: [ApolloServerPluginInlineTrace()],
});
apollo.applyMiddleware({ app });

server.listen({ port: PORT }, () => {
  process.stdout.write(
    `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}\n`,
  );
});
