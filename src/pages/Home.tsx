import React from 'react';
import Hero from '../components/Hero';
import Team from '../components/Team';
import Cube3D from '../components/Cube3D';

const HomePage: React.FC = () => {
  return (
    <div className="pt-16">
      <Hero />
      <Team />
      <Cube3D />
    </div>
  );
};

export default HomePage;
