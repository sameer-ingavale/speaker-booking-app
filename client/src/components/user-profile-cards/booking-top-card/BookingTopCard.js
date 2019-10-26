import React from "react";
import { Grid, Card, Dropdown, Button, Sticky } from "semantic-ui-react";
import "./bookingTopCard.css";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

function BookingTopCard({ UrlId, values, onChange, authUserEventsOptions }) {
  const [bookRequest, { loading }] = useMutation(REQUEST_BOOKING, {
    update(proxy, data) {
      console.log(data);
    },
    variables: {
      requestedSpeakerId: UrlId,
      eventId: values.eventId
    }
  });

  const onSubmit = (event) => {
    event.preventDefault();
    bookRequest();
  };

  return (
    <Grid.Column width={15}>
      <Sticky>
        <Card fluid>
          <Card.Content textAlign="left">
            <h4>Book This Speaker</h4>
            <Dropdown
              selection
              options={authUserEventsOptions}
              name="eventId"
              placeholder="Select Event"
              value={values.eventId}
              onChange={onChange}
            />
            <Button
              className="bookSpeakerButton"
              basic
              color="blue"
              disabled={values.eventId !== "" ? false : true}
              onClick={onSubmit}
            >
              Send Booking Request
            </Button>
          </Card.Content>
        </Card>
      </Sticky>
    </Grid.Column>
  );
}

const REQUEST_BOOKING = gql`
  mutation requestBooking($requestedSpeakerId: ID!, $eventId: ID!) {
    requestBooking(requestedSpeakerId: $requestedSpeakerId, eventId: $eventId) {
      _id
    }
  }
`;

export default BookingTopCard;
