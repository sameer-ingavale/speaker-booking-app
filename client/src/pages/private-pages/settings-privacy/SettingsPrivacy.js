import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";

import { GET_SINGLE_USER } from "../../../helpers/gql-queries/getSingleUserQuery";
import { AuthContext } from "../../../context/auth";
import UserSettingsCard from "../../../components/user-settings-card/UserSettingsCard";
import AvailabilityCard from "../../../components/user-profile-cards/availability-card/AvailabilityCard";

import Spinner from "../../../helpers/loaders/Spinner";

function SettingsPrivacy() {
  const {
    authData: { user: authUser }
  } = useContext(AuthContext);

  const { loading, data } = useQuery(GET_SINGLE_USER, {
    variables: {
      userId: authUser.userId
    }
  });

  let authUserData;
  if (data) {
    authUserData = data.getSingleUser;
  }

  return (
    <Grid className="mainBody">
      {loading ? (
        <Grid.Row className="loaderRow">
          <Grid.Column className="loaderColumn">
            <Spinner />
          </Grid.Column>
        </Grid.Row>
      ) : (
        <>
          <Grid.Row>
            {authUserData && <UserSettingsCard authUserData={authUserData} />}
          </Grid.Row>
          <Grid.Row>
            {authUserData && <AvailabilityCard pageUser={authUserData} />}
          </Grid.Row>
        </>
      )}
    </Grid>
  );
}

export default SettingsPrivacy;
