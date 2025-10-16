// src/pages/About.tsx
import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { FaHeart, FaRocket, FaHandshake, FaShieldAlt, FaBullseye, FaGlobe } from "react-icons/fa";
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Hero Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">StartupHealer</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full shadow-md mb-8"></div>
          
          {/* Intro Statement */}
          <motion.div
            className="bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-xl border-2 border-emerald-200 max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              At <span className="font-bold text-emerald-600">StartupHealer</span>, we don't just consult — <span className="font-semibold text-emerald-600">we care</span>.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We understand that every founder's journey is filled with uncertainty, excitement, and constant problem-solving. 
              That's why we exist — to bring <span className="font-semibold text-emerald-600">clarity</span>, <span className="font-semibold text-emerald-600">confidence</span>, 
              and <span className="font-semibold text-emerald-600">practical direction</span> to early-stage startups.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              We're not a service aggregator or a paperwork portal. We're a <span className="font-semibold text-emerald-600">growth partner</span> that listens, 
              understands your story, and builds tailored strategies that actually move your business forward.
            </p>
          </motion.div>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          className="grid md:grid-cols-2 gap-10 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              icon: FaBullseye,
              title: "🌟 Our Mission",
              desc: "To heal the startup ecosystem by helping founders overcome challenges that slow them down — whether it's funding confusion, compliance complexity, unclear positioning, or lack of strategic focus. We want to make building a startup feel less overwhelming — and far more achievable.",
            },
            {
              icon: FaGlobe,
              title: "🌏 Our Vision",
              desc: "To become India's most trusted startup support ecosystem — where entrepreneurs find not just services, but a team that genuinely wants them to win.",
            },
          ].map((item, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Tilt options={{ max: 12, scale: 1.03, speed: 800 }}>
                <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-xl border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mr-4">
                      <item.icon className="text-emerald-600 text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>

        {/* What We Offer */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-3xl font-bold text-gray-800 mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            🚀 What We Offer
          </motion.h3>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Startup Strategy & Mentorship",
                desc: "Clarity sessions to shape your idea into a sustainable model.",
              },
              {
                title: "Pitch & Funding Support",
                desc: "From deck design to investor readiness and introductions.",
              },
              {
                title: "Brand & Market Launch",
                desc: "Helping you build a story that sells, not just a logo that looks good.",
              },
              {
                title: "Legal & Compliance Guidance",
                desc: "Simplifying company formation, documentation, and registrations.",
              },
              {
                title: "Growth & Digital Presence",
                desc: "Practical marketing strategies that attract customers, not just clicks.",
              },
              {
                title: "End-to-End Support",
                desc: "Everything under one roof — from registration to funding and marketing.",
              },
            ].map((item, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-2xl border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-300 h-full">
                  <h4 className="text-lg font-bold text-gray-800 mb-3">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.p
            className="text-center text-gray-600 italic mt-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Every service we offer is designed to help founders build <span className="font-semibold text-emerald-600">smarter</span>, 
            <span className="font-semibold text-emerald-600"> faster</span>, and <span className="font-semibold text-emerald-600">stronger</span> — 
            without losing focus on what truly matters: <span className="font-bold text-emerald-600">impact</span>.
          </motion.p>
        </motion.div>

        {/* Our Promise */}
        <motion.div
          className="mb-20 bg-gradient-to-r from-emerald-50 to-teal-50 p-8 md:p-10 rounded-2xl shadow-xl border-2 border-emerald-200"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">💬 Our Promise</h3>
          <div className="space-y-4 text-gray-700 leading-relaxed max-w-3xl mx-auto">
            <p className="flex items-start">
              <span className="text-emerald-600 mr-3 text-xl flex-shrink-0">✓</span>
              We're a <span className="font-semibold mx-1">private, independent consultancy</span> — not tied to any government or external agency.
            </p>
            <p className="flex items-start">
              <span className="text-emerald-600 mr-3 text-xl flex-shrink-0">✓</span>
              What sets us apart is our <span className="font-semibold mx-1">ethical approach</span>, 
              <span className="font-semibold mx-1">transparent communication</span>, and deep understanding of what founders actually need.
            </p>
            <p className="flex items-start">
              <span className="text-emerald-600 mr-3 text-xl flex-shrink-0">✓</span>
              No inflated claims, no hidden costs, no false promises — just <span className="font-semibold mx-1">real support that delivers results</span>.
            </p>
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-3xl font-bold text-gray-800 mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            🤝 Why Choose Us?
          </motion.h3>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: FaRocket,
                title: "End-to-End Support",
                desc: "From startup registration to funding and marketing — everything under one roof.",
              },
              {
                icon: FaShieldAlt,
                title: "Experienced Team",
                desc: "A group of professionals who have worked with startups across multiple industries.",
              },
              {
                icon: FaHandshake,
                title: "Transparent Process",
                desc: "Clear communication, honest advice, and no hidden charges.",
              },
              {
                icon: FaBullseye,
                title: "Result-Oriented Approach",
                desc: "We focus on practical actions that deliver measurable growth.",
              },
              {
                icon: FaHeart,
                title: "Founder-Centric",
                desc: "Every solution is customized to match your vision, pace, and business goals.",
              },
              {
                icon: FaGlobe,
                title: "Growth Partner",
                desc: "We grow with you — every step of the way.",
              },
            ].map((item, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Tilt options={{ max: 15, scale: 1.05, speed: 600 }}>
                  <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-300 h-full group">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <item.icon className="text-emerald-600 text-2xl" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
          <motion.p
            className="text-center text-gray-700 font-medium mt-10 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Choosing <span className="font-bold text-emerald-600">StartupHealer</span> means choosing a partner who grows with you — 
            <span className="font-bold text-emerald-600"> every step of the way</span>.
          </motion.p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-10 border-2 border-emerald-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Let's build something amazing together. Reach out to us and let's discuss how we can help you succeed.
          </p>
          <motion.a
            href="/contact"
            className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-full 
              font-semibold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
