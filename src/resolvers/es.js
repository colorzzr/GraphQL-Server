export default{
	Query: {
		test: async (parent, args, { models }) => {
			const result = await models.ES_Client.get({
				index: 'game-of-thrones',
				id: '1'
			}) 
			console.log(result.body._source);
			return result.body._source;
		},
	}
}