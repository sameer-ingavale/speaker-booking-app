import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

function SpeakerSortByDistance({ onSortClick }) {
  const [maxDistance, setMaxDistance] = useState({
    distance: 1609.34,
    distanceSpeakersLength: 0
  });

  const [distanceSpeakers, setDistanceSpeakers] = useState([]);

  const [sortByDistance, { loading: distanceLoading }] = useMutation(
    SORT_BY_DISTANCE,
    {
      variables: {
        maxDistance: parseInt(maxDistance.distance)
      },
      update(proxy, data) {
        setDistanceSpeakers(data.data.sortSpeakersByDistance);
        setMaxDistance({
          ...maxDistance,
          distanceSpeakersLength: data.data.sortSpeakersByDistance.length
        });
      }
    }
  );

  const onDistanceChange = async (event, result) => {
    await setMaxDistance({ ...maxDistance, distance: result.value });
    sortByDistance();
  };

  const onDistanceSort = (event) => {
    event.preventDefault();
    if (distanceSpeakers) {
      onSortClick(distanceSpeakers, maxDistance);
      setMaxDistance({
        ...maxDistance
      });
    }
  };
  return (
    <>
      {/*  <pre>{JSON.stringify(distanceSpeakers.length, null, 2)}</pre> */}
      <Form.Input
        className="testSlider"
        min={1609.34}
        max={130357}
        name="duration"
        step={8046.72}
        type="range"
        value={maxDistance.distance}
        onChange={onDistanceChange}
      />
      {"  "}
      <label className="distanceLabel">
        {Math.floor((maxDistance.distance / 1000) * 0.621371)} miles
      </label>
      <Button
        compact={true}
        className="yellowButton"
        disabled={distanceLoading || maxDistance.distance < 2000 ? true : false}
        onClick={onDistanceSort}
      >
        Sort
      </Button>
    </>
  );
}

const SORT_BY_DISTANCE = gql`
  mutation sortSpeakersByDistance($maxDistance: Int!) {
    sortSpeakersByDistance(maxDistance: $maxDistance) {
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

export default SpeakerSortByDistance;
