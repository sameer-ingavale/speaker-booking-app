import React from "react";
import { Card, Image, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./speakerCard.css";

function SpeakerCard({
  speaker: {
    _id,
    firstName,
    lastName,
    city,
    state,
    tagline,
    dateCreated,
    profilePictureLink
  }
}) {
  return (
    <Card fluid>
      <Image wrapped fluid src={profilePictureLink} />
      <Label color="olive" attached="top left">
        Available
      </Label>
      <Card.Content className="speakerCardContent">
        <Card.Header
          as={Link}
          to={`/profile/${_id}`}
        >{`${firstName} ${lastName}`}</Card.Header>
        <Card.Meta>
          <Icon color="grey" name="map pin"></Icon>
          {` ${city}, ${state}`}
        </Card.Meta>
        <Card.Description>
          Sepcialities: I specilaise in Muslim speaking.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p>
          <span>
            <Icon name="checked calendar"></Icon> Dates Available
          </span>
        </p>
        <p>Jan 5 2019 - Jan 29 2019</p>
      </Card.Content>
    </Card>
  );
}

export default SpeakerCard;
