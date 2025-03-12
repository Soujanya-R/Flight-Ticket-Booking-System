"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CancelBooking from "../bookings/cancelBooking";
import { Toaster, toast } from "react-hot-toast";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Dashboard() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/getBookings");
        if (!response.ok) throw new Error("Failed to fetch bookings");

        const data = await response.json();

        if (data.bookings) {
          const parsedBookings = data.bookings.map((booking) => ({
            ...booking,
            selectedSeats: Array.isArray(booking.selectedSeats)
              ? booking.selectedSeats
              : [],
          }));
          setBookings(parsedBookings);
        }
      } catch (error) {
        console.error("❌ Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session]);

  const handleCancelSuccess = (id) => {
    setBookings((prev) => prev.filter((b) => b.bookingId !== id));
    toast.success("✅ Booking canceled successfully!", {
      style: {
        background: "#1E293B",
        color: "#F1F5F9",
        borderRadius: "12px",
        padding: "14px",
        fontSize: "14px",
        fontWeight: "bold",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.5)",
      },
      duration: 3000,
      icon: "✈️",
    });
  };

 
if (!session) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-700 text-white px-4 text-center">
      <p className="text-2xl font-semibold mb-6">
        Please log in to view your bookings.
      </p>
      <Link href="/login">
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg rounded-xl font-bold transition shadow-lg">
          Log In
        </button>
      </Link>
    </div>
  );
}

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f172a] text-white px-6 pt-20">
      {/* ✅ Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      >
        <source src="/clouds.mp4" type="video/mp4" />
      </video>

      {/* ✅ Floating Glows */}
      <div className="absolute w-60 h-60 bg-blue-500 rounded-full blur-[100px] opacity-20 top-20 left-20"></div>
      <div className="absolute w-60 h-60 bg-purple-500 rounded-full blur-[100px] opacity-20 bottom-20 right-20"></div>

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-4xl mx-auto p-8 bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg"
      >
        {/* ✅ Heading */}
        <h2 className="text-4xl font-bold text-center text-white drop-shadow-sm">
          🛫 Your Bookings
        </h2>

        {/* ✅ Toaster */}
        <div className="mt-4">
          <Toaster position="top-center" />
        </div>

        {/* ✅ Loading State */}
        {loading ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            className="text-center text-gray-400 mt-4"
          >
            Fetching your bookings...
          </motion.p>
        ) : bookings.length > 0 ? (
          <div className="space-y-6 mt-6">
            {bookings.map((booking) => (
              <motion.div
                key={booking.bookingId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0px 0px 15px rgba(255,255,255,0.2)"
                }}
                className="bg-white/10 border border-gray-500/30 backdrop-blur-lg p-6 rounded-xl shadow-md"
              >
                {/* ✅ Booking Details */}
                <p className="text-xl font-semibold text-gray-100">
                  ✈️ {booking.flight?.airline} ({booking.flight?.fromLocation} → {booking.flight?.toLocation})
                </p>
                <p className="text-gray-400 mt-2">
                  🕒 <span className="font-medium text-gray-300">Departure:</span>{" "}
                  {new Date(booking.flight?.departureTime).toLocaleString()}
                </p>
                <p className="text-gray-400 mt-1">
                  🕒 <span className="font-medium text-gray-300">Arrival:</span>{" "}
                  {new Date(booking.flight?.arrivalTime).toLocaleString()}
                </p>
                <p className="text-gray-400 mt-1">
                  🎟️ <span className="font-medium text-gray-300">Seat(s):</span>{" "}
                  {booking.selectedSeats.length > 0
                    ? booking.selectedSeats.join(", ")
                    : "N/A"}
                </p>
                <p className="text-gray-400 mt-1">
                  💲 <span className="font-medium text-gray-300">Price:</span>{" "}
                  ₹{booking.flight?.price ?? "N/A"}
                </p>
                <p className="text-gray-400 mt-1">
                  ✈️ <span className="font-medium text-gray-300">Flight ID:</span>{" "}
                  {booking.flight?.flightNumber ?? "N/A"}
                </p>

                {/* ✅ Cancel Button */}
                <CancelBooking
                  bookingId={booking.bookingId}
                  onCancelSuccess={handleCancelSuccess}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-400 mt-4"
          >
            No bookings found.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
