// src/components/Team.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';


const teamMembers = [
  {
    name: 'Lalit Paliwal',
    role: 'Founder & CEO',
    img: '/logo512.png',
    bio: 'Visionary leader with 10+ years in startup ecosystem and business strategy.',
    expertise: ['Strategy', 'Funding', 'Mentorship'],
    borderColor: 'border-cyan-500',
    tagColor: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  },
  {
    name: 'Amit Kumar',
    role: 'Co-Founder & COO',
    img: '/logo512.png',
    bio: 'Operations expert specializing in compliance, legal frameworks, and process optimization.',
    expertise: ['Operations', 'Compliance', 'Legal'],
    borderColor: 'border-teal-500',
    tagColor: 'bg-teal-100 text-teal-700 border-teal-200',
  },
  {
    name: 'Priya Singh',
    role: 'Lead Startup Consultant',
    img: '/logo192.png',
    bio: 'Growth strategist helping startups scale through digital marketing and brand development.',
    expertise: ['Marketing', 'Branding', 'Growth'],
    borderColor: 'border-emerald-500',
    tagColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};


const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};


const Team = () => (
  <motion.section
    id="team"
    className="py-20 text-center"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">
          Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-emerald-600 to-green-600">Team</span>
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500 mx-auto rounded-full shadow-md mb-6"></div>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
          A passionate team of experts dedicated to helping founders succeed. 
          We bring years of experience, strategic insights, and genuine care to every startup we support.
        </p>
      </motion.div>


      {/* Team Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {teamMembers.map((member, idx) => (
          <motion.div
            key={idx}
            className="group"
            variants={itemVariants}
            whileHover={{ y: -8 }}
          >
            <div className="flex flex-col items-center rounded-2xl p-8 shadow-lg bg-white/95 backdrop-blur-md border-2 border-cyan-200 hover:border-cyan-400 hover:shadow-2xl transition-all duration-300 h-full">
              {/* Avatar */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-emerald-400 to-green-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <img
                  src={member.img}
                  alt={member.name}
                  className={`relative h-28 w-28 rounded-full border-4 ${member.borderColor} object-cover bg-white shadow-xl group-hover:scale-110 transition-transform duration-300`}
                />
              </div>


              {/* Name & Role */}
              <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-cyan-600 transition-colors">
                {member.name}
              </h3>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600 font-semibold text-sm mb-4">
                {member.role}
              </p>


              {/* Bio */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4 text-center">
                {member.bio}
              </p>


              {/* Expertise Tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {member.expertise.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className={`${member.tagColor} text-xs font-medium px-3 py-1 rounded-full border`}
                  >
                    {skill}
                  </span>
                ))}
              </div>


              {/* Social Links */}
              <div className="flex gap-3 mt-auto pt-4 border-t border-cyan-100 w-full justify-center">
                <motion.a
                  href="#"
                  className="w-10 h-10 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full flex items-center justify-center text-cyan-600 hover:from-cyan-500 hover:to-teal-500 hover:text-white transition-all duration-300 shadow-md"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaLinkedin className="text-lg" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center text-emerald-600 hover:from-emerald-500 hover:to-green-500 hover:text-white transition-all duration-300 shadow-md"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaEnvelope className="text-lg" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>


      {/* Bottom CTA */}
      <motion.div
        className="mt-16 bg-gradient-to-r from-cyan-50 via-emerald-50 to-green-50 rounded-2xl p-8 border-2 border-cyan-200"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          Want to Work With Us?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our team is here to support your startup journey. Get in touch to discuss how we can help you succeed.
        </p>
        <motion.a
          href="/contact"
          className="inline-block bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500 text-white px-8 py-3 rounded-full 
            font-semibold shadow-lg hover:shadow-xl hover:from-cyan-600 hover:via-emerald-600 hover:to-green-600 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Schedule a Consultation
        </motion.a>
      </motion.div>
    </div>
  </motion.section>
);


export default Team;
