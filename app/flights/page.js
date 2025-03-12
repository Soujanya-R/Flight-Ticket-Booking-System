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
      setError("Missing required search parameters.");
      return;
    }

    const fetchFlights = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`/api/getFlights?from=${from}&to=${to}&date=${date}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch flights.");

        setFlights(data.flights || []);
      } catch (err) {
        setError("Could not fetch flights. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [from, to, date]);

  const handleSelectFlight = (flightId) => {
    router.push(`/seats?flightId=${flightId}`);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f172a] text-white">
      {/* Background Video */}
      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover opacity-20">
        <source src="/clouds.mp4" type="video/mp4" />
      </video>

      {/* Floating Blobs */}
      <div className="absolute w-80 h-80 bg-blue-400 rounded-full blur-[120px] opacity-25 top-20 left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-purple-500 rounded-full blur-[120px] opacity-25 bottom-20 right-10 animate-pulse"></div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto mt-20 p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-lg"
      >
        <h1 className="text-4xl font-bold text-center drop-shadow-lg">✈️ Available Flights</h1>

        {error && <p className="text-center text-red-400 mt-4">{error}</p>}

        {loading ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            className="text-center text-gray-300 mt-6"
          >
            Fetching flights...
          </motion.p>
        ) : flights.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {flights.map((flight) => (
              <motion.div
                key={flight.flightId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white/10 border border-gray-500/30 backdrop-blur-lg p-6 rounded-xl shadow-md"
              >
                <p className="text-xl font-semibold">🛫 {flight.flightNumber}</p>
                <p className="text-gray-300 mt-2">
                  <span className="font-medium text-white">From:</span> {from}
                </p>
                <p className="text-gray-300 mt-1">
                  <span className="font-medium text-white">To:</span> {to}
                </p>
                <p className="text-gray-300 mt-1">
                  <span className="font-medium text-white">Departure:</span>{" "}
                  {new Date(flight.departureTime).toLocaleString()}
                </p>
                <p className="text-gray-300 mt-1">
                  <span className="font-medium text-white">Arrival:</span>{" "}
                  {new Date(flight.arrivalTime).toLocaleString()}
                </p>
                <p className="text-gray-300 mt-1">
                  <span className="font-medium text-white">Price:</span>{" "}
                  ₹{Number(flight.price || 0).toLocaleString()}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelectFlight(flight.flightId)}
                  className="mt-4 w-full py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-300"
                >
                  Select Flight
                </motion.button>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-300 mt-6">No flights found.</p>
        )}
      </motion.div>
    </div>
  );
}
