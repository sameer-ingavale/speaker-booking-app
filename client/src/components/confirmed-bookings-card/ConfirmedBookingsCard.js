import React from "react";
import { Card, Grid, Header } from "semantic-ui-react";
import moment from "moment";

export default function BookingsCard({ authUser }) {
  return (
    <Grid.Column width={13}>
      <Header className="marginHeader header2">Confirmed Bookings</Header>

      {authUser &&
        authUser.confirmedBookings &&
        authUser.confirmedBookings.map((confirm) => {
          return (
            <Card fluid>
              <Card.Content>
                <Card.Header>{confirm.event.title}</Card.Header>
                <Card.Meta>
                  {moment(confirm.event.eventDate).format("ddd, MMM DD")}
                  {", "}
                  {moment(confirm.event.startTime).format("h:mm A")}
                </Card.Meta>
              </Card.Content>
            </Card>
          );
        })}
    </Grid.Column>
  );
}
