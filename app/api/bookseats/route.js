import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "flight_booking",
});

export async function POST(req) {
  try {
    const { flightId, selectedSeats } = await req.json();
    const customerId = req.session?.user?.id || 4; // Ensure correct user ID retrieval

    console.log("Received Booking Data:", { customerId, flightId, selectedSeats });

    if (!customerId || !flightId || !selectedSeats) {
      return Response.json({ error: "Missing customerId, flightId, or seats" }, { status: 400 });
    }

    // 🔹 Check if the seat is already booked
    const [existingBooking] = await db.query(
      "SELECT * FROM booking WHERE customerId = ? AND flightId = ? AND selectedSeats = ?",
      [customerId, flightId, JSON.stringify(selectedSeats)]
    );

    if (existingBooking.length > 0) {
      return Response.json({ error: "Seat already booked!" }, { status: 400 });
    }

    // 🔹 Insert only if no duplicate exists
    await db.query(
      "INSERT INTO booking (customerId, flightId, bookingDate, selectedSeats) VALUES (?, ?, ?, ?)",
      [customerId, flightId, new Date(), JSON.stringify(selectedSeats)]
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error("Booking Error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
