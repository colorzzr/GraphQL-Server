import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';

import models from './models';
import resolvers from './resolvers';
import schema from './schema';

const app = express();

// allow the cross domain access
app.use(cors());


const me = models.users[1];

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  // the fix context
  context: {
  	models,
    me: models.users[1],
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});