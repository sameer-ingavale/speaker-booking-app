import React, { useContext, useState } from "react";
import { Grid, Card, Dropdown, Button, Sticky } from "semantic-ui-react";
import "./bookingTopCard.css";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { AuthContext } from "../../../context/auth";

function BookingTopCard({ UrlId }) {
  const {
    authData: { user: authUser }
  } = useContext(AuthContext);

  let authUserId = authUser.userId;

  const { data } = useQuery(GET_AUTH_USER_EVENTS);
  let authUserEventsArray;

  if (data) {
    authUserEventsArray = data.getSingleUserEvents;
  }

  let authUserEventsOptions;

  if (authUserEventsArray) {
    authUserEventsOptions = authUserEventsArray.map((event) => {
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

  const [bookRequest] = useMutation(REQUEST_BOOKING, {
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
