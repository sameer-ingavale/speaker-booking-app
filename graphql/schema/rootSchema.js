const { buildSchema } = require("graphql");

module.exports = buildSchema(`

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

type RootQuery {
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

type RootMutation {
  createUser(input: CreateUserInput): User
  createEvent(input: CreateEventInput): Event
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);
