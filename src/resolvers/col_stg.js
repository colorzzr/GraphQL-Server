// give the hleper function to do the query
export default{
	Query: {
		col_stgs: async (parent, args, { models }) => {
			const result = await models.col_stg.findAll();
			// console.log(result);
			return result;
		},
 
		test:(parent, args, { models }) => {
			return {result:"TEST"};
		},
	},

	Col_stg: {
		molecular: async (parent, args, { models }) => {
			// console.log("------parent------");
			// console.log(parent.subjectid);
			const subjectid = parent.subjectid;
			const source = await models.ES_Client.search({
				index: 'molecular',
				body: {
			      query: {
			        "bool": {
				        "must": [
				          {"match": {
				            "Genes": "EGFR"
				          }},
				          {"match": {
				            "SubjectId": subjectid
				          }},
				        ]
				      }
			      },
			      size:100
			    },
			}) 

			var result = [];
			source.body.hits.hits.forEach((item)=>{
				result.push({
					"SubjectId": item._source.SubjectId,
					"Genes":item._source.Genes,
				});
				// console.log(item._source);
			})

			// console.log("------result------")

			// console.log(result);

			return result;
	    },
	}
	//Now, we’ll resolve things on a per-field level.
	// User: {
	// 	// specify the message fetch
	// 	// {
	// 	// 	user(id: "1"){
	// 	// 		id
	// 	// 		username
	// 	// 		messages{
	// 	// 			text
	// 	// 		}
	// 	// 	}
	// 	// }
	//     messages: async (user, args, { models }) => {
	// 		return await models.Message.findAll({
	// 			where: {
	// 				userId: user.id,
	// 			},
	// 		});
	// 	},
	// },
}