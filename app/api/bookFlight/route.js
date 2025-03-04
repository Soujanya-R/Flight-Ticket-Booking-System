import { getDatabase } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  const { flightId, seatId } = await req.json();
  console.log("🔹 API received:", { flightId, seatId });

  if (!flightId || !seatId) {
    console.error("❌ Missing flightId or seatId");
    return Response.json({ success: false, error: "Missing required fields" });
  }

  // Simulating booking logic
  console.log("✅ Booking confirmed!");

  return Response.json({
    success: true,
    message: "Booking successful!",
    redirectUrl: "/confirm-booking",
  });
}
