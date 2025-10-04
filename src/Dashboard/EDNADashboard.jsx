import React, { useState, useEffect, useRef } from 'react';
import EDNADrawerList from './EDNADrawerList';
import EDNARoutes from '../Routes/EDNARoutes';
import Navbar from './Navbar';

// Animated Particles Background Component
const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles = [];
      const numParticles = 150;
      
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          pulse: Math.random() * 0.02 + 0.01
        });
      }
      return particles;
    };

    const createConnections = () => {
      const connections = [];
      const numConnections = 20;
      
      for (let i = 0; i < numConnections; i++) {
        connections.push({
          startX: Math.random() * canvas.width,
          startY: Math.random() * canvas.height,
          endX: Math.random() * canvas.width,
          endY: Math.random() * canvas.height,
          opacity: Math.random() * 0.3 + 0.1,
          animProgress: Math.random()
        });
      }
      return connections;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particlesRef.current.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.opacity += Math.sin(Date.now() * particle.pulse) * 0.01;
        
        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 200, 255, ${Math.abs(particle.opacity)})`;
        ctx.fill();
      });
      
      // Draw connecting lines
      const connectDistance = 120;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectDistance) {
            const opacity = (1 - distance / connectDistance) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    particlesRef.current = createParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      particlesRef.current = createParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at center, #1a2332 0%, #0f1419 70%, #000000 100%)',
      }}
    />
  );
};

const EDNADashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    // setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Navbar */}
      <div className='absolute top-0 left-0 right-0'>
        <Navbar/>
      </div>
      <div className='py-10'></div>

      {/* Main Dashboard Content */}
      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <div className={`${isDrawerOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden lg:block relative z-20`}>
          <EDNADrawerList toggleDrawer={toggleDrawer} />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto relative">
          {/* Header */}
          
          
          {/* Dashboard Content */}
          <div className="p-6 lg:p-8">
            <EDNARoutes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EDNADashboard;
