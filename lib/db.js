import mysql from "mysql2/promise";

export async function getDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST, // e.g., "localhost"
    user: process.env.DB_USER, // Your MySQL username
    password: process.env.DB_PASSWORD, // Your MySQL password
    database: process.env.DB_NAME, // Your MySQL database name
    
  });console.log("🔹 Connecting to MySQL...");

  return connection;
}
