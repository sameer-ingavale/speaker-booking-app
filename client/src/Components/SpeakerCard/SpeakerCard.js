import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./speakerCard.css";

function SpeakerCard({ speaker: { _id, firstName, lastName, dateCreated } }) {
  return (
    <Card raised fluid className="cardWrapper">
      <Card.Content>
        <Image
          floated="left"
          size="tiny"
          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
        />
        <Card.Header
          as={Link}
          to={`/speakers/${_id}`}
        >{`${firstName} ${lastName}`}</Card.Header>
        <Card.Meta>{`Joined ${moment(dateCreated).fromNow(
          true
        )} ago`}</Card.Meta>
      </Card.Content>
    </Card>
  );
}

export default SpeakerCard;
