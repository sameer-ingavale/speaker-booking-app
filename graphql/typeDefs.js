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

  type Education {
    _id: ID!
    school: String!
    degree: String!
    field: String!
    startYear: String!
    endYear: String!
    grade: String
    activities: String
    description: String
  }

  type Availability {
    fromDate: String
    toDate: String
  }

  type Location {
    coordinates: [Float]
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String
    headline: String
    tags: [String]!
    userVisibility: Boolean
    tagline: String
    city: String
    state: String
    phone: String
    location: Location
    gender: String
    age: String
    about: String
    education: [Education]!
    availability: Availability
    dateCreated: String!
    userType: UserTypeEnum!
    profilePictureLink: String!
    createdCompany: [Company]!
    bookingRequests: [Booking]!
    confirmedBookings: [Booking]!
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

  enum RequirementTypeEnum {
    SPEAKER
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
    requirementType: RequirementTypeEnum!
    payAmount: String!
    expectedTurnout: String!
    address: [Address!]!
    expired: Boolean!
    eventVisibility: Boolean!
    creatorPerson: User!
    creatorCompany: Company!
    createdAt: String!
    updatedAt: String!
    booking: Booking
  }

  type Booking {
    _id: ID!
    event: Event!
    creatorPerson: User!
    requestedSpeakers: [User]!
    confirmedSpeaker: User
    confirmed: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type BookingIds {
    _id: ID!
    event: ID!
    creatorPerson: ID!
    requestedSpeakers: [ID!]
    confirmedSpeaker: ID
    confirmed: Boolean!
  }

  type PicData {
    picUrl: String
  }

  input address {
    streetAddress1: String!
    streetAddress2: String
    zip: String!
    city: String!
    state: String!
    country: String!
  }

  input RegisterUserInput {
    firstName: String!
    lastName: String!
    userType: UserTypeEnum!
    gender: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input CreateEventInput {
    title: String!
    eventDate: String!
    startTime: String!
    endTime: String!
    payType: PayTypeEnum!
    eventType: EventTypeEnum!
    eventTopic: EventTopicEnum!
    requirementType: RequirementTypeEnum!
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

  input EditProfileIntro {
    firstName: String!
    lastName: String!
    headline: String
    city: String
    state: String
    gender: String
    age: String
  }

  input AddEducationInput {
    school: String!
    degree: String!
    field: String!
    startYear: String!
    endYear: String!
    grade: String
    activities: String
    description: String
  }

  type Bool {
    success: Boolean!
  }

  input EditEducationInput {
    educationId: ID!
    school: String!
    degree: String!
    field: String!
    startYear: String!
    endYear: String!
    grade: String
    activities: String
    description: String
  }

  input settingsInput {
    userVisibility: Boolean!
    tags: [String]!
    tagline: String
    phone: String
  }

  type Query {
    getSpeakers: [User]!
    getEvents: [Event]!
    getSingleEvent(eventId: ID!): Event!
    getCompany: Company!
    getSingleUser(userId: ID!): User!
    getSingleUserEvents: [Event]!
  }

  type Mutation {
    register(input: RegisterUserInput): AuthData!
    login(email: String!, password: String!): AuthData!

    createEvent(input: CreateEventInput): Event!
    renewEvent(
      eventId: ID!
      eventDate: String!
      startTime: String!
      endTime: String!
    ): Bool!
    createCompany(input: CreateCompanyInput): Company!

    requestBooking(requestedSpeakerId: ID!, eventId: ID!): BookingIds!
    confirmBooking(bookingId: ID!): BookingIds!
    cancelBookingRequest(eventId: ID!, speakerId: ID!): Bool

    uploadProfilePicture(picture: Upload!): PicData
    editProfileIntro(input: EditProfileIntro): User!
    editProfileAbout(about: String!): User!
    addProfileEducation(input: AddEducationInput): User!
    editEducation(input: EditEducationInput): Bool!
    deleteEducation(educationId: ID!): Bool!
    setSpeakerAvailability(fromDate: String!, toDate: String!): Bool!
    changeUserSettings(input: settingsInput): Bool!
    speakerSearch(searchValue: String!): [User]!
    addUserLocation(coordinates: [Float]): Bool
    searchByTags(tags: [String]): [User]!
  }
`;
