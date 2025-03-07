"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function SeatsPage() {
  const searchParams = useSearchParams();
  const flightId = searchParams.get("flightId");
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [flightDetails, setFlightDetails] = useState(null);

  useEffect(() => {
    async function fetchFlightData() {
      if (!flightId) return;
      setLoading(true);

      try {
        const response = await fetch(`/api/getFlight?flightId=${flightId}`);

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        // ✅ Check if response is empty
        const textData = await response.text();
        if (!textData) {
          throw new Error("Received empty response from server.");
        }

        // ✅ Parse JSON safely
        let data;
        try {
          data = JSON.parse(textData);
        } catch (jsonError) {
          throw new Error("Invalid JSON response from server.");
        }

        console.log("Flight API Response:", data);

        if (data.flight) {
          setFlightDetails(data.flight);

          // Fetch seats
          const seatResponse = await fetch(`/api/getSeats?flightId=${flightId}`);

          if (!seatResponse.ok) {
            throw new Error(`Seat API Error: ${seatResponse.status} ${seatResponse.statusText}`);
          }

          const seatTextData = await seatResponse.text();
          if (!seatTextData) {
            throw new Error("Received empty seat response from server.");
          }

          let seatData;
          try {
            seatData = JSON.parse(seatTextData);
          } catch (jsonError) {
            throw new Error("Invalid JSON response from seats API.");
          }

          console.log("Seats API Response:", seatData);

          if (seatData.seats) {
            setSeats(seatData.seats);
          } else {
            setError("Seats not available.");
          }
        } else {
          setError("Flight details not found.");
        }
      } catch (err) {
        console.error("❌ Fetch error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }


    fetchFlightData();
  }, [flightId]);



  const handleSeatSelect = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const handleConfirmSelection = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    try {
      const response = await fetch("/api/bookSeats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flightId, selectedSeats }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Booking successful!");
        setSeats((prevSeats) =>
          prevSeats.map((seat) =>
            selectedSeats.includes(seat.seatId)
              ? { ...seat, isAvailable: false }
              : seat
          )
        );
        setSelectedSeats([]);
      } else {
        alert(`Booking failed: ${result.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("❌ Error while booking:", error);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-800 to-indigo-500 text-white"
    >
      <h1 className="text-4xl pt-20 font-extrabold mb-8 shadow-lg">Select Your Seat</h1>

      {loading ? (
        <p className="text-gray-300 animate-pulse">Loading data...</p>
      ) : error ? (
        <p className="text-red-400 bg-red-800 p-3 rounded-lg">{error}</p>
      ) : (
        <>
          {flightDetails && (
            <div className="w-full max-w-3xl bg-white text-black p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-2xl font-bold ">Flight Details :</h2>
              <p className="text-lg">
                <span className="font-semibold">From:</span> {flightDetails?.fromLocation ?? "Loading..."}  </p>
                <p className="text-lg"> <span>
                  <span className="font-semibold">To:</span> {flightDetails?.toLocation ?? "Loading..."}
                </span>
                </p>
            


              {/* <p className="text-lg">
                <span className="font-semibold">Duration:</span> {flightDetails.duration}
              </p> */}
               <p className="text-lg">
                <span className="font-semibold">Flight ID:</span> {flightDetails.flightNumber}
              </p>
              <div className="text-lg">
                <p>
                  <span className="font-semibold">Departure Time:</span> {flightDetails?.departureTime ?? "Loading..."}
                </p>
                <p>
                  <span className="font-semibold">Arrival Time:</span> {flightDetails?.arrivalTime  ??  "Loading..."}
                </p>
              </div>

            </div>
          )}
          <div className="grid grid-cols-4 gap-4 bg-white p-6 rounded-lg shadow-2xl">
            {seats.length > 0 ? (
              seats.map((seat) => (
                <motion.button
                  key={seat.seatId}
                  whileTap={{ scale: 0.9 }}
                  className={`p-4 border rounded-lg text-lg font-semibold transition transform hover:scale-105 duration-200 shadow-md ${!seat.isAvailable
                      ? "bg-gray-500 text-gray-800 cursor-not-allowed opacity-70"
                      : selectedSeats.includes(seat.seatId)
                        ? "bg-yellow-500 text-white hover:bg-yellow-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  disabled={!seat.isAvailable}
                  onClick={() => seat.isAvailable && handleSeatSelect(seat.seatId)}
                >
                  {seat.seatNumber || seat.seatId}
                </motion.button>
              ))
            ) : (
              <p className="text-red-500 text-lg font-semibold">No seats available</p>
            )}
          </div>


          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition shadow-xl text-lg font-bold"
            onClick={handleConfirmSelection}
          >
            Confirm Selection
          </motion.button>
        </>
      )}
    </motion.div>
  );
}
