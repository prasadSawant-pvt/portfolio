"use client";
import React, { useRef, useEffect } from "react";

// Modern animated background: floating, glowing, blurred color blobs (bokeh style)
export default function VisibleLiveBackground({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (typeof window === 'undefined') return;
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

    // Color palette for light/dark mode
    function getPalette() {
      if (document.documentElement.classList.contains('dark')) {
        return [
          'rgba(80,120,255,0.25)',
          'rgba(255,180,255,0.18)',
          'rgba(60,255,200,0.18)',
          'rgba(255,120,120,0.16)'
        ];
      } else {
        return [
          'rgba(80,120,255,0.17)',
          'rgba(255,180,255,0.13)',
          'rgba(60,255,200,0.13)',
          'rgba(255,120,120,0.11)'
        ];
      }
    }
    let palette = getPalette();
    const observer = new MutationObserver(() => {
      palette = getPalette();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Bokeh blobs
    const blobs = Array.from({ length: 8 }).map((_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 90 + Math.random() * 90,
      dx: (Math.random() - 0.5) * 0.7,
      dy: (Math.random() - 0.5) * 0.7,
      c: i % palette.length
    }));

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];
        ctx!.beginPath();
        ctx!.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx!.fillStyle = palette[b.c];
        ctx!.filter = 'blur(16px)';
        ctx!.fill();
        ctx!.filter = 'none';
        // Move
        b.x += b.dx;
        b.y += b.dy;
        if (b.x < -b.r) b.x = width + b.r;
        if (b.x > width + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = height + b.r;
        if (b.y > height + b.r) b.y = -b.r;
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
    </div>
  );
}
