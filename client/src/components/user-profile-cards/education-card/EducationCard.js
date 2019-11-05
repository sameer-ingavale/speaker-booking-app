import React, { useContext } from "react";
import { Grid, Card, Divider } from "semantic-ui-react";
import { AuthContext } from "../../../context/auth";
import AddEducationModal from "./AddEducationModal";
import EditEducationModal from "./EditEducationModal";
import "./educationCard.css";

function EducationCard({ pageUser, UrlId }) {
  const {
    authData: { user: authUser }
  } = useContext(AuthContext);

  let authUserId = authUser.userId;

  return (
    <Grid>
      <Grid.Row centered>
        <Grid.Column width={15}>
          <Card fluid style={{ paddingBottom: "25px" }} className="shadowCard">
            <Card.Content className="educationHeaderContent">
              {authUserId === UrlId && (
                <AddEducationModal pageUser={pageUser} />
              )}
              <Card.Header className="header2">Education</Card.Header>
            </Card.Content>
            {pageUser.education.length > 0 &&
              pageUser.education
                .map((education) => (
                  <Card.Content
                    key={education._id}
                    className="educationMainContent"
                  >
                    <Card.Description
                      style={{ fontWeight: "600" }}
                      className="header3"
                    >
                      {authUserId === UrlId && (
                        <EditEducationModal education={education} />
                      )}
                      {education.school}
                    </Card.Description>
                    <Card.Description className="header4">
                      {`${education.degree}, ${education.field}`}
                    </Card.Description>
                    <Card.Meta>{`${education.startYear} - ${education.endYear}`}</Card.Meta>
                    <Card.Meta>{education.activities}</Card.Meta>
                    <Card.Description className="normalText">
                      {education.description.split("\n").map((line) => (
                        <div key={education._id + Math.random()}>{line}</div>
                      ))}
                    </Card.Description>
                  </Card.Content>
                ))
                .reduce(
                  (acc, x) =>
                    acc === null ? (
                      x
                    ) : (
                      <>
                        {acc}
                        <Divider section />
                        {x}
                      </>
                    ),
                  null
                )}
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default EducationCard;
