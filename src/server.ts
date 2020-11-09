import { Tedis, TedisPool } from 'tedis';

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  // Account: {
  //   _resolveReference(object) {
  //     return accounts.find((account) => account.id === object.id);
  //   },
  // },

  Query: {
    hello: () => 'Hello world!',
  },
  Mutation: {
    login(parent, { email, password }) {
      const { id, permissions, roles } = accounts.find(
        (account) => account.email === email && account.password === password,
      );
      return jwt.sign(
        { 'https://awesomeapi.com/graphql': { roles, permissions } },
        'f1BtnWgD3VKY',
        { algorithm: 'HS256', subject: id, expiresIn: '1d' },
      );
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
