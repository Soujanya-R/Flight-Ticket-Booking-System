import { getDatabase } from "../../../lib/db";

export async function GET(req) {
  try {
    const db = await getDatabase();
    console.log("🔹 Fetching recommended flights...");

    // Fetch flights and add dummy airline & price (since your table lacks them)
    const [flights] = await db.execute(
      "SELECT flightId, flightNumber, departureTime, arrivalTime, totalSeats, fromLocation, toLocation,price,airline FROM Flight "
    );

    console.log("✅ Recommended Flights:", flights);

    if (!flights || flights.length === 0) {
      return new Response(JSON.stringify({ message: "No recommendations found." }), { status: 404 });
    }

    // Add airline & price (fake data for now)
    const enrichedFlights = flights.map(flight => ({
      ...flight,
      // airline: "Unknown Airline", // Replace with actual column if available
      // price: (Math.floor(Math.random() * 5) + 100) * 83 // Convert USD to INR
      // Random price between 100-600
    }));

    return new Response(JSON.stringify({ flights: enrichedFlights }), { status: 200 });

  } catch (error) {
    console.error("❌ Error fetching recommended flights:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
