import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Card, Button, Icon, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./userEvents.css";

function UserEvents() {
  const { loading, error, data } = useQuery(GET_USER_EVENTS);

  let events;

  if (data) {
    events = data.getSingleUserEvents;
    console.log(events);
  }

  const [modalOpen, setModalOpen] = useState({ open: false });

  const openModal = () => {
    setModalOpen({ open: !modalOpen.open });
  };

  return (
    <Grid>
      <Grid.Row centered>
        <Grid.Column width={13}>
          <Header as="h4" dividing>
            My Events
          </Header>
          {events &&
            events.map((event) => (
              <Card fluid key={event._id}>
                <Card.Content>
                  <Button
                    basic
                    color="blue"
                    compact
                    floated="right"
                    onClick={openModal}
                  >
                    <Icon name="edit outline" />
                    Edit
                  </Button>
                  <Card.Header as={Link} to={`/events/${event._id}`}>
                    {event.title}
                  </Card.Header>
                  <Card.Meta>
                    {moment(event.eventDate).format("ddd, MMM DD")}
                    {", "}
                    {moment(event.startTime).format("h:mm A")}
                    <br />
                    <span className="eventDateFromNow">{`Event ${moment(
                      event.eventDate
                    ).fromNow()}`}</span>
                  </Card.Meta>
                </Card.Content>
                <Card.Content>
                  <Card.Header>Requested Speakers</Card.Header>
                  {event.booking &&
                    event.booking.requestedSpeakers.map((speaker) => (
                      <Card.Content>
                        <Button basic floated="right">
                          Cancel Request
                        </Button>
                        <Card.Description>{`${speaker.firstName} ${speaker.lastName}`}</Card.Description>
                        <Card.Meta>{`${speaker.firstName} ${speaker.lastName}`}</Card.Meta>
                      </Card.Content>
                    ))}
                </Card.Content>
                <Card.Content>
                  <Card.Header>Confirmed Speaker</Card.Header>
                  {event.booking && (
                    <Card.Content>
                      <Button basic floated="right">
                        Get Private Info
                      </Button>
                      <Card.Description>{`${event.booking.confirmedSpeaker.firstName} ${event.booking.confirmedSpeaker.lastName}`}</Card.Description>
                      {/*  <Card.Meta>{`${speaker.firstName} ${speaker.lastName}`}</Card.Meta> */}
                    </Card.Content>
                  )}
                </Card.Content>
              </Card>
            ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

const GET_USER_EVENTS = gql`
  {
    getSingleUserEvents {
      _id
      title
      eventDate
      startTime
      booking {
        _id
        confirmed
        requestedSpeakers {
          _id
          firstName
          lastName
        }
        confirmedSpeaker {
          _id
          firstName
          lastName
        }
      }
    }
  }
`;

export default UserEvents;
