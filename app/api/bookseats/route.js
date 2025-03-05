import { getDatabase } from "@/lib/db";

export async function POST(req) {
  try {
    const { flightId, selectedSeats } = await req.json(); // ✅ Extract correctly

    console.log("🔹 API received:", { flightId, selectedSeats });

    if (!flightId || !selectedSeats || selectedSeats.length === 0) {
      console.error("❌ Missing flightId or selectedSeats");
      return new Response(JSON.stringify({ success: false, error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const db = await getDatabase();
    const bookingsCollection = db.collection("bookings");

    await bookingsCollection.insertMany(
      selectedSeats.map((seatId) => ({ flightId, seatId }))
    );

    console.log("✅ Booking confirmed!");
    return new Response(JSON.stringify({
      success: true,
      message: "Booking successful!",
      redirectUrl: "/confirm-booking",
    }), { status: 200, headers: { "Content-Type": "application/json" } });

  } catch (error) {
    console.error("❌ Database Error:", error);
    return new Response(JSON.stringify({ success: false, error: "Database error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
