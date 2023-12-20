"use client";
import { useEffect, useState } from "react";

const GetCurrentLocation = () => {
  const [coordinates, setCoordinates] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      setCoordinates("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position) => {
    setCoordinates({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  useEffect(() => {
    getLocation();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  console.log(coordinates);
  return coordinates;
};

export default GetCurrentLocation;
