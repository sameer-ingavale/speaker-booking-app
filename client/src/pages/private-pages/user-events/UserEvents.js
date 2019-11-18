import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Grid,
  Card,
  Button,
  Icon,
  Header,
  Confirm,
  Image
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import EventImages from "../../../helpers/components/EventImages";
import "./userEvents.css";
import { enumToWord } from "../../../helpers/helper-functions/enumToWord";
import RenewEventModal from "../../../components/renew-event-modal/RenewEventModal";
import Spinner from "../../../helpers/loaders/Spinner";

import { GET_COMPANY } from "../../../helpers/gql-queries/getCompanyQuery";

function UserEvents() {
  const { loading, data } = useQuery(GET_USER_EVENTS);

  const { loading: companyLoading, data: companyData } = useQuery(GET_COMPANY);

  let events;

  if (data) {
    events = data.getSingleUserEvents;
    console.log(events);
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
    <>
      <Grid>
        {loading || companyLoading ? (
          <Grid.Row className="loaderRow">
            <Grid.Column className="loaderColumn">
              <Spinner />
            </Grid.Column>
          </Grid.Row>
        ) : events && events.length > 0 ? (
          <Grid.Row centered>
            <Grid.Column width={13}>
              <Header className="marginHeader header2">Events</Header>
              {events.map((event) => (
                <Card fluid key={event._id}>
                  <Confirm
                    cancelButton="No"
                    confirmButton="Yes"
                    content="Are you sure you want to cancel this request?"
                    open={open}
                    onCancel={onCancelClose}
                    onConfirm={onFinalCancel}
                  />
                  <Card.Content>
                    <RenewEventModal event={event} />
                    {moment(event.eventDate) > Date.now() && (
                      <Button
                        basic
                        color="blue"
                        compact
                        floated="right"
                        onClick={openModal}
                      >
                        <Icon name="edit" />
                        Edit
                      </Button>
                    )}
                    <EventImages event={event} />
                    <Card.Header
                      className="header4"
                      as={Link}
                      to={`/events/${event._id}`}
                    >
                      {event.title}
                    </Card.Header>
                    <Card.Meta>
                      {moment(event.eventDate).format("ddd, MMM DD")}
                      <span className="eventDateFromNow">{` - ${moment(
                        event.eventDate
                      ).fromNow()}`}</span>
                      <br />
                      {`${moment(event.startTime).format("h:mm A")} to ${moment(
                        event.endTime
                      ).format("h:mm A")}`}
                      <br />
                    </Card.Meta>
                    <Card.Description>
                      <Icon name="search"></Icon>
                      {`${enumToWord(event.requirementType)}`}
                    </Card.Description>
                  </Card.Content>
                  {event.booking &&
                    !event.booking.confirmedSpeaker &&
                    event.booking.requestedSpeakers.length > 0 && (
                      <Card.Content className="userEventsContentBox">
                        <Card.Header className="userEventsSubheading">
                          Requested Speakers
                        </Card.Header>
                        {event.booking.requestedSpeakers.map((speaker) => (
                          <Card.Content
                            className="requestedSpeakersContent"
                            key={speaker._id}
                          >
                            <Button
                              basic
                              compact
                              negative
                              floated="right"
                              value={speaker._id + " " + event._id}
                              onClick={onCancel}
                            >
                              Cancel Request
                            </Button>
                            <Card.Description className="header5 requestedSpeakersTextContent">{`${speaker.firstName} ${speaker.lastName}`}</Card.Description>
                            <Card.Description className="header6">{`${speaker.city}, ${speaker.state}`}</Card.Description>
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
        ) : !companyData ? (
          <Grid.Row columns="2" className="noContentGridRow">
            <Grid.Column width="6" className="noContentGridColumn1">
              <Image
                src="https://i.ibb.co/XszPCmD/Traffic-Barricade-Empty-Page.png"
                size="small"
              />
            </Grid.Column>
            <Grid.Column width="10" className="noContentGridColumn2">
              <p className="header3">
                Add an organization to start creating events.
              </p>
              <Button as={Link} to="/account/create-company" basic color="blue">
                Add Organization
              </Button>
            </Grid.Column>
          </Grid.Row>
        ) : (
          <Grid.Row columns="2" className="noContentGridRow">
            <Grid.Column width="6" className="noContentGridColumn1">
              <Image
                src="https://i.ibb.co/7pSxYCF/Traffic-Cone-Empty-Page.png"
                size="small"
              />
            </Grid.Column>
            <Grid.Column width="10" className="noContentGridColumn2">
              <p className="header3">You haven't created any events yet.</p>
              <Button as={Link} to="/account/create-event" basic color="blue">
                Create Event
              </Button>
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </>
  );
}

const GET_USER_EVENTS = gql`
  {
    getSingleUserEvents {
      _id
      title
      eventDate
      eventType
      startTime
      endTime
      eventType
      eventTopic
      requirementType
      booking {
        _id
        confirmed
        requestedSpeakers {
          _id
          firstName
          lastName
          city
          state
        }
        confirmedSpeaker {
          _id
          firstName
          lastName
          city
          state
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
