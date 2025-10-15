// src/pages/Testimonials.tsx
import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "../utils/constants";
import bgimage from '../assets/StartupHealer.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const Testimonials: React.FC = () => {
  return (
    <motion.section
      id="testimonials"
      className="py-24 min-h-screen relative bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimage})` }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Light overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-emerald-50/60 to-white/70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Clients Say</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full shadow-md mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            We take pride in delivering high-quality solutions. 
            Here's what our clients have to say about working with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
            >
              <Tilt
                options={{ max: 12, scale: 1.03, speed: 800 }}
                className="w-full h-full"
              >
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-8 border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-between group">
                  
                  {/* Quote icon decorative */}
                  <div className="absolute top-4 right-4 text-6xl text-emerald-100 opacity-30 group-hover:opacity-50 transition-opacity">
                    "
                  </div>

                  {/* Avatar + Name */}
                  <div className="flex items-center mb-6 relative z-10">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700 text-3xl mr-4 shadow-md border-2 border-emerald-200 group-hover:scale-110 transition-transform">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 group-hover:text-emerald-700 transition-colors">
                        {testimonial.name}
                      </h3>
                      <p className="text-emerald-600 text-sm font-medium">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed italic relative z-10">
                    "{testimonial.content}"
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1 relative z-10">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-amber-400 text-xl">★</span>
                    ))}
                    {[...Array(5 - testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-gray-300 text-xl">★</span>
                    ))}
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-10 border-2 border-emerald-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Want to Share Your Experience?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We'd love to hear from you! Share your feedback and help us serve you better.
          </p>
          <motion.a
            href="/contact"
            className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-full 
              font-semibold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
