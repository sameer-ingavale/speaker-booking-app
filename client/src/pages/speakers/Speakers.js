import React, { useState, useEffect, useContext } from "react";
import gql from "graphql-tag";
import "./speakers.css";
import { AuthContext } from "../../context/auth";

import SpeakerSearchBar from "../../components/features/speaker-search-bar/SpeakerSearchBar";
import { useQuery } from "@apollo/react-hooks";

import { Grid, Responsive } from "semantic-ui-react";
import SpeakersPlaceholder from "../../helpers/Placeholders/SpeakersPlaceholder";
import SpeakerCard from "../../components/speaker-card/SpeakerCard";
import SpeakerTagCheckboxes from "../../components/features/speaker-tag-checkboxes/SpeakerTagCheckboxes";
import SpeakerSortByDistance from "../../components/features/speaker-sort-by-distance/SpeakerSortByDistance";

function Speakers(props) {
  const {
    authData: { user: authUser }
  } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_SPEAKERS_QUERY);

  const [clicked, setClicked] = useState("");

  const [searchResult, setSearchResult] = useState({
    data: [],
    value: ""
  });

  const onSearchClick = (values) => {
    setSearchResult({ data: values.searchData, value: values.searchValue });
    setClicked("search");
  };

  const [speakers, setSpeakers] = useState([]);

  const [distanceData, setDistanceData] = useState();

  const [tagsData, setTagsData] = useState();

  const onSortClick = (distanceSpeakers, maxDistance) => {
    setDistanceData(maxDistance);
    setClicked("distance");
    setSpeakers(distanceSpeakers);
  };

  const onTagsFilter = (tagSpeakers) => {
    if (tagSpeakers) {
      setTagsData(tagSpeakers);
      setClicked("tags");
      setSpeakers(tagSpeakers);
    }
  };

  console.log(window.innerWidth);

  useEffect(() => {
    if (searchResult.data.length > 0) {
      setSpeakers(searchResult.data);
      console.log("here");
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
      {/* <pre>{JSON.stringify(clicked, null, 2)}</pre> */}
      <Responsive minWidth={600}>
        <Grid columns={4} doubling className="mainBody">
          <Grid.Row>
            <SpeakerSearchBar props={props} onSearchClick={onSearchClick} />
          </Grid.Row>
          {authUser && authUser.userId && speakers === "damn" && (
            <Grid.Row className="distanceWrapper">
              <SpeakerSortByDistance onSortClick={onSortClick} />
            </Grid.Row>
          )}
          <Grid.Row>
            <SpeakerTagCheckboxes onTagsFilter={onTagsFilter} />
          </Grid.Row>

          {searchResult.data.length >= 0 &&
            searchResult.value.length > 0 &&
            clicked === "search" && (
              <div className="searchSortInfo">
                showing {searchResult.data.length} speakers for "
                {searchResult.value}"
              </div>
            )}

          {clicked === "distance" && (
            <div className="searchSortInfo">
              showing {distanceData.distanceSpeakersLength} speakers within "
              {Math.floor((distanceData.distance / 1000) * 0.621371)} miles"
            </div>
          )}

          {clicked === "tags" && (
            <div className="searchSortInfo">
              showing {tagsData.length} speaker(s) that match the selected
              tag(s)"
            </div>
          )}
          <Grid.Row>
            {loading ? (
              <SpeakersPlaceholder />
            ) : error ? (
              <h1>Something went wrong..please try again</h1>
            ) : (
              speakers &&
              speakers.map((speaker) => (
                <Grid.Column key={speaker._id} className="speakerCardContainer">
                  <SpeakerCard speaker={speaker} />
                </Grid.Column>
              ))
            )}
          </Grid.Row>
        </Grid>
      </Responsive>

      <Responsive maxWidth={600}>
        <Grid columns={2} doubling className="mainBody">
          <Grid.Row>
            <SpeakerSearchBar props={props} onSearchClick={onSearchClick} />
          </Grid.Row>
          {authUser && authUser.userId && speakers === "damn" && (
            <Grid.Row className="distanceWrapper">
              <SpeakerSortByDistance onSortClick={onSortClick} />
            </Grid.Row>
          )}
          <Grid.Row>
            <SpeakerTagCheckboxes onTagsFilter={onTagsFilter} />
          </Grid.Row>

          {searchResult.data.length >= 0 &&
            searchResult.value.length > 0 &&
            clicked === "search" && (
              <div className="searchSortInfo">
                showing {searchResult.data.length} speakers for "
                {searchResult.value}"
              </div>
            )}

          {clicked === "distance" && (
            <div className="searchSortInfo">
              showing {distanceData.distanceSpeakersLength} speakers within "
              {Math.floor((distanceData.distance / 1000) * 0.621371)} miles"
            </div>
          )}

          {clicked === "tags" && (
            <div className="searchSortInfo">
              showing {tagsData.length} speaker(s) that match the selected
              tag(s)"
            </div>
          )}
          <Grid.Row>
            {loading ? (
              <SpeakersPlaceholder />
            ) : error ? (
              <h1>Something went wrong..please try again</h1>
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
