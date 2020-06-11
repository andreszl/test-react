import gql from 'graphql-tag';

export default gql`

  scalar Date

  type User {
    _id: String!
    name: String!
    role: String!
    email: String!
    password: String!
    timestamp: Timestamp!
  }

  type Timestamp {
    created_at: Date
    updated_at: Date
  }

  type Query {
    getUsers: [User]
  }
`;
