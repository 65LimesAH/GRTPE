import { ApolloServer } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import { SocketContext } from 'types';
import { permissions } from './utils/rules';
import { schema } from './schema';
import { isDev } from './utils/constant';
import { createContext, prisma, pubsub } from './utils/helpers';

require('dotenv').config({ path: 'dotEnv/dev.env' });

export const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: createContext,
  playground: true,
  tracing: isDev(),
  introspection: true,
  debug: isDev(),
  cors: true,
  subscriptions: {
    onConnect: (_connectionParams, _websocket, connContext): SocketContext => {
      return {
        req: connContext.request,
        prisma,
        pubsub,
      };
    },
  },
});
