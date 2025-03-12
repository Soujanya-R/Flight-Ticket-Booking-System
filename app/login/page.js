"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"; // Default to dashboard if not provided

  return (
    <div className="min-h-screen pt-20 flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 p-6 relative overflow-hidden">
      <Toaster position="top-center" />

      {/* Floating Glowing Background Effects */}
      <div className="absolute w-72 h-72 bg-indigo-400 rounded-full blur-3xl opacity-30 top-20 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 40px rgba(255, 255, 255, 0.3)" }}
        className="p-10 max-w-lg w-full bg-white/20 backdrop-blur-lg shadow-2xl rounded-3xl border border-white/30 transition-transform"
      >
        <h2 className="text-4xl font-extrabold text-white text-center drop-shadow-lg mb-6">🔑 Welcome Back</h2>
        <p className="text-center text-gray-300 mb-6">Log in to access your account</p>

        <LoginForm callbackUrl={callbackUrl} />

        <p className="text-center text-sm text-gray-300 mt-6">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-400 font-medium hover:underline">Sign up</a>
        </p>
      </motion.div>

      <footer className="mt-8 text-center text-gray-300 text-sm">
        <p>&copy; 2024 Flight Booking System. All rights reserved.</p>
      </footer>
    </div>
  );
}
