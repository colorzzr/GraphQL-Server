import { gql } from 'apollo-server-express';

import col_stgSchema from './col_stg';
import esSchema from './es';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, col_stgSchema, esSchema];