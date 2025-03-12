import { getDatabase } from "../../../lib/db"; 

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");
    const date = url.searchParams.get("date");

    if (!from || !to || !date) {
      return new Response(JSON.stringify({ message: "Missing parameters" }), { status: 400 });
    }

    const db = await getDatabase();
    console.log("🔹 Querying Flights:", { from, to, date });

    // Ensure departureTime is compared properly as a DATE
    const [flights] = await db.execute(
      "SELECT flightId, flightNumber, departureTime, arrivalTime, totalSeats, fromLocation, toLocation ,price FROM Flight WHERE fromLocation = ? AND toLocation = ? AND DATE(departureTime) = ?",
      [from, to, date]
    );

    console.log("✅ Flights Found:", flights);

    if (!flights || flights.length === 0) {
      return new Response(JSON.stringify({ message: "No flights found." }), { status: 404 });
    }

    return new Response(JSON.stringify({ flights }), { status: 200 });

  } catch (error) {
    console.error("❌ Error fetching flights:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
