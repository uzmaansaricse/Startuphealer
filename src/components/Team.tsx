import React from 'react';
import { motion } from 'framer-motion';

const teamMembers = [
  { name: 'Lalit paliwal', role: 'Founder ', img: '/logo512.png' },
  { name: 'Amit Kumar', role: 'Co-Founder & Operations', img: '/logo512.png' },
  { name: 'Priya Singh', role: 'Startup Consultant', img: '/logo192.png' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
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

const Team: React.FC = () => (
  <motion.section
    id="team"
    className="py-16 bg-gray-900 text-center"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <motion.h2
      className="text-5xl font-bold mb-4 text-white"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      Meet the Team
    </motion.h2>
    <motion.p
      className="text-gray-400 max-w-2xl mx-auto mb-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      viewport={{ once: true }}
    >
      Meet our team of passionate professionals who bring expertise, creativity,
      and dedication to every project. Together, we work to empower startups
      and businesses with the right strategies and solutions for success.
    </motion.p>

    <motion.div
      className="flex flex-wrap justify-center gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {teamMembers.map((member, idx) => (
        <motion.div
          key={idx}
          className="flex flex-col items-center bg-gray-800 rounded-xl p-6 shadow w-56"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={member.img}
            alt={member.name}
            className="h-20 w-20 rounded-full mb-4 border-4 border-blue-600 object-cover bg-white"
          />
          <div className="text-lg font-semibold text-white">{member.name}</div>
          <div className="text-blue-400 text-sm mb-2">{member.role}</div>
        </motion.div>
      ))}
    </motion.div>
  </motion.section>
);

export default Team;

