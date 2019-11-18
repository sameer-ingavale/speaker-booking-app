import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";

import BookingRequestsCard from "../../../components/booking-requests-card/BookingRequestsCard";
import ConfirmedBookingsCard from "../../../components/confirmed-bookings-card/ConfirmedBookingsCard";
import { AuthContext } from "../../../context/auth";
import { GET_SINGLE_USER } from "../../../helpers/gql-queries/getSingleUserQuery";
import Spinner from "../../../helpers/loaders/Spinner";

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
        <Grid.Row className="loaderRow">
          <Grid.Column className="loaderColumn">
            <Spinner />
          </Grid.Column>
        </Grid.Row>
      ) : (
        <>
          <Grid.Row centered>
            <BookingRequestsCard authUser={authUser} />
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
