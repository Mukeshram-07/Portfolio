import { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const activeRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    const PC = 45;

    const onVis = () => { activeRef.current = document.visibilityState === 'visible'; };
    document.addEventListener('visibilitychange', onVis);

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function init() {
      particles = Array.from({ length: PC }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.2 + 0.05,
      }));
    }

    function draw() {
      if (!activeRef.current) { animRef.current = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, W, H);

      const blobs = [
        { x: W * 0.15, y: H * 0.25, r: Math.min(W, H) * 0.45, c: 'rgba(96,165,250,0.035)' },
        { x: W * 0.85, y: H * 0.65, r: Math.min(W, H) * 0.5, c: 'rgba(167,139,250,0.028)' },
        { x: W * 0.5, y: H * 0.1, r: Math.min(W, H) * 0.35, c: 'rgba(103,232,249,0.02)' },
      ];
      blobs.forEach((b) => {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, b.c);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      for (let i = 0; i < 5; i++) {
        const x = (W / 6) * (i + 1);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.strokeStyle = 'rgba(96,165,250,0.015)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const { x: mx, y: my } = mouseRef.current;
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96,165,250,${p.alpha})`;
        ctx.fill();

        const dx = p.x - mx;
        const dy = p.y - my;
        const md = Math.sqrt(dx * dx + dy * dy);
        if (md < 120) {
          p.vx += (dx / md) * 0.04;
          p.vy += (dy / md) * 0.04;
        }
        p.vx *= 0.994;
        p.vy *= 0.994;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });

      if (mx > 0 && my > 0) {
        const glow = ctx.createRadialGradient(mx, my, 0, mx, my, 180);
        glow.addColorStop(0, 'rgba(96,165,250,0.04)');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, H);
      }

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    const onResize = () => resize();
    const onMouse = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('mousemove', onMouse, { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
