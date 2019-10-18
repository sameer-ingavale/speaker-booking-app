import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";
import EventCard from "../../components/event-card/EventCard";
import EventsPlaceholder from "../../helpers/Placeholders/EventsPlaceholder";
import ErrorImage from "../../assets/images/404-Image.png";
// import moment from "moment";

function Events() {
  const { loading, error, data } = useQuery(GET_EVENTS_QUERY);

  let events;

  if (data) {
    events = data.getEvents;
  }

  return (
    <Grid columns={1} className="mainWrapper">
      {loading ? (
        <EventsPlaceholder />
      ) : error ? (
        <img src={ErrorImage} alt="404-error" />
      ) : (
        events &&
        events.map((event) => (
          <Grid.Column key={event._id}>
            <EventCard event={event} />
          </Grid.Column>
        ))
      )}
    </Grid>
  );
}

const GET_EVENTS_QUERY = gql`
  {
    getEvents {
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
        city
        state
        zip
        country
      }
      expired
      eventVisibility
      createdAt
      updatedAt
      creatorPerson {
        _id
      }
      creatorCompany {
        _id
        name
      }
    }
  }
`;

export default Events;
