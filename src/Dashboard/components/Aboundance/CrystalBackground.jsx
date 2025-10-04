import React, { useRef, useEffect } from 'react';

const CrystalBackground = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

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

        const shapes = [];
        const numShapes = 20;

        // Generate a random color from a dark theme
        const getRandomColor = () => {
            const colors = ['#22d3ee', '#4ade80', '#c084fc', '#f87171', '#fbbf24'];
            return colors[Math.floor(Math.random() * colors.length)];
        };

        const createShapes = () => {
            for (let i = 0; i < numShapes; i++) {
                shapes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.2,
                    vy: (Math.random() - 0.5) * 0.2,
                    radius: Math.random() * 50 + 20,
                    color: getRandomColor(),
                    rotation: Math.random() * 360,
                    sides: Math.floor(Math.random() * 4) + 3, // 3 to 6 sides
                });
            }
        };

        const drawShape = (shape) => {
            ctx.save();
            ctx.translate(shape.x, shape.y);
            ctx.rotate(shape.rotation * Math.PI / 180);
            
            ctx.beginPath();
            ctx.moveTo(shape.radius, 0);
            for (let i = 1; i <= shape.sides; i++) {
                ctx.lineTo(shape.radius * Math.cos(i * 2 * Math.PI / shape.sides), 
                           shape.radius * Math.sin(i * 2 * Math.PI / shape.sides));
            }
            
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, shape.radius);
            gradient.addColorStop(0, `${shape.color}40`);
            gradient.addColorStop(1, `${shape.color}00`);
            
            ctx.fillStyle = gradient;
            ctx.fill();

            ctx.restore();
        };

        const animate = (timestamp) => {
            const deltaTime = timestamp - lastTime;
            lastTime = timestamp;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'lighter';

            shapes.forEach(shape => {
                shape.x += shape.vx;
                shape.y += shape.vy;
                shape.rotation += 0.05;

                if (shape.x > canvas.width + shape.radius) shape.x = -shape.radius;
                if (shape.x < -shape.radius) shape.x = canvas.width + shape.radius;
                if (shape.y > canvas.height + shape.radius) shape.y = -shape.radius;
                if (shape.y < -shape.radius) shape.y = canvas.height + shape.radius;

                drawShape(shape);
            });
            
            animationId = requestAnimationFrame(animate);
        };
        
        createShapes();
        animate(0);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />;
};

export default CrystalBackground;