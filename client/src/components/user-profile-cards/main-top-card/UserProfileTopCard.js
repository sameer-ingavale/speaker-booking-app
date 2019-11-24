import React, { useState, useContext } from "react";
import { Grid, Card, Button, Image, Icon } from "semantic-ui-react";
/* import gql from "graphql-tag"; */
/* import { useQuery } from "@apollo/react-hooks"; */
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
            pageUser.userType === "SPEAKER" && <BookingTopCard UrlId={UrlId} />}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column width={15}>
          <Card fluid>
            <Card.Content className="profileIntroCoverPhotoContainer"></Card.Content>
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
              {pageUser.gender && pageUser.age && (
                <Card.Meta>{` ${pageUser.gender}, ${pageUser.age}`}</Card.Meta>
              )}
              <Card.Description className="header4">
                {pageUser.headline}
              </Card.Description>
              {pageUser.city && pageUser.state && (
                <Card.Description className="header5">
                  {`${pageUser.city}, ${pageUser.state}`}
                </Card.Description>
              )}
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

/* const GET_AUTH_USER_EVENTS = gql`
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
`; */

export default UserProfileTopCard;
