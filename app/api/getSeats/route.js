import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "flight_booking",
});

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const flightId = searchParams.get("flightId");

  if (!flightId) {
    return Response.json({ error: "Flight ID is required" }, { status: 400 });
  }

  try {
    const seats = await getSeatsFromDatabase(flightId); // Fetch seats
    return Response.json({ seats }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to fetch seats" }, { status: 500 });
  }
}
