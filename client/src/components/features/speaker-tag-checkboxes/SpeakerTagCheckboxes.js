import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Checkbox, Button } from "semantic-ui-react";
import { userTagsOptions } from "../../../helpers/resusable-data/userTagsOptions";

function SpeakerTagCheckboxes({ onTagsFilter }) {
  const [tags, setTags] = useState([]);
  const [tagSpeakers, setTagSpeakers] = useState([]);

  const [executeSearch, { loading: tagsLoading }] = useMutation(
    SEARCH_BY_TAGS,
    {
      update(
        proxy,
        {
          data: { searchByTags }
        }
      ) {
        setTagSpeakers(searchByTags);
      },
      variables: {
        tags: tags
      }
    }
  );

  const onChange = async (event, result) => {
    let index = tags.indexOf(result.value);
    if (index !== -1) {
      await setTags(tags.filter((item) => item !== result.value));
      executeSearch();
    } else {
      await setTags([...tags, result.value]);
      executeSearch();
    }
  };

  const onClick = () => {
    onTagsFilter(tagSpeakers);
  };

  return (
    <div>
      {/* <pre>{JSON.stringify(tagSpeakers, null, 2)}</pre> */}
      {userTagsOptions.map((tag) => (
        <Checkbox
          style={{ padding: "7px 20px 12px 0px" }}
          onChange={onChange}
          value={tag.value}
          key={tag.key}
          label={tag.text}
        />
      ))}
      <Button
        disabled={tagsLoading ? true : false}
        compact={true}
        className="yellowButton"
        onClick={onClick}
      >
        Filter
      </Button>
    </div>
  );
}

const SEARCH_BY_TAGS = gql`
  mutation searchByTags($tags: [String]) {
    searchByTags(tags: $tags) {
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

export default SpeakerTagCheckboxes;
