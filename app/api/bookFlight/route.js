import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "flight_booking",
});

export async function POST(req) {
  try {
    const { flightId, seatId } = await req.json();

    if (!flightId || !seatId) {
      return new Response(JSON.stringify({ error: "Flight ID and Seat ID are required" }), {
        status: 400,
      });
    }

    // ✅ Step 1: Check if the seat is available
    const [rows] = await pool.query(
      "SELECT isAvailable FROM seats WHERE seatId = ? AND flightId = ?",
      [seatId, flightId]
    );

    if (rows.length === 0 || rows[0].isAvailable === 0) {
      return new Response(JSON.stringify({ error: "Seat is not available" }), { status: 400 });
    }

    // ✅ Step 2: Update the seat to mark it as booked
    await pool.query(
      "UPDATE seats SET isAvailable = 0 WHERE seatId = ? AND flightId = ?",
      [seatId, flightId]
    );

    return new Response(JSON.stringify({ success: true, message: "Seat booked successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error booking seat:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
