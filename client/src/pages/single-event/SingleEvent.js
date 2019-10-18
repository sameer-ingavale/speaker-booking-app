import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";
import SingleEventCard from "../../components/single-event-card/SingleEventCard";

function SingleEvent(props) {
  const eventId = props.match.params.eventId;

  const { loading, error, data } = useQuery(GET_SINGLE_EVENT, {
    variables: {
      eventId
    }
  });

  let singleEvent;

  if (data) {
    singleEvent = data.getSingleEvent;
  }

  return (
    <Grid>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <Grid.Column>
          <SingleEventCard event={singleEvent} />
        </Grid.Column>
      )}
    </Grid>
  );
}

const GET_SINGLE_EVENT = gql`
  query($eventId: ID!) {
    getSingleEvent(eventId: $eventId) {
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

export default SingleEvent;
