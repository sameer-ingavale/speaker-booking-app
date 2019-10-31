import React, { Fragment } from "react";
import { Grid, Placeholder, Segment } from "semantic-ui-react";

export default function SpeakersPlaceholder() {
  const PlaceholderArray = [1, 2, 3, 4];

  return PlaceholderArray.map((number) => (
    <Fragment key={number}>
      <Grid.Column>
        <Segment raised>
          <Placeholder>
            <Placeholder.Header image>
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
    </Fragment>
  ));
}
