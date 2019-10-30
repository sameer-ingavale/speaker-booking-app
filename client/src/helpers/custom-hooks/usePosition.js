import { useState, useEffect } from "react";

const defaultSettings = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0
};

export const usePosition = (watch = false, settings = defaultSettings) => {
  const [position, setPosition] = useState([]);
  const [error, setError] = useState(null);

  const onChange = ({ coords, timestamp }) => {
    const latitude = coords.latitude;
    const longitude = coords.longitude;
    const accuracy = coords.accuracy;

    setPosition([latitude, longitude, accuracy, timestamp]);
  };

  const onError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }

    let watcher = null;
    if (watch) {
      watcher = geo.watchPosition(onChange, onError, settings);
    } else {
      geo.getCurrentPosition(onChange, onError, settings);
    }

    return () => watcher && geo.clearWatch(watcher);
  }, [settings, watch]);

  return { position, error };
};

/* export default function geolocationAPI() {
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
} */
