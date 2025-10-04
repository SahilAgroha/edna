import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, LinearProgress } from '@mui/material';
import { CloudUpload as CloudUploadIcon, CheckCircleOutline, HourglassEmpty } from '@mui/icons-material';
import DashboardCard from '../TaxaExplorer/DashboardCard';

// This is a dummy component to simulate a 30-minute processing task
const ProcessingAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let lastTime = 0;
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    const particles = [];
    const numParticles = 80;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    particlesRef.current = particles;
    const animate = (timestamp) => {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      particlesRef.current.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${particle.opacity})`;
        ctx.fill();
      });
      const connectDistance = 100;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < connectDistance) {
            const opacity = (1 - distance / connectDistance) * 0.1;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(animate);
    };
    animate(0);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0 opacity-80 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const fileInputRef = useRef(null);
  const processingIntervalRef = useRef(null);
  const timerIntervalRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/json') {
      setFile(selectedFile);
      setError(null);
      setSuccess(false);
      setProgress(0);
    } else {
      setFile(null);
      setError('Please select a valid JSON file.');
    }
  };

  const handleFileUpload = () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    setProcessing(true);
    setProgress(0);
    setSuccess(false);
    setElapsedTime(0);

    const totalTime = 30 * 60 * 1000; // 30 minutes in milliseconds
    const intervalTime = 1000; // 1 second
    let step = 0;

    // Start a timer to update elapsed time
    timerIntervalRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
    }, 1000);

    // Simulate progress
    processingIntervalRef.current = setInterval(() => {
      step++;
      const newProgress = Math.min(Math.round((step / (totalTime / intervalTime)) * 100), 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(processingIntervalRef.current);
        clearInterval(timerIntervalRef.current);
        setProcessing(false);
        setSuccess(true);
        setFile(null);
      }
    }, intervalTime);
  };

  useEffect(() => {
    return () => {
      if (processingIntervalRef.current) {
        clearInterval(processingIntervalRef.current);
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s]
      .map(v => v.toString().padStart(2, '0'))
      .join(':');
  };

  return (
    <div className="p-8 min-h-screen bg-gray-900 text-gray-100 relative">
      {processing && <ProcessingAnimation />}

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-400 text-transparent bg-gradient-to-r from-white to-cyan-200 bg-clip-text animate-pulse-light">
          Upload Analysis File
        </h1>
        
        <DashboardCard className="p-10 text-center relative overflow-hidden w-full max-w-2xl">
          <div className="flex flex-col items-center justify-center space-y-20">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              style={{ display: 'none' }}
              disabled={processing}
            />
            
            <Button
              variant="outlined"
              onClick={() => fileInputRef.current.click()}
              startIcon={<CloudUploadIcon />}
              disabled={processing}
              sx={{
                color: '#22d3ee',
                borderColor: '#22d3ee',
                '&:hover': {
                  bgcolor: 'rgba(34, 211, 238, 0.1)',
                  borderColor: '#22d3ee',
                },
                minWidth: '250px'
              }}
            >
              {file ? `File Selected: ${file.name}` : 'Select JSON File'}
            </Button>

            {error && (
              <Typography color="error" className="mt-2">
                {error}
              </Typography>
            )}

            {processing && (
              <Box className="w-full mt-4 flex flex-col items-center">
                <Typography variant="body1" className="text-gray-300 mb-2 flex items-center justify-center">
                  <HourglassEmpty sx={{ mr: 1, color: 'cyan.300' }} />
                  Processing... ({progress}%)
                </Typography>
                <Typography variant="h5" className="font-mono text-cyan-300 mb-4">
                    {formatTime(elapsedTime)}
                </Typography>
                <Box className="w-full" sx={{ position: 'relative' }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={progress} 
                      sx={{ 
                        height: 10, 
                        borderRadius: 5, 
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: '#22d3ee',
                          transition: 'transform 0.1s linear',
                        }
                      }}
                    />
                    <div className="absolute inset-0 rounded-full animate-progress-glow" style={{ 
                        background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)',
                        opacity: '0.6',
                        transform: `translateX(${progress}%)`,
                        width: '10%',
                        left: '0',
                    }} />
                </Box>
              </Box>
            )}

            {success && (
              <Box className="w-full mt-4 flex flex-col items-center">
                <CheckCircleOutline sx={{ fontSize: 60, color: 'green.400', animation: 'scale-in 0.5s ease-out' }} />
                <Typography variant="h6" className="text-green-400 mt-2">
                  Processing Complete!
                </Typography>
                <Typography variant="body1" className="text-gray-300 mt-1">
                  Your analysis is now available on the dashboard.
                </Typography>
              </Box>
            )}

            {!processing && !success && file && (
              <Button
                variant="contained"
                onClick={handleFileUpload}
                sx={{
                  bgcolor: '#4ade80',
                  '&:hover': { bgcolor: '#22c55e' },
                  color: '#fff',
                  fontWeight: 'bold',
                  mt: 2,
                  minWidth: '200px'
                }}
              >
                Start Analysis
              </Button>
            )}
          </div>
        </DashboardCard>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes progress-glow {
            0%, 100% { box-shadow: 0 0 10px #22d3ee; }
            50% { box-shadow: 0 0 20px #22d3ee; }
        }
        .animate-progress-glow {
            animation: progress-glow 2s infinite ease-in-out;
        }
        @keyframes pulse-light {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        .animate-pulse-light {
          animation: pulse-light 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default UploadFile;
