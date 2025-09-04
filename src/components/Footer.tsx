import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-2 font-bold text-lg">Startup Healer</div>
        <div className="mb-2 text-gray-300 text-sm">
          <span className="block">Address: P NO 8, near VPM Classes, B yojna, Radha kunj, Mansarovar, Jaipur, Rajasthan 302020</span>
          <span className="block">Mobile: <a href="tel:8502996638" className="text-blue-400 hover:underline">8502996638</a></span>
          <span className="block">Email: <a href="mailto:sales@startuphealer.com" className="text-blue-400 hover:underline">sales@startuphealer.com</a></span>
        </div>
        <div className="mb-2">&copy; {new Date().getFullYear()} All rights reserved.</div>
        <div className="text-gray-400 text-sm">Empowering Startups with Simplified Legal Services</div>
      </div>
    </footer>
  );
};

export default Footer; 