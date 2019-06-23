import uuidv4 from 'uuid/v4';

// give the hleper function to do the query
export default{
	Query: {
		// message resolver
		messages: (parent, args, { models }) => {
			return Object.values(models.messages);
		},
		
		message: (parent, { id }, { models }) => {
		  return models.messages[id];
		},
	},
	// Note here: Message dont link the user in context so defaul one would not work
	Message: {
		user: (message, { id }, { models }) => {
			return models.users[message.userId];
		},
	},


  	// Mutation is PUT/POST Part
	Mutation: {
	    createMessage: (parent, { text }, { me, models }) => {
			// give a random id    
			const id = uuidv4();
			const message = {
				id,
				text,
				userId: me.id,
			};

			// push it into our source
			models.messages[id] = message;
			models.users[me.id].messageIds.push(id);


			return message;
		},

		// mutation delete{
		// 	deleteMessage (id: "5c43ce14-3716-4b4d-b9f1-992b11ffcebf") 
		// }
		deleteMessage: (parent, { id }, { models }) => {
			const { [id]: message, ...otherMessages } = models.messages;

			if (!message) {
				return false;
			}

			// also remove the link in users
			var userId = models.message.userId
			var index = models.users[userId].messageIds.indexOf(id);
			if (index !== -1) models.users[userId].messageIds.splice(index, 1);

			models.messages = otherMessages;

			return true;
		},

		// mutation update{
		// 	updateMessage (id: "1",text: "MEATY!") 
		// }
		updateMessage: (parent, {id, text}, { models }) => {
			const { [id]: message } = models.messages;
			if (!message) {
				return false;
			}
			models.messages[id].text = text;

			return true;
		},
	},
}