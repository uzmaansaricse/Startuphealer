import React from 'react';
import './Cube3D.css';

const Cube3D2: React.FC = () => {
  return (
    <div className="cube3d-container">
      <div className="cube3d">
        <div className="face front">Web Designing</div>
        <div className="face back">Digital Marketing</div>
        <div className="face right">Services</div>
        <div className="face left">Services</div>
        <div className="face top">Services</div>
        <div className="face bottom">Services</div>
      </div>
    </div>
  );
};

export default Cube3D2;
