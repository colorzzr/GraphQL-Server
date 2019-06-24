import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    test: es_obj!
  }

  type es_obj {
    character: String!
    quote: String!
  }
`;
