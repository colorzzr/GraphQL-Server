import { gql } from 'apollo-server-express';

export default gql`
	scalar JSON

  extend type Query {
    col_stgs: [Col_stg!]
    test:JSON
  }

  type Col_stg {
    subjectid: ID!
    recordid: Int!
    col_stg: String
    col_stg_std: String
    molecular: [es_obj]
  }
`;


// import { makeExecutableSchema } from 'graphql-tools';
// import GraphQLJSON from 'graphql-type-json';

// const schemaString = `

// scalar JSON

// type Foo {
//   aField: JSON
// }

// type Query {
//   foo: Foo
// }

// `;

// const resolveFunctions = {
//   JSON: GraphQLJSON
// };

// const jsSchema = makeExecutableSchema({ typeDefs: schemaString, resolvers: resolveFunctions });