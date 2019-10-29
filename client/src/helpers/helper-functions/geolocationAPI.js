import React, { useState } from "react";

export default function geolocationAPI() {
  const [coordinates, setCoordinates] = useState({ coordinates: [] });

  if ("geolocation" in navigator) {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        console.log(
          "geolocation permission status is ",
          permissionStatus.state
        );
        permissionStatus.onchange = () => {
          console.log(
            "geolocation permission status has changed to ",
            this.state
          );
        };
      });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude, position.coords.longitude);

        let latitude = parseFloat(position.coords.latitude.toFixed(6));
        let longitude = parseFloat(position.coords.longitude.toFixed(6));
        let timestamp = position.timestamp;
        let accuracy = position.coords.accuracy;

        setCoordinates({
          coordinates: [latitude, longitude, timestamp, accuracy]
        });
      },
      (error) => {
        console.log(error.code);
      }
    );
  } else {
    console.log("no geaolocation support in current environment");
  }

  return <div></div>;
}
