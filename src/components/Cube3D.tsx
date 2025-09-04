import React from 'react';
import './Cube3D.css';

const Cube3D: React.FC = () => {
  return (
    <div className="cube3d-container">
      <div className="cube3d">
        <div className="face front">Startuphealer</div>
        <div className="face back">Startuphealer</div>
        <div className="face right">Startuphealer</div>
        <div className="face left">Startuphealer</div>
        <div className="face top">Startuphealer</div>
        <div className="face bottom">Startuphealer</div>
      </div>
    </div>
  );
};

export default Cube3D; 