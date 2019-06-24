import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';

import models, { sequelize } from './models';
import resolvers from './resolvers';
import schema from './schema';

const app = express();

// test the express route
app.get('/', function (req, res) {
	res.send('hello world')
})

app.get('/graphql_query', function (req, res) {
	res.send('graphql_query')
	const { createApolloFetch } = require('apollo-fetch');

	const fetch = createApolloFetch({
		uri: 'http://localhost:8000/graphql',
	});

	fetch({
		query: '{ users { id }}',
		}).then(res => {
		console.log(res.data);
	});
})



// allow the cross domain access
app.use(cors());


const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  // the fix context
  context: async () => ({
    models,
    me: await models.User.findByLogin('rwieruch'),
  }),
});

server.applyMiddleware({ app, path: '/graphql' });

// For test disable it
const eraseDatabaseOnSync = false;
// listening on port
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }
  app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
  });
});

// create a sample data
const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'rwieruch',
      messages: [
        {
          text: 'Published the Road to learn React',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      username: 'ddavids',
      messages: [
        {
          text: 'Happy to release ...',
        },
        {
          text: 'Published a complete ...',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};