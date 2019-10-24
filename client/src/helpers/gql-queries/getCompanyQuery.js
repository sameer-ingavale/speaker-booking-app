import gql from "graphql-tag";

export const GET_COMPANY = gql`
  {
    getCompany {
      _id
      name
      address {
        streetAddress1
        streetAddress2
        zip
        city
        state
        country
      }
      phone
      einNumber
      companyType
      dateCreated
      creator {
        firstName
        lastName
      }
      createdEvents {
        _id
        title
        eventDate
        startTime
        endTime
        payType
        eventType
        eventTopic
        payAmount
        expectedTurnout
        address {
          streetAddress1
          streetAddress2
          zip
          city
          state
          country
        }
        expired
        eventVisibility
        createdAt
        updatedAt
      }
    }
  }
`;
