import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Card, Label, Icon } from "semantic-ui-react";
import "./eventCard.css";

import { enumToHashtagWord } from "../../helpers/helper-functions/enumToHashtagWord";

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
        <Card.Header className="header3" as={Link} to={`/events/${_id}`}>
          {title}
        </Card.Header>

        <Card.Meta>
          <span className="eventDateFromNow">{`Starts ${moment(
            eventDate
          ).fromNow()}`}</span>
          <br />
          {moment(eventDate).format("ddd, MMM DD YYYY")}
          {", "}
          {moment(startTime).format("h:mm A")}
        </Card.Meta>
        <Card.Meta>
          Duration:{" "}
          {moment.duration(new moment(endTime).diff(startTime)).humanize()}
        </Card.Meta>
        <Card.Description style={{ padding: "10px 0px 15px 0px" }}>
          <Icon name="map marker alternate" />{" "}
          {streetAddress2
            ? `${streetAddress1}, ${streetAddress2}, ${city}, ${state}, ${zip}`
            : `${streetAddress1}, ${streetAddress2} ${city}, ${state}, ${zip}`}
        </Card.Description>
        <Card.Description>
          <Icon name="search"></Icon> Looking for speaker
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {enumToHashtagWord(eventTopic)}
        {payType !== "PAID" ? (
          <Label attached="top right" size="small" className="event-paid-label">
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
