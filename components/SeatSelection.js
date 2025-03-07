import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SeatSelection({ flightId }) {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await fetch(`/api/getSeats?flightId=${flightId}`);
        const data = await response.json();
        console.log("🛫 Seats Data:", data);

        setSeats(data.seats || []);
      } catch (error) {
        console.error("❌ Error fetching seats:", error);
      }
    };

    if (flightId) fetchSeats();
  }, [flightId]);

  const handleSeatSelect = (seat) => {
    if (seat.isAvailable) {
      setSelectedSeat(seat.seatId);
      console.log("🔹 Selected Seat ID:", seat.seatId);
    }
  };

  const handleConfirmSeat = async () => {
    if (!selectedSeat) return;

    console.log("🔹 Booking Data Sent:", { flightId, seatId: selectedSeat });

    try {
      const response = await fetch("/api/bookFlight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flightId, seatId: selectedSeat }),
      });

      const data = await response.json();
      console.log("🎟️ Booking Response:", data);

      if (data.success) {
        setSeats((prevSeats) =>
          prevSeats.map((seat) =>
            seat.seatId === selectedSeat ? { ...seat, isAvailable: false } : seat
          )
        );
      } else {
        alert(`❌ Booking failed: ${data.error}`);
      }
    } catch (error) {
      console.error("❌ Booking error:", error);
      alert("An error occurred while booking.");
    }
  };

  return (
    <div>
      <h3>Select a Seat</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {seats.length > 0 ? (
          seats.map((seat) => (
            <button
              key={seat.seatId}
              style={{
                padding: "10px",
                backgroundColor: !seat.isAvailable
                  ? "gray"
                  : selectedSeat === seat.seatId
                  ? "blue"
                  : "green",
                color: "white",
                border: "none",
                cursor: seat.isAvailable ? "pointer" : "not-allowed",
                borderRadius: "5px",
                fontSize: "16px",
              }}
              disabled={!seat.isAvailable}
              onClick={() => handleSeatSelect(seat)}
            >
              {seat.seatNumber}
            </button>
          ))
        ) : (
          <p>Loading seats...</p>
        )}
      </div>

      {selectedSeat && (
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
            fontSize: "18px",
          }}
          onClick={handleConfirmSeat}
        >
          Confirm Seat
        </button>
      )}
    </div>
  );
}
// Compare this snippet from app/confirm-booking/page.js:
// import { getDatabase } from "@/lib/db";  // Import the database connection
// import { getServerSession } from "next-auth/server";  // Import the server session utility
//  