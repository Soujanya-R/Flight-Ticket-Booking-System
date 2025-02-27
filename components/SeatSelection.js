import { useEffect, useState } from "react";

export default function SeatSelection({ flightId }) {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    if (!flightId) return;

    const fetchSeats = async () => {
      try {
        const response = await fetch(`/api/getseats?flightId=${flightId}`);
    
        const data = await response.json();
        console.log("🛫 Seats Data:", data);

        setSeats(data.seats || []);
      } catch (error) {
        console.error("❌ Error fetching seats:", error);
      }
    };

    fetchSeats();
  }, [flightId]); // ✅ Removed unnecessary state dependency

  return (
    <div>
      <h3>Select a Seat</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
      {seats.length > 0 ? (
  seats.map((seat) => (
    <button key={seat.seatId}>
      {seat.seatNumber}
    </button>
  ))
) : (
  <p>No seats available.</p>
)}

      </div>
    </div>
  );
}
