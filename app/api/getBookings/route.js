// import { getDatabase } from "@/lib/db";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/api/auth/[...nextauth]/route";

// export async function GET(req) {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return Response.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const db = await getDatabase();
//     const [bookings] = await db.query("SELECT * FROM Booking WHERE customerId = ?", [session.userId]);

//     const enrichedBookings = await Promise.all(
//       bookings.map(async (booking) => {
//         const [flights] = await db.query("SELECT * FROM Flight WHERE flightId = ?", [booking.flightId]);
//         return { ...booking, flight: flights.length > 0 ? flights[0] : null };
//       })
//     );

//     return Response.json(enrichedBookings);
//   } catch (error) {
//     console.error("❌ Error fetching bookings:", error);
//     return Response.json({ error: "Database error" }, { status: 500 });
//   }
// }




import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getDatabase } from "@/lib/db";

export async function GET(req) {
  const token = await getToken({ req });
  const userId = token?.sub;

  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const db = await getDatabase();

    const [bookings] = await db.query(
      `SELECT bookingId, flightId, IFNULL(selectedSeats, '[]') AS selectedSeats 
       FROM Booking 
       WHERE userId = ?`,
      [userId]
    );

    const enrichedBookings = await Promise.all(
      bookings.map(async (booking) => {
        let selectedSeats = [];

        try {
          selectedSeats = JSON.parse(booking.selectedSeats);
        } catch (error) {
          console.warn(`Invalid seat data for bookingId ${booking.bookingId}`);
        }

        const [flights] = await db.query(
          `SELECT flightId, flightNumber, departureTime, arrivalTime, 
                  totalSeats, fromLocation, toLocation, price, airline 
           FROM Flight 
           WHERE flightId = ?`,
          [booking.flightId]
        );

        return {
          ...booking,
          flight: flights[0] || null,
          selectedSeats,
        };
      })
    );

    return new Response(JSON.stringify({ bookings: enrichedBookings }), { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
