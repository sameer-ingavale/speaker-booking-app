import gql from "graphql-tag";
export const GET_SINGLE_USER = gql`
  query($userId: ID!) {
    getSingleUser(userId: $userId) {
      firstName
      lastName
      _id
      email
      headline
      tagline
      tags
      userVisibility
      city
      state
      phone
      gender
      age
      about
      availability {
        fromDate
        toDate
      }
      education {
        _id
        school
        degree
        field
        startYear
        endYear
        grade
        activities
        description
      }
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
