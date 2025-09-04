import React from 'react';
import './Cube3D.css';

const Cube3D: React.FC = () => {
  return (
    <div className="cube3d-container">
      <div className="cube3d">
        <div className="face front">Startup India</div>
        <div className="face back">MSME</div>
        <div className="face right">GST</div>
        <div className="face left">ISO 9001</div>
        <div className="face top">Trademark</div>
        <div className="face bottom">Funding</div>
      </div>
    </div>
  );
};

export default Cube3D; 