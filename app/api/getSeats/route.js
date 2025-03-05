import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "flight_booking",
});

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const flightId = url.searchParams.get("flightId");

    if (!flightId) {
      return NextResponse.json({ error: "Flight ID is required" }, { status: 400 });
    }

    const [rows] = await db.query(
      "SELECT seatId, seatNumber, isAvailable FROM seats WHERE flightId = ?",
      [flightId]
    );

    return NextResponse.json({ seats: rows });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
