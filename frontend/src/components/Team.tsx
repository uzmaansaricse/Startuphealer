// src/components/Team.tsx
import React from 'react';
import { motion } from 'framer-motion';

const teamMembers = [
  { name: 'Lalit Paliwal', role: 'Founder', img: '/logo512.png' },
  { name: 'Amit Kumar', role: 'Co-Founder & Operations', img: '/logo512.png' },
  { name: 'Priya Singh', role: 'Startup Consultant', img: '/logo192.png' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
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

const Team: React.FC = () => (
  <motion.section
    id="team"
    className="py-16 text-center"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <motion.h2
      className="text-5xl font-bold mb-4 text-gray-800"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      Meet the Team
    </motion.h2>

    <motion.p
      className="text-gray-700 max-w-2xl mx-auto mb-8 px-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      viewport={{ once: true }}
    >
      Meet our team of passionate professionals who bring expertise, creativity, and dedication to every project.
    </motion.p>

    <motion.div
      className="flex flex-wrap justify-center gap-8 px-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {teamMembers.map((member, idx) => (
        <motion.div
          key={idx}
          className="flex flex-col items-center rounded-xl p-6 shadow-lg w-56 bg-white/90 backdrop-blur-md border border-emerald-200"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={member.img}
            alt={member.name}
            className="h-20 w-20 rounded-full mb-4 border-4 border-emerald-500 object-cover bg-white"
          />
          <div className="text-lg font-semibold text-gray-800">{member.name}</div>
          <div className="text-emerald-600 text-sm mb-2">{member.role}</div>
        </motion.div>
      ))}
    </motion.div>
  </motion.section>
);

export default Team;
