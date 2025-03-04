export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received booking request:", body); // ✅ Debugging log

    if (!body.flightId || !body.selectedSeats.length) {
      console.error("Invalid request data:", body);
      return new Response(JSON.stringify({ message: "Invalid request data" }), { status: 400 });
    }

    console.log(`✅ Booking confirmed for seats: ${body.selectedSeats}`);
    return new Response(JSON.stringify({ message: "Booking confirmed!" }), { status: 200 });
  } catch (error) {
    console.error("❌ Error in booking API:", error);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
    
  }
  
}
