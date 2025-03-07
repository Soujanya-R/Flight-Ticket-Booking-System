"use client";

import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex pt-20 flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 via-blue-200 to-gray-100 p-6">
      <div className="p-12 max-w-lg w-full bg-white shadow-2xl rounded-3xl border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">Create Your Account</h2>
        <p className="text-center text-gray-600 mb-6">Join us and explore seamless flight bookings.</p>
        <RegisterForm />
      </div>
      <footer className="mt-8 text-center text-gray-600 text-sm">
        <p>&copy; 2024 Flight Booking System. All rights reserved.</p>
      </footer>
    </div>
  );
}