import uuidv4 from 'uuid/v4';

// give the hleper function to do the query
export default{
	Query: {
		// message resolver
		messages: async (parent, args, { models }) => {
			return await models.Message.findAll();
		},
		
		message: async (parent, { id }, { models }) => {
    		return await models.Message.findByPk(id);
		},
	},
	// Note here: Message dont link the user in context so defaul one would not work
	Message: {
		user: async (message, args, { models }) => {
      		return await models.User.findByPk(message.userId);
		},
	},


  	// Mutation is PUT/POST Part
	Mutation: {
	    createMessage: async (parent, { text }, { me, models }) => {
			return await models.Message.create({
				text,
				userId: me.id,
			});
		},

		// mutation delete{
		// 	deleteMessage (id: "5c43ce14-3716-4b4d-b9f1-992b11ffcebf") 
		// }
		deleteMessage: async (parent, { id }, { models }) => {
			return await models.Message.destroy({ where: { id } });
		},

		// mutation update{
		// 	updateMessage (id: "1",text: "MEATY!") 
		// }
		// updateMessage: (parent, {id, text}, { models }) => {
		// 	const { [id]: message } = models.messages;
		// 	if (!message) {
		// 		return false;
		// 	}
		// 	models.messages[id].text = text;

		// 	return true;
		// },
	},
}