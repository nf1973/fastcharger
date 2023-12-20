"use client";
import { IoLogoApple } from "react-icons/io5";
import { GrGoogle } from "react-icons/gr";

const openGoogleMaps = (latitude, longitude) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  window.open(url, "_blank");
};

const openAppleMaps = (latitude, longitude) => {
  const url = `http://maps.apple.com/?q=${latitude},${longitude}`;
  window.open(url, "_blank");
};

const ChargerCard = ({ charger }) => {
  const handleGoogleMapsClick = () => {
    openGoogleMaps(charger.Latitude, charger.Longitude);
  };

  const handleAppleMapsClick = () => {
    openAppleMaps(charger.Latitude, charger.Longitude);
  };

  return (
    <div className="  bg-slate-100 shadow-md rounded-lg m-2 flex">
      <div className="p-4">
        <h5 className="mb-2 text-xl font-medium>">
          <p className="text-neutral-200 text-right bg-neutral-400 p-2 rounded">
            {charger.Operator}
          </p>
        </h5>
        <div key={charger.Title} className="p-4">
          <h2 className="text-xl text-neutral-600 font-semibold mb-2">
            {charger.Title}
          </h2>
          <p className="text-neutral-600">
            <span className="text-neutral-500 font-bold">
              Number of Charge Points:
            </span>{" "}
            {charger.NumberOfChargePoints}
          </p>
          <p className="text-neutral-600">
            <span className="text-neutral-500 font-bold">Address:</span>{" "}
            {charger.AddressLine1}
          </p>
          <p className="text-neutral-600">
            <span className="text-neutral-500 font-bold">Town:</span>{" "}
            {charger.Town}
          </p>
          <p className="text-neutral-600">
            <span className="text-neutral-500 font-bold">Postcode:</span>{" "}
            {charger.Postcode}
          </p>
          <p className="text-neutral-600 mt-5">
            <span className="text-neutral-500 font-bold">Distance:</span>{" "}
            {Math.round(parseFloat(charger.Distance))} km
          </p>
          <p className="text-neutral-600">
            <span className="text-neutral-500 font-bold">
              Driving Distance:
            </span>{" "}
            {Math.round(parseFloat(charger["Driving Distance"]))} km
          </p>
        </div>

        <div className="flex gap-5">
          <button
            type="button"
            onClick={handleGoogleMapsClick}
            className="rounded bg-slate-300 px-6 py-3"
          >
            <div className="flex">
              <GrGoogle className="me-3" />
              <p className="text-xs">Send to Google Maps</p>
            </div>
          </button>
          <button
            type="button"
            onClick={handleAppleMapsClick}
            className="rounded bg-slate-300 px-6 py-3"
          >
            <div className="flex">
              <IoLogoApple className="me-3" />
              <p className="text-xs">Send to Apple Maps</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChargerCard;

// "AccessComments": "24/7 nutzbar",
// "AddressLine1": "Station Road 99",
// "Credit": "Open Charge Map Contributors",
// "DateLastVerified": "2023-12-19T14:55:00Z",
// "Distance": "0.8189374908335816",
// "Driving Distance": "1.5675999999999999",
// "Latitude": 99.8776271,
// "Longitude": 99.8776271,
// "NumberOfChargePoints": 1,
// "Operator": "(Business Owner at Location)",
// "Title": "Zahnarztpraxis Dr. Tooth & Gums",
// "Town": "Townville",
// "UsageType": "Public - Membership Required"