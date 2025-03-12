"use client";

import { useState, forwardRef } from "react";
import { useRouter } from "next/navigation";

const SearchFlights = forwardRef((props, ref) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();

  const handleSearch = async () => {
    if (!from || !to || !date) {
      alert("❌ Please fill in all fields.");
      return;
    }

    // Navigate to flights page with search data
    router.push(`/flights?from=${from}&to=${to}&date=${date}`);
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-blue-50 to-gray-100">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8">
        Find Your Perfect Flight
      </h2>
      <form className="grid md:grid-cols-3 gap-6 bg-white shadow-2xl p-8 rounded-3xl border border-gray-200">
        {/* Departure Airport */}
        <select
          className="border p-4 rounded-xl w-full text-gray-700 focus:ring-2 focus:ring-blue-400 transition"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        >
          <option value="">Select Departure Airport</option>
          <option value="BLR">Bangalore (BLR)</option>
          <option value="BOM">Mumbai (BOM)</option>
          <option value="DEL">Delhi (DEL)</option>
          <option value="HYD">Hyderabad (HYD)</option>
          <option value="MAA">Chennai (MAA)</option>
          <option value="CCU">Kolkata (CCU)</option>
          <option value="AMD">Ahmedabad (AMD)</option>
          <option value="GOI">Goa (GOI)</option>
          <option value="PNQ">Pune (PNQ)</option>
          <option value="COK">Kochi (COK)</option>
        </select>
  
        {/* Destination Airport */}
        <select
          className="border p-4 rounded-xl w-full text-gray-700 focus:ring-2 focus:ring-blue-400 transition"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        >
          <option value="">Select Destination Airport</option>
          <option value="BLR">Bangalore (BLR)</option>
          <option value="BOM">Mumbai (BOM)</option>
          <option value="DEL">Delhi (DEL)</option>
          <option value="HYD">Hyderabad (HYD)</option>
          <option value="MAA">Chennai (MAA)</option>
          <option value="CCU">Kolkata (CCU)</option>
          <option value="AMD">Ahmedabad (AMD)</option>
          <option value="GOI">Goa (GOI)</option>
          <option value="PNQ">Pune (PNQ)</option>
          <option value="COK">Kochi (COK)</option>
        </select>
  
        {/* Date Picker */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-4 border rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-400 transition"
        />
  
        {/* Search Button */}
        <button
          type="button"
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-xl shadow-lg transition md:col-span-3"
        >
          Search Flights
        </button>
      </form>
    </div>
  </section>
  
  );
});

// ✅ Fix: Set display name for debugging purposes
SearchFlights.displayName = "SearchFlights";

export default SearchFlights;
