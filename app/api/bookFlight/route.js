import { getDatabase } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const db = await getDatabase(); // ✅ Initialize database correctly
    const session = await getServerSession(authOptions);
    console.log("🔹 Session Data in Booking API:", session);

    if (!session || !session.user) {
      console.log("❌ User session missing.");
      return Response.json({ success: false, error: "User not authenticated." }, { status: 401 });
    }

    const { flightId, seatId } = await req.json();
    console.log(`🔹 Booking Flight ID: ${flightId} for User: ${session.user.id}`);

    // Check if seat is available
    const [seatCheck] = await db.query("SELECT * FROM Seat WHERE seatId = ? AND isAvailable = TRUE", [seatId]);
    if (seatCheck.length === 0) {
      console.log("❌ Seat already booked or not found.");
      return Response.json({ success: false, error: "Seat already booked." });
    }

    // Insert booking
    const [bookingResult] = await db.query(
      "INSERT INTO Booking (customerId, flightId, bookingDate) VALUES (?, ?, CURDATE())",
      [session.user.id, flightId]
    );

    console.log("✅ Booking Inserted, ID:", bookingResult.insertId);

    // Update seat as booked
    await db.query("UPDATE Seat SET isAvailable = FALSE, bookingId = ? WHERE seatId = ?", [bookingResult.insertId, seatId]);

    return Response.json({ success: true, message: "Booking successful!", redirectUrl: "/confirm-booking" });

  } catch (error) {
    console.error("❌ Error processing booking:", error);
    return Response.json({ success: false, error: "Booking failed." }, { status: 500 });
  }
}
