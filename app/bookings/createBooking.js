import db from "../../db";  // Assumes db.js handles pool/connection
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { flightId, selectedSeats } = req.body;
    const userId = session.user.id;

    console.log("🔹 Creating booking for:", { userId, flightId, selectedSeats });

    await db.query("START TRANSACTION");

    const [bookingResult] = await db.query(
      "INSERT INTO Booking (userId, flightId, bookingDate, selectedSeats) VALUES (?, ?, ?, ?)",
      [userId, flightId, new Date(), JSON.stringify(selectedSeats)]
    );

    if (!bookingResult.insertId) {
      throw new Error("Failed to insert booking.");
    }

    for (const seatId of selectedSeats) {
      await db.query("UPDATE Seats SET isAvailable = 0 WHERE seatId = ?", [seatId]);
    }

    await db.query("COMMIT");

    console.log("✅ Booking ID:", bookingResult.insertId);
    res.status(200).json({ success: true, redirectUrl: "/confirm-booking" });

  } catch (error) {
    await db.query("ROLLBACK");
    console.error("❌ ERROR in createBooking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
