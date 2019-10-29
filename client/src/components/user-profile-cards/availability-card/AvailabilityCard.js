import React, { useState } from "react";
import { Grid, Card, Button, Icon } from "semantic-ui-react";
import moment from "moment";
import "./availabilityCard.css";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../helpers/css/datePicker.css";

function SetAvailabilityCard({ pageUser, UrlId }) {
  const [values, setValues] = useState({
    fromDate: new Date(),
    toDate: new Date()
  });

  console.log(pageUser.availability.toDate);

  const EventDateButton = ({ value, onClick }) => (
    <Button basic onClick={onClick} className="availabilityDateButton">
      <Icon name="calendar alternate" />
      {moment(value).format("ddd, MMM DD")}
    </Button>
  );

  const [setAvailability] = useMutation(SET_SPEAKER_AVAILABILITY, {
    update(proxy, data) {
      console.log(data);
    },
    variables: values
  });

  const onSubmit = async () => {
    await setAvailability();
    window.location.reload();
  };

  return (
    <Grid>
      <Grid.Row centered>
        <Grid.Column computer={15} mobile={16}>
          <Card fluid>
            <Card.Content className="educationHeaderContent">
              <Card.Header className="header2">
                Set Your Availability
              </Card.Header>
              <Card.Meta>Only you can see this</Card.Meta>
              <Card.Content>
                From
                <DatePicker
                  minDate={new Date()}
                  maxDate={new Date().setMonth(new Date().getMonth() + 1)}
                  selected={values.fromDate}
                  onChange={(date) => setValues({ ...values, fromDate: date })}
                  customInput={<EventDateButton />}
                />
                to
                <DatePicker
                  minDate={new Date()}
                  maxDate={new Date().setMonth(new Date().getMonth() + 1)}
                  selected={values.toDate}
                  onChange={(date) => setValues({ ...values, toDate: date })}
                  customInput={<EventDateButton />}
                />
                <Button
                  basic
                  color="blue"
                  onClick={onSubmit}
                  className="setAvailabilityButton"
                >
                  Set Availability
                </Button>
              </Card.Content>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

const SET_SPEAKER_AVAILABILITY = gql`
  mutation setSpeakerAvailability($fromDate: String!, $toDate: String!) {
    setSpeakerAvailability(fromDate: $fromDate, toDate: $toDate) {
      success
    }
  }
`;

export default SetAvailabilityCard;
