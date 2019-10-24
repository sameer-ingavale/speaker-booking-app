import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";

import UserProfileTopCard from "../../../components/user-profile-cards/main-top-card/UserProfileTopCard";
import { GET_SINGLE_USER } from "../../../helpers/gql-queries/getSingleUserQuery";
import AboutCard from "../../../components/user-profile-cards/about-card/AboutCard";

function UserProfile(props) {
  const UrlId = props.match.params.userId;

  const { loading, error, data } = useQuery(GET_SINGLE_USER, {
    variables: {
      userId: UrlId
    }
  });

  let pageUser;
  if (data) {
    pageUser = data.getSingleUser;
  }

  return (
    <Grid>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <>
          <UserProfileTopCard pageUser={pageUser} UrlId={UrlId} />
          <AboutCard pageUser={pageUser} UrlId={UrlId} />
          {/* <LicensesAndCertificates /> 
              <Education />
              <SkillsAndAccomplishments />
          */}
        </>
      )}
    </Grid>
  );
}

export default UserProfile;
