"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/auth/register";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const result = await registerUser(name, email, password);

    if (result.success) {
      setMessage("✅ Registration successful! Redirecting...");
      setTimeout(() => router.push("/login"), 2000); // Redirect after 2s
    } else {
      setMessage(`❌ ${result.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 m-2"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 m-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 m-2"
        required
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Register
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}
