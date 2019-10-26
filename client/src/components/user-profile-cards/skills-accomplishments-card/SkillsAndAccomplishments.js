import React, { useState, useContext } from "react";
import { Grid, Card, Button, Icon } from "semantic-ui-react";
import { AuthContext } from "../../../context/auth";
import EducationCardEditModal from "./EducationCardEditModal";

function SkillsAndAccomplishments({ pageUser, UrlId }) {
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
        <EducationCardEditModal
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
                Add Education
              </Button>
            )}
            <Card.Header className="header2">Education</Card.Header>

            {pageUser.education.length > 0 &&
              pageUser.education.map((education) => (
                <>
                  <Card.Description
                    style={{ fontWeight: "600" }}
                    className="header3"
                  >
                    {education.school}
                  </Card.Description>
                  <Card.Description className="header4">
                    {`${education.degree}, ${education.field}`}
                  </Card.Description>
                  <Card.Meta>{`${education.startYear} - ${education.endYear}`}</Card.Meta>
                  <Card.Meta>{education.activities}</Card.Meta>
                  <Card.Description className="normalText">
                    {education.description.split("\n").map((line) => (
                      <div>{line}</div>
                    ))}
                  </Card.Description>
                </>
              ))}
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid.Row>
  );
}

export default SkillsAndAccomplishments;
