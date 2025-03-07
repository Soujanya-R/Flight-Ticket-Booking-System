"use client";

import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex pt-20 flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-blue-50 to-gray-200 p-6">
      <div className="p-12 max-w-md w-full bg-white shadow-2xl rounded-3xl border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-2xl">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-6">Log in to access your account</p>
        <LoginForm />
        <p className="text-center text-sm text-gray-500 mt-6">Don't have an account? <a href="/register" className="text-blue-600 font-medium hover:underline">Sign up</a></p>
      </div>
      <footer className="mt-10 text-center text-gray-600 text-sm">
        <p>&copy; 2024 Flight Booking System. All rights reserved.</p>
      </footer>
    </div>
  );
}
