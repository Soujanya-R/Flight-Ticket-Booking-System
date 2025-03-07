import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let pool;

export function getDatabase() {
  if (!pool) {
    pool = mysql.createPool({  // ✅ Use createPool instead of createConnection
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "0000",
      database: process.env.DB_NAME || "flightdb",
      waitForConnections: true,
      connectionLimit: 10,  // ✅ Better for handling multiple queries
      queueLimit: 0,
    });
  }
  return pool;
}
