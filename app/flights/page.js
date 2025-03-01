"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function FlightsPage() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");
  const router = useRouter();

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!from || !to || !date) {
      setError("Missing required fields.");
      return;
    }

    const fetchFlights = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/getFlights?from=${from}&to=${to}&date=${date}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch flights.");
        }

        setFlights(data.flights || []);
      } catch (err) {
        console.error("❌ Fetch Error:", err);
        setError("Could not fetch flights. Please try again.");
      }

      setLoading(false);
    };

    fetchFlights();
  }, [from, to, date]);

  const handleSelectFlight = (flightId) => {
    router.push(`/seats?flightId=${flightId}`);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Available Flights</h2>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <p>Loading flights...</p>
      ) : flights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flights.map((flight) => (
            <div key={flight.flightId} className="border p-4 rounded-lg shadow-lg">
              <p className="text-lg font-semibold">✈️ {flight.flightNumber}</p>
              <p className="text-gray-600">
                {new Date(flight.departureTime).toLocaleString()} → {new Date(flight.arrivalTime).toLocaleString()}
              </p>
              <button
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={() => handleSelectFlight(flight.flightId)}
              >
                Select Flight
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No flights found.</p>
      )}
    </div>
  );
}
