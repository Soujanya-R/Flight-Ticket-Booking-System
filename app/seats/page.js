"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SeatsPage() {
  const searchParams = useSearchParams();
  const flightId = searchParams.get("flightId");
  const router = useRouter();
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        if (!flightId) return;
        const response = await fetch(`/api/getseats?flightId=${flightId}`);
        const data = await response.json();
        console.log("🛫 Seats Data:", data);
        setSeats(data.seats || []);
      } catch (error) {
        console.error("❌ Error fetching seats:", error);
      }
    };

    fetchSeats();
  }, [flightId]); // Fetch when flightId changes

  return (
    <div>
      <h2>Select Your Seat</h2>
      {seats.length === 0 ? (
        <p>No seats available.</p>
      ) : (
        <ul>
          {seats.map((seat) => (
            <li key={seat.seatId}>
              {seat.seatNumber} - {seat.isAvailable ? "Available" : "Booked"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
