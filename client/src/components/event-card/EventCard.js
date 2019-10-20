import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Card, Label, Icon } from "semantic-ui-react";
import "./eventCard.css";

function EventCard({
  event: {
    _id,
    title,
    eventDate,
    startTime,
    endTime,
    payType,
    eventType,
    eventTopic,
    payAmount,
    expectedTurnout,
    address,
    expired,
    eventVisibility,
    createdAt,
    updatedAt,
    creatorPerson,
    creatorCompany
  }
}) {
  const { streetAddress1, streetAddress2, city, state, zip } = address[0];
  return (
    <Card fluid className="event-card-wrapper">
      {/*  <pre>{JSON.stringify(new Date(parseInt(createdAt)), null, 2)}</pre> */}
      <Card.Content>
        <Card.Header as={Link} to={`/events/${_id}`}>
          {`${title}`}{" "}
        </Card.Header>

        <Card.Meta>
          {moment(eventDate).format("ddd, MMM DD")}
          {", "}
          {moment(startTime).format("h:mm A")}
        </Card.Meta>
        <Card.Meta>
          {streetAddress2
            ? `${streetAddress1}, ${streetAddress2}, ${city}, ${state}, ${zip}`
            : `${streetAddress1}, ${streetAddress2} ${city}, ${state}, ${zip}`}
        </Card.Meta>
        <Card.Meta
          as={Link}
          to={`/company/${creatorCompany._id}`}
        >{`Event by ${creatorCompany.name}`}</Card.Meta>
        <Card.Description>
          <Icon name="users" />
          {` Expected Turnout: ${expectedTurnout}`}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {`#${eventTopic.slice(0, 1) + eventTopic.slice(1).toLowerCase()}`}
        {payType === "PAID" ? (
          <Label attached="top right" size="tiny" className="event-paid-label">
            <Icon name="dollar sign" />
            PAID
          </Label>
        ) : (
          ""
        )}
      </Card.Content>
    </Card>
  );
}

export default EventCard;

/*  {`Updated ${moment(parseInt(updatedAt)).fromNow(true)} ago`} */
