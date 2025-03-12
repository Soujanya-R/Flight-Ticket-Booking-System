"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function FlightRecommendations() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

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

  const handleBookNow = (flightId) => {
    router.push(`/seats?flightId=${flightId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f172a] py-12 px-6 flex justify-center items-center relative overflow-hidden">
      {/* ✅ Floating Glows */}
      <div className="absolute w-60 h-60 bg-blue-500 rounded-full blur-[100px] opacity-20 top-20 left-20"></div>
      <div className="absolute w-60 h-60 bg-purple-500 rounded-full blur-[100px] opacity-20 bottom-20 right-20"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl w-full bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/30 transition-transform hover:shadow-3xl hover:scale-[1.02]"
      >
        {/* ✅ Heading */}
        <h2 className="text-4xl font-extrabold text-white text-center drop-shadow-lg mb-8">
          ✈️ Recommended Flights
        </h2>

        {/* ✅ Loading State */}
        {loading ? (
          <p className="text-center text-gray-300 animate-pulse text-xl">🔄 Fetching recommendations...</p>
        ) : error ? (
          <p className="text-center text-red-400 bg-red-900/50 py-3 px-4 rounded-lg text-lg">{error}</p>
        ) : (
          <ul className="space-y-8">
            {flights.map((flight) => (
              <motion.li
                key={flight.flightId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.2)"
                }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-2xl transition border border-white/20"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <p className="text-2xl font-bold text-white mb-2">
                      ✈️ {flight.airline} ({flight.fromLocation} → {flight.toLocation})
                    </p>
                    <p className="text-gray-300">
                      🛩️ <strong>Flight Number:</strong> {flight.flightNumber}
                    </p>
                    <p className="text-gray-300">
                      🕒 <strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}
                    </p>
                    <p className="text-gray-300">
                      ⏳ <strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}
                    </p>
                    <p className="text-gray-300">
                      🎟️ <strong>Total Seats:</strong> {flight.totalSeats}
                    </p>
                    <p className="text-green-300 font-bold text-xl mt-2">
                      💰 Price: ₹{flight.price ?? "N/A"}
                    </p>
                  </div>

                  {/* ✅ Book Now Button */}
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBookNow(flight.flightId)}
                    className="px-6 py-3 text-lg text-white font-semibold bg-blue-600 rounded-xl hover:bg-blue-700 shadow-xl transition"
                  >
                    🚀 Book Now
                  </motion.button>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}
