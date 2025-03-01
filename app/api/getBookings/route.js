import { getDatabase } from "../../../lib/db"; 

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const flightId = url.searchParams.get("flightId");

    if (!flightId) {
      return new Response(JSON.stringify({ message: "Missing flightId" }), { status: 400 });
    }

    const db = await getDatabase();
    const [seats] = await db.execute("SELECT * FROM seats WHERE flightId = ?", [flightId]);

    if (seats.length === 0) {
      return new Response(JSON.stringify({ message: "No seats available." }), { status: 404 });
    }

    return new Response(JSON.stringify(seats), { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching seats:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
