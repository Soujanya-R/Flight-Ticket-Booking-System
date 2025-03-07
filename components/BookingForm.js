"use client";
import { useState } from "react";

export default function BookingForm({ flightId }) {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [message, setMessage] = useState("");
  const [isBooking, setIsBooking] = useState(false); // Prevent multiple clicks

  const handleSeatSelect = (seat) => {
    console.log("🔹 Seat selected:", seat);
    setSelectedSeat(seat);
  };

  const handleBooking = async () => {
    if (isBooking) return; // Prevent duplicate clicks
    if (!selectedSeat) {
      setMessage("❌ Please select a seat.");
      return;
    }

    setIsBooking(true); // Disable button

    try {
      console.log("🔹 Booking Flight ID:", flightId);
      console.log("🔹 Selected Seat:", selectedSeat);

      const response = await fetch("/api/bookSeats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flightId, selectedSeats: [selectedSeat] }),
      });

      const data = await response.json();
      console.log("🔹 Booking Response:", data);

      if (data.success) {
        setMessage("✅ Booking successful!");
        setTimeout(() => (window.location.href = "/confirm-booking"), 1000);
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (error) {
      setMessage("❌ Booking failed.");
      console.error("🔹 Error:", error);
    } finally {
      setIsBooking(false); // Re-enable button
    }
  };

  return (
    <div className="p-4 border">
      <p><strong>Flight ID:</strong> {flightId}</p>
      <p><strong>Selected Seat:</strong> {selectedSeat || "None"}</p>

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
        disabled={isBooking}
        className={`px-4 py-2 rounded ${isBooking ? "bg-gray-400" : "bg-blue-500 text-white"}`}
      >
        {isBooking ? "Booking..." : "Confirm Booking"}
      </button>

      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
