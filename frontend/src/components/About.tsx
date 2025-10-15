// src/pages/About.tsx (or src/components/About.tsx)
import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import bgimage from '../assets/StartupHealer.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

const About: React.FC = () => {
  return (
    <motion.section
      id="about"
      className="py-24 relative min-h-screen bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimage})` }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Light overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-emerald-50/60 to-white/70 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Heading */}
        <motion.h2
          className="text-5xl font-extrabold mb-6 text-gray-800 drop-shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          About Us
        </motion.h2>

        {/* Short intro */}
        <motion.p
          className="text-gray-700 text-lg leading-relaxed mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          We are a team of passionate professionals helping startups and enterprises
          achieve success through technology, creativity, and strategy.
          Our work culture is rooted in <span className="text-emerald-600 font-semibold">innovation</span>,
          <span className="text-emerald-600 font-semibold"> collaboration</span>, and
          <span className="text-emerald-600 font-semibold"> excellence</span>.
        </motion.p>

        {/* Mission & Vision */}
        <motion.div
          className="grid md:grid-cols-2 gap-10 mt-10 text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              title: "Our Mission",
              desc: "To empower businesses with world-class technology, delivering impactful solutions that drive growth and long-term success.",
            },
            {
              title: "Our Vision",
              desc: "To be a trusted global partner in digital transformation, known for innovation, excellence, and unwavering client success.",
            },
          ].map((item, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Tilt options={{ max: 15, scale: 1.05, speed: 800 }}>
                <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-2xl font-semibold text-emerald-600 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed">{item.desc}</p>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-3xl font-bold text-gray-800 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Why Choose Us?
          </motion.h3>
          <motion.div
            className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 text-left"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Expertise",
                desc: "Years of experience delivering scalable and innovative digital solutions.",
              },
              {
                title: "Quality",
                desc: "Commitment to international standards with a focus on performance & security.",
              },
              {
                title: "Innovation",
                desc: "Adopting the latest technologies and creative strategies to stay ahead.",
              },
              {
                title: "Support",
                desc: "Reliable, long-term support and collaboration for your success.",
              },
            ].map((item, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Tilt options={{ max: 20, scale: 1.07, speed: 600 }}>
                  <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:border-emerald-400 border-2 border-emerald-200 transition-all duration-300">
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-3xl font-bold text-gray-800 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our Core Values
          </motion.h3>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {["Integrity", "Innovation", "Customer First", "Collaboration", "Excellence"].map(
              (value, idx) => (
                <motion.span
                  key={idx}
                  className="bg-white/90 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-lg shadow-md text-sm font-medium hover:scale-105 hover:bg-emerald-500 hover:text-white border-2 border-emerald-200 transition-all"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {value}
                </motion.span>
              )
            )}
          </motion.div>
        </motion.div>

        {/* Expertise tags */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            "Web Development",
            "Mobile Apps",
            "UI/UX Design",
            "Cloud Solutions",
            "Digital Marketing",
            "Consulting",
          ].map((skill, idx) => (
            <motion.span
              key={idx}
              className="bg-emerald-100 text-emerald-700 border-2 border-emerald-300 px-5 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
