import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_SINGLE_USER } from "../../../helpers/gql-queries/getSingleUserQuery";
import { AuthContext } from "../../../context/auth";
import UserSettingsCard from "../../../components/user-settings-card/UserSettingsCard";

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
    <>{authUserData && <UserSettingsCard authUserData={authUserData} />}</>
  );
}

export default SettingsPrivacy;
