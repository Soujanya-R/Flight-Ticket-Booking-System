const handleBooking = async () => {
  if (!selectedSeat) {
    setMessage("❌ Please select a seat.");
    return;
  }

  console.log("🔹 Booking Flight ID:", flightId);
  console.log("🔹 Selected Seat:", selectedSeat);

  const response = await fetch("/api/bookFlight", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ flightId, seatId: selectedSeat }),  // 🔹 Fix key name
  });

  const data = await response.json();
  console.log("🔹 Booking Response:", data);
  console.log("🔹 Redirecting to:", data.redirectUrl);

  if (data.success) {
    window.location.href = data.redirectUrl || "/confirm-booking";  // Ensure redirect
  } else {
    setMessage(`❌ ${data.error}`);
  }
  console.log("🔹 Redirecting to:", data.redirectUrl);

};
