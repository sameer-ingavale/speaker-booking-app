import React from "react";
import { Grid, Card, Dropdown, Button, Sticky } from "semantic-ui-react";
import "./bookingTopCard.css";

export default function BookingTopCard({
  values,
  onChange,
  authUserEventsOptions
}) {
  return (
    <Grid.Column width={15}>
      <Sticky>
        <Card fluid>
          <Card.Content textAlign="left">
            <h4>Book This Speaker</h4>
            <Dropdown
              selection
              options={authUserEventsOptions}
              name="eventId"
              placeholder="Select Event"
              value={values.eventId}
              onChange={onChange}
            />
            <Button
              className="bookSpeakerButton"
              basic
              color="blue"
              disabled={values.eventId !== "" ? false : true}
            >
              Send Booking Request
            </Button>
          </Card.Content>
        </Card>
      </Sticky>
    </Grid.Column>
  );
}
