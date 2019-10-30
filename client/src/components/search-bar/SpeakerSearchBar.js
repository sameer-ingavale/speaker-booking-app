import React, { useState, useCallback } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { debounce } from "lodash";
import { Grid, Search, Button, Header, Image } from "semantic-ui-react";
import "./speakerSearchBar.css";

function SpeakerSearchBar({ props }) {
  const [values, setValues] = useState({
    searchResult: "",
    searchValue: "",
    isLoading: false
  });

  const SearchResultWrapper = (params) => (
    <div
      className={params.className}
      onClick={(event) => params.onClick(event)}
    >
      {params.children}
    </div>
  );

  const [makeSearch] = useMutation(SPEAKER_SEARCH, {
    update(
      proxy,
      {
        data: { speakerSearch }
      }
    ) {
      const resultArray = speakerSearch.map((item) => {
        return {
          childKey: item._id,
          as: SearchResultWrapper,
          id: item._id,
          title: item.firstName,
          image: item.profilePictureLink,
          city: item.city
        };
      });

      console.log(resultArray);
      setValues({ ...values, isLoading: false, searchResult: resultArray });
    },
    variables: {
      searchValue: values.searchValue
    }
  });

  const resultRenderer = ({ id, title, image, city }) => (
    <div key={id} className="searchResultWrapper">
      <Image src={image}></Image>
      <Header className="header6 searchResultHeader" content={title} />
    </div>
  );

  const searchFunction = useCallback(debounce(makeSearch, 50000), []);

  const onSearchChange = (event) => {
    let searchValue = event.target.value;
    setValues({
      ...values,
      searchValue,
      isLoading: true
    });

    searchFunction();
  };

  const onResultSelect = (event, { result }) => {
    console.log(result.id);
    props.history.push(`/profile/${result.id}`);
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Grid.Row centered>
      <Grid.Column style={{ display: "flex" }}>
        <Search
          onResultSelect={onResultSelect}
          resultRenderer={resultRenderer}
          input={{ icon: "search", iconPosition: "left" }}
          loading={values.isLoading}
          onSearchChange={onSearchChange}
          size="small"
          results={values.searchResult}
          noResultsMessage={values.isLoading ? "loading" : "test"}
        />
        <Button className="speakerSearchButton" onClick={onSubmit}>
          Search
        </Button>
      </Grid.Column>
    </Grid.Row>
  );
}

const SPEAKER_SEARCH = gql`
  mutation speakerSearch($searchValue: String!) {
    speakerSearch(searchValue: $searchValue) {
      _id
      firstName
      lastName
      city
      profilePictureLink
    }
  }
`;

export default SpeakerSearchBar;
