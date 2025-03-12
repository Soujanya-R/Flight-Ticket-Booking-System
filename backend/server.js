require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL DB connection
const db = mysql.createPool({
  host: process.env.DB_HOST,       // e.g., 'localhost'
  user: process.env.DB_USER,       // e.g., 'root'
  password: process.env.DB_PASS,   // e.g., 'yourpassword'
  database: process.env.DB_NAME,   // e.g., 'flight_booking'
});

// ✅ Subscribe to Newsletter
app.post("/subscribe", (req, res) => {
  const { name, email, phone } = req.body;

  const checkQuery = "SELECT * FROM customer WHERE email = ?";
  db.query(checkQuery, [email], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error checking customer:", checkErr);
      return res.status(500).json({ error: "Database check error" });
    }

    if (checkResult.length > 0) {
      // Email already exists
      return res.status(409).json({ message: "Email already subscribed" });
    }

    // Insert new customer
    const insertQuery = "INSERT INTO customer (name, email, phone) VALUES (?, ?, ?)";
    db.query(insertQuery, [name, email, phone], (err, result) => {
      if (err) {
        console.error("Error subscribing:", err);
        return res.status(500).json({ error: "Subscription failed" });
      }
      res.status(200).json({ message: "Subscribed successfully" });
    });
  });
});

// ✅ Flight Search (Amadeus)
const AMADEUS_CLIENT_ID = process.env.AMADEUS_CLIENT_ID;
const AMADEUS_CLIENT_SECRET = process.env.AMADEUS_CLIENT_SECRET;

async function getAmadeusToken() {
  const response = await axios.post("https://test.api.amadeus.com/v1/security/oauth2/token", {
    grant_type: "client_credentials",
    client_id: AMADEUS_CLIENT_ID,
    client_secret: AMADEUS_CLIENT_SECRET,
  });
  return response.data.access_token;
}

app.post("/search-flights", async (req, res) => {
  const { from, to, date } = req.body;

  try {
    const token = await getAmadeusToken();
    const response = await axios.get("https://test.api.amadeus.com/v2/shopping/flight-offers", {
      params: {
        originLocationCode: from,
        destinationLocationCode: to,
        departureDate: date,
        adults: 1,
      },
      headers: { Authorization: `Bearer ${token}` },
    });

    res.json({ flights: response.data.data });
  } catch (error) {
    console.error("Error fetching flights:", error);
    res.status(500).json({ message: "Failed to fetch flights." });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
