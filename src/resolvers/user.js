import uuidv4 from 'uuid/v4';

// give the hleper function to do the query
export default{
	Query: {
		users: (parent, args, { models }) => {
			return Object.values(models.users);
		},

		me: (parent, args, { me }) => {
			return me;
		},
		
		// input is {id:val} we only want val
		user: (parent, { id }, { models }) => {
			console.log(id);
			return models.users[id];
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
	    messages: (user, args, { models }) => {
			return Object.values(models.messages).filter(
				message => message.userId === user.id,
			);
		},
	},
}