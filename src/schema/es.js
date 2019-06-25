import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    moleculars: [es_obj]
    molecular(id:Int):[es_obj]
  }

  type es_obj {
  	SubjectId: String
    Genes: String
  }
`;
