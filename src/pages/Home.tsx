import React from 'react';
import Hero from '../components/Hero';
import Team from '../components/Team';
import Cube3D from '../components/Cube3D';

const HomePage: React.FC = () => {
  return (
    <div className="pt-16">
      <Hero />
      <section className="py-16 bg-gray-900 text-center">
        <h2 className="text-5xl font-bold mb-8 text-white">Our Services</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="text-white">Startup India Certificate</div>
          <div className="text-white">MSME Certificate</div>
          <div className="text-white">GST Registration</div>
          <div className="text-white">ISO 9001-2015 Certification</div>
          <div className="text-white">Trademark & Company Registration</div>
          <div className="text-white">Funding & Investment</div>
          <div className="text-white">Web Designing</div>
          <div className="text-white">Digital Marketing</div>
        </div>
      </section>
      <Cube3D />
      <Team />
    </div>
  );
};

export default HomePage;
