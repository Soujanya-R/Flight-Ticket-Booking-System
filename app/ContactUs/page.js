"use client";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { motion } from "framer-motion";

const Page = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("✅ Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col justify-center items-center bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f172a] p-6 relative overflow-hidden">
      {/* ✅ Toast Notification */}
      <Toaster position="top-center" />

      {/* ✅ Floating Glows */}
      <div className="absolute w-60 h-60 bg-blue-500 rounded-full blur-[100px] opacity-20 top-20 left-20"></div>
      <div className="absolute w-60 h-60 bg-purple-500 rounded-full blur-[100px] opacity-20 bottom-20 right-20"></div>

      {/* ✅ Form Container */}
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
        <h2 className="text-4xl font-extrabold text-white text-center drop-shadow-lg mb-8">
          📩 Get in Touch
        </h2>

        {/* ✅ Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Input */}
          <motion.input
            whileFocus={{ scale: 1.03 }}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border border-white/20 bg-transparent text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition duration-200 placeholder-gray-400"
            required
          />
          {/* Email Input */}
          <motion.input
            whileFocus={{ scale: 1.03 }}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full border border-white/20 bg-transparent text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition duration-200 placeholder-gray-400"
            required
          />
          {/* Message Input */}
          <motion.textarea
            whileFocus={{ scale: 1.03 }}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full border border-white/20 bg-transparent text-white p-3 rounded-lg h-36 focus:ring-2 focus:ring-blue-400 outline-none transition duration-200 placeholder-gray-400"
            required
          ></motion.textarea>

          {/* ✅ Submit Button */}
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-xl"
          >
            🚀 Send Message
          </motion.button>
        </form>
      </motion.div>

      {/* ✅ Footer */}
      <footer className="mt-8 text-center text-gray-400 text-sm">
        &copy; 2024 Flight Booking System. All rights reserved.
      </footer>
    </div>
  );
};

export default Page;
