import React, { useState, useEffect } from "react";

const SeatSelection = ({ selectedSeats, setSelectedSeats, bookedSeats }) => {
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

  return (
    <div className="grid grid-cols-6 gap-4 p-5">
      {Array.from({ length: 30 }, (_, i) => i + 1).map((seat) => {
        const isBooked = bookedSeats.includes(seat);
        const isSelected = localSelectedSeats.includes(seat);

        return (
          <button
            key={seat}
            onClick={() => handleSeatClick(seat)}
            className={`w-12 h-12 text-center rounded-lg font-bold transition 
              ${isBooked || isSelected ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}
            `}
            disabled={isBooked || isSelected} // Disables the button completely 
          >
            {seat}
          </button>
        );
      })}
    </div>
  );
};

export default SeatSelection;
