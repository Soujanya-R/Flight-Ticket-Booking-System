// import React from 'react';
// import Image from 'next/image';
// const About = () => {
//   return (
//     <div className='pt-1 rounded-full pb-0 shadow-lg bg-white'>
//       {/* About Section */}
//       <div>
//       <section className="py-16  shadow-lg px-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white">
//         <div className="max-w-7xl mx-auto text-center">
//           <h2 className="text-4xl font-extrabold mb-6">About Us</h2>
//           <p className="text-lg mb-8 max-w-3xl mx-auto">
//             Welcome to Flight Booking! We are a passionate team of travel enthusiasts dedicated to making your journey easier and more enjoyable. Our platform aims to offer the most comprehensive and user-friendly experience when it comes to booking flights, discovering new destinations, and managing your travel plans.
//           </p>
//           <div className="flex justify-center items-center space-x-5">
//             <Image
//               src="/flight4.webp"
//               width={160}
//                 height={160}    
//               alt="Team Image"
//               className="rounded-full shadow-lg w-40 h-40 object-cover"
//             />
//             <div className="max-w-lg">
//               <p className="text-md mb-4">
//                 Our mission is to provide you with the best possible travel options at the best prices. With a simple interface, seamless booking process, and personalized recommendations, we ensure that your travel experience starts with ease and comfort.
//               </p>
//               <p className="text-md mb-4">
//                 Whether you're traveling for business, leisure, or adventure, we have the perfect flight options for you. Our commitment to providing high-quality service is what drives us every day, ensuring that you get the best deals and the most up-to-date information.
//               </p>
//               <p className="text-md mb-4">
//                 Our team consists of travel experts, engineers, and customer service professionals working together to deliver an exceptional experience. We continually innovate and improve our services, keeping your convenience and satisfaction as our top priority.
//               </p>
//               <p className="text-md mb-8">
//                 We are always here to help you make your next journey a smooth and enjoyable one. Join us, and let's explore the world together!
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//       </div>
//       {/* Footer Section */}
//       <footer className="bg-gray-900 text-white py-12">
//   <div className="max-w-7xl mx-auto text-center">
//     <p className="text-2xl mb-4">Stay connected with us:</p>
//     <div className="flex justify-center items-center space-x-8 mb-4">
//       <a href="https://www.facebook.com" className="hover:text-blue-500">
//         <i className="fab fa-facebook fa-2x"></i> Facebook
//       </a>
//       <a href="https://twitter.com" className="hover:text-blue-500">
//         <i className="fab fa-twitter fa-2x"></i> Twitter
//       </a>
//       <a href="https://www.instagram.com" className="hover:text-pink-500">
//         <i className="fab fa-instagram fa-2x"></i> Instagram
//       </a>
//       <a href="https://www.linkedin.com" className="hover:text-blue-700">
//         <i className="fab fa-linkedin fa-2x"></i> LinkedIn
//       </a>
//     </div>
//     <p className="text-md mb-2">Contact Us: support@flightbooking.com</p>
//     <p className="text-sm">© 2025 Flight Booking. All Rights Reserved.</p>
//   </div>
// </footer>

//     </div>
//   );
// };

// export default About;
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gradient-to-br pt-12 from-blue-900 via-purple-800 to-blue-500 min-h-screen flex flex-col justify-center items-center text-white">
      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl bg-white/20 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/30"
      >
        <h2 className="text-4xl font-extrabold text-center drop-shadow-lg">About Us</h2>
        <p className="text-lg text-center text-gray-200 mt-4">
          Welcome to Flight Booking! We are a passionate team of travel enthusiasts dedicated to making your journey easier and more enjoyable.
        </p>

        {/* Team Section */}
        <div className="flex flex-col md:flex-row items-center mt-8 space-y-6 md:space-y-0 md:space-x-6">
          <Image
            src="/flight4.webp"
            width={160}
            height={160}
            alt="Team Image"
            className="rounded-full shadow-lg w-40 h-40 object-cover border-4 border-white"
          />
          <div className="max-w-lg">
            <p className="text-md text-gray-200 mb-4">
              Our mission is to provide the best travel options at unbeatable prices. With a seamless booking process and personalized recommendations, we ensure an effortless travel experience.
            </p>
            <p className="text-md text-gray-200 mb-4">
              Whether you're traveling for business, leisure, or adventure, we have the perfect flights for you. Our dedicated team constantly innovates to bring you the best service possible.
            </p>
            <p className="text-md text-gray-200 mb-4">
              Join us on this journey and explore the world with ease!
            </p>
          </div>
        </div>
      </motion.section>

      {/* Footer Section */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full bg-black/20 backdrop-blur-md text-white py-10 mt-10 shadow-lg"
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl mb-4">Stay Connected with Us:</p>
          <div className="flex justify-center space-x-6 mb-6">
            <motion.a whileHover={{ scale: 1.1 }} href="https://www.facebook.com" className="hover:text-blue-400 transition">
              <FaFacebook size={32} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.1 }} href="https://twitter.com" className="hover:text-blue-400 transition">
              <FaTwitter size={32} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.1 }} href="https://www.instagram.com" className="hover:text-pink-400 transition">
              <FaInstagram size={32} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.1 }} href="https://www.linkedin.com" className="hover:text-blue-600 transition">
              <FaLinkedin size={32} />
            </motion.a>
          </div>
          <p className="text-md">Contact Us: support@flightbooking.com</p>
          <p className="text-sm mt-2">© 2025 Flight Booking. All Rights Reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default About;
