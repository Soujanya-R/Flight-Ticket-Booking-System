"use client";
import { useState } from "react";

export default function BookingForm({ flightId }) {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [message, setMessage] = useState("");

  // Move this outside handleBooking
  const handleSeatSelect = (seat) => {
    console.log("🔹 Seat selected:", seat);
    setSelectedSeat(seat);
  };

  const handleBooking = async () => {
    console.log("🔹 handleBooking triggered!");

    if (!selectedSeat) {
      setMessage("❌ Please select a seat.");
      console.log("🔹 No seat selected, aborting...");
      return;
    }

    console.log("🔹 Booking Flight ID:", flightId);
    console.log("🔹 Selected Seat:", selectedSeat);

    const response = await fetch("/api/bookFlight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ flightId, seatId: selectedSeat }),
    });

    const data = await response.json();
    console.log("🔹 Booking Response:", data);

    if (data.success) {
      setMessage("✅ Booking successful!");
      console.log("🔹 Redirecting to:", data.redirectUrl);
      window.location.href = data.redirectUrl || "/confirm-booking";
    } else {
      setMessage(`❌ ${data.error}`);
      console.error("🔹 Booking failed:", data.error);
    }
  };

  return (
    <div className="p-4 border">
      <p><strong>Flight ID:</strong> {flightId}</p>
      <p><strong>Selected Seat:</strong> {selectedSeat || "None"}</p>

      {/* Seat selection buttons (Example: Seats 1A, 1B, 1C) */}
      <div className="flex space-x-2 my-2">
        {["1A", "1B", "1C"].map((seat) => (
          <button
            key={seat}
            onClick={() => handleSeatSelect(seat)}
            className={`px-3 py-1 border rounded ${
              selectedSeat === seat ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            {seat}
          </button>
        ))}
      </div>

      <button
        onClick={handleBooking}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Confirm Booking
      </button>

      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
