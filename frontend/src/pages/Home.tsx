// src/pages/HomePage.tsx
import React from 'react';
import Hero from '../components/Hero';
import Team from '../components/Team';
import Cube3D from '../components/Cube3D';
import bgimage from '../assets/StartupHealer.png';

const HomePage: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      {/* Light overlay - white with low opacity to keep the light green visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-emerald-50/50 to-white/60 pointer-events-none" />

      {/* Foreground content */}
      <div className="relative pt-16">
        <Hero />

        <section className="py-16 text-center">
          <h2 className="text-5xl font-bold mb-8 text-gray-800">Our Services</h2>
          <div className="flex flex-wrap justify-center gap-4 px-4">
            {[
              'Startup India Certificate',
              'MSME Certificate',
              'GST Registration',
              'ISO 9001-2015 Certification',
              'Trademark & Company Registration',
              'Funding & Investment',
              'Web Designing',
              'Digital Marketing',
            ].map((s) => (
              <div
                key={s}
                className="text-gray-700 bg-white/80 backdrop-blur-sm rounded-lg px-6 py-3 border border-emerald-200 shadow-sm hover:shadow-md transition"
              >
                {s}
              </div>
            ))}
          </div>
        </section>

        <Cube3D />
        <Team />
      </div>
    </div>
  );
};

export default HomePage;
