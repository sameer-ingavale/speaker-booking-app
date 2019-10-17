import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid, Placeholder, Segment } from "semantic-ui-react";
import EventCard from "../../../Components/eventCard/EventCard";
// import { Placeholder, Segment } from "semantic-ui-react";
// import moment from "moment";

function Events() {
  const { loading, error, data } = useQuery(GET_EVENTS_QUERY);

  let events;

  if (data) {
    events = data.getEvents;
    console.log(events);
  }

  const PlaceholderArray = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Grid columns={1} className="mainWrapper">
      <Grid.Row>
        {loading ? (
          PlaceholderArray.map(() => (
            <Grid.Column key={Math.random()}>
              <Segment raised style={{ marginBottom: "25px" }}>
                <Placeholder>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length="medium" />
                    <Placeholder.Line length="short" />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Segment>
            </Grid.Column>
          ))
        ) : error ? (
          <h1>fuck</h1>
        ) : (
          events &&
          events.map((event) => (
            <Grid.Column key={event._id}>
              <EventCard event={event} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
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
      }
    }
  }
`;

export default Events;
