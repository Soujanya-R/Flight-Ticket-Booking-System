import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex justify-between items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg fixed w-full z-50 top-0 transition-all duration-300 ${scrolled ? "py-2 bg-opacity-90" : "py-4"}`}
    >
      {/* Logo Section */}
      <Link href="/" className="text-xl font-bold flex items-center space-x-2">
        <Image src="/airplane.gif" alt="Airplane" width={40} height={40} className="rounded-full" />
        <span className="hover:text-gray-200 transition duration-300">Flight Booking</span>
      </Link>

      {/* Navigation Links */}
      <div className="space-x-6 hidden md:flex">
        {["/flights", "/About", "/ContactUs", "/register", "/login"].map((href, index) => (
          <Link
            key={href}
            href={href}
            className="text-lg font-medium hover:text-gray-300 transition duration-300 relative after:block after:h-0.5 after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            {["Flights", "About", "Contact Us", "Register", "Login"][index]}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none text-2xl">
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-blue-700 text-white flex flex-col items-center py-4 space-y-4 md:hidden">
          {["/flights", "/About", "/ContactUs", "/register", "/login"].map((href, index) => (
            <Link
              key={href}
              href={href}
              className="text-lg font-medium hover:text-gray-300 transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              {["Flights", "About", "Contact Us", "Register", "Login"][index]}
            </Link>
          ))}
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
