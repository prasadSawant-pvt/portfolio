"use client";
import React, { useRef, useEffect } from "react";

// Simple animated snake/curve lines background using Canvas
export default function SnakeLinesBackground({ className = "", style = {}, children }: { className?: string; style?: React.CSSProperties; children?: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (typeof window === 'undefined') return; // SSR guard
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx?.setTransform(1,0,0,1,0,0);
      ctx?.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);


    // Detect theme
    function getLineColor() {
      if (document.documentElement.classList.contains('dark')) {
        return 'rgba(180,180,255,0.09)'; // light lines for dark mode
      } else {
        return 'rgba(30,30,60,0.13)'; // dark lines for light mode
      }
    }
    let currentColor = getLineColor();
    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const newColor = getLineColor();
      if (newColor !== currentColor) {
        currentColor = newColor;
        lines.forEach(line => (line.color = currentColor));
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Snake lines state
    const lines = Array.from({ length: 10 }).map((_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      phase: Math.random() * Math.PI * 2,
      speed: 0.7 + Math.random() * 0.8,
      color: currentColor
    }));

    function draw() {
      ctx?.clearRect(0, 0, width, height);
      for (let l = 0; l < lines.length; l++) {
        let line = lines[l];
        ctx!.beginPath();
        let prevX = line.x;
        let prevY = line.y;
        ctx!.moveTo(prevX, prevY);
        for (let t = 0; t < 60; t++) {
          let angle = line.phase + t * 0.15;
          let dx = Math.cos(angle) * 15;
          let dy = Math.sin(angle) * 8;
          prevX += dx;
          prevY += dy;
          ctx!.lineTo(prevX, prevY);
        }
        ctx!.strokeStyle = line.color;
        ctx!.lineWidth = 3;
        ctx!.globalAlpha = 0.45;
        ctx!.shadowColor = line.color;
        ctx!.shadowBlur = 7;
        ctx!.stroke();
        ctx!.globalAlpha = 1;
        ctx!.shadowBlur = 0;
        // Animate
        line.phase += 0.012 * line.speed;
        line.x += 0.1 * line.speed;
        if (line.x > width + 80) line.x = -80;
      }
      animationRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={"fixed inset-0 -z-10 pointer-events-none w-screen h-screen " + className} style={{...style, zIndex: -10}}>
      <canvas ref={canvasRef} className="w-full h-full block" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}} />
      {children}
    </div>
  );
}
