import React from "react";
import { usePosition } from "../../helpers/custom-hooks/usePosition";
import { Card } from "semantic-ui-react";

export default function Home() {
  const { position, error } = usePosition();

  console.log(position);

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
