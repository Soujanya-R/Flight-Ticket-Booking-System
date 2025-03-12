'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SeatSelection = () => {
  const [seats, setSeats] = useState([])
  const [selectedSeat, setSelectedSeat] = useState(null)

  useEffect(() => {
    fetchSeats()
  }, [])

  const fetchSeats = async () => {
    try {
      const response = await axios.get('/api/seats')
      setSeats(response.data)
      console.log('Fetched seats:', response.data)

    } catch (error) {
      console.error('Error fetching seats:', error)
      
    }
  }

  const handleSeatClick = (seat) => {
    setSelectedSeat(seat)
    // You can redirect to booking page or show a booking form here
  }

  return (
    <div className="grid grid-cols-6 gap-4 p-4">
      {seats.map((seat) => (
        <div
          key={seat.id}
          className={`p-4 rounded-lg text-white text-center font-semibold cursor-pointer transition-colors duration-200 ${
            seat.status
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-gray-500 cursor-not-allowed pointer-events-none'
          }`}
          onClick={() => seat.status && handleSeatClick(seat)}
        >
          {seat.seat_number}
          
        </div>
      ))}
    </div>
  )
}

export default SeatSelection
