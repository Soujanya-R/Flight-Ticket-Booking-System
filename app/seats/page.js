"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SeatsPage() {
  const searchParams = useSearchParams();
  const flightId = searchParams.get("flightId");
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSeats() {
      if (!flightId) return;
      setLoading(true);
      try {
        const response = await fetch(`/api/getSeats?flightId=${flightId}`);
        const data = await response.json();
  
        console.log("Fetched seats:", JSON.stringify(data, null, 2)); // ✅ Corrected placement
  
        if (response.ok) {
          setSeats(
            data.seats.map((seat, index) => ({
              ...seat,
              seatId: seat.seatId || `seat-${index}`, 
              isAvailable: !!seat.isAvailable,
            }))
          );
        } else {
          setError(data.error || "Could not fetch seat data");
        }
      } catch (err) {
        setError("Failed to fetch seats");
      } finally {
        setLoading(false);
      }
    }
  
    console.log("🔹 flightId from URL:", flightId);
    fetchSeats();
  }, [flightId]);
  

  const handleSeatSelect = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const handleConfirmSelection = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
  
    const bookingData = { flightId, selectedSeats };
    console.log("🔹 Sending Booking Data:", JSON.stringify(bookingData, null, 2));
  
    try {
      const response = await fetch("/api/bookSeats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
  
      const result = await response.json();
      console.log("🔹 Server Response:", result);
  
      if (response.ok) {
        alert("Booking successful!");
      } else {
        alert(`Booking failed: ${result.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("❌ Error while booking:", error);
      alert("Booking failed. Please try again.");
    }
  };
  
  

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Select Your Seat</h1>
      {loading ? (
        <p className="text-gray-500">Loading seats...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {seats.map((seat) => (
              <button
                key={seat.seatId}
                className={`p-4 border rounded-lg transition ${
                  seat.isAvailable
                    ? selectedSeats.includes(seat.seatId)
                      ? "bg-blue-500 text-white"
                      : "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
                disabled={!seat.isAvailable}
                onClick={() => seat.isAvailable && handleSeatSelect(seat.seatId)}
              >
                {seat.seatNumber || seat.seatId}
              </button>
            ))}
          </div>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={handleConfirmSelection}
          >
            Confirm Selection
          </button>
        </>
      )}
    </div>
  );
}
