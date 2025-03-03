import mysql from "mysql2/promise";

// Create a MySQL connection
const pool = mysql.createPool({
  host: "localhost", // Change if using a remote DB
  user: "root",
  password: "0000",
  database: "flight_booking",
});

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const flightId = url.searchParams.get("flightId");

    if (!flightId) {
      return new Response(JSON.stringify({ error: "Flight ID is required" }), {
        status: 400,
      });
    }

    // Query to get seat data
    const [rows] = await pool.query(
      "SELECT seatId, seatNumber, isAvailable FROM seats WHERE flightId = ?",
      [flightId]
    );
    
    
    
    const seats = rows.map((seat) => ({
      ...seat,
      isAvailable: seat.isBooked === 0, // Convert `isBooked` to `isAvailable`
    }));
    
    return new Response(JSON.stringify({ seats }), { status: 200 });
    
  } catch (error) {
    console.error("Error fetching seats:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
