// src/components/Hero.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const [incorp, setIncorp] = useState(0);
  const [trusted, setTrusted] = useState(0);
  const [stars, setStars] = useState(0);
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    const incorpTarget = 80;
    const trustedTarget = 100;
    const starsTarget = 5;

    let incorpInterval: NodeJS.Timeout;
    let trustedInterval: NodeJS.Timeout;
    let starsInterval: NodeJS.Timeout;
    let resetTimeout: NodeJS.Timeout;

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
        if (prev < trustedTarget) return prev + 2;
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
    }, 200);

    resetTimeout = setTimeout(() => setLoop((l) => l + 1), 2500);

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
      className="min-h-[60vh] flex flex-col justify-center items-center pt-24 pb-12 text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800 drop-shadow-sm"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Helping Seed‑Stage Tech Startups Secure Compliance & Scale
      </motion.h1>

      <motion.p
        className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        We help early‑stage tech founders handle legal compliance, incorporation, and growth—so you can focus on building your product.
      </motion.p>

      <motion.div
        className="flex flex-col md:flex-row gap-8 justify-center items-center mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      >
        {[
          { value: `${incorp}%`, label: 'faster incorporation process' },
          { value: `${trusted}+`, label: 'startups trusted us' },
          { value: `${stars}`, label: 'star client satisfaction' },
        ].map((k) => (
          <div
            key={k.label}
            className="flex flex-col items-center px-6 py-4 rounded-xl shadow-lg bg-white/90 backdrop-blur-md border border-emerald-200"
          >
            <span className="kpi-3d text-4xl md:text-5xl font-extrabold text-emerald-600 leading-tight">{k.value}</span>
            <span className="text-xs md:text-sm text-gray-600 font-medium mt-1">{k.label}</span>
          </div>
        ))}
      </motion.div>

      <motion.a
        href="/services"
        className="inline-block bg-emerald-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-emerald-600 transition"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Get Started
      </motion.a>

      <style>{`
        .kpi-3d {
          text-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
          transform: perspective(300px) rotateX(8deg) scale(1.15);
          transition: transform 0.3s cubic-bezier(.4,2,.6,1), text-shadow 0.3s;
          will-change: transform, text-shadow;
        }
        .kpi-3d:hover {
          transform: perspective(300px) rotateX(0deg) scale(1.25) skewY(-2deg);
          text-shadow: 0 4px 16px rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </motion.section>
  );
};

export default Hero;
