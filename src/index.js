import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';


const app = express();

// allow the cross domain access
app.use(cors());

// define the database schema
const schema = gql`
  type Query {
  	users: [User!]
    me: User
    user(id: ID!): User
  }

  type User {
  	id: ID!
    username: String!
  }
`;

let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};

const me = users[1];

// give the hleper function to do the query
const resolvers = {
  Query: {
  	users: () => {
      return Object.values(users);
    },
    me: () => {
    	return me;
    },
    // input is {id:val} we only want val
    user: (parent, { id }) => {
    	console.log(id);
    	return users[id];
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});