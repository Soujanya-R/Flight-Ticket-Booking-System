const handleConfirmBooking = async () => {
    console.log("Booking seats:", selectedSeats); // ✅ Debugging log
  
    if (selectedSeats.length === 0) {
      alert("No seats selected!");
      return;
    }
  
    const response = await fetch("/api/bookseats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ flightId, selectedSeats }),
    });
  
    if (response.ok) {
      console.log("✅ Booking successful! Navigating...");
      
      // Add delay before navigating
      setTimeout(() => {
        router.push("/confirm-booking");
      }, 500);
      
    } else {
      console.error("❌ Booking failed.");
      alert("Booking failed. Try again.");
    }
  };
  