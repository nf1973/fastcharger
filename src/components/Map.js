import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const Map = ({ userLocation, chargers }) => {
  const position = userLocation
    ? [userLocation.latitude, userLocation.longitude]
    : [0, 0]; // Default position if userLocation is not available

  return (
    <MapContainer
      center={position}
      zoom={16}
      style={{ height: "500px", width: "100%" }}
      scrollWheelZoom={false}
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
        chargers.map((charger) => {
          const chargerPosition = [charger.Latitude, charger.Longitude];

          return (
            <Marker key={charger.id} position={chargerPosition}>
              <Popup>{charger.name}</Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
};

export default Map;
