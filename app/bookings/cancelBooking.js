// "use server";
// import { getDatabase } from "@/lib/db";

// export async function cancelBooking(bookingId) {
//   try {
//     const db = await getDatabase();

//     // 1️⃣ Get flightId & seatNumber before deleting the booking
//     const [booking] = await db.query("SELECT flightId FROM Booking WHERE bookingId = ?", [bookingId]);
//     if (booking.length === 0) return { success: false, error: "Booking not found" };

//     // 2️⃣ Free the seat by setting isAvailable = TRUE and removing bookingId
//     await db.query("UPDATE Seat SET isAvailable = TRUE, bookingId = NULL WHERE bookingId = ?", [bookingId]);

//     // 3️⃣ Delete the booking from the Booking table
//     await db.query("DELETE FROM Booking WHERE bookingId = ?", [bookingId]);

//     return { success: true, message: "Booking canceled successfully!" };
//   } catch (error) {
//     console.error("Error canceling booking:", error);
//     return { success: false, error: "Cancellation failed." };
//   }
// }
"use client";
import { useState } from "react";

export default function CancelBooking({ bookingId, onCancelSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleCancel = async () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/cancelBooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        onCancelSuccess(bookingId); // ✅ Remove the booking from UI
        setTimeout(() => setSuccess(false), 3000); // Hide success message after 3s
      } else {
        setError(data.error || "Failed to cancel booking.");
      }
    } catch (err) {
      setError("Error canceling booking.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleCancel}
        disabled={loading}
        className={`px-5 py-2 text-white text-lg rounded-lg font-bold transition-all shadow-xl 
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 hover:shadow-red-500/50 transform hover:scale-110"
          }`}
      >
        {loading ? "Cancelling..." : "Cancel Booking"}
      </button>

      {success && <p className="mt-2 text-green-300 font-medium">✅ Booking Canceled Successfully</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}
