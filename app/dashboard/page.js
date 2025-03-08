"use client";

import { useEffect, useState } from "react";

export default function Dashboard({ userId }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`/api/getBookings?userId=${userId}`);
        const data = await response.json();
        setBookings(data.bookings || []);
      } catch (error) {
        console.error("❌ Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchBookings();
  }, [userId]);

  const handleCancelBooking = async (bookingId) => {
    setCancelling(true);
    setMessage(""); 

    try {
      const response = await fetch(`/api/cancelBooking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });

      if (response.ok) {
        setBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));
        setMessage("✅ Booking canceled successfully.");
      } else {
        setMessage("❌ Failed to cancel booking.");
      }
    } catch (error) {
      setMessage("❌ Error canceling booking.");
      console.error(error);
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard</h2>
        <h3 className="text-lg text-gray-600 mb-4">Your Bookings</h3>

        {message && (
          <p className="text-sm text-center font-medium text-blue-600 bg-blue-100 py-2 rounded mb-4">
            {message}
          </p>
        )}

        {loading ? (
          <p className="text-gray-500 animate-pulse">Loading bookings...</p>
        ) : bookings.length > 0 ? (
          <ul className="space-y-4">
            {bookings.map((booking) => (
              <li
                key={booking.bookingId}
                className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="text-gray-800">
                    <span className="font-medium">Flight:</span> {booking.flightId}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Seat:</span> {booking.seatNumber}
                  </p>
                </div>
                <button
                  onClick={() => handleCancelBooking(booking.bookingId)}
                  disabled={cancelling}
                  className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition disabled:opacity-50"
                >
                  {cancelling ? "Cancelling..." : "Cancel"}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No bookings found.</p>
        )}
      </div>
    </div>
  );
}
