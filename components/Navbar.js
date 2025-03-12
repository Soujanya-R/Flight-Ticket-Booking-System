"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed w-full z-50 top-0 flex justify-between items-center px-6 md:px-12 transition-all duration-300 shadow-lg ${
        scrolled
          ? "py-2 bg-white/80 backdrop-blur-lg shadow-md"
          : "py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
      }`}
    >
      {/* ✅ Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/airplane.gif"
          alt="Airplane"
          width={40}
          height={40}
          className="rounded-full shadow-lg"
        />
        <span className="text-xl font-bold hover:text-gray-200 transition duration-300">
          AeroLink
        </span>
      </Link>

      {/* ✅ Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        <Link
          href="/smart-recommendations"
          className="text-lg font-medium transition duration-300 hover:text-gray-200"
        >
          Flights
        </Link>
        <Link
          href="/About"
          className="text-lg font-medium transition duration-300 hover:text-gray-200"
        >
          About
        </Link>
        <Link
          href="/ContactUs"
          className="text-lg font-medium transition duration-300 hover:text-gray-200"
        >
          Contact Us
        </Link>

        {session ? (
          <>
            <Link
              href="/dashboard"
              className="text-lg font-medium transition duration-300 hover:text-gray-200"
            >
              Dashboard
            </Link>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium transition duration-300 hover:bg-red-700 shadow-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/register"
              className="text-lg font-medium transition duration-300 hover:text-gray-200"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="text-lg font-medium transition duration-300 hover:text-gray-200"
            >
              Login
            </Link>
          </>
        )}
      </div>

      {/* ✅ Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-white text-2xl focus:outline-none"
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* ✅ Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg p-4 flex flex-col items-center space-y-4"
          >
            <Link
              href="/smart-recommendations"
              className="text-lg font-medium text-white hover:text-gray-200"
              onClick={() => setMenuOpen(false)}
            >
              Flights
            </Link>
            <Link
              href="/About"
              className="text-lg font-medium text-white hover:text-gray-200"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/ContactUs"
              className="text-lg font-medium text-white hover:text-gray-200"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>

            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-lg font-medium text-white hover:text-gray-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setMenuOpen(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium transition duration-300 hover:bg-red-700 shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="text-lg font-medium text-white hover:text-gray-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  className="text-lg font-medium text-white hover:text-gray-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
