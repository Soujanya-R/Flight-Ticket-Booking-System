"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

export default function SeatsPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const flightId = searchParams.get("flightId");

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [flightDetails, setFlightDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFlightData = async () => {
    if (!flightId) return;
    setLoading(true);
    try {
      const flightRes = await fetch(`/api/getFlight?flightId=${flightId}`);
      const seatRes = await fetch(`/api/getSeats?flightId=${flightId}`);
      if (!flightRes.ok || !seatRes.ok) throw new Error("Failed to load data");

      const flight = await flightRes.json();
      const seatData = await seatRes.json();

      setFlightDetails(flight.flight);
      setSeats(seatData.seats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlightData();
  }, [flightId]);

  const handleSeatSelect = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const handleConfirm = async () => {
    if (!session) {
      sessionStorage.setItem("pendingSeats", JSON.stringify(selectedSeats));
      sessionStorage.setItem("pendingFlightId", flightId);
      router.push(`/login?callbackUrl=/seats?flightId=${flightId}`);
      return;
    }

    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    const res = await fetch("/api/bookSeats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ flightId, selectedSeats }),
    });

    const result = await res.json();
    if (res.ok) {
      alert("✅ Booking successful!");
      setSelectedSeats([]);
      fetchFlightData();
      router.push("/dashboard");
    } else {
      alert(`❌ Booking failed: ${result.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f172a] text-white px-6 pt-20 relative overflow-hidden">
      {/* Floating Background Effects */}
      <div className="absolute w-80 h-80 bg-blue-500 rounded-full blur-[100px] opacity-30 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-purple-600 rounded-full blur-[100px] opacity-30 bottom-10 right-10 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0px 0px 40px rgba(255, 255, 255, 0.2)"
        }}
        className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl"
      >
        <h1 className="text-4xl font-bold italic  text-center mb-8 text-blue-100 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]">
          ✈️ Choose Your Seats
        </h1>

        {/* Flight Details */}
        {loading ? (
          <p className="text-center text-gray-400 animate-pulse">Loading flight details...</p>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : flightDetails && (
          <div className="bg-white/5 border border-white/20 text-white p-5 rounded-xl mb-6">
            <h2 className="text-lg font-semibold mb-4 text-blue-400">✈️Flight Information</h2>
            <div className="grid grid-cols-2 gap-4 text-base">
              <p>🛩️<span className="font-medium text-blue-300">Airline:</span> {flightDetails.airline}</p>
              <p>🛫<span className="font-medium text-blue-300">From:</span> {flightDetails.fromLocation}</p>
              <p>🛬<span className="font-medium text-blue-300">To:</span> {flightDetails.toLocation}</p>
              <p>🛩️<span className="font-medium text-blue-300">Flight No:</span> {flightDetails.flightNumber}</p>
              <p>🕒<span className="font-medium text-blue-300">Departure:</span> {flightDetails.departureTime}</p>
              <p>⏳<span className="font-medium text-blue-300">Arrival:</span> {flightDetails.arrivalTime}</p>
              <p>🎟️<span className="font-medium text-blue-300">Price:</span> ₹{flightDetails.price}</p>
            </div>
          </div>
        )}

        {/* Seat Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mb-8">
          {seats.map((seat) => (
            <motion.button
              key={seat.seatId}
              whileHover={{ scale: seat.isAvailable ? 1.08 : 1 }}
              whileTap={{ scale: 0.95 }}
              disabled={!seat.isAvailable}
              onClick={() => handleSeatSelect(seat.seatId)}
              className={`py-3 rounded-lg text-base font-semibold transition-all border ${
                !seat.isAvailable
                  ? "bg-gray-500 text-gray-200 border-gray-600 cursor-not-allowed"
                  : selectedSeats.includes(seat.seatId)
                  ? "bg-yellow-400 text-black border-yellow-500 hover:bg-yellow-500"
                  : "bg-green-500 text-white border-green-600 hover:bg-green-600"
              }`}
            >
              {seat.seatNumber}
            </motion.button>
          ))}
        </div>

        {/* Confirm Button */}
        <motion.button
          whileHover={{ scale: 1.06, boxShadow: "0px 0px 30px rgba(59, 130, 246, 0.7)" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleConfirm}
          className="w-full py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
        >
          ✅ Confirm Selection
        </motion.button>
      </motion.div>
    </div>
  );
}
