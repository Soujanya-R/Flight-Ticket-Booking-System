"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SeatsPage() {
  const searchParams = useSearchParams();
  const flightId = searchParams.get("flightId");
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSeats() {
      try {
        const response = await fetch(`/api/getSeats?flightId=${flightId}`);
        const data = await response.json();
        console.log("Fetched seats:", JSON.stringify(data, null, 2)); // Debugging

        if (response.ok) {
          // Ensure `isAvailable` is a boolean and `seatId` is correctly assigned
          const formattedSeats = data.seats.map((seat, index) => ({
            ...seat,
            seatId: seat.seatId || `seat-${index}`, // Ensure unique IDs
            isAvailable: !!seat.isAvailable, // Convert to boolean
          }));
          setSeats(formattedSeats);
        } else {
          setError(data.error || "Could not fetch seat data");
        }
      } catch (err) {
        setError("Failed to fetch seats");
      }
    }

    if (flightId) fetchSeats();
  }, [flightId]);

  // Toggle seat selection
  const handleSeatSelect = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  // Confirm selection
  const handleConfirmSelection = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    alert(`Seats confirmed: ${selectedSeats.join(", ")}`);
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
                      ? "bg-blue-500 text-white" // Selected seat
                      : "bg-green-500 text-white hover:bg-green-600" // Available seat
                    : "bg-gray-400 text-gray-700 cursor-not-allowed" // Unavailable seat
                }`}
                disabled={!seat.isAvailable}
                onClick={() => seat.isAvailable && handleSeatSelect(seat.seatId)}
              >
                {seat.seatNumber || seat.seatId} {/* Ensure something is displayed */}
              </button>
            ))}
          </div>
          {/* Confirm Selection Button */}
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
