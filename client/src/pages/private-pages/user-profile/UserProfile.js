import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../../context/auth";

import UserProfileTopCard from "../../../components/user-profile-cards/main-top-card/UserProfileTopCard";
import { GET_SINGLE_USER } from "../../../helpers/gql-queries/getSingleUserQuery";
import AboutCard from "../../../components/user-profile-cards/about-card/AboutCard";
import EducationCard from "../../../components/user-profile-cards/education-card/EducationCard";
import AvailabilityCard from "../../../components/user-profile-cards/availability-card/AvailabilityCard";

function UserProfile(props) {
  const UrlId = props.match.params.userId;

  const {
    authData: { user: authUser }
  } = useContext(AuthContext);

  let authUserId = authUser.userId;

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
        <h1>loading</h1>
      ) : (
        <>
          <UserProfileTopCard pageUser={pageUser} UrlId={UrlId} />
          {UrlId === authUserId && (
            <AvailabilityCard pageUser={pageUser} UrlId={UrlId} />
          )}
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
