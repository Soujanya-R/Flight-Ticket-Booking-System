import db from "../../db";  // Assuming db.js handles database connection
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
        console.log("🔹 Session Data:", session);
        const { flightId, seatId } = req.body;
        const customerId = session.user.id;  // Assuming session has user ID

        console.log("🔹 createBooking function called with:", { customerId, flightId, seatId });

        await db.query("START TRANSACTION");

        // Insert Booking into DB
        const query = `
        INSERT INTO Booking (customerId, flightId, bookingDate, selectedSeats) 
        VALUES (?, ?, ?, ?)`;
    const values = [customerId, flightId, new Date(), JSON.stringify(selectedSeats)];
    

        if (!bookingResult.insertId) {
            throw new Error("Failed to insert booking.");
        }

        console.log("✅ Booking Created:", { bookingId: bookingResult.insertId });

        // Mark Seat as Unavailable
        await db.query(
            "UPDATE Seats SET isAvailable = false WHERE seatId = ?",
            [seatId]
        );

        console.log("✅ Seat Marked as Unavailable");

        await db.query("COMMIT");

        // Redirect to Confirm-Booking Page
        res.status(200).json({ success: true, redirectUrl: "/confirm-booking" });

    } catch (error) {
        await db.query("ROLLBACK");
        console.error("❌ ERROR in createBooking:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
