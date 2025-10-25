// src/components/ClientLogos.jsx
import React from 'react';


const logos = [
  { src: '/logo192.png', alt: 'Client 1' },
  { src: '/logo512.png', alt: 'Client 2' },
  { src: '/logo192.png', alt: 'Client 3' },
  { src: '/logo512.png', alt: 'Client 4' },
  { src: '/logo192.png', alt: 'Client 5' },
  { src: '/logo512.png', alt: 'Client 6' },
  { src: '/logo192.png', alt: 'Client 7' },
  { src: '/logo512.png', alt: 'Client 8' },
  { src: '/logo192.png', alt: 'Client 9' },
  { src: '/logo512.png', alt: 'Client 10' },
  { src: '/logo192.png', alt: 'Client 11' },
  { src: '/logo512.png', alt: 'Client 12' },
  { src: '/logo192.png', alt: 'Client 13' },
  { src: '/logo512.png', alt: 'Client 14' },
  { src: '/logo192.png', alt: 'Client 15' },
  { src: '/logo512.png', alt: 'Client 16' },
  { src: '/logo192.png', alt: 'Client 17' },
  { src: '/logo512.png', alt: 'Client 18' },
  { src: '/logo192.png', alt: 'Client 19' },
  { src: '/logo512.png', alt: 'Client 20' },
];


const ClientLogos = () => (
  <div className="w-full bg-gradient-to-r from-cyan-600 via-emerald-600 to-green-600 py-8 overflow-hidden relative">
    {/* Decorative overlay */}
    <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
    
    {/* Section Title */}
    <div className="text-center mb-6 relative z-10">
      <h3 className="text-2xl font-bold text-white mb-2">Trusted By Leading Startups</h3>
      <div className="w-16 h-1 bg-white/80 mx-auto rounded-full"></div>
    </div>

    {/* Scrolling logos */}
    <div className="flex items-center animate-scroll-x gap-12 min-w-max relative z-10">
      {/* Duplicate logos for seamless loop */}
      {[...logos, ...logos].map((logo, idx) => (
        <div
          key={idx}
          className="h-16 w-20 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
        >
          <img
            src={logo.src}
            alt={logo.alt}
            className="h-full w-full object-contain opacity-90 hover:opacity-100 transition"
          />
        </div>
      ))}
    </div>

    <style>{`
      @keyframes scroll-x {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-scroll-x {
        animation: scroll-x 30s linear infinite;
      }
      .animate-scroll-x:hover {
        animation-play-state: paused;
      }
    `}</style>
  </div>
);


export default ClientLogos;
