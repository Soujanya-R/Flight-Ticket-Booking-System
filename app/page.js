"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import SearchFlights from "@/components/SearchFlights";
import Newsletter from "@/components/Newsletter";

const testimonials = [
  { name: "John Doe", text: "The best flight booking experience ever!" },
  { name: "Emily Smith", text: "Easy to use and great prices!" },
  { name: "Michael Lee", text: "I found the cheapest flight within seconds!" },
];

const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);

  const nextTestimonial = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="relative bg-white/30 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-blue-300 transition transform hover:shadow-blue-500"
    >
      <p className="text-gray-700 text-xl mb-4 leading-relaxed italic">
        "{testimonials[index].text}"
      </p>
      <h3 className="text-2xl font-semibold text-blue-700">
        - {testimonials[index].name}
      </h3>
      <motion.button
        onClick={nextTestimonial}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg transition"
      >
        Next
      </motion.button>
    </motion.div>
  );
};

const HomePage = () => {
  const searchFlightsRef = useRef(null);

  const handleBookNowClick = () => {
    if (searchFlightsRef.current) {
      searchFlightsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
    {/* Hero Section */}
<section className="relative h-screen bg-gradient-to-r from-blue-500 to-blue-600">
  <Image
    src="/sky.gif"
    width={1920}
    height={1080}
    alt="Sky GIF"
    className="absolute top-0 left-0 w-full h-full object-cover opacity-110"
  />
  <div className="absolute inset-0 flex items-center justify-center text-center bg-black/50 p-10">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-white"
    >
      <h1 className="text-4xl font-extrabold mb-6 leading-tight drop-shadow-lg">
        Discover New Horizons  
        <span className="block text-blue-300">
          Book Your Next Adventure Today!
        </span>
      </h1>
      <p className="text-xl mb-8 font-medium max-w-3xl mx-auto">
        Uncover unbeatable prices and stress-free booking.  
        Experience travel like never before!
      </p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-500 hover:bg-blue-600 px-8 py-4 text-lg font-semibold rounded-full shadow-xl transition"
        onClick={handleBookNowClick}
      >
        Start Your Journey
      </motion.button>
    </motion.div>
  </div>
</section>


      {/* Search Flights Section */}
      <div ref={searchFlightsRef}>
        <SearchFlights />
      </div>

      {/* Popular Destinations */}
      <section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-4xl font-extrabold text-gray-800 mb-10">
      🌍 Popular Destinations
    </h2>
    <div className="grid md:grid-cols-3 gap-8 px-4 sm:px-8">
      {[
        { city: "Paris", type: "video", src: "/paris.mp4" },
        { city: "New York", type: "video", src: "newyork.mp4" },
        { city: "Dubai", type: "video", src: "/dubai.mp4" },
      ].map(({ city, type, src }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 30px rgba(0,0,0,0.1)",
          }}
          className="bg-white p-6 rounded-xl shadow-md border border-gray-200 transition"
        >
          {type === "video" ? (
            <video
              src={src}
              className="rounded-lg w-full h-48 object-cover mb-4"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              src={src}
              alt={`${city} view`}
              className="rounded-lg w-full h-48 object-cover mb-4"
            />
          )}
          <h3 className="text-2xl font-semibold text-gray-800">{city}</h3>
          <p className="text-gray-500 mt-2">
            Experience the best of {city} with exclusive deals.
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Testimonials Section */}
      <section className="py-24 bg-blue-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-blue-700 mb-10">
            💬 What Our Customers Say
          </h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center space-x-8 mb-6">
            {[
              { icon: faFacebook, link: "https://www.facebook.com" },
              { icon: faTwitter, link: "https://twitter.com" },
              { icon: faInstagram, link: "https://www.instagram.com" },
              { icon: faLinkedin, link: "https://www.linkedin.com" },
            ].map(({ icon, link }, index) => (
              <a key={index} href={link} className="hover:text-blue-500">
                <FontAwesomeIcon icon={icon} size="2x" />
              </a>
            ))}
          </div>
          <p className="text-md mb-2">Contact Us: support@flightbooking.com</p>
          <p className="text-sm">© 2025 Flight Booking. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
