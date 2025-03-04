"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // ✅ Import router

export default function SeatsPage() {
  const searchParams = useSearchParams();
  const router = useRouter(); // ✅ Initialize router
  const flightId = searchParams.get("flightId");
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSeats() {
      try {
        const response = await fetch(`/api/getSeats?flightId=${flightId}`);
        const data = await response.json();
        console.log("Fetched seats:", JSON.stringify(data, null, 2));

        if (response.ok) {
          setSeats(data.seats);
        } else {
          setError(data.error || "Could not fetch seat data");
        }
      } catch (err) {
        setError("Failed to fetch seats");
      }
    }

    if (flightId) fetchSeats();
  }, [flightId]);

  const handleSeatSelect = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  // ✅ Update: Send selected seats to API and navigate
  const handleConfirmSelection = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    try {
      const response = await fetch("/api/bookseats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flightId, selectedSeats }),
      });

      if (response.ok) {
        console.log("✅ Booking successful! Redirecting...");
        setTimeout(() => router.push("/confirm-booking"), 500); // ✅ Navigate after delay
      } else {
        alert("❌ Booking failed. Try again.");
      }
    } catch (error) {
      console.error("❌ Error booking seats:", error);
      alert("❌ Booking failed. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Select Your Seat</h1>
      {error ? (
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
