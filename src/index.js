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

app.get('/elastic_get', async function (req, res) {
	res.send('elastic_query')

	'use strict'

	const { Client } = require('@elastic/elasticsearch')
	const client = new Client({ node: 'http://localhost:9200' })

	async function run () {
	  await client.index({
	    index: 'game-of-thrones',
	    id: '1',
	    body: {
	      character: 'Ned Stark',
	      quote: 'Winter is coming.'
	    }
	  })

	  const { body } = await client.get({
	    index: 'game-of-thrones',
	    id: '1'
	  })

	  console.log(body)
	}

	run().catch(console.log)
})

app.get('/elastic_search', async function (req, res) {
	res.send('elastic_search')

	'use strict'

	const { Client } = require('@elastic/elasticsearch')
	const client = new Client({ node: 'http://localhost:9200' })

	async function run () {
		// Let's start by indexing some data
		await client.index({
			index: 'game-of-thrones',
			body: {
				character: 'Ned Stark',
				quote: 'Winter is coming.'
			}
		})

		await client.index({
			index: 'game-of-thrones',
			body: {
				character: 'Daenerys Targaryen',
				quote: 'I am the blood of the dragon.'
			}
		})

		await client.index({
			index: 'game-of-thrones',
			// here we are forcing an index refresh,
			// otherwise we will not get any result
			// in the consequent search
			refresh: true,
			body: {
				character: 'Tyrion Lannister',
				quote: 'A mind needs books like a sword needs a whetstone.'
			}
		})

		// Let's search!
		const { body } = await client.search({
			index: 'game-of-thrones',
			body: {
				query: {
					match: {
						quote: 'winter'
					}
				}
			}
		})

		console.log(body.hits.hits)
	}

	run().catch(console.log)
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