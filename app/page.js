"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import SearchFlights from "@/components/SearchFlights";
import Newsletter from "@/components/Newsletter";

// Testimonials Data
const testimonials = [
  { name: "John Doe", text: "The best flight booking experience ever!" },
  { name: "Emily Smith", text: "Easy to use and great prices!" },
  { name: "Michael Lee", text: "I found the cheapest flight within seconds!" },
];

// Testimonial Carousel Component
const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);
  const nextTestimonial = () => setIndex((prev) => (prev + 1) % testimonials.length);

  return (
    <div className="text-center">
      <p className="text-gray-600 mb-4">{testimonials[index].text}</p>
      <h3 className="text-xl font-semibold text-gray-800">- {testimonials[index].name}</h3>
      <button onClick={nextTestimonial} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Next
      </button>
    </div>
  );
};

const HomePage = () => {
  const searchFlightsRef = useRef(null);

  // Smooth Scroll Function
  const handleBookNowClick = () => {
    if (searchFlightsRef.current) {
      searchFlightsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-r from-indigo-600 to-blue-500">
        <Image
          src="/sky.gif"
          width={1920}
          height={1080}
          alt="Sky GIF"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center bg-black bg-opacity-60 p-10 rounded-lg shadow-lg">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-5xl font-extrabold mb-4 text-shadow-lg">Explore the World with Ease</h1>
            <p className="text-lg mb-6 font-light text-opacity-90">Book your flights quickly, securely, and at the best prices.</p>
            <div className="flex justify-center space-x-0 ">
            <button
              className="bg-blue-500 hover:bg-blue-600 px-6 py-4 text-lg font-semibold rounded-full shadow-lg transition duration-300 pt-0 pb-0"
              onClick={handleBookNowClick}
            ><div className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-full  flex items-center">
                <span className="flex">Book Now</span>
              </div>

            </button></div>
          </motion.div>
        </div>
      </section>

      {/* Search Flights Section */}
      <div ref={searchFlightsRef}>
        <SearchFlights />
      </div>

      {/* Popular Destinations Section */}
      <section className="py-16 bg-gradient-to-r from-gray-100 via-white to-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-10">Popular Destinations</h2>
          <div className="grid md:grid-cols-3 gap-12 px-4 sm:px-8">
            {["Paris", "New York", "Dubai"].map((city, index) => {
              const gifSrc = {
                Paris: "https://media.giphy.com/media/5nTkHZ8GzKHmK/giphy.gif",  // Paris GIF
                "New York": "https://media.giphy.com/media/dhPj81Bdp9yPU/giphy.gif",  // New York GIF
                Dubai: "https://media.giphy.com/media/hxjD1hfH4YlEU/giphy.gif",  // Dubai GIF
              }[city];

              return (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-500 ease-in-out">
                  <img
                    src={gifSrc}
                    width={400}
                    height={300}
                    className="rounded-lg mb-4"
                    alt={`Scenic view of ${city}`}
                  />
                  <h3 className="text-2xl font-semibold text-gray-800">{city}</h3>
                  <p className="text-gray-600 mt-2">Experience the best of {city} with exclusive deals.</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-10">What Our Customers Say</h2>
        <TestimonialCarousel />
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
