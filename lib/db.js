import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let connection;

export async function getDatabase() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "0000",
      database: process.env.DB_NAME || "flightdb",
    });
  }
  return connection; // Ensure it returns a proper MySQL connection
}
