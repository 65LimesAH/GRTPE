import { ApolloServer } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import { SocketContext } from 'types';
import { ApolloServerPluginInlineTrace } from 'apollo-server-core';
import express from 'express';
import { Http2Server } from 'http2';
import { createServer as createHttpServer } from 'http';
import { schema } from './schema';
import { isDev } from './utils/constant';
import { createContext, prisma, pubsub } from './utils/helpers';
import { createApp } from './app';

require('dotenv-flow').config({ path: 'dotEnv/' });

const { PORT } = process.env;

const createApolloServer = (): ApolloServer =>
  new ApolloServer({
    schema: applyMiddleware(schema),
    context: createContext,
    playground: true,
    tracing: isDev(),
    introspection: true,
    debug: isDev(),
    plugins: [ApolloServerPluginInlineTrace()],
    subscriptions: {
      onConnect: (
        _connectionParams,
        _websocket,
        connContext,
      ): SocketContext => {
        return {
          req: connContext.request,
          prisma,
          pubsub,
        };
      },
    },
  });
const initializeApolloServer = (
  apollo: ApolloServer,
  app: express.Application,
): (() => void) => {
  apollo.applyMiddleware({ app });
  return (): void => {
    process.stdout.write(
      `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}\n`,
    );
  };
};
export const startServer = async (
  app: express.Application,
): Promise<Http2Server> => {
  const httpServer = createHttpServer(app);
  const apollo = createApolloServer();
  apollo.installSubscriptionHandlers(httpServer);
  const handleApolloServerInitialized = initializeApolloServer(apollo, app);
  return httpServer.listen({ port: PORT }, () => {
    handleApolloServerInitialized();
  });
};
if (process.env.NODE_ENV !== 'test') {
  const app = createApp();
  startServer(app);
}
