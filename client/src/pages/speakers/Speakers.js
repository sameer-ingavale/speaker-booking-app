import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";
import SpeakersPlaceholder from "../../helpers/Placeholders/SpeakersPlaceholder";

import SpeakerCard from "../../components/speaker-card/SpeakerCard";

function Speakers() {
  const { loading, error, data } = useQuery(GET_SPEAKERS_QUERY);

  let speakers;

  if (data) {
    speakers = data.getSpeakers;
  }

  return (
    <Grid columns={2} className="main-wrapper">
      <Grid.Row>
        {loading ? (
          <SpeakersPlaceholder />
        ) : error ? (
          <h1>fuck</h1>
        ) : (
          speakers &&
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
      profilePictureLink
    }
  }
`;

export default Speakers;
