import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {
  try {
    const { seatId, userId } = await request.json();

    if (!seatId || !userId) {
      return NextResponse.json({ error: "Seat ID and User ID required" }, { status: 400 });
    }

    const cancelQuery = `
      UPDATE seats
      SET isAvailable = 1, bookingId = NULL
      WHERE seatId = ? AND bookingId = ?
    `;

    const [result] = await db.query(cancelQuery, [seatId, userId]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Booking not found" }, { status: 400 });
    }

    return NextResponse.json({ message: "Booking canceled successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error canceling booking:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
