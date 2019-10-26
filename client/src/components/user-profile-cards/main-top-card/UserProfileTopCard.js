import React, { useState, Fragment, useContext } from "react";
import { Grid, Card, Button, Image, Icon, Header } from "semantic-ui-react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import "./userProfileTopCard.css";

import { AuthContext } from "../../../context/auth";
import TopCardEditModal from "./top-card-components/top-card-edit-modal/TopCardEditModal";
import BookingTopCard from "../booking-top-card/BookingTopCard";
import ProfilePictureEditButton from "./top-card-components/profile-picture-edit-button/ProfilePictureEditButton";

function UserProfileTopCard({ pageUser, UrlId }) {
  const {
    authData: { user: authUser }
  } = useContext(AuthContext);

  let authUserId = authUser.userId;

  const { loading, error, data } = useQuery(GET_AUTH_USER_EVENTS);
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

  const [modalOpen, setModalOpen] = useState({ open: false });

  const openModal = () => {
    setModalOpen({ open: !modalOpen.open });
  };

  return (
    <Grid>
      <Grid.Row centered>
        <Grid.Column width={15}>
          <TopCardEditModal
            pageUser={pageUser}
            modalOpen={modalOpen}
            openModal={openModal}
          />
          {authUser.userType === "EVENT_PLANNER" &&
            authUserId !== UrlId &&
            pageUser.userType === "SPEAKER" && (
              <BookingTopCard
                UrlId={UrlId}
                values={values}
                onChange={onChange}
                authUserEventsOptions={authUserEventsOptions}
              />
            )}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column width={15}>
          <Card fluid>
            <Card.Content className="profileIntroCoverPhotoContainer">
              {/* <Image
                className="coverPhotoImage"
                centered
                wrapped={true}
                verticalAlign="middle"
                fluid
                src="https://media.licdn.com/dms/image/C4D1BAQHEBhgTiA44vQ/company-background_10000/0?e=1571997600&v=beta&t=WGvgrsTfKJbVPjyhZGvrc6zqWkXn1mQ7V-vnwQ0Fnuw"
              /> */}
            </Card.Content>
            <Card.Content className="profileIntroImageContainer">
              <Image
                floated="left"
                size="small"
                src={pageUser.profilePictureLink}
                bordered
                circular
                className="profileIntroImage"
              />
              {authUserId === UrlId && <ProfilePictureEditButton />}
              {authUserId === UrlId && (
                <Button
                  style={{ margin: "8px 8px 0px 0px" }}
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
            </Card.Content>
            <Card.Content className="profileIntroTextContainer">
              <Card.Header className="header1">{`${pageUser.firstName} ${pageUser.lastName}`}</Card.Header>
              <Card.Meta>{` ${pageUser.gender}, ${pageUser.age}`}</Card.Meta>
              <Card.Description className="header4">
                {pageUser.tagline}
              </Card.Description>
              <Card.Description className="header5">
                {`${pageUser.city}, ${pageUser.state}`}
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
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

export default UserProfileTopCard;
