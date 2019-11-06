import React, { useState } from "react";
import { Modal, Button, Icon } from "semantic-ui-react";
import gql from "graphql-tag";
import moment from "moment";
import { useMutation } from "@apollo/react-hooks";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../helpers/css/datePickerWide.css";

function RenewEventModal({ event }) {
  const { _id, eventDate, startTime, endTime } = event;

  const [values, setValues] = useState({
    eventId: _id,
    eventDate: new Date(),
    startTime: new Date(),
    endTime: new Date()
  });

  const [modalOpen, setModalOpen] = useState({ open: false });

  const clickModalOpen = () => {
    setModalOpen({ open: !modalOpen.open });
  };

  const [renewEvent] = useMutation(RENEW_EVENT, {
    update(proxy, data) {
      console.log(data);
    },
    variables: values
  });

  const onRenew = async () => {
    clickModalOpen();
    await renewEvent();
    window.location.reload();
  };

  const EventStartButton = ({ value, onClick }) => (
    <Button className="dateButton" type="button" basic onClick={onClick}>
      <Icon name="time" /> {value}
    </Button>
  );

  const EventEndButton = ({ value, onClick }) => (
    <Button className="dateButton" type="button" basic onClick={onClick}>
      <Icon name="time" /> {value}
    </Button>
  );

  const EventDateButton = ({ value, onClick }) => (
    <Button className="dateButton" type="button" basic onClick={onClick}>
      <Icon name="calendar alternate" /> {value}
    </Button>
  );

  return (
    <>
      {moment(eventDate) < Date.now() && (
        <Button
          basic
          color="blue"
          compact
          floated="right"
          onClick={clickModalOpen}
        >
          <Icon name="repeat" />
          Renew
        </Button>
      )}
      <Modal dimmer="blurring" open={modalOpen.open} onClose={clickModalOpen}>
        {/* <Modal.Header>{JSON.stringify(values, null, 2)}</Modal.Header> */}
        <Modal.Content>
          <label>Event Date</label>
          <DatePicker
            minDate={new Date()}
            selected={values.eventDate}
            onChange={(date) => setValues({ ...values, eventDate: date })}
            customInput={<EventDateButton />}
          />
          <label>Event Start Time</label>
          <DatePicker
            selected={values.startTime}
            onChange={(date) => setValues({ ...values, startTime: date })}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            customInput={<EventStartButton />}
          />

          <label>Event End Time</label>
          <DatePicker
            selected={values.endTime}
            onChange={(date) => setValues({ ...values, endTime: date })}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            customInput={<EventEndButton />}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onRenew}>Renew Event</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

const RENEW_EVENT = gql`
  mutation renewEvent(
    $eventId: ID!
    $eventDate: String!
    $startTime: String!
    $endTime: String!
  ) {
    renewEvent(
      eventId: $eventId
      eventDate: $eventDate
      startTime: $startTime
      endTime: $endTime
    ) {
      success
    }
  }
`;

export default RenewEventModal;
