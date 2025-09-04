import React from 'react';
import Hero from '../components/Hero';
import Team from '../components/Team';
import Cube3D from '../components/Cube3D';

const HomePage: React.FC = () => {
  return (
    <div className="pt-16">
      <Hero />
     <section className="py-16 bg-gray-900 text-center">
  <h2 className="text-3xl font-bold mb-6 text-white">
    Welcome to <span className="text-blue-400">Our Services</span>
  </h2>
  <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-10">
    We specialize in providing end-to-end business solutions designed to help startups and 
    growing companies succeed. From government registrations and certifications to 
    branding, funding, and digital growth — our services are tailored to give your 
    business the right foundation and a competitive edge.
  </p>




      <Cube3D /></section>
      <Team />
    </div>
  );
};

export default HomePage;
