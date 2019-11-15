import React, { useState } from "react";
import { Card, Grid, Button, Confirm, Header } from "semantic-ui-react";
import moment from "moment";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

function BookingsCard({ authUser }) {
  console.log(authUser);
  const [bookingId, setBookingId] = useState(null);
  const [open, setOpen] = useState(false);

  const onConfirm = (event) => {
    setBookingId(event.target.value);
    setOpen(true);
  };

  const [confirmBooking] = useMutation(CONFIRM_BOOKING, {
    update(proxy, data) {
      console.log(data);
    },
    variables: {
      bookingId: bookingId
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
      <Header as="h3" className="marginHeader">
        Booking Requests
      </Header>

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
              <Card fluid>
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
              </Card>
            )
          );
        })}
    </Grid.Column>
  );
}

const CONFIRM_BOOKING = gql`
  mutation confirmBooking($bookingId: ID!) {
    confirmBooking(bookingId: $bookingId) {
      _id
    }
  }
`;

export default BookingsCard;
