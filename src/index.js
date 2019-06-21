import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import uuidv4 from 'uuid/v4';


const app = express();

// allow the cross domain access
app.use(cors());

// define the database schema
const schema = gql`
  type Query {
  	users: [User!]
    me: User
    user(id: ID!): User

    messages: [Message!]!
    message(id: ID!): Message!
  }

  type User {
  	id: ID!
    username: String!
    messages: [Message!]
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }

  type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
    updateMessage(id: ID!, text: String!): Boolean!
  }
`;

let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
    messageIds: [1],
  },
  2: {
    id: '2',
    username: 'Dave Davids',
    messageIds: [2],
  },
};

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',			// this field is ONLY the relation not reflect in output
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2',
  },
};

const me = users[1];

// give the hleper function to do the query
const resolvers = {
	Query: {
		users: () => {
			return Object.values(users);
		},

		me: (parent, args, { me }) => {
			return me;
		},
		
		// input is {id:val} we only want val
		user: (parent, { id }) => {
			console.log(id);
			return users[id];
		},

		// message resolver
		messages: () => {
			return Object.values(messages);
		},
		
		message: (parent, { id }) => {
		  return messages[id];
		},
	},
	//Now, we’ll resolve things on a per-field level.
	User: {
		username: user => {
		  return user.username;
		},

    // specify the message fetch
 //    {
	// 	user(id: "1"){
	// 		id
	// 		username
	// 		messages{
	// 			text
	// 		}
	// 	}
	// }
	    messages: user => {
			return Object.values(messages).filter(
				message => message.userId === user.id,
			);
	    },
	},

  // Note here: Message dont link the user in context so defaul one would not work
	Message: {
		user: message => {
			return users[message.userId];
		},
	},


  	// Mutation is PUT/POST Part
	Mutation: {
	    createMessage: (parent, { text }, { me }) => {
			// give a random id    
			const id = uuidv4();
			const message = {
				id,
				text,
				userId: me.id,
			};

			// push it into our source
			messages[id] = message;
			users[me.id].messageIds.push(id);


			return message;
		},

		// mutation delete{
		// 	deleteMessage (id: "5c43ce14-3716-4b4d-b9f1-992b11ffcebf") 
		// }
		deleteMessage: (parent, { id }) => {
			const { [id]: message, ...otherMessages } = messages;

			if (!message) {
				return false;
			}
			console.log(id, message)
			// also remove the link in users
			var userId = message.userId
			var index = users[userId].messageIds.indexOf(id);
			if (index !== -1) users[userId].messageIds.splice(index, 1);

			messages = otherMessages;

			return true;
		},

		// mutation update{
		// 	updateMessage (id: "1",text: "MEATY!") 
		// }
		updateMessage: (parent, {id, text}) => {
			const { [id]: message } = messages;
			if (!message) {
				return false;
			}
			messages[id].text = text;

			return true;
		},
	},
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  // the fix context
  context: {
    me: users[1],
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});