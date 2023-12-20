"use client";

import GetCurrentLocation from "@/components/GetCurrentLocation";
import ChargerCard from "@/components/ChargerCard";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
//import Map from "@/components/Map";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/Map"), {
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  const [chargers, setChargers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use GetCurrentLocation within the functional component
  const userLocation = GetCurrentLocation();

  useEffect(() => {
    // Check if the userLocation has coordinates
    if (userLocation && userLocation.latitude && userLocation.longitude) {
      // Define the API URL using the user's coordinates
      const apiUrl = `/api/getchargershere?lat=${userLocation.latitude}&lon=${userLocation.longitude}&distance=60`;

      // Fetch data from the API
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // Update the state with the fetched data
          setChargers(data);
        })
        .catch((error) => console.error("Error fetching data:", error))
        .finally(setLoading(false));
    }
  }, [userLocation]); // Include userLocation in the dependency array

  return (
    <>
      <Header />
      <main className="flex flex-col">
        <section className="map">
          <div className="w-full h-3/4 min-h-[400px] bg-indigo-300 flex items-center justify-center font-mono text-sm">
            {loading ? (
              <p>Loading user location...</p>
            ) : (
              <Map userLocation={userLocation} chargers={chargers} />
            )}
          </div>
        </section>
        <section className="list">
          <div className="flex flex-wrap p-2 bg-white justify-start text-gray-700">
            {loading ? (
              // Show spinner while chargers are being loaded
              <Spinner />
            ) : (
              // Show ChargerCard components once chargers are available
              chargers.map((charger) => (
                <ChargerCard key={charger.id} charger={charger} />
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
}
