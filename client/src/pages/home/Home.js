import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { usePosition } from "../../helpers/custom-hooks/usePosition";
import { Card } from "semantic-ui-react";

function Home() {
  const {
    authData: { user: authUserData }
  } = useContext(AuthContext);

  const { position, error } = usePosition();

  const coordinates = position.slice(0, 2);

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
    <Card>
      <pre>{JSON.stringify(position, null, 2)}</pre>

      {/*<Card.Content>
           <Card.Header>{latitude}</Card.Header>
          <Card.Header>{latitude}</Card.Header>
          <Card.Header>{latitude}</Card.Header>
          <Card.Header>{latitude}</Card.Header>
        </Card.Content> */}
    </Card>
  );
}

const ADD_USER_LOCATION = gql`
  mutation addUserLocation($coordinates: [Float]) {
    addUserLocation(coordinates: $coordinates) {
      success
    }
  }
`;

export default Home;
