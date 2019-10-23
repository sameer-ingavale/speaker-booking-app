import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";

import BookingsCard from "../../../components/bookings-card/BookingsCard";
import ConfirmedBookingsCard from "../../../components/confirmed-bookings-card/ConfirmedBookingsCard";
import { AuthContext } from "../../../context/auth";
import { GET_SINGLE_USER } from "../../../helpers/getSingleUserQuery";

function UserBookings() {
  const {
    authData: { user: authUser }
  } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_SINGLE_USER, {
    variables: {
      userId: authUser.userId
    }
  });

  let pageUser;
  if (data) {
    pageUser = data.getSingleUser;
  }
  return (
    <Grid doubling>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <>
          <Grid.Row centered>
            <BookingsCard pageUser={pageUser} />
          </Grid.Row>
          <Grid.Row centered>
            <ConfirmedBookingsCard pageUser={pageUser} />
          </Grid.Row>
        </>
      )}
    </Grid>
  );
}

export default UserBookings;
