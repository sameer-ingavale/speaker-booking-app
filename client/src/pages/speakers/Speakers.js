import React, { useState, useEffect } from "react";
import gql from "graphql-tag";

import SpeakerSearchBar from "../../components/search-bar/SpeakerSearchBar";
import { useQuery } from "@apollo/react-hooks";

import { Grid, Responsive } from "semantic-ui-react";
import SpeakersPlaceholder from "../../helpers/Placeholders/SpeakersPlaceholder";
import SpeakerCard from "../../components/speaker-card/SpeakerCard";

function Speakers(props) {
  const { loading, error, data } = useQuery(GET_SPEAKERS_QUERY);

  const [searchResult, setSearchResult] = useState({
    data: [],
    value: ""
  });

  const onClick = (values) => {
    setSearchResult({ data: values.searchData, value: values.searchValue });
  };

  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    if (searchResult.data.length > 0) {
      setSpeakers(searchResult.data);
    } else if (
      searchResult.data.length === 0 &&
      searchResult.value.length > 0
    ) {
      setSpeakers([]);
    } else if (data) {
      setSpeakers(data.getSpeakers);
    }
  }, [searchResult.data, data, searchResult.value]);

  return (
    <>
      <Responsive minWidth={600}>
        {/* <pre>{JSON.stringify(searchResult, null, 2)}</pre> */}
        <Grid columns={3} doubling className="main-wrapper">
          <Grid.Row>
            <SpeakerSearchBar props={props} onSearchClick={onClick} />
          </Grid.Row>
          {searchResult.data.length >= 0 && searchResult.value.length > 0 && (
            <div style={{ color: "#7B8489", fontStyle: "italic" }}>
              showing {searchResult.data.length} results for "
              {searchResult.value}"
            </div>
          )}
          <Grid.Row>
            {searchResult.isLoading || loading ? (
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
            <SpeakerSearchBar props={props} onSearchClick={onClick} />
            {searchResult.data.length >= 0 && searchResult.value.length > 0 && (
              <div style={{ color: "#7B8489", fontStyle: "italic" }}>
                showing {searchResult.data.length} results for "
                {searchResult.value}"
              </div>
            )}
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
