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

const ChargerCard = ({ chargerid, charger }) => {
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
          <div className="flex justify-between text-neutral-200 text-right bg-slate-400 p-2 rounded">
            <p className="text-white bg-blue-400 border-white border-solid border-2 rounded-full items-center pr-2 justify-center h-8 w-8 font-bold">
              {chargerid + 1}
            </p>
            <p className="text-white">
              {charger.Operator === "(Business Owner at Location)"
                ? "Unknown Operator"
                : charger.Operator}
            </p>
          </div>
        </h5>
        <div key={charger.Title} className="p-4">
          <h2 className="text-xl text-neutral-600 font-semibold mb-2">
            {charger.Title}
          </h2>
          <p className="text-neutral-600">
            {charger.NumberOfChargePoints === null
              ? "Unknown number of"
              : charger.NumberOfChargePoints}
            <span>&nbsp;charge points</span>
          </p>
          <p className="text-neutral-600 mt-4">{charger.AddressLine1}</p>
          <p className="text-neutral-600">{charger.Town}</p>
          <p className="text-neutral-600">{charger.Postcode}</p>
          <p className="text-neutral-600 mt-5">
            <span className="text-neutral-500 font-bold">Distance:</span>{" "}
            {Math.round(parseFloat(charger.Distance))} km
          </p>
          {/* <p className="text-neutral-600">
            <span className="text-neutral-500 font-bold">
              Driving Distance:
            </span>{" "}
            {Math.round(parseFloat(charger["Driving Distance"]))} km
          </p> */}
        </div>

        <div className="flex gap-5">
          <button
            type="button"
            onClick={handleGoogleMapsClick}
            className="rounded bg-blue-400 px-6 py-3"
          >
            <div className="flex">
              <GrGoogle className="mt-1 me-3 text-white text-lg" />
              <p className=" text-white">Send to Google Maps</p>
            </div>
          </button>
          <button
            type="button"
            onClick={handleAppleMapsClick}
            className="rounded bg-blue-400 px-6 py-3"
          >
            <div className="flex">
              <IoLogoApple className="mt-1 me-3 text-white text-lg" />
              <p className="text-white">Send to Apple Maps</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChargerCard;
