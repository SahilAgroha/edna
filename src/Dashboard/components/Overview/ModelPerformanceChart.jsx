import React, { useEffect, useRef, useState } from 'react';

const ModelPerformanceChart = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set high-DPI canvas dimensions
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Enhanced data points with more natural curve
    const dataPoints = [
      { x: 0, y: 140, label: 'Jan' },
      { x: 80, y: 110, label: 'Feb' },
      { x: 160, y: 130, label: 'Mar' },
      { x: 240, y: 95, label: 'Apr' },
      { x: 320, y: 120, label: 'May' },
      { x: 400, y: 85, label: 'Jun' },
      { x: 480, y: 100, label: 'Jul' },
      { x: 560, y: 75, label: 'Aug' }
    ];

    // Modern gradient colors (inspired by 2025 trends)
    const createGradient = (x1, y1, x2, y2, colors) => {
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      colors.forEach(({ offset, color }) => {
        gradient.addColorStop(offset, color);
      });
      return gradient;
    };

    // Glassmorphism-inspired gradients
    const primaryGradient = createGradient(0, 0, 0, 200, [
      { offset: 0, color: 'rgba(139, 92, 246, 0.8)' }, // Violet
      { offset: 0.5, color: 'rgba(236, 72, 153, 0.6)' }, // Pink
      { offset: 1, color: 'rgba(59, 130, 246, 0.4)' } // Blue
    ]);

    const glowGradient = createGradient(0, 0, 0, 200, [
      { offset: 0, color: 'rgba(139, 92, 246, 0.3)' },
      { offset: 1, color: 'rgba(236, 72, 153, 0.1)' }
    ]);

    // Animation variables
    let animationProgress = 0;
    let pulsePhase = 0;
    const animationDuration = 2000; // Smoother 2-second animation
    const startTime = Date.now();

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / animationDuration, 1);
      animationProgress = easeOutCubic(rawProgress);
      pulsePhase += 0.05;

      // Clear with subtle background glow
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Background glow effect
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.globalCompositeOperation = 'source-over';

      // Calculate animated path
      const animatedPoints = dataPoints.map((point, index) => ({
        ...point,
        x: point.x * animationProgress,
        y: point.y + Math.sin(pulsePhase + index * 0.5) * 2 // Subtle wave effect
      }));

      // Draw gradient fill with glassmorphism effect
      ctx.beginPath();
      ctx.moveTo(0, rect.height);
      
      // Smooth Bezier curve through points
      animatedPoints.forEach((point, index) => {
        if (index === 0) {
          ctx.lineTo(point.x, point.y);
        } else {
          const prevPoint = animatedPoints[index - 1];
          const cpx1 = prevPoint.x + (point.x - prevPoint.x) * 0.3;
          const cpy1 = prevPoint.y;
          const cpx2 = prevPoint.x + (point.x - prevPoint.x) * 0.7;
          const cpy2 = point.y;
          ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, point.x, point.y);
        }
      });
      
      ctx.lineTo(rect.width * animationProgress, rect.height);
      ctx.closePath();
      ctx.fillStyle = primaryGradient;
      ctx.fill();

      // Add subtle shadow for depth
      ctx.shadowColor = 'rgba(139, 92, 246, 0.3)';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetY = 5;

      // Draw main line with glow effect
      ctx.beginPath();
      ctx.moveTo(0, animatedPoints[0]?.y || 0);
      animatedPoints.forEach((point, index) => {
        if (index === 0) return;
        const prevPoint = animatedPoints[index - 1];
        const cpx1 = prevPoint.x + (point.x - prevPoint.x) * 0.3;
        const cpy1 = prevPoint.y;
        const cpx2 = prevPoint.x + (point.x - prevPoint.x) * 0.7;
        const cpy2 = point.y;
        ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, point.x, point.y);
      });

      // Glow effect
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 6;
      ctx.stroke();
      
      // Main line
      ctx.strokeStyle = 'rgba(139, 92, 246, 1)';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.shadowColor = 'transparent';

      // Animated data points with modern styling
      animatedPoints.forEach((point, index) => {
        const pointProgress = Math.max(0, Math.min(1, animationProgress * 1.5 - index * 0.1));
        const scale = easeInOutSine(pointProgress);
        const pulseScale = 1 + Math.sin(pulsePhase + index * 0.3) * 0.1;

        if (scale > 0) {
          // Outer glow
          ctx.beginPath();
          ctx.arc(point.x, point.y, 8 * scale * pulseScale, 0, 2 * Math.PI);
          ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
          ctx.fill();

          // Main point
          ctx.beginPath();
          ctx.arc(point.x, point.y, 5 * scale, 0, 2 * Math.PI);
          ctx.fillStyle = 'white';
          ctx.fill();
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, 4 * scale, 0, 2 * Math.PI);
          ctx.fillStyle = 'rgba(139, 92, 246, 1)';
          ctx.fill();
        }
      });

      if (animationProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Continue pulse animation
        requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      // Cleanup handled automatically
    };
  }, [isVisible]);

  return (
    <div 
      ref={containerRef}
      className="relative group"
    >
      {/* Glassmorphism container with modern styling */}
      <div className="relative backdrop-blur-xl bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 rounded-3xl p-8 shadow-2xl border border-white/10 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-pink-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
        
        {/* Header with enhanced typography */}
        <div className="relative flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent mb-2">
              Model Performance Analytics
            </h2>
            <p className="text-slate-400 text-sm font-medium">Real-time accuracy tracking</p>
          </div>
          
          {/* Modern status indicator */}
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-medium uppercase tracking-wide">Live</span>
          </div>
        </div>

        {/* Chart container */}
        <div className="relative h-48 mb-6">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full"
            style={{ width: '100%', height: '100%' }}
          />
          
          {/* Grid overlay for modern look */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        </div>

        {/* Enhanced metrics display */}
        <div className="relative grid grid-cols-3 gap-4">
          {[
            { label: 'Accuracy', value: '95.8%', change: '+2.4%', color: 'green' },
            { label: 'Precision', value: '94.2%', change: '+1.8%', color: 'blue' },
            { label: 'F1 Score', value: '93.7%', change: '+3.1%', color: 'purple' }
          ].map((metric, index) => (
            <div 
              key={metric.label}
              className={`backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <p className="text-slate-400 text-xs uppercase tracking-wide font-medium mb-1">{metric.label}</p>
              <p className="text-white text-lg font-bold mb-1">{metric.value}</p>
              <p className={`text-xs font-medium flex items-center ${
                metric.color === 'green' ? 'text-green-400' : 
                metric.color === 'blue' ? 'text-blue-400' : 'text-purple-400'
              }`}>
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                {metric.change}
              </p>
            </div>
          ))}
        </div>

        {/* Floating performance badge */}
        <div className="absolute -top-4 -right-4 group-hover:scale-105 transition-transform duration-300">
          <div className="backdrop-blur-xl bg-gradient-to-br from-violet-500/90 via-pink-500/80 to-violet-600/90 rounded-2xl px-6 py-4 border border-white/20 shadow-2xl">
            <div className="text-center">
              <p className="text-white/80 text-xs font-medium uppercase tracking-wide mb-1">Overall Score</p>
              <p className="text-white text-2xl font-bold">A+</p>
              <div className="w-8 h-1 bg-white/30 rounded-full mx-auto mt-2">
                <div className="w-full h-full bg-white rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ModelPerformanceChart;
