const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String
    dateCreated: String!
    createdEvents: [Event!]
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  type Event {
    _id: ID!
    title: String!
    pay: Float!
    dateCreated: String!
    creator: User!
  }

  type Query {
    users: [User!]!
    login(email: String!, password: String!): AuthData!
    events: [Event!]!
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input CreateEventInput {
    title: String!
    pay: Float!
  }

  type Mutation {
    createUser(input: CreateUserInput): User
    createEvent(input: CreateEventInput): Event
  }
`;
