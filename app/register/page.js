"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen pt-20 flex flex-col justify-center items-center bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f172a] p-6 relative overflow-hidden">
      {/* ✅ Toast Notification */}
      <Toaster position="top-center" />

      {/* ✅ Floating Glows */}
      <div className="absolute w-60 h-60 bg-blue-500 rounded-full blur-[100px] opacity-20 top-16 left-16"></div>
      <div className="absolute w-60 h-60 bg-purple-500 rounded-full blur-[100px] opacity-20 bottom-16 right-16"></div>

      {/* ✅ Register Form Container */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{
          scale: 1.03,
          boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.2)"
        }}
        className="p-10 max-w-lg w-full bg-white/10 backdrop-blur-md shadow-2xl rounded-3xl border border-white/20"
      >
        {/* ✅ Heading */}
        <h2 className="text-4xl font-extrabold text-white text-center drop-shadow-lg mb-6">
          🚀 Create Your Account
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Join us and start booking flights easily.
        </p>

        {/* ✅ Register Form */}
        <RegisterForm />

        {/* ✅ Redirect to Login */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>

      {/* ✅ Footer */}
      <footer className="mt-8 text-center text-gray-400 text-sm">
        &copy; 2024 Flight Booking System. All rights reserved.
      </footer>
    </div>
  );
}
