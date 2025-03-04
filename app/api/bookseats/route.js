import { NextResponse } from "next/server";
import db from "@/lib/db"; // Adjust this based on your DB connection

export async function POST(req) {
  try {
    const { flightId, selectedSeats } = await req.json();
    console.log("📩 Received booking request:", { flightId, selectedSeats }); // ✅ Debug

    if (!flightId || !selectedSeats.length) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // Check if seats exist before updating (Optional)
    const existingSeats = await db.seats.findMany({
      where: { flightId, seatId: { in: selectedSeats } },
    });
    console.log("🔎 Found existing seats:", existingSeats); // ✅ Debug

    // Update database (Example using Prisma)
    const updatedSeats = await db.seats.updateMany({
      where: { flightId, seatId: { in: selectedSeats }, isAvailable: true },
      data: { isAvailable: false },
    });

    console.log("✅ Seats booked:", updatedSeats); // ✅ Debug
    return NextResponse.json({ success: true, updatedSeats });
  } catch (error) {
    console.error("❌ Booking error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
