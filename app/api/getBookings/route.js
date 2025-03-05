import { getDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await getDatabase();
    const [bookings] = await db.query("SELECT * FROM Booking WHERE customerId = ?", [session.userId]);

    const enrichedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const [flights] = await db.query("SELECT * FROM Flight WHERE flightId = ?", [booking.flightId]);
        return { ...booking, flight: flights.length > 0 ? flights[0] : null };
      })
    );

    return Response.json(enrichedBookings);
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    return Response.json({ error: "Database error" }, { status: 500 });
  }
}
