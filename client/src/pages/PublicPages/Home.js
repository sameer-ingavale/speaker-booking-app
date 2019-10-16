import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Placeholder, Segment } from "semantic-ui-react";

import SpeakerCard from "../../Components/SpeakerCard";

function Home() {
  const { loading, error, data } = useQuery(GET_SPEAKERS_QUERY);

  let speakers;

  if (data) {
    speakers = data.getSpeakers;
  }

  const PlaceholderArray = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Grid columns={2} className="mainWrapper">
      <Grid.Row>
        {loading ? (
          PlaceholderArray.map(() => (
            <Grid.Column>
              <Segment raised fluid style={{ "margin-bottom": "25px" }}>
                <Placeholder>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length="medium" />
                    <Placeholder.Line length="short" />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Segment>
            </Grid.Column>
          ))
        ) : error ? (
          <h1>fuck</h1>
        ) : (
          speakers.map((speaker) => (
            <Grid.Column key={speaker._id}>
              <SpeakerCard speaker={speaker} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

const GET_SPEAKERS_QUERY = gql`
  {
    getSpeakers {
      _id
      firstName
      lastName
      dateCreated
    }
  }
`;

export default Home;
