import { NextResponse } from "next/server";
import db from "@/lib/db"; // Ensure correct DB path

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const flightId = searchParams.get("flightId");

    if (!flightId) {
      return NextResponse.json({ error: "Flight ID is required" }, { status: 400 });
    }

    const [seats] = await db.query("SELECT * FROM seats WHERE flightId = ?", [flightId]);

    console.log("🎟️ Retrieved seats:", seats);

    return NextResponse.json({ seats: seats.length ? seats : [] });
  } catch (error) {
    console.error("❌ Error fetching seats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
