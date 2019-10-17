const { gql } = require("apollo-server-express");

module.exports = gql`
  enum UserTypeEnum {
    SPEAKER
    EVENT_PLANNER
  }

  type Address {
    streetAddress1: String!
    streetAddress2: String
    zip: String!
    city: String!
    state: String!
    country: String!
  }

  enum CompanyTypeEnum {
    PUBLIC_COMPANY
    SELF_EMPLOYED
    GOVERNMENT_AGENCY
    NON_PROFIT
    SOLE_PROPRIETORSHIP
    PRIVATELY_HELD
    PARTNERSHIP
  }

  type Company {
    _id: ID!
    name: String!
    address: [Address!]!
    phone: String!
    einNumber: String!
    companyType: CompanyTypeEnum!
    dateCreated: String!
    creator: User!
    createdEvents: [Event]!
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String
    dateCreated: String!
    userType: UserTypeEnum!
    createdCompany: [Company!]
    bookingRequests: [Booking]!
  }

  type AuthData {
    firstName: String!
    userType: UserTypeEnum!
    userId: ID!
    token: String!
  }

  enum PayTypeEnum {
    FREE
    PAID
  }

  enum EventTypeEnum {
    RELIGIOUS
    CHARITY
    CONFERENCE
    SEMINAR
    NETWORKING
    RALLY
    COMMUNITY
    OTHER
  }

  enum EventTopicEnum {
    RELIGION_SPIRITUALITY
    SOCIAL_CAUSE
    CULTURE
    EDUCATION
    HEALTH_WELLNESS
    SPORTS_FITNESS
    MUSIC
    HOBBIES_SPECIAL_INTERESTS
    BUSINESS
    TECHNOLOGY
    OTHER
    POLITICS
  }

  type Event {
    _id: ID!
    title: String!
    eventDate: String!
    startTime: String!
    endTime: String!
    payType: PayTypeEnum!
    eventType: EventTypeEnum!
    eventTopic: EventTopicEnum!
    payAmount: String!
    expectedTurnout: String!
    address: [Address!]!
    expired: Boolean!
    eventVisibility: Boolean!
    creatorPerson: User!
    creatorCompany: Company!
    createdAt: String!
    updatedAt: String!
  }

  type Booking {
    _id: ID!
    event: Event!
    creatorCompany: Company!
    creatorPerson: User!
    requestedSpeakers: [User]!
    confirmedSpeaker: User
  }

  type BookingIds {
    _id: ID!
    event: ID!
    creatorCompany: ID!
    creatorPerson: ID!
    requestedSpeakers: [ID!]
    confirmedSpeaker: ID
  }

  type Query {
    getSpeakers: [User]!
    getEvents: [Event]!
    getCompany: Company!
  }

  input RegisterUserInput {
    firstName: String!
    lastName: String!
    userType: UserTypeEnum!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input address {
    streetAddress1: String!
    streetAddress2: String
    zip: String!
    city: String!
    state: String!
    country: String!
  }

  input CreateEventInput {
    title: String!
    eventDate: String!
    startTime: String!
    endTime: String!
    payType: PayTypeEnum!
    eventType: EventTypeEnum!
    eventTopic: EventTopicEnum!
    payAmount: String
    expectedTurnout: String!
    address: address!
    eventVisibility: Boolean!
  }

  input CreateCompanyInput {
    name: String!
    address: address!
    phone: String!
    einNumber: String!
    companyType: CompanyTypeEnum!
  }

  type Mutation {
    register(input: RegisterUserInput): AuthData!
    login(email: String!, password: String!): AuthData!
    createEvent(input: CreateEventInput): Event!
    createCompany(input: CreateCompanyInput): Company!
    requestBooking(requestedSpeakerId: ID!, eventId: ID!): BookingIds!
  }
`;
