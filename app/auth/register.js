"use server";
import { getDatabase } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function registerUser(name, email, password) {
  try {
    const db = await getDatabase();
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query("INSERT INTO Users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      hashedPassword,
    ]);

    return { success: true, message: "User registered successfully!" };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, error: "Registration failed. Email might be taken." };
  }
}
