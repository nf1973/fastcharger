import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const Map = ({ userLocation, chargers }) => {
  const position = userLocation
    ? [userLocation.latitude, userLocation.longitude]
    : [0, 0]; // Default position if userLocation is not available

  // Define a custom icon for numbered markers
  const numberedIcon = (number) =>
    new L.DivIcon({
      className: "custom-marker",
      iconSize: [32, 24],
      html: `<div style="color: white; font-size: 1.2rem; background-color: #63b3ed; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white;">${number}</div>`,
    });

  return (
    <MapContainer
      center={position}
      zoom={14}
      style={{ height: "500px", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {userLocation && (
        <Marker position={position}>
          <Popup>Your Location</Popup>
        </Marker>
      )}

      {chargers &&
        chargers.map((charger, index) => {
          const chargerPosition = [charger.Latitude, charger.Longitude];

          return (
            <Marker
              key={charger.id}
              position={chargerPosition}
              icon={numberedIcon(index + 1)}
            ></Marker>
          );
        })}
    </MapContainer>
  );
};

export default Map;
