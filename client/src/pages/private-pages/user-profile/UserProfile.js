import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";
import { AuthContext } from "../../../context/auth";
import UserProfileTopCard from "../../../components/user-profile-cards/top-card/UserProfileTopCard";

function UserProfile(props) {
  const UrlId = props.match.params.userId;

  const {
    authData: { user }
  } = useContext(AuthContext);

  let authUserId = user.userId;

  const { loading, error, data } = useQuery(GET_SINGLE_USER, {
    variables: {
      userId: UrlId
    }
  });

  let singleUser;
  if (data) {
    singleUser = data.getSingleUser;
  }

  return (
    <Grid>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <UserProfileTopCard
          user={singleUser}
          authUserId={authUserId}
          UrlId={UrlId}
        />
      )}
    </Grid>
  );
}

const GET_SINGLE_USER = gql`
  query($userId: ID!) {
    getSingleUser(userId: $userId) {
      firstName
      lastName
      _id
      email
      dateCreated
      userType
      createdCompany {
        name
      }
      bookingRequests {
        _id
      }
    }
  }
`;

export default UserProfile;
