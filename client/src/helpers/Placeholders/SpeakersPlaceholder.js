import React, { Fragment } from "react";
import { range } from "lodash";
import {
  Grid,
  Placeholder,
  Segment,
  Divider,
  Label,
  Icon
} from "semantic-ui-react";

export default function SpeakersPlaceholder() {
  const PlaceholderArray = range(1, 9);

  return PlaceholderArray.map((number) => (
    <Fragment key={number}>
      <Grid.Column>
        <Segment
          className="shadowCard"
          raised
          style={{ marginBottom: "30px", border: "none" }}
        >
          <Placeholder fluid>
            <Placeholder.Image square />
            <Placeholder.Header>
              <Placeholder.Line length="medium" />
              <Placeholder.Line length="short" />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length="full" />
            </Placeholder.Paragraph>
          </Placeholder>
          <Label style={{ margin: "12px 7px 0 0", padding: "23px 30% 0 0" }}>
            <Placeholder fluid></Placeholder>
          </Label>
          <Label style={{ margin: "12px 7px 0 0", padding: "25px 30% 0 0" }}>
            <Placeholder fluid></Placeholder>
          </Label>
          <Label style={{ margin: "12px 7px 0 0", padding: "25px 30% 0 0" }}>
            <Placeholder fluid></Placeholder>
          </Label>
          <Divider style={{ margin: " 10px 0px 3px 0px" }} />
          <Placeholder fluid>
            <Placeholder.Line length="long" />
          </Placeholder>
        </Segment>
      </Grid.Column>
    </Fragment>
  ));
}
