import React from "react";
import { useQuery } from "@apollo/react-hooks";

import UserProfileTopCard from "../../../components/user-profile-cards/main-top-card/UserProfileTopCard";
import { GET_SINGLE_USER } from "../../../helpers/gql-queries/getSingleUserQuery";
import AboutCard from "../../../components/user-profile-cards/about-card/AboutCard";
import EducationCard from "../../../components/user-profile-cards/education-card/EducationCard";
import Spinner from "../../../helpers/loaders/Spinner";
import { Grid } from "semantic-ui-react";

function UserProfile(props) {
  const UrlId = props.match.params.userId;

  const { loading, data } = useQuery(GET_SINGLE_USER, {
    variables: {
      userId: UrlId
    }
  });

  let pageUser;
  if (data) {
    pageUser = data.getSingleUser;
  }

  return (
    <>
      {loading ? (
        <Grid.Row className="loaderRow">
          <Grid.Column className="loaderColumn">
            <Spinner />
          </Grid.Column>
        </Grid.Row>
      ) : (
        <>
          <UserProfileTopCard pageUser={pageUser} UrlId={UrlId} />
          <AboutCard pageUser={pageUser} UrlId={UrlId} />
          <EducationCard pageUser={pageUser} UrlId={UrlId} />
          {/*  <SkillsAndAccomplishments pageUser={pageUser} UrlId={UrlId} /> */}
          {/* <LicensesAndCertificates /> 
              
              
          */}
        </>
      )}
    </>
  );
}

export default UserProfile;
