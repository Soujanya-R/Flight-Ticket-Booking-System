"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function FlightRecommendations({ flights }) {
  const [sortedFlights, setSortedFlights] = useState([]);
  const [filter, setFilter] = useState("best");

  useEffect(() => {
    if (flights.length > 0) {
      let sorted = [...flights];
      if (filter === "cheapest") {
        sorted.sort((a, b) => a.price - b.price);
      } else if (filter === "fastest") {
        sorted.sort((a, b) => a.duration - b.duration);
      } else {
        sorted.sort((a, b) => b.rating - a.rating);
      }
      setSortedFlights(sorted);
    }
  }, [flights, filter]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-gray-800 text-center">✈️ Recommended Flights</h2>
      <div className="flex justify-center mt-4 space-x-4">
        <button onClick={() => setFilter("cheapest")} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Cheapest</button>
        <button onClick={() => setFilter("fastest")} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Fastest</button>
        <button onClick={() => setFilter("best")} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">Best Rated</button>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedFlights.map((flight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
          >
            <h3 className="text-xl font-semibold text-gray-900">{flight.flightNumber} ✈️</h3>
            <p className="text-gray-600">{flight.departureTime} → {flight.arrivalTime}</p>
            <p className="mt-2 text-lg font-bold text-blue-600">${flight.price}</p>
            <p className="text-sm text-gray-500">{flight.layovers} layovers • {flight.duration} hrs • Rating: {flight.rating}⭐</p>
            <button className="mt-4 w-full px-5 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600">Book Now</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
