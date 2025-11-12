// src/components/Hero.jsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Hero = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // KPI data with static values
  const kpiData = [
    { 
      value: '80%', 
      label: 'Faster Compliance Process', 
      desc: 'Save time with our streamlined approach', 
      gradient: 'from-cyan-600 to-teal-600' 
    },
    { 
      value: '500+', 
      label: 'Startups Supported', 
      desc: 'Trusted by founders across India', 
      gradient: 'from-teal-600 to-emerald-600' 
    },
    { 
      value: '95%', 
      label: 'Client Success Rate', 
      desc: 'Results that speak for themselves', 
      gradient: 'from-emerald-600 to-green-600' 
    },
  ];

  // Trust badges data
  const trustBadges = [
    { icon: '✓', text: 'No Hidden Costs', color: 'text-cyan-600' },
    { icon: '✓', text: 'Transparent Process', color: 'text-teal-600' },
    { icon: '✓', text: 'Expert Guidance', color: 'text-emerald-600' },
    { icon: '✓', text: '24/7 Support', color: 'text-green-600' },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-[70vh] flex flex-col justify-center items-center pt-24 pb-16 text-center px-4"
    >
      {/* Main Heading */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 leading-tight">
          We Don't Just Consult —{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-emerald-600 to-green-600">
            We Care
          </span>
        </h1>
        <div className="w-32 h-1.5 bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500 mx-auto rounded-full shadow-md"></div>
      </motion.div>

      {/* Subheading */}
      <motion.p
        className="text-xl md:text-2xl text-gray-700 mb-4 max-w-4xl mx-auto font-medium leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Your Growth Partner for{' '}
        <span className="text-cyan-600 font-bold">Compliance</span>,{' '}
        <span className="text-emerald-600 font-bold">Funding</span>, and{' '}
        <span className="text-green-600 font-bold">Scale</span>
      </motion.p>

      {/* Description */}
      <motion.p
        className="text-base md:text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        We bring <span className="font-semibold text-cyan-600">clarity</span>,{' '}
        <span className="font-semibold text-emerald-600">confidence</span>, and{' '}
        <span className="font-semibold text-green-600">practical direction</span> to early-stage startups — 
        helping you overcome challenges that slow you down, so you can focus on what truly matters:{' '}
        <span className="font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">building impact</span>.
      </motion.p>

      {/* KPI Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {kpiData.map((k, index) => (
          <motion.div
            key={k.label}
            className="flex flex-col items-center p-6 rounded-2xl shadow-xl bg-white/95 backdrop-blur-md border-2 border-cyan-200 hover:border-cyan-400 hover:shadow-2xl transition-all duration-300 group"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <motion.span 
              className={`text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${k.gradient} leading-tight mb-2 transition-transform duration-300 group-hover:scale-110`}
            >
              {k.value}
            </motion.span>
            <span className="text-sm md:text-base text-gray-800 font-bold mb-1">
              {k.label}
            </span>
            <span className="text-xs text-gray-500 text-center">
              {k.desc}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <motion.a
          href="/register"
          className="inline-block bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:from-cyan-600 hover:via-emerald-600 hover:to-green-600 transition-all duration-300 text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started Free
        </motion.a>
        <motion.a
          href="/services"
          className="inline-block bg-white text-cyan-600 border-2 border-cyan-500 px-10 py-4 rounded-full font-bold shadow-lg hover:bg-cyan-50 hover:shadow-xl transition-all duration-300 text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Services
        </motion.a>
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        {trustBadges.map((badge, index) => (
          <motion.div
            key={badge.text}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
          >
            <span className={`${badge.color} text-2xl font-bold`}>{badge.icon}</span>
            <span>{badge.text}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
