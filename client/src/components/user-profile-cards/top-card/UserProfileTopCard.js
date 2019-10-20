import React, { useState, Fragment } from "react";
import { Grid, Card, Button, Image, Icon } from "semantic-ui-react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import TopCardEditModal from "../top-card-edit-modal/TopCardEditModal";
import BookingTopCard from "../booking-top-card/BookingTopCard";

function UserProfileTopCard({ user, authUserId, UrlId }) {
  const { loading, error, data } = useQuery(GET_COMPANY);
  let authUserEventsArray;

  if (data) {
    authUserEventsArray = data.getCompany.createdEvents;
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

  const [modalOpen, setModalOpen] = useState({ open: false });

  const openModal = () => {
    setModalOpen({ open: !modalOpen.open });
  };

  return (
    <Fragment>
      <Grid.Row centered>
        <TopCardEditModal modalOpen={modalOpen} openEditModal={openModal} />
        {authUserId !== UrlId && (
          <BookingTopCard
            values={values}
            onChange={onChange}
            authUserEventsOptions={authUserEventsOptions}
          />
        )}
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column width={15}>
          <Card fluid>
            <Card.Content>
              {authUserId === UrlId && (
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
              )}
              <Image
                floated="left"
                size="tiny"
                src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
              />
              <Card.Header>{`${user.firstName} ${user.lastName}`}</Card.Header>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Fragment>
  );
}

const GET_COMPANY = gql`
  {
    getCompany {
      createdEvents {
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
  }
`;

export default UserProfileTopCard;
