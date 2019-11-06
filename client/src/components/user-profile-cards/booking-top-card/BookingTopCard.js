import React, { useState } from "react";
import { Grid, Card, Dropdown, Button, Message } from "semantic-ui-react";
import "./bookingTopCard.css";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

function BookingTopCard({ UrlId }) {
  const { data } = useQuery(GET_AUTH_USER_EVENTS);

  let authUserEventsOptions;

  if (data) {
    authUserEventsOptions = data.getSingleUserEvents.map((event) => {
      let eventTitle = event.title;
      if (eventTitle.length > 20) {
        eventTitle = eventTitle.slice(0, 18) + "...";
      }
      return { key: event._id, text: eventTitle, value: event._id };
    });
  }

  const [values, setValues] = useState({
    eventId: ""
  });

  const onChange = (event, result) => {
    const { name, value } = result || event.target;
    setValues({ ...values, [name]: value });
  };

  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [
    bookRequest,
    { loading: bookingLoading, error: bookingError }
  ] = useMutation(REQUEST_BOOKING, {
    update(proxy, data) {
      if (data) {
        setBookingSuccess(true);
      }
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

  console.log(bookingError);

  return (
    <Grid.Column width={15}>
      <Card
        fluid
        className="shadowCard"
        style={{ marginTop: "25px", padding: "10px 0px 10px 10px" }}
      >
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
          {bookingError === undefined && !bookingLoading && (
            <Message
              style={{ maxWidth: "80vw", width: "370px" }}
              icon="paper plane"
              success
              hidden={!bookingSuccess ? true : false}
              content="Booking request sent!"
            />
          )}
          <Message
            icon="spinner"
            style={{ width: "370px" }}
            warning
            hidden={!bookingLoading ? true : false}
            content="Loading.."
          />
          <Message
            icon="exclamation"
            style={{ width: "370px" }}
            warning
            hidden={bookingError === undefined ? true : false}
            content="Request already sent!"
          />
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}
const GET_AUTH_USER_EVENTS = gql`
  {
    getSingleUserEvents {
      _id
      title
      eventDate
      startTime
      endTime
      payType
      eventType
      eventTopic
      payAmount
      expectedTurnout
      address {
        streetAddress1
        streetAddress2
        zip
        city
        state
        country
      }
      expired
      eventVisibility
      createdAt
      updatedAt
    }
  }
`;

const REQUEST_BOOKING = gql`
  mutation requestBooking($requestedSpeakerId: ID!, $eventId: ID!) {
    requestBooking(requestedSpeakerId: $requestedSpeakerId, eventId: $eventId) {
      _id
    }
  }
`;

export default BookingTopCard;
