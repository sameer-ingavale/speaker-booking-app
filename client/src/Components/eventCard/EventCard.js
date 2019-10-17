import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

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
  return (
    <Card fluid className="cardWrapper">
      {/*  <pre>{JSON.stringify(new Date(parseInt(createdAt)), null, 2)}</pre> */}
      <Card.Content>
        <Image
          floated="left"
          size="tiny"
          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
        />
        <Card.Header
          as={Link}
          to={`/speakers/${_id}`}
        >{`${title} ${eventType}`}</Card.Header>
        <Card.Meta>{`Updated ${moment(parseInt(updatedAt)).fromNow(
          true
        )} ago`}</Card.Meta>
        <Card.Meta>{moment(eventDate).format("dddd, MMMM Do YYYY")}</Card.Meta>
        <Card.Meta>{moment(startTime).format("hh:mm A")}</Card.Meta>
        <Card.Meta>{moment(endTime).format("hh:mm A")}</Card.Meta>
      </Card.Content>
    </Card>
  );
}

{
  /* <pre>
          {JSON.stringify(
            moment(startDate).format("dddd, MMMM Do YYYY"),
            null,
            2
          )}
        </pre>
        <pre>{JSON.stringify(moment(startTime).format("hh:mm A"), null, 2)}</pre> */
}

export default EventCard;
