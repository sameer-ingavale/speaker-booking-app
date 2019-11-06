import React from "react";
import { Image } from "semantic-ui-react";

function EventImages({ event }) {
  return (
    <Image
      floated="left"
      size="tiny"
      src={
        event.eventType === "RELIGIOUS"
          ? "https://image.flaticon.com/icons/svg/1908/1908029.svg"
          : event.eventType === "NETWORKING"
          ? "https://image.flaticon.com/icons/svg/1358/1358637.svg"
          : event.eventType === "SEMINAR"
          ? "https://image.flaticon.com/icons/svg/1358/1358642.svg"
          : "https://image.flaticon.com/icons/svg/1358/1358642.svg"
      }
    />
  );
}

export default EventImages;
