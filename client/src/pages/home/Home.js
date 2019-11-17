import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { usePosition } from "../../helpers/custom-hooks/usePosition";
import { Card, Grid, Label, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  const {
    authData: { user: authUserData }
  } = useContext(AuthContext);

  const { position, error } = usePosition();

  const coordinates = position.slice(0, 2);

  const { data, loading } = useQuery(GET_STATS);

  let speakerCount;
  let eventCount;

  if (data) {
    speakerCount = data.getStats.speakerCount;
    eventCount = data.getStats.eventCount;
  }

  const [addUserLocation] = useMutation(ADD_USER_LOCATION, {
    update(proxy, data) {
      console.log(data);
    },
    variables: {
      coordinates: coordinates
    }
  });

  useEffect(() => {
    if (authUserData && coordinates.length > 1) {
      addUserLocation();
    }
  }, [position]);

  return (
    <Grid columns={2} doubling className="mainBody">
      <Grid.Row style={{ padding: "50px 20vw 0 20vw" }}>
        <Grid.Column>
          <Card fluid as={Link} to={`/speakers`}>
            <Image
              wrapped
              fluid
              src="https://i.ibb.co/YkWMcBX/speakers-main-card-image.png"
            />
            <Label color="teal" attached="top right">
              {loading ? (
                <Icon style={{ margin: "0" }} name="spinner" />
              ) : (
                speakerCount
              )}
            </Label>
            <Card.Header className="mainCardHeader shadowCard">
              Browse Speakers
            </Card.Header>
          </Card>
        </Grid.Column>

        <Grid.Column>
          <Card fluid as={Link} to={`/events`}>
            <Image
              wrapped
              fluid
              src="https://i.ibb.co/kq1d4Wk/speakers-backdrop.png"
            />
            <Label color="teal" attached="top right">
              {loading ? (
                <Icon style={{ margin: "0" }} name="spinner" />
              ) : (
                eventCount
              )}
            </Label>
            <Card.Header className="mainCardHeader shadowCard">
              Explore Events
            </Card.Header>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

const ADD_USER_LOCATION = gql`
  mutation addUserLocation($coordinates: [Float]) {
    addUserLocation(coordinates: $coordinates) {
      success
    }
  }
`;

const GET_STATS = gql`
  {
    getStats {
      speakerCount
      eventCount
    }
  }
`;

export default Home;
