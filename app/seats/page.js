"use client";
import { useEffect, useState } from "react";

export default function SeatsPage({ searchParams }) {
  const flightId = searchParams?.flightId || 1; // Default to flight 1 if not provided
  const [seats, setSeats] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSeats() {
      try {
        const response = await fetch(`/api/getSeats?flightId=${flightId}`);
        const data = await response.json();

        if (response.ok) {
          setSeats(data.seats);
        } else {
          setError(data.error || "Could not fetch seat data");
        }
      } catch (err) {
        setError("Failed to fetch seats");
      }
    }

    fetchSeats();
  }, [flightId]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Select Your Seat</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {seats.map((seat) => (
            <button
              key={seat.id}
              className={`p-4 border ${
                seat.isBooked ? "bg-gray-400" : "bg-green-500"
              }`}
              disabled={seat.isBooked}
            >
              {seat.seatNumber}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
