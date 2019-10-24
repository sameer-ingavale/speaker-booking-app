import React, { useState } from "react";
import { Card, Grid, Button, Confirm, Header } from "semantic-ui-react";
import moment from "moment";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

function BookingsCard({ authUser }) {
  console.log(authUser);
  const [bookingId, setBookingId] = useState({ bookingId: null });
  const [open, setOpen] = useState(false);

  const onConfirm = (event) => {
    setBookingId({ bookingId: event.target.value });
    setOpen(true);
  };

  const [confirmBooking, { loading }] = useMutation(CONFIRM_BOOKING, {
    update(proxy, data) {
      console.log(data);
    },
    variables: {
      bookingId: bookingId.bookingId
    }
  });

  const onConfirmClose = () => {
    setOpen(false);
  };

  const onFinalConfirm = () => {
    confirmBooking();
    setOpen(false);
  };

  return (
    <Grid.Column width={13}>
      <Header as="h4" dividing>
        Booking Requests
      </Header>
      <Card fluid>
        <Confirm
          open={open}
          onCancel={onConfirmClose}
          onConfirm={onFinalConfirm}
        />
        {authUser &&
          authUser.bookingRequests &&
          authUser.bookingRequests.map((request) => {
            return (
              request.confirmed === false && (
                <Card.Content key={request._id}>
                  <Button
                    floated="right"
                    disabled={request.confirmed === true ? true : false}
                    value={request._id}
                    onClick={onConfirm}
                  >
                    Confirm Booking
                  </Button>
                  <Card.Header>{request.event.title}</Card.Header>
                  <Card.Meta>
                    {moment(request.event.eventDate).format("ddd, MMM DD")}
                    {", "}
                    {moment(request.event.startTime).format("h:mm A")}
                  </Card.Meta>
                </Card.Content>
              )
            );
          })}
      </Card>
    </Grid.Column>
  );
  /* 
  return (
    <div>
      <h1>test</h1>
    </div>
  ); */
}

const CONFIRM_BOOKING = gql`
  mutation confirmBooking($bookingId: ID!) {
    confirmBooking(bookingId: $bookingId) {
      _id
    }
  }
`;

export default BookingsCard;
