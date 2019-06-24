import uuidv4 from 'uuid/v4';

// give the hleper function to do the query
export default{
	Query: {
		users: async (parent, args, { models }) => {

			// pg method -> query all the user
			return await models.User.findAll();
			// return await result;
		},

		me: async (parent, args, { models, me }) => {
			// pg method -> query by filter the id
			return await models.User.findByPk(me.id);
		},
		
		// input is {id:val} we only want val
		user: async (parent, { id }, { models }) => {
			return await models.User.findByPk(id);
		},
	},

	//Now, we’ll resolve things on a per-field level.
	User: {
		// specify the message fetch
		// {
		// 	user(id: "1"){
		// 		id
		// 		username
		// 		messages{
		// 			text
		// 		}
		// 	}
		// }
	    messages: async (user, args, { models }) => {
			return await models.Message.findAll({
				where: {
					userId: user.id,
				},
			});
		},
	},
}