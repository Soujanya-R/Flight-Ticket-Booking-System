"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
    <div className="relative pt-32 w-full h-screen overflow-hidden">
      <video 
        autoPlay 
        loop 
        muted 
        className="absolute inset-0  w-full h-full object-cover opacity-50"
      >
        <source src="/clouds.mp4" type="video/mp4" />
      </video>
      <div className="relative max-w-6xl mx-auto p-10  bg-white bg-opacity-80 rounded-xl shadow-2xl">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-900 mb-8 text-center"
        >
         ✈️ Available Flights
        </motion.h2>

        {error && <p className="text-red-600 text-center text-lg font-semibold">{error}</p>}

        {loading ? (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            className="text-center text-gray-600 text-lg"
          >
            Fetching flights...
          </motion.p>
        ) : flights.length > 0 ? (
<div className="flex flex-wrap justify-center gap-6">
{flights.map((flight) => (
              <motion.div
                key={flight.flightId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white p-6  rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 border border-gray-200"
              >
                <p className="text-xl font-semibold text-gray-800">✈️ {flight.flightNumber}</p>
                <p className="text-gray-600 mt-2">
                  {new Date(flight.departureTime).toLocaleString()} → {new Date(flight.arrivalTime).toLocaleString()}
                </p>
                <button
                  className="mt-4 px-5 py-2 w-full bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 hover:shadow-md transition duration-300 transform hover:scale-105"
                  onClick={() => handleSelectFlight(flight.flightId)}
                >
                  Select Flight
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-600 text-lg"
          >
            No flights found.
          </motion.p>
        )}
      </div>
    </div>
  );
}
