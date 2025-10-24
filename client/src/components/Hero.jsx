// src/components/Hero.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [incorp, setIncorp] = useState(0);
  const [trusted, setTrusted] = useState(0);
  const [stars, setStars] = useState(0);
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    const incorpTarget = 80;
    const trustedTarget = 500;
    const starsTarget = 95;

    let incorpInterval;
    let trustedInterval;
    let starsInterval;
    let resetTimeout;

    setIncorp(0);
    setTrusted(0);
    setStars(0);

    incorpInterval = setInterval(() => {
      setIncorp((prev) => {
        if (prev < incorpTarget) return prev + 1;
        clearInterval(incorpInterval);
        return incorpTarget;
      });
    }, 15);

    trustedInterval = setInterval(() => {
      setTrusted((prev) => {
        if (prev < trustedTarget) return prev + 10;
        clearInterval(trustedInterval);
        return trustedTarget;
      });
    }, 10);

    starsInterval = setInterval(() => {
      setStars((prev) => {
        if (prev < starsTarget) return prev + 1;
        clearInterval(starsInterval);
        return starsTarget;
      });
    }, 15);

    resetTimeout = setTimeout(() => setLoop((l) => l + 1), 3000);

    return () => {
      clearInterval(incorpInterval);
      clearInterval(trustedInterval);
      clearInterval(starsInterval);
      clearTimeout(resetTimeout);
    };
  }, [loop]);

  return (
    <motion.section
      id="home"
      className="min-h-[70vh] flex flex-col justify-center items-center pt-24 pb-16 text-center px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Main Heading */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 leading-tight">
          We Don't Just Consult —{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
            We Care
          </span>
        </h1>
        <div className="w-32 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full shadow-md"></div>
      </motion.div>

      {/* Subheading */}
      <motion.p
        className="text-xl md:text-2xl text-gray-700 mb-4 max-w-4xl mx-auto font-medium leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        Your Growth Partner for{' '}
        <span className="text-emerald-600 font-bold">Compliance</span>,{' '}
        <span className="text-emerald-600 font-bold">Funding</span>, and{' '}
        <span className="text-emerald-600 font-bold">Scale</span>
      </motion.p>

      {/* Description */}
      <motion.p
        className="text-base md:text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        We bring <span className="font-semibold text-emerald-600">clarity</span>,{' '}
        <span className="font-semibold text-emerald-600">confidence</span>, and{' '}
        <span className="font-semibold text-emerald-600">practical direction</span> to early-stage startups — 
        helping you overcome challenges that slow you down, so you can focus on what truly matters:{' '}
        <span className="font-bold text-emerald-600">building impact</span>.
      </motion.p>

      {/* KPI Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 w-full max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      >
        {[
          { value: `${incorp}%`, label: 'Faster Compliance Process', desc: 'Save time with our streamlined approach' },
          { value: `${trusted}+`, label: 'Startups Supported', desc: 'Trusted by founders across India' },
          { value: `${stars}%`, label: 'Client Success Rate', desc: 'Results that speak for themselves' },
        ].map((k) => (
          <motion.div
            key={k.label}
            className="flex flex-col items-center p-6 rounded-2xl shadow-xl bg-white/95 backdrop-blur-md border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-2xl transition-all duration-300 group"
            whileHover={{ y: -5 }}
          >
            <span className="kpi-3d text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 leading-tight mb-2">
              {k.value}
            </span>
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
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        viewport={{ once: true }}
      >
        <motion.a
          href="/register"
          className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started Free
        </motion.a>
        <motion.a
          href="/services"
          className="inline-block bg-white text-emerald-600 border-2 border-emerald-500 px-10 py-4 rounded-full font-bold shadow-lg hover:bg-emerald-50 hover:shadow-xl transition-all duration-300 text-lg"
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
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 text-2xl">✓</span>
          <span>No Hidden Costs</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 text-2xl">✓</span>
          <span>Transparent Process</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 text-2xl">✓</span>
          <span>Expert Guidance</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 text-2xl">✓</span>
          <span>24/7 Support</span>
        </div>
      </motion.div>

      <style>{`
        .kpi-3d {
          transition: transform 0.3s cubic-bezier(.4,2,.6,1);
          will-change: transform;
        }
        .kpi-3d:hover {
          transform: scale(1.1);
        }
      `}</style>
    </motion.section>
  );
};

export default Hero;
