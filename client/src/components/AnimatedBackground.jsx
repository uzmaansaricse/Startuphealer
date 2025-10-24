// src/components/AnimatedBackground.jsx
import React, { useRef, useEffect } from 'react';
import './Cube3D.css';

const TRAIL_COUNT = 5; // Number of trailing circles
const TRAIL_DISTANCE = 40; // Distance between each trail

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let mouseX = width / 2;
    let mouseY = height / 2;
    let trail = Array.from({ length: TRAIL_COUNT }, () => ({ x: mouseX, y: mouseY }));

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const colors = [
      [255, 0, 102],
      [0, 204, 255],
      [255, 255, 0],
      [0, 255, 128],
      [255, 102, 0],
      [128, 0, 255],
      [0, 255, 255],
    ];

    let colorIndex = 0;
    let lastTime = 0;

    function animate(time) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(17, 24, 39, 0.3)';
      ctx.fillRect(0, 0, width, height);

      if (time - lastTime > 1200) {
        colorIndex = (colorIndex + 1) % colors.length;
        lastTime = time;
      }

      trail[0].x += (mouseX - trail[0].x) * 0.18;
      trail[0].y += (mouseY - trail[0].y) * 0.18;
      for (let i = 1; i < TRAIL_COUNT; i++) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.18;
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.18;
      }

      for (let i = 0; i < TRAIL_COUNT; i++) {
        const t = i / TRAIL_COUNT;
        const [r, g, b] = colors[(colorIndex + i) % colors.length];
        const x = trail[i].x + Math.sin(time / 800 + i) * TRAIL_DISTANCE * t;
        const y = trail[i].y + Math.cos(time / 800 + i) * TRAIL_DISTANCE * t;
        const radius = 180 - i * 25;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(${r},${g},${b},${0.45 - t * 0.18})`);
        gradient.addColorStop(0.7, `rgba(${r},${g},${b},${0.12 - t * 0.08})`);
        gradient.addColorStop(1, 'rgba(17,24,39,0)');

        ctx.save();
        ctx.globalAlpha = 0.95 - t * 0.18;
        ctx.filter = `blur(${10 + i * 6}px)`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.shadowColor = `rgba(${r},${g},${b},0.5)`;
        ctx.shadowBlur = 40 - i * 6;
        ctx.fill();
        ctx.restore();
      }

      requestAnimationFrame(animate);
    }

    animate(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="cube3d-background">
        <div className="cube3d">
          <div className="face front">Startuphealer</div>
          <div className="face back">Startuphealer</div>
          <div className="face right">Startuphealer</div>
          <div className="face left">Startuphealer</div>
          <div className="face top">Startuphealer</div>
          <div className="face bottom">Startuphealer</div>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.8,
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontSize: '24px',
          textAlign: 'center',
          padding: '20px',
          pointerEvents: 'none',
        }}
      >
        <h1>Welcome to Our Services</h1>
        <p>
          We specialize in providing end-to-end business solutions designed to
          help startups and growing companies succeed. From government
          registrations and certifications to branding, funding, and digital
          growth — our services are tailored to give your business the right
          foundation and a competitive edge.
        </p>
        <p>Web Designing Digital Marketing GST ISO 9001 Trademark Funding</p>
        <h2>Meet the Team</h2>
        <p>Lalit Paliwal Founder</p>
        <p>Amit Kumar Co-Founder & Operations</p>
        <p>Priya Singh Startup Consultant</p>
      </div>
    </>
  );
};

export default AnimatedBackground;
