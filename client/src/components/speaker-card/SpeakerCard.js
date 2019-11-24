import React from "react";
import { Card, Image, Icon, Label, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./speakerCard.css";
import moment from "moment";

function SpeakerCard({
  speaker: {
    _id,
    firstName,
    lastName,
    city,
    state,
    userVisibility,
    tagline,
    tags,
    availability,
    profilePictureLink
  }
}) {
  return (
    <Card fluid className="shadowCardHover" style={{ marginBottom: "30px" }}>
      <Image
        wrapped
        fluid
        src={profilePictureLink}
        as={Link}
        to={`/profile/${_id}`}
      />
      {availability.toDate && new Date() < new Date(availability.toDate) ? (
        <Label color="olive" attached="top left">
          Available
        </Label>
      ) : (
        <Label color="red" attached="top left">
          Unavailable
        </Label>
      )}
      <Card.Content className="speakerCardContent">
        <Card.Header
          as={Link}
          to={`/profile/${_id}`}
        >{`${firstName} ${lastName}`}</Card.Header>

        <Card.Meta style={{ paddingTop: "5px" }}>
          <Icon color="grey" name="map pin"></Icon>
          {city && state ? ` ${city}, ${state}` : " Location not set"}
        </Card.Meta>

        <Card.Description>{tagline}</Card.Description>
        <Card.Description>
          {tags.map((tag) => (
            <Label key={tag} style={{ margin: "8px 7px 0 0" }}>
              {tag}
            </Label>
          ))}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {availability.toDate && new Date() < new Date(availability.toDate)
          ? `Available: ${moment(availability.fromDate).format(
              "DD MMM 'YY"
            )} - ${moment(availability.toDate).format("DD MMM 'YY")}`
          : "No Available Dates"}
      </Card.Content>
    </Card>
  );
}

export default SpeakerCard;
