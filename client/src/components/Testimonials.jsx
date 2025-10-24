// src/pages/Testimonials.jsx
import React from "react";
import  Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "../utils/constants";
import { FaQuoteLeft, FaStar, FaCheckCircle, FaUsers, FaTrophy, FaAward } from "react-icons/fa";
import bgimage from '../assets/StartupHealer.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Testimonials = () => {
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
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            Our clients' success is our greatest achievement. Here's what some of the founders and entrepreneurs 
            we've worked with have to say about StartupHealer.
          </p>

          {/* Trust Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: FaUsers, value: "500+", label: "Happy Clients" },
              { icon: FaStar, value: "4.9/5", label: "Average Rating" },
              { icon: FaCheckCircle, value: "95%", label: "Success Rate" },
              { icon: FaAward, value: "100%", label: "Client Satisfaction" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-md border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <stat.icon className="text-3xl text-emerald-600 mx-auto mb-2" />
                <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
            >
              <Tilt
                options={{ max: 10, scale: 1.02, speed: 800 }}
                className="w-full h-full"
              >
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-8 border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300 h-full flex flex-col group">
                  
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <FaQuoteLeft className="text-4xl text-emerald-200 group-hover:text-emerald-300 transition-colors" />
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 mb-6 text-base leading-relaxed flex-grow">
                    "{testimonial.content}"
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-amber-400 text-lg" />
                    ))}
                    {[...Array(5 - testimonial.rating)].map((_, i) => (
                      <FaStar key={`empty-${i}`} className="text-gray-300 text-lg" />
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="border-t-2 border-emerald-100 pt-6">
                    {/* Avatar + Name */}
                    <div className="flex items-center">
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700 text-xl mr-4 shadow-md border-2 border-emerald-200 group-hover:scale-110 transition-transform font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-gray-800 group-hover:text-emerald-700 transition-colors">
                          {testimonial.name}
                        </h3>
                        <p className="text-emerald-600 text-sm font-medium">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* Verified Badge */}
                  <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                    <FaCheckCircle className="text-emerald-500" />
                    <span>Verified Client</span>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom sections truncated for brevity - see full code in execution output */}
      </div>
    </motion.section>
  );
};

export default Testimonials;
