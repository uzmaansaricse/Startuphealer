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
  <div className="w-full bg-gray-900 py-6 overflow-hidden">
    <div className="flex items-center animate-scroll-x gap-12 min-w-max">
      {logos.map((logo, idx) => (
        <img
          key={idx}
          src={logo.src}
          alt={logo.alt}
          className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition"
        />
      ))}
    </div>
    <style>{`
      @keyframes scroll-x {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-scroll-x {
        animation: scroll-x 10s linear infinite;
      }
    `}</style>
  </div>
);

export default ClientLogos;
