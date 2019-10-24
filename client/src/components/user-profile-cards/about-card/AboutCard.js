import React, { useState, useContext } from "react";
import { Grid, Card, Button, Icon } from "semantic-ui-react";
import "./aboutCard.css";
import { AuthContext } from "../../../context/auth";
import AboutCardEditModal from "../../../components/user-profile-cards/about-card/AboutCardEditModal";

function AboutCard({ pageUser, UrlId }) {
  const {
    authData: { user: authUser }
  } = useContext(AuthContext);

  let authUserId = authUser.userId;

  const [modalOpen, setModalOpen] = useState({ open: false });

  const openModal = () => {
    setModalOpen({ open: !modalOpen.open });
  };

  return (
    <Grid.Row centered>
      <Grid.Column width={15}>
        <AboutCardEditModal
          pageUser={pageUser}
          modalOpen={modalOpen}
          openModal={openModal}
        />
        <Card fluid>
          <Card.Content className="aboutCardContent">
            {authUserId === UrlId && (
              <Button
                style={{ margin: "5px 5px 0px 0px" }}
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
            <Card.Header>About</Card.Header>
            <Card.Description className="aboutText">
              {pageUser.about}
            </Card.Description>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid.Row>
  );
}

export default AboutCard;
