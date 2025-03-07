import mysql from "mysql2/promise";

export async function POST(req) {
  try {
    const { flightId, seatId } = await req.json();
    console.log("🔹 API received:", { flightId, seatId });

    if (!flightId || !seatId) {
      console.error("❌ Missing flightId or seatId");
      return new Response(JSON.stringify({ success: false, error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Establish DB connection inside function
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "0000",
      database: "flight_booking",
    });

    // Book the seat
   // Check if the seat is already booked
const [seatCheck] = await db.execute(
  "SELECT isAvailable FROM seats WHERE flightId = ? AND seatId = ?",
  [flightId, seatId]
);

if (!seatCheck.length || seatCheck[0].isAvailable === 0) {
  console.error("❌ Seat is already booked!");
  return new Response(JSON.stringify({ success: false, error: "Seat is already booked!" }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}

// Proceed with booking
const [result] = await db.execute(
  "UPDATE seats SET isAvailable = 0 WHERE flightId = ? AND seatId = ?",
  [flightId, seatId]
);


    console.log("✅ Booking confirmed!", result);

    return new Response(JSON.stringify({
      success: true,
      message: "Booking successful!",
      redirectUrl: "/confirm-booking",
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("❌ Database Error:", error);
    return new Response(JSON.stringify({ success: false, error: "Database error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
