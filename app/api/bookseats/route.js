import { getToken } from "next-auth/jwt";
import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "flight_booking",
});

export async function POST(req) {
  try {
    console.log("🔹 Checking token...");
    
    const token = await getToken({ req });
    const userId = token?.id || 4;

    console.log("🔹 Token data:", token);
    
    const { flightId, selectedSeats } = await req.json();

    if (!userId || !flightId || !selectedSeats) {
      return Response.json({ error: "Missing userId, flightId, or seats" }, { status: 400 });
    }

    // ✅ Check if the booking already exists
    const [existingBooking] = await db.query(
      "SELECT * FROM booking WHERE userId = ? AND flightId = ? AND selectedSeats = ?",
      [userId, flightId, JSON.stringify(selectedSeats)]
    );

    if (existingBooking.length > 0) {
      return Response.json({ error: "Seat already booked!" }, { status: 400 });
    }

    // ✅ Insert booking
    await db.query(
      "INSERT INTO booking (userId, flightId, bookingDate, selectedSeats) VALUES (?, ?, ?, ?)",
      [userId, flightId, new Date(), JSON.stringify(selectedSeats)]
    );

    // ✅ Update seat availability
    await db.query(
      `UPDATE seats SET isAvailable = false WHERE flightId = ? AND seatId IN (${selectedSeats.map(() => '?').join(',')})`,
      [flightId, ...selectedSeats]
    );

    console.log("✅ Seats booked & updated:", selectedSeats);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Booking Error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
