import { useEffect, useRef } from 'react';

export default function PacmanChaseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Pacman state
    const pacman = {
      x: 50,
      y: canvas.height / 2,
      radius: 20,
      angle: 0,
      speed: 2.5,
      color: 'yellow',
      vx: 2.5, // ← Add this
      vy: 1.8  // ← And this
    };
    

    // Particle and fading skull types
    type Particle = { x: number; y: number; dx: number; dy: number; alpha: number };
    type FadingSkull = { x: number; y: number; alpha: number; particles: Particle[] };

    // Ghosts state
    const ghosts = Array.from({ length: 3 }, () => ({
      x: 100 + Math.random() * canvas.width,
      y: 100 + Math.random() * canvas.height,
      radius: 18,
      speed: 1.5,
      color: '#6ec6ff',
      alive: true,
      particles: [] as Particle[],
    }));
    let fadingSkulls: FadingSkull[] = [];

    function drawPacman() {
      ctx.save();
      ctx.translate(pacman.x, pacman.y);
      // Rotate Pacman in direction of movement
      const moveAngle = Math.atan2(pacman.vy ?? 0, pacman.vx ?? pacman.speed);
      ctx.rotate(moveAngle);
      const angleOffset = Math.abs(Math.sin(pacman.angle)) * Math.PI / 4;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, pacman.radius, angleOffset, 2 * Math.PI - angleOffset);
      ctx.closePath();
      ctx.fillStyle = pacman.color;
      ctx.fill();
      ctx.restore();
    }

    function drawGhost(ghost: typeof ghosts[number]) {
      if (!ghost.alive) return;
      ctx.beginPath();
      ctx.arc(ghost.x, ghost.y, ghost.radius, 0, 2 * Math.PI);
      ctx.fillStyle = ghost.color;
      ctx.fill();
    }

    function drawSkull(x: number, y: number, alpha: number = 1) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(x, y);
      // Skull base
      ctx.beginPath();
      ctx.arc(0, 0, 11, 0, Math.PI * 2);
      ctx.fillStyle = '#6ec6ff';
      ctx.fill();
      // Jaw
      ctx.beginPath();
      ctx.ellipse(0, 8, 8, 5, 0, 0, Math.PI);
      ctx.fillStyle = '#6ec6ff';
      ctx.fill();
      // Eyes
      ctx.beginPath();
      ctx.arc(-4, -3, 2, 0, Math.PI * 2);
      ctx.arc(4, -3, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#222';
      ctx.fill();
      // Nose
      ctx.beginPath();
      ctx.arc(0, 2, 1.2, 0, Math.PI);
      ctx.fillStyle = '#222';
      ctx.fill();
      // Mouth (three dots)
      ctx.beginPath();
      ctx.arc(-2.5, 7, 0.6, 0, Math.PI * 2);
      ctx.arc(0, 8, 0.6, 0, Math.PI * 2);
      ctx.arc(2.5, 7, 0.6, 0, Math.PI * 2);
      ctx.fillStyle = '#222';
      ctx.fill();
      ctx.restore();
    }

    function drawParticles(particles: Particle[]) {
      for (const p of particles) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = '#6ec6ff';
        ctx.fill();
        ctx.restore();
      }
    }

    function spawnGhost(idx: number) {
      ghosts[idx] = {
        x: 100 + Math.random() * canvas.width,
        y: 100 + Math.random() * canvas.height,
        radius: 18,
        speed: 1.5,
        color: '#6ec6ff',
        alive: true,
        particles: [],
      };
    }

    function updatePositions() {
      // --- Pacman movement: dynamic, bounces off all walls, moves diagonally ---
      if (pacman.vx === undefined) pacman.vx = 2.5 * (Math.random() > 0.5 ? 1 : -1);
      if (pacman.vy === undefined) pacman.vy = 1.8 * (Math.random() > 0.5 ? 1 : -1);
      pacman.x += pacman.vx;
      pacman.y += pacman.vy;
      pacman.angle += 0.1;
      // Bounce off left/right
      if (pacman.x < pacman.radius) {
        pacman.x = pacman.radius;
        pacman.vx *= -1;
      }
      if (pacman.x > canvas.width - pacman.radius) {
        pacman.x = canvas.width - pacman.radius;
        pacman.vx *= -1;
      }
      // Bounce off top/bottom
      if (pacman.y < pacman.radius) {
        pacman.y = pacman.radius;
        pacman.vy *= -1;
      }
      if (pacman.y > canvas.height - pacman.radius) {
        pacman.y = canvas.height - pacman.radius;
        pacman.vy *= -1;
      }

      // --- Ghosts chase Pacman diagonally ---
      ghosts.forEach((ghost, idx) => {
        if (!ghost.alive) return;
        // Calculate direction vector towards Pacman
        const dx = pacman.x - ghost.x;
        const dy = pacman.y - ghost.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0.1) {
          ghost.x += (dx / dist) * ghost.speed;
          ghost.y += (dy / dist) * ghost.speed;
        }

        // Collision detection
        const dist2 = Math.sqrt((ghost.x - pacman.x) ** 2 + (ghost.y - pacman.y) ** 2);
        if (dist2 < ghost.radius + pacman.radius) {
          // Explode into particles and skull
          ghost.alive = false;
          ghost.particles = [];
          for (let i = 0; i < 18; i++) {
            const angle = (i / 18) * 2 * Math.PI;
            ghost.particles.push({
              x: ghost.x,
              y: ghost.y,
              dx: Math.cos(angle) * (2 + Math.random() * 2),
              dy: Math.sin(angle) * (2 + Math.random() * 2),
              alpha: 1,
            });
          }
          fadingSkulls.push({
            x: ghost.x,
            y: ghost.y,
            alpha: 1,
            particles: [...ghost.particles],
          });
        }
      });

      // Update fading skulls and respawn ghosts
      for (let i = fadingSkulls.length - 1; i >= 0; i--) {
        const skull = fadingSkulls[i];
        let maxAlpha = 0;
        for (const p of skull.particles) {
          p.x += p.dx;
          p.y += p.dy;
          p.alpha -= 0.025;
          if (p.alpha > maxAlpha) maxAlpha = p.alpha;
        }
        skull.particles = skull.particles.filter(p => p.alpha > 0);
        skull.alpha -= 0.025;
        if (skull.alpha <= 0 || skull.particles.length === 0) {
          // Respawn a ghost at this position
          const idx = ghosts.findIndex(g => !g.alive);
          if (idx !== -1) spawnGhost(idx);
          fadingSkulls.splice(i, 1);
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updatePositions();
      drawPacman();
      ghosts.forEach(drawGhost);
      // Draw particles and skulls for dead ghosts
      for (const skull of fadingSkulls) {
        drawParticles(skull.particles);
        drawSkull(skull.x, skull.y, Math.max(0, skull.alpha));
      }
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      id="pacman-bg"
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
