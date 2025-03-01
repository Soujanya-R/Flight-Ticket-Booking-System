"use client";  // ✅ This tells Next.js it's a Client Component

import { useEffect, useState } from "react";

export default function Dashboard({ userId }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`/api/getBookings?userId=${userId}`);
        const data = await response.json();
        console.log("📌 API Response:", data);  // Debugging step
        setBookings(data.bookings || []);
      } catch (error) {
        console.error("❌ Error fetching bookings:", error);
      }
    };
  
    if (userId) fetchBookings();
  }, [userId]);
  

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await fetch(`/api/cancelBooking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });

      if (response.ok) {
        setBookings(bookings.filter((b) => b.bookingId !== bookingId));
      } else {
        console.error("Failed to cancel booking");
      }
    } catch (error) {
      console.error("❌ Error canceling booking:", error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Your Bookings</h3>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.bookingId}>
              Flight: {booking.flightId}, Seat: {booking.seatNumber}
              <button onClick={() => handleCancelBooking(booking.bookingId)} style={{ marginLeft: "10px", color: "red" }}>
                Cancel
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
}
