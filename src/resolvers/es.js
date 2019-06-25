export default{
	Query: {
		moleculars: async (parent, args, { models }) => {
			const source = await models.ES_Client.search({
				index: 'molecular',
				body: {
			      query: {
			        match: {
			          "Genes": 'EGFR'
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

			console.log("------result------")

			console.log(result);

			return result;
		},

		molecular: async (parent, args, { models }) => {
			console.log(parent);
			console.log(args);
			const source = await models.ES_Client.search({
				index: 'molecular',
				body: {
			      query: {
			        match: {
			          "Genes": 'EGFR'
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

			console.log("------result------")

			console.log(result);

			return result;
		},
	}
}