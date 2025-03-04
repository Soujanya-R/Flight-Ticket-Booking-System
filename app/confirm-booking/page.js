const mysql = require("mysql2");

// ✅ Connect to MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "flight_booking" // Change this to your actual DB name
});

connection.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL!");
});

// ✅ Fetch data for confirmation page
const bookingId = 1; // Change this dynamically based on user input
connection.query("SELECT * FROM booking WHERE id = ?", [bookingId], (err, results) => {
  if (err) {
    console.error("Error fetching booking details:", err);
  } else {
    console.log("Booking Details:", results);
  }
  connection.end(); // Close the connection after fetching data
});
