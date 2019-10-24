import gql from "graphql-tag";
export const GET_SINGLE_USER = gql`
  query($userId: ID!) {
    getSingleUser(userId: $userId) {
      firstName
      lastName
      _id
      email
      tagline
      city
      state
      about
      dateCreated
      userType
      profilePictureLink
      createdCompany {
        name
      }
      bookingRequests {
        _id
        confirmed
        event {
          title
          eventDate
          startTime
          address {
            streetAddress1
            streetAddress2
            zip
            city
            state
          }
        }
      }
      confirmedBookings {
        _id
        confirmed
        event {
          title
          eventDate
          startTime
          address {
            streetAddress1
            streetAddress2
            zip
            city
            state
          }
        }
      }
    }
  }
`;
