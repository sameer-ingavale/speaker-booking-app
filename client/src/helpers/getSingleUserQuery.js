import gql from "graphql-tag";
export const GET_SINGLE_USER = gql`
  query($userId: ID!) {
    getSingleUser(userId: $userId) {
      firstName
      lastName
      _id
      email
      dateCreated
      userType
      profilePictureLink
      createdCompany {
        name
      }
      bookingRequests {
        _id
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
