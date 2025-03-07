import { getDatabase } from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const flightId = searchParams.get("flightId");

    if (!flightId) {
      console.error("❌ Flight ID is missing in request.");
      return Response.json({ error: "Flight ID is required", flight: null });
    }

    console.log("🔹 Fetching flight details for ID:", flightId);

    const db = await getDatabase(); // Fix: Call getDatabase() to get a connection
    const [flights] = await db.execute(
      "SELECT * FROM Flight WHERE flightId = ?",
      [flightId]
    );

    if (flights.length === 0) {
      console.log("❌ No flight found for ID:", flightId);
      return Response.json({ error: "Flight not found", flight: null });
    }

    console.log("✅ Flight found:", flights[0]);
    return Response.json({ flight: flights[0] });
  } catch (error) {
    console.error("❌ Error fetching flight:", error);
    return Response.json({ error: "Internal Server Error", flight: null });
  }
}
