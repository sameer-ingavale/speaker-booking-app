import React, { useState, useContext } from "react";

import { AuthContext } from "../../context/auth";

export default function Home() {
  const {
    authData: { user: authUserData }
  } = useContext(AuthContext);

  const [coordinates, setCoordinates] = useState({ coordinates: [] });

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        window.navigator.vibrate(200);

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

  return (
    <div>
      <pre>{JSON.stringify(coordinates, null, 2)}</pre>
    </div>
  );
}
