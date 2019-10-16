import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Button } from "semantic-ui-react";
import "react-datepicker/dist/react-datepicker.css";
import "./createEvent.css";

export default function CreateEvent() {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  const ExampleCustomInput = ({ value, onClick }) => (
    <Button onClick={onClick}>{value}</Button>
  );

  return (
    <div>
      <pre>{JSON.stringify(startDate, null, 2)}</pre>
      <pre>{JSON.stringify(startTime, null, 2)}</pre>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        customInput={<ExampleCustomInput />}
      />
      <DatePicker
        selected={startTime}
        onChange={(date) => setStartTime(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        customInput={<ExampleCustomInput />}
      />
    </div>
  );
}
