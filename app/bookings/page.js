import { getDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function BookingsPage() {
  const session = await getServerSession();
  console.log("🔹 Session Data:", session); // Debugging

  if (!session?.user?.bookingId) return <p>Please log in to see your bookings.</p>;

  const db = await getDatabase();
  const [bookings] = await db.query("SELECT * FROM Booking WHERE customerId = ?", [session.userId]);

  return (
    <div>
      <h1>Confirm Booking</h1>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <p key={booking.bookingId}>Flight: {booking.flightId} - Seat: {booking.seatNumber}</p>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
}
