"use client";  // Ensure it's a Client Component
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

const SeatSelection = ({ selectedSeats, setSelectedSeats, bookedSeats }) => {
  const router = useRouter();  // ✅ Initialize router
  const [localSelectedSeats, setLocalSelectedSeats] = useState([]);

  useEffect(() => {
    setLocalSelectedSeats(selectedSeats);
  }, [selectedSeats]);

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat) || localSelectedSeats.includes(seat)) return;

    const updatedSeats = [...localSelectedSeats, seat];
    setLocalSelectedSeats(updatedSeats);
    setSelectedSeats(updatedSeats);
  };

  // const handleConfirmSelection = () => {
  //   console.log("✅ Navigating to /dashboard");
  //   router.push("/dashboard"); // ✅ Try push instead of replace
  // };
  


  return (
    <div className="p-8">
      <h2>Select Your Seats</h2>
      <div className="grid grid-cols-6 gap-4 p-5">
        {Array.from({ length: 30 }, (_, i) => i + 1).map((seat) => (
          <button
            key={seat}
            onClick={() => handleSeatClick(seat)}
            className={`w-12 h-12 text-center rounded-lg font-bold transition 
              ${bookedSeats.includes(seat) || localSelectedSeats.includes(seat)
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"}
            `}
            disabled={bookedSeats.includes(seat) || localSelectedSeats.includes(seat)}
          >
            {seat}
          </button>
        ))}
      </div>

      {/* ✅ Confirm Button */}
      <Link href="/dashboard">
  <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg">
    Confirm Selection
  </button>
</Link>


    </div>
  );
};

export default SeatSelection;
