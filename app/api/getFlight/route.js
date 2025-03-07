import { getDatabase } from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const flightId = searchParams.get("flightId");

    if (!flightId) {
      console.error("❌ Flight ID is missing in request.");
      return new Response(JSON.stringify({ error: "Flight ID is required", flight: null }), { status: 400 });
    }

    console.log("🔹 Fetching flight details for ID:", flightId);

    const db = await getDatabase();
    const [flights] = await db.execute("SELECT * FROM Flight WHERE flightId = ?", [flightId]);

    if (flights.length === 0) {
      console.log("❌ No flight found for ID:", flightId);
      return new Response(JSON.stringify({ error: "Flight not found", flight: null }), { status: 404 });
    }

    console.log("✅ Flight found:", flights[0]);

    return new Response(JSON.stringify({ flight: flights[0] }), { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching flight:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error", flight: null }), { status: 500 });
  }
}
