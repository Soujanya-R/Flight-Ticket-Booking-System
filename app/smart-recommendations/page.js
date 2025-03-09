"use client";
import { useEffect, useState } from "react";

export default function FlightRecommendations() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch("/api/getRecommendedFlights");
        
        if (!response.ok) throw new Error("Failed to fetch flights");

        const data = await response.json();
        if (!data.flights || data.flights.length === 0) {
          setError("No recommendations found.");
        } else {
          setFlights(data.flights);
        }
      } catch (err) {
        console.error("❌ Fetch Error:", err);
        setError("Could not fetch flight recommendations. Please try again.");
      }
      setLoading(false);
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">✈️ Recommended Flights</h2>

      {loading && <p className="text-center text-gray-600">Fetching recommendations...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <ul className="space-y-4">
        {flights.map((flight) => (
          <li key={flight.id} className="p-4 bg-white shadow-md rounded-lg">
            <p className="text-lg font-semibold">{flight.airline} - {flight.from} → {flight.to}</p>
            <p className="text-gray-600">Price: ${flight.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
