import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datePicker.css";
import "./createEvent.css";
import {
  Button,
  Form,
  Segment,
  Grid,
  Responsive,
  Transition,
  Message,
  Icon,
  Checkbox,
  Divider
} from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { stateOptions } from "../../../helpers/stateOptions";

function CreateEvent(props) {
  const eventTypeOptions = [
    { key: "1", text: "Religious", value: "RELIGIOUS" },
    { key: "2", text: "Charity", value: "CHARITY" },
    { key: "3", text: "Conference", value: "CONFERENCE" },
    { key: "4", text: "Seminar", value: "SEMINAR" },
    { key: "5", text: "Networking", value: "NETWORKING" },
    { key: "6", text: "Rally", value: "RALLY" },
    { key: "7", text: "Community", value: "COMMUNITY" },
    { key: "8", text: "Other", value: "OTHER" }
  ];

  const countryOptions = [{ key: "1", text: "United States", value: "US" }];

  const payTypeOptions = [
    { key: "1", text: "Free", value: "FREE" },
    { key: "2", text: "Paid", value: "PAID" }
  ];

  const eventTopicOptions = [
    {
      key: "1",
      text: "Religion & Spirituality",
      value: "RELIGION_SPIRITUALITY"
    },
    { key: "2", text: "Social Cause", value: "SOCIAL_CAUSE" },
    { key: "3", text: "Culture", value: "CULTURE" },
    { key: "4", text: "Education", value: "EDUCATION" },
    { key: "5", text: "Health & Wellness", value: "HEALTH_WELLNESS" },
    { key: "6", text: "Sports & Fitness", value: "SPORTS_FITNESS" },
    { key: "7", text: "Music", value: "MUSIC" },
    {
      key: "8",
      text: "Hobbies & Special Interests",
      value: "HOBBIES_SPECIAL_INTERESTS"
    },
    { key: "9", text: "Business", value: "BUSINESS" },
    { key: "10", text: "Technology", value: "TECHNOLOGY" },
    { key: "11", text: "Other", value: "OTHER" },
    { key: "12", text: "Politics", value: "POLITICS" }
  ];

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    title: "",
    eventDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    payType: "FREE",
    eventType: "RELIGIOUS",
    eventTopic: "RELIGION_SPIRITUALITY",
    payAmount: "0",
    expectedTurnout: "0",
    address: {
      streetAddress1: "",
      streetAddress2: "",
      city: "",
      state: "",
      zip: "",
      country: ""
    },
    eventVisibility: false
  });

  const EventStartButton = ({ value, onClick }) => (
    <Button type="button" basic onClick={onClick}>
      <Icon name="hourglass start" /> {value}
    </Button>
  );

  const EventEndButton = ({ value, onClick }) => (
    <Button type="button" basic onClick={onClick}>
      <Icon name="hourglass end" /> {value}
    </Button>
  );

  const EventDateButton = ({ value, onClick }) => (
    <Button type="button" basic onClick={onClick}>
      <Icon name="calendar alternate" /> {value}
    </Button>
  );

  const onAddressChange = (event, result) => {
    const { address } = { ...values };
    const currentAddress = address;
    const { name, value } = result || event.target;
    currentAddress[name] = value;
    setValues({ ...values, address: currentAddress });
  };

  const onChange = (event, result) => {
    const { name, value } = result || event.target;
    setValues({ ...values, [name]: value });
  };

  const onToggle = () => {
    const toggle = !values.eventVisibility;
    setValues({ ...values, eventVisibility: toggle });
  };

  const [createEvent, { loading }] = useMutation(CREATE_EVENT, {
    update(
      proxy,
      {
        data: { createEvent: eventData }
      }
    ) {
      console.log(eventData);
      props.history.push("/account/events");
    },
    onError(err) {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  const onSubmit = (event) => {
    event.preventDefault();
    createEvent();
  };

  return (
    <Grid centered columns={1} padded={"horizontally"}>
      <Grid.Column
        width={10}
        widescreen={9}
        computer={10}
        tablet={12}
        mobile={16}
      >
        {/*  <pre>{JSON.stringify(values, null, 2)}</pre> */}
        <Responsive as={Segment}>
          <Form
            noValidate
            onSubmit={onSubmit}
            className={loading ? "loading" : ""}
          >
            <Form.Group widths="equal">
              <Form.Input
                label="Event Title"
                placeholder="Event Title"
                name="title"
                type="text"
                value={values.title}
                onChange={onChange}
                error={errors.title ? true : false}
              />
              <Form.Dropdown
                placeholder="Event Type"
                name="eventType"
                label="Event Type"
                selection
                onChange={onChange}
                options={eventTypeOptions}
                value={values.eventType}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Dropdown
                placeholder="Event Topic"
                name="eventTopic"
                label="Event Topic"
                selection
                onChange={onChange}
                options={eventTopicOptions}
                value={values.eventTopic}
              />
              <Form.Input
                label="Expected Turnout"
                placeholder="Expected Turnout"
                name="expectedTurnout"
                type="text"
                value={values.expectedTurnout}
                onChange={onChange}
                error={errors.expectedTurnout ? true : false}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Dropdown
                placeholder="Pay Type"
                name="payType"
                label="Pay Type"
                selection
                onChange={onChange}
                options={payTypeOptions}
                value={values.payType}
              />
              <Form.Input
                disabled={values.payType === "FREE" ? true : false}
                label="Pay Amount"
                placeholder="Pay Amount"
                name="payAmount"
                type="text"
                value={values.payAmount}
                onChange={onChange}
                error={errors.payAmount ? true : false}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field>
                <label>Event Date</label>
                <DatePicker
                  selected={values.eventDate}
                  onChange={(date) => setValues({ ...values, eventDate: date })}
                  customInput={<EventDateButton />}
                />
              </Form.Field>
              <Form.Field>
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
              </Form.Field>
              <Form.Field>
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
              </Form.Field>
            </Form.Group>
            <Form.Input
              label="Address Line 1"
              placeholder="Address Line 1"
              name="streetAddress1"
              type="text"
              value={values.streetAddress1}
              onChange={onAddressChange}
              error={errors.streetAddress1 ? true : false}
            />
            <Form.Input
              label="Address Line 2"
              placeholder="Address Line 2"
              name="streetAddress2"
              type="text"
              value={values.streetAddress2}
              onChange={onAddressChange}
              error={errors.streetAddress2 ? true : false}
            />

            <Form.Group widths="equal">
              <Form.Input
                label="Zip Code"
                placeholder="Zip Code"
                name="zip"
                type="text"
                value={values.zip}
                onChange={onAddressChange}
                error={errors.zip ? true : false}
              />
              <Form.Input
                label="City"
                placeholder="City"
                name="city"
                type="text"
                value={values.city}
                onChange={onAddressChange}
                error={errors.city ? true : false}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Dropdown
                placeholder="State"
                name="state"
                label="State"
                selection
                search
                onChange={onAddressChange}
                options={stateOptions}
                value={values.stateOptions}
                error={errors.state ? true : false}
              />
              <Form.Dropdown
                placeholder="Country"
                name="country"
                label="Country"
                selection
                defaultValue="US"
                onChange={onAddressChange}
                options={countryOptions}
                value={values.countryOptions}
              />
            </Form.Group>
            <Form.Group>
              <Checkbox
                className="makeeventVisibilityToggle"
                toggle
                label="Make Event eventVisibility"
                name="eventVisibility"
                checked={values.eventVisibility}
                onChange={onToggle}
              />
            </Form.Group>
            <Divider />
            <Button type="submit" primary>
              Create Event
            </Button>
          </Form>
        </Responsive>
        <Transition.Group animation="fade up" duration={500}>
          {Object.keys(errors).length > 0 && (
            <Message error list={Object.values(errors)}></Message>
          )}
        </Transition.Group>
      </Grid.Column>
    </Grid>
  );
}

const CREATE_EVENT = gql`
  mutation createEvent(
    $title: String!
    $eventDate: String!
    $startTime: String!
    $endTime: String!
    $payType: PayTypeEnum!
    $eventType: EventTypeEnum!
    $eventTopic: EventTopicEnum!
    $payAmount: String
    $expectedTurnout: String!
    $address: address!
    $eventVisibility: Boolean!
  ) {
    createEvent(
      input: {
        title: $title
        eventDate: $eventDate
        startTime: $startTime
        endTime: $endTime
        payType: $payType
        eventType: $eventType
        eventTopic: $eventTopic
        payAmount: $payAmount
        expectedTurnout: $expectedTurnout
        address: $address
        eventVisibility: $eventVisibility
      }
    ) {
      _id
      title
      eventDate
      startTime
      endTime
      payType
      eventType
      eventTopic
      payAmount
      expectedTurnout
      address {
        streetAddress1
        streetAddress2
        city
        state
        zip
        country
      }
      expired
      eventVisibility
      createdAt
      updatedAt
      creatorPerson {
        _id
      }
      creatorCompany {
        _id
      }
    }
  }
`;
export default CreateEvent;
