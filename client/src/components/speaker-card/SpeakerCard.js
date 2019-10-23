import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

function SpeakerCard({
  speaker: { _id, firstName, lastName, dateCreated, profilePictureLink }
}) {
  return (
    <Card fluid>
      <Card.Content>
        <Image
          bordered
          rounded
          floated="left"
          size="tiny"
          src={profilePictureLink}
        />
        <Card.Header
          as={Link}
          to={`/profile/${_id}`}
        >{`${firstName} ${lastName}`}</Card.Header>
        <Card.Meta>{`Joined ${moment(dateCreated).fromNow(
          true
        )} ago`}</Card.Meta>
      </Card.Content>
    </Card>
  );
}

export default SpeakerCard;
