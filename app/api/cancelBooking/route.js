import { getToken } from "next-auth/jwt"; // ✅ Use getToken instead
import { getDatabase } from "@/lib/db";

export async function POST(req) {
  const token = await getToken({ req }); // ✅ Use token instead of session
  const userId = token?.id;

  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const { bookingId } = await req.json();

    if (!bookingId) {
      return new Response(JSON.stringify({ error: "Booking ID is required" }), { status: 400 });
    }

    const db = await getDatabase();

    // ✅ Get the seat ID from the booking before deleting
    const [bookedSeat] = await db.query(
      "SELECT selectedSeats FROM Booking WHERE bookingId = ? AND userId = ?",
      [bookingId, userId]
    );

    if (bookedSeat.length === 0) {
      return new Response(JSON.stringify({ error: "Booking not found" }), { status: 404 });
    }

    const seatIds = JSON.parse(bookedSeat[0].selectedSeats);

    // ✅ Delete booking using userId to avoid cross-user access
    const [result] = await db.query(
      "DELETE FROM Booking WHERE bookingId = ? AND userId = ?",
      [bookingId, userId]
    );

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ error: "Booking not found" }), { status: 404 });
    }

    // ✅ Mark seats as available
    for (const seatId of seatIds) {
      await db.query("UPDATE seats SET isAvailable = 1 WHERE seatId = ?", [seatId]);
    }

    return new Response(JSON.stringify({ message: "Booking canceled successfully" }), { status: 200 });
  } catch (error) {
    console.error("❌ Error canceling booking:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
