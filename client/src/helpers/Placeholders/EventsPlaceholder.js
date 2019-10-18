import React, { Fragment } from "react";
import { Grid, Placeholder, Segment } from "semantic-ui-react";

function EventsPlaceholder() {
  const PlaceholderArray = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Fragment>
      {PlaceholderArray.map(() => (
        <Grid.Column key={Math.random()}>
          <Segment style={{ marginBottom: "25px" }}>
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line length="medium" />
                <Placeholder.Line length="short" />
              </Placeholder.Paragraph>
            </Placeholder>
          </Segment>
        </Grid.Column>
      ))}
    </Fragment>
  );
}

export default EventsPlaceholder;
