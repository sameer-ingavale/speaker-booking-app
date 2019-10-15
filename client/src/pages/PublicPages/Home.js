import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";

import SpeakerCard from "../../Components/SpeakerCard";

function Home() {
  const { loading, error, data } = useQuery(GET_SPEAKERS_QUERY);

  return (
    <Grid columns={2} className="mainWrapper">
      <Grid.Row>
        {loading ? (
          <h1>Loading posts..</h1>
        ) : error ? (
          <h1>fuck</h1>
        ) : (
          data.getSpeakers.map((speaker) => (
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
