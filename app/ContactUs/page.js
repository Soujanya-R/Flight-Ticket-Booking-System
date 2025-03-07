"use client";
import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const Page = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="flex pt-20 flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 p-6">
      <Toaster position="top-center" />
      <div className="p-10 max-w-lg w-full bg-white shadow-xl rounded-xl border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Get in Touch</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name" 
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition duration-200 shadow-sm" 
            required 
          />
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email" 
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition duration-200 shadow-sm" 
            required 
          />
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message" 
            className="w-full border border-gray-300 p-3 rounded-lg h-36 focus:ring-2 focus:ring-blue-500 outline-none transition duration-200 shadow-sm" 
            required
          ></textarea>
          <button 
            type="submit" 
            className="w-full px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg"
          >
            Send Message
          </button>
        </form>
      </div>
      <footer className="mt-8 text-center text-gray-600 text-sm">
        <p>&copy; 2024 Flight Booking System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Page;
