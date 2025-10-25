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
      {/* Light overlay with blue-green gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-cyan-50/40 to-emerald-50/50 pointer-events-none" />


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
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-emerald-600 to-green-600">Clients Say</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500 mx-auto rounded-full shadow-md mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            Our clients' success is our greatest achievement. Here's what some of the founders and entrepreneurs 
            we've worked with have to say about StartupHealer.
          </p>


          {/* Trust Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: FaUsers, value: "500+", label: "Happy Clients", color: "text-cyan-600" },
              { icon: FaStar, value: "4.9/5", label: "Average Rating", color: "text-teal-600" },
              { icon: FaCheckCircle, value: "95%", label: "Success Rate", color: "text-emerald-600" },
              { icon: FaAward, value: "100%", label: "Client Satisfaction", color: "text-green-600" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-md border-2 border-cyan-100 hover:border-cyan-300 hover:shadow-lg transition-all"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <stat.icon className={`text-3xl ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-emerald-600 to-green-600">
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
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-8 border-2 border-cyan-100 hover:border-cyan-300 hover:shadow-2xl transition-all duration-300 h-full flex flex-col group">
                  
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <FaQuoteLeft className="text-4xl text-cyan-200 group-hover:text-cyan-300 transition-colors" />
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
                  <div className="border-t-2 border-cyan-100 pt-6">
                    {/* Avatar + Name */}
                    <div className="flex items-center">
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-100 via-emerald-100 to-green-100 text-cyan-700 text-xl mr-4 shadow-md border-2 border-cyan-200 group-hover:scale-110 transition-transform font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-gray-800 group-hover:text-cyan-700 transition-colors">
                          {testimonial.name}
                        </h3>
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600 text-sm font-medium">{testimonial.role}</p>
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


        {/* Why Clients Choose Us */}
        <motion.div
          className="mb-20 bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-10 border-2 border-cyan-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Why Clients Choose Us
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FaCheckCircle, title: "Trusted Results", desc: "Proven track record of success", color: "text-cyan-600", bgColor: "from-cyan-100 via-emerald-100 to-green-100" },
              { icon: FaTrophy, title: "Award Winning", desc: "Recognized excellence", color: "text-teal-600", bgColor: "from-teal-100 via-emerald-100 to-green-100" },
              { icon: FaUsers, title: "Expert Team", desc: "Experienced professionals", color: "text-emerald-600", bgColor: "from-emerald-100 to-green-100" },
              { icon: FaAward, title: "Client Focused", desc: "Your success is our priority", color: "text-green-600", bgColor: "from-green-100 to-emerald-100" },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`${item.color} text-3xl`} />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>


        {/* Bottom CTA */}
        <motion.div
          className="text-center bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500 rounded-3xl shadow-2xl p-10 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Join Our Success Stories?
          </h3>
          <p className="text-cyan-50 text-lg mb-8 max-w-2xl mx-auto">
            Let's write your success story together. Get started today and experience the StartupHealer difference!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/contact"
              className="inline-block bg-white text-cyan-600 px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-cyan-50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.a>
            <motion.a
              href="/services"
              className="inline-block bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-semibold hover:bg-white hover:text-cyan-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Services
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};


export default Testimonials;
