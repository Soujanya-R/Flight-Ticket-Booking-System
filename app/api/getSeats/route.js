import mysql from "mysql2/promise";

// Create a MySQL connection
const pool = mysql.createPool({
  host: "localhost", // Change if using a remote DB
  user: "your_user",
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
      "SELECT * FROM seats WHERE flightId = ?",
      [flightId]
    );

    return new Response(JSON.stringify({ seats: rows }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching seats:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
