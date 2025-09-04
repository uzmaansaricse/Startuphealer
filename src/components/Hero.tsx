import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  // Animated counters for KPIs
  const [incorp, setIncorp] = useState(0);
  const [trusted, setTrusted] = useState(0);
  const [stars, setStars] = useState(0);
  const [loop, setLoop] = useState(0); // for triggering loop

  useEffect(() => {
    let incorpTarget = 80;
    let trustedTarget = 100;
    let starsTarget = 5;
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

    // After animation, wait 1.5s then reset
    resetTimeout = setTimeout(() => {
      setLoop((l) => l + 1);
    }, 2500);

    return () => {
      clearInterval(incorpInterval);
      clearInterval(trustedInterval);
      clearInterval(starsInterval);
      clearTimeout(resetTimeout);
    };
  }, [loop]);

  return (
    <section id="home" className="min-h-[60vh] flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 pt-24 pb-12 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Helping Seed‑Stage Tech Startups Secure Compliance & Scale</h1>
      <p className="text-lg text-gray-200 mb-4 max-w-2xl mx-auto">We help early-stage tech founders handle legal compliance, incorporation, and growth—so you can focus on building your product.</p>
      {/* KPIs/Outcomes */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-6">
        <div className="flex flex-col items-center bg-gray-800 px-6 py-4 rounded-xl shadow-2xl">
          <span className="kpi-3d text-4xl md:text-5xl font-extrabold text-blue-400 leading-tight">{incorp}%</span>
          <span className="text-xs md:text-sm text-gray-300 font-medium mt-1">faster incorporation process</span>
        </div>
        <div className="flex flex-col items-center bg-gray-800 px-6 py-4 rounded-xl shadow-2xl">
          <span className="kpi-3d text-4xl md:text-5xl font-extrabold text-blue-400 leading-tight">{trusted}+</span>
          <span className="text-xs md:text-sm text-gray-300 font-medium mt-1">startups trusted us</span>
        </div>
        <div className="flex flex-col items-center bg-gray-800 px-6 py-4 rounded-xl shadow-2xl">
          <span className="kpi-3d text-4xl md:text-5xl font-extrabold text-blue-400 leading-tight">{stars}</span>
          <span className="text-xs md:text-sm text-gray-300 font-medium mt-1">star client satisfaction</span>
        </div>
      </div>
      <a href="#contact" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-blue-400 transition">Get Started</a>
      <style>{`
        .kpi-3d {
          text-shadow: 0 4px 16px #2563eb, 0 2px 8px #0008;
          transform: perspective(300px) rotateX(8deg) scale(1.15);
          transition: transform 0.3s cubic-bezier(.4,2,.6,1), text-shadow 0.3s;
          will-change: transform, text-shadow;
        }
        .kpi-3d:hover {
          transform: perspective(300px) rotateX(0deg) scale(1.25) skewY(-2deg);
          text-shadow: 0 8px 32px #2563eb, 0 4px 16px #000a;
        }
      `}</style>
    </section>
  );
};

export default Hero; 