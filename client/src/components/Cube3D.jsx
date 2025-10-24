// src/components/Cube3D.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './Cube3D.css';

const Cube3D = () => {
  return (
    <motion.div
      className="cube3d-container"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="cube3d">
        <div className="face front">Startup India</div>
        <div className="face back">MSME</div>
        <div className="face right">GST</div>
        <div className="face left">ISO 9001</div>
        <div className="face top">Trademark</div>
        <div className="face bottom">Funding</div>
      </div>
    </motion.div>
  );
};

export default Cube3D;
