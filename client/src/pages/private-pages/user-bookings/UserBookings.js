import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";

import BookingsCard from "../../../components/bookings-card/BookingsCard";
import ConfirmedBookingsCard from "../../../components/confirmed-bookings-card/ConfirmedBookingsCard";
import { AuthContext } from "../../../context/auth";
import { GET_SINGLE_USER } from "../../../helpers/gql-queries/getSingleUserQuery";

function UserBookings() {
  const {
    authData: { user }
  } = useContext(AuthContext);

  const { loading, data } = useQuery(GET_SINGLE_USER, {
    variables: {
      userId: user.userId
    }
  });

  let authUser;
  if (data) {
    authUser = data.getSingleUser;
  }

  return (
    <Grid doubling>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <>
          <Grid.Row centered>
            <BookingsCard authUser={authUser} />
          </Grid.Row>
          <Grid.Row centered>
            <ConfirmedBookingsCard authUser={authUser} />
          </Grid.Row>
        </>
      )}
    </Grid>
  );
}

export default UserBookings;
