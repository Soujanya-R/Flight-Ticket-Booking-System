import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SeatSelection({ flightId }) {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
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
    if (seat.isAvailable && !bookingConfirmed) {
      setSelectedSeat(seat.seatId);
    }
  };

  const handleConfirmSeat = () => {
    if (selectedSeat) {
      alert(`Seat ${selectedSeat} Confirmed!`);
      setBookingConfirmed(true);
      router.push(`/confirm-booking?flightId=${flightId}&seatId=${selectedSeat}`);
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
                backgroundColor: seat.isAvailable
                  ? selectedSeat === seat.seatId
                    ? "blue"
                    : "green"
                  : "gray",
                color: "white",
                border: "none",
                cursor: seat.isAvailable && !bookingConfirmed ? "pointer" : "not-allowed",
                borderRadius: "5px",
                fontSize: "16px",
              }}
              disabled={!seat.isAvailable || bookingConfirmed}
              onClick={() => handleSeatSelect(seat)}
            >
              {seat.seatNumber}
            </button>
          ))
        ) : (
          <p>Loading seats...</p>
        )}
      </div>

      {selectedSeat && !bookingConfirmed && (
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
