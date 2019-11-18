import React, { useState } from "react";
import { Card, Grid, Button, Confirm, Header, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

function BookingRequestsCard({ authUser }) {
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
    <>
      {authUser && authUser.bookingRequests.length === 0 ? (
        <Grid.Row columns="2" className="noContentGridRow">
          <Grid.Column width="6" className="noContentGridColumn1">
            <Image
              spaced="right"
              src="https://image.flaticon.com/icons/svg/202/202381.svg"
              size="tiny"
            />
          </Grid.Column>
          <Grid.Column width="10" className="noContentGridColumn2">
            <p className="header3">You have no booking requests.</p>
          </Grid.Column>
        </Grid.Row>
      ) : (
        <Grid.Column width={13}>
          <Header className="marginHeader header2">Booking Requests</Header>

          <Confirm
            open={open}
            onCancel={onConfirmClose}
            onConfirm={onFinalConfirm}
          />
          {authUser.bookingRequests.map((request) => {
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
      )}
    </>
  );
}

const CONFIRM_BOOKING = gql`
  mutation confirmBooking($bookingId: ID!) {
    confirmBooking(bookingId: $bookingId) {
      _id
    }
  }
`;

export default BookingRequestsCard;
