import React, { useState } from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Responsive, Search, Breadcrumb } from "semantic-ui-react";
import SpeakersPlaceholder from "../../helpers/Placeholders/SpeakersPlaceholder";

import SpeakerCard from "../../components/speaker-card/SpeakerCard";

function Speakers() {
  const { loading, error, data } = useQuery(GET_SPEAKERS_QUERY);

  let speakers;

  if (data) {
    speakers = data.getSpeakers;
    console.log(speakers);
  }

  const [values, setValues] = useState({ searchValue: "" });

  const onSearchChange = (event) => {
    let searchValue = event.target.value;
    setValues({ ...values, searchValue });
  };

  const sections = [
    { key: "Home", content: "Home", as: Link, to: "/home" },
    { key: "Speakers", content: "Speakers", as: Link, to: "/speakers" }
  ];

  return (
    <>
      <Responsive minWidth={600}>
        <Breadcrumb icon="right angle" sections={sections} />
        <pre>{JSON.stringify(values, null, 2)}</pre>
        <Grid columns={4} doubling className="main-wrapper">
          <Grid.Row centered>
            <Grid.Column>
              <Search onSearchChange={onSearchChange} size="small" />
            </Grid.Column>
          </Grid.Row>
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
      </Responsive>

      <Responsive maxWidth={600}>
        <Grid columns={2} doubling className="main-wrapper">
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
      </Responsive>
    </>
  );
}

const GET_SPEAKERS_QUERY = gql`
  {
    getSpeakers {
      _id
      firstName
      lastName
      city
      state
      userVisibility
      tagline
      tags
      availability {
        fromDate
        toDate
      }
      profilePictureLink
    }
  }
`;

export default Speakers;
