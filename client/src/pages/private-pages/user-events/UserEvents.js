import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Grid, Card, Button, Icon, Header, Confirm } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./userEvents.css";

function UserEvents() {
  /* const { loading, error, data } = useQuery(GET_USER_EVENTS); */
  const { data } = useQuery(GET_USER_EVENTS);

  let events;

  if (data) {
    events = data.getSingleUserEvents;
  }

  const [modalOpen, setModalOpen] = useState({ open: false });

  const openModal = () => {
    setModalOpen({ open: !modalOpen.open });
  };

  const [speakerId, setSpeakerId] = useState(null);
  const [eventId, setEventId] = useState(null);
  const [open, setOpen] = useState(false);

  const onCancel = (event) => {
    setSpeakerId(event.target.value.split(" ")[0]);
    setEventId(event.target.value.split(" ")[1]);
    setOpen(true);
  };

  const onCancelClose = () => {
    setOpen(false);
  };

  const [cancelBookingRequest] = useMutation(CANCEL_REQUEST, {
    update(proxy, data) {
      console.log(data);
    },
    variables: {
      eventId,
      speakerId
    }
  });

  const onFinalCancel = async () => {
    await cancelBookingRequest();
    setOpen(false);
    window.location.reload();
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
                <Confirm
                  open={open}
                  onCancel={onCancelClose}
                  onConfirm={onFinalCancel}
                />
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
                  <Card.Header>{event._id}</Card.Header>
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
                {event.booking &&
                  !event.booking.confirmedSpeaker &&
                  event.booking.requestedSpeakers.length > 0 && (
                    <Card.Content>
                      <Card.Header>Requested Speakers</Card.Header>
                      {event.booking.requestedSpeakers.map((speaker) => (
                        <Card.Content
                          className="requestedSpeakersContent"
                          key={speaker._id}
                        >
                          <Button
                            basic
                            floated="right"
                            value={speaker._id + " " + event._id}
                            onClick={onCancel}
                          >
                            Cancel Request
                          </Button>
                          <Card.Description>{`${speaker.firstName} ${speaker.lastName} ${speaker._id}`}</Card.Description>
                        </Card.Content>
                      ))}
                    </Card.Content>
                  )}
                {event.booking && event.booking.confirmedSpeaker && (
                  <Card.Content>
                    <Card.Header>Confirmed Speaker</Card.Header>
                    {
                      <Card.Content>
                        <Button basic floated="right">
                          Get Private Info
                        </Button>
                        {event.booking.confirmedSpeaker && (
                          <Card.Description>{`${event.booking.confirmedSpeaker.firstName} ${event.booking.confirmedSpeaker.lastName}`}</Card.Description>
                        )}
                        {/*  <Card.Meta>{`${speaker.firstName} ${speaker.lastName}`}</Card.Meta> */}
                      </Card.Content>
                    }
                  </Card.Content>
                )}
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

const CANCEL_REQUEST = gql`
  mutation cancelBookingRequest($eventId: ID!, $speakerId: ID!) {
    cancelBookingRequest(eventId: $eventId, speakerId: $speakerId) {
      success
    }
  }
`;

export default UserEvents;
