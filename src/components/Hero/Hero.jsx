import { useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { FileText, BookOpen, ArrowRight } from 'lucide-react';
import styles from './Hero.module.css';
import { PERSON } from '../../data/portfolioData';

/* ─────────────────────────────────────────────────────────
   AURORA CANVAS
   Full-screen abstract neural / aurora background.
   Canvas handles: nodes, connections, data pulses,
   light streaks, aurora glow — all at ~10% intensity.
   ───────────────────────────────────────────────────────── */
function AuroraCanvas({ mouseX, mouseY }) {
  const canvasRef  = useRef(null);
  const rafRef     = useRef(null);
  const activeRef  = useRef(true);
  const dataRef    = useRef({ nodes: [], pulses: [], streaks: [] });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    /* pause on hidden tab */
    const onVis = () => { activeRef.current = document.visibilityState === 'visible'; };
    document.addEventListener('visibilitychange', onVis);

    let W = 0, H = 0;

    /* ── Resize ── */
    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      init();
    }

    /* ── Init scene ── */
    function init() {
      const count = Math.min(42, Math.max(18, Math.floor((W * H) / 14000)));

      /* Nodes */
      dataRef.current.nodes = Array.from({ length: count }, () => ({
        x:   W * 0.08 + Math.random() * W * 0.84,
        y:   H * 0.08 + Math.random() * H * 0.84,
        vx:  (Math.random() - 0.5) * 0.18,
        vy:  (Math.random() - 0.5) * 0.18,
        r:   Math.random() * 1.6 + 0.8,
        phase:      Math.random() * Math.PI * 2,
        phaseSpeed: 0.008 + Math.random() * 0.012,
        hue: [240, 260, 280, 190][Math.floor(Math.random() * 4)], // indigo/purple/cyan
      }));

      /* Data pulses along edges */
      dataRef.current.pulses = [];

      /* Light streaks */
      dataRef.current.streaks = Array.from({ length: 3 }, () => makeStreak(W, H));
    }

    function makeStreak(W, H) {
      const startX = Math.random() * W;
      const startY = Math.random() * H;
      const angle  = (Math.random() * 60 - 30) * (Math.PI / 180); // mostly horizontal
      return {
        x: startX, y: startY,
        vx: (Math.cos(angle)) * (0.8 + Math.random() * 0.6),
        vy: (Math.sin(angle)) * (0.3 + Math.random() * 0.3),
        life: 0, maxLife: 180 + Math.random() * 120,
        len: 60 + Math.random() * 100,
        hue: Math.random() > 0.5 ? 240 : 260,
      };
    }

    const CONN_DIST = Math.min(W, 420) * 0.32;

    /* ── Main draw loop ── */
    let frame = 0;
    function draw() {
      if (!activeRef.current) { rafRef.current = requestAnimationFrame(draw); return; }
      frame++;

      ctx.clearRect(0, 0, W, H);

      /* ── Aurora glow behind center ── */
      const au1 = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, W * 0.45);
      au1.addColorStop(0,   'rgba(99,102,241,0.06)');
      au1.addColorStop(0.5, 'rgba(139,92,246,0.03)');
      au1.addColorStop(1,   'transparent');
      ctx.fillStyle = au1;
      ctx.fillRect(0, 0, W, H);

      const au2 = ctx.createRadialGradient(W * 0.3, H * 0.6, 0, W * 0.3, H * 0.6, W * 0.35);
      au2.addColorStop(0,   'rgba(34,211,238,0.04)');
      au2.addColorStop(1,   'transparent');
      ctx.fillStyle = au2;
      ctx.fillRect(0, 0, W, H);

      const nodes = dataRef.current.nodes;
      const mx = mouseX.get() * W;
      const my = mouseY.get() * H;

      /* ── Connections + spawn pulses ── */
      if (frame % 90 === 0 && dataRef.current.pulses.length < 18) {
        /* pick two connected nodes and spawn a pulse */
        for (let attempt = 0; attempt < 8; attempt++) {
          const i = Math.floor(Math.random() * nodes.length);
          const j = Math.floor(Math.random() * nodes.length);
          if (i === j) continue;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (Math.sqrt(dx * dx + dy * dy) < CONN_DIST) {
            dataRef.current.pulses.push({ i, j, t: 0, speed: 0.004 + Math.random() * 0.005 });
            break;
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x;
          const dy   = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > CONN_DIST) continue;

          const alpha = (1 - dist / CONN_DIST) * 0.1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(99,102,241,${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      /* ── Data pulses ── */
      dataRef.current.pulses = dataRef.current.pulses.filter(p => {
        p.t += p.speed;
        if (p.t >= 1) return false;
        const a = nodes[p.i], b = nodes[p.j];
        if (!a || !b) return false;
        const px = a.x + (b.x - a.x) * p.t;
        const py = a.y + (b.y - a.y) * p.t;
        const fade = Math.min(p.t * 5, 1) * Math.min((1 - p.t) * 5, 1);
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${(fade * 0.65).toFixed(3)})`;
        ctx.fill();
        /* tail */
        const tail = 5;
        for (let k = 1; k <= tail; k++) {
          const tp  = Math.max(0, p.t - k * p.speed * 2.5);
          const tpx = a.x + (b.x - a.x) * tp;
          const tpy = a.y + (b.y - a.y) * tp;
          ctx.beginPath();
          ctx.arc(tpx, tpy, 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(167,139,250,${(fade * (1 - k / tail) * 0.3).toFixed(3)})`;
          ctx.fill();
        }
        return true;
      });

      /* ── Nodes ── */
      nodes.forEach(n => {
        n.phase += n.phaseSpeed;
        const pAlpha = 0.35 + Math.sin(n.phase) * 0.2;
        const pr     = n.r  * (1 + Math.sin(n.phase) * 0.2);

        /* subtle outer ring */
        ctx.beginPath();
        ctx.arc(n.x, n.y, pr * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue},75%,65%,0.03)`;
        ctx.fill();

        /* core */
        ctx.beginPath();
        ctx.arc(n.x, n.y, pr, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue},75%,72%,${pAlpha.toFixed(2)})`;
        ctx.fill();

        /* very subtle cursor pull */
        const dx = mx - n.x, dy = my - n.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 200 && d > 0) {
          n.vx += (dx / d) * 0.006;
          n.vy += (dy / d) * 0.006;
        }

        n.vx *= 0.994;
        n.vy *= 0.994;
        n.x  += n.vx;
        n.y  += n.vy;

        /* soft boundary bounce */
        const margin = 60;
        if (n.x < margin)     n.vx += 0.04;
        if (n.x > W - margin) n.vx -= 0.04;
        if (n.y < margin)     n.vy += 0.04;
        if (n.y > H - margin) n.vy -= 0.04;
      });

      /* ── Cursor micro-glow ── */
      if (mx > 0 && my > 0) {
        const cg = ctx.createRadialGradient(mx, my, 0, mx, my, 120);
        cg.addColorStop(0,   'rgba(99,102,241,0.04)');
        cg.addColorStop(1,   'transparent');
        ctx.fillStyle = cg;
        ctx.fillRect(0, 0, W, H);
      }

      /* ── Light streaks ── */
      dataRef.current.streaks.forEach((s, idx) => {
        s.life++;
        s.x += s.vx;
        s.y += s.vy;

        const prog  = s.life / s.maxLife;
        const fade  = Math.sin(prog * Math.PI);
        const alpha = fade * 0.12;

        /* gradient line */
        const ex = s.x - s.vx * (s.len / Math.sqrt(s.vx * s.vx + s.vy * s.vy));
        const ey = s.y - s.vy * (s.len / Math.sqrt(s.vx * s.vx + s.vy * s.vy));
        const grad = ctx.createLinearGradient(ex, ey, s.x, s.y);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(1, `hsla(${s.hue},80%,70%,${alpha.toFixed(3)})`);
        ctx.beginPath();
        ctx.moveTo(ex, ey);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        if (s.life >= s.maxLife) {
          dataRef.current.streaks[idx] = makeStreak(W, H);
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [mouseX, mouseY]);

  return <canvas ref={canvasRef} className={styles.auroraCanvas} aria-hidden="true" />;
}

/* ─────────────────────────────────────────────────────────
   HERO
   ───────────────────────────────────────────────────────── */
const HEADLINE =
  'Building production-ready AI systems using Machine Learning, LLMs, RAG, AI Agents, and Data Engineering. Passionate about solving real-world problems through logical thinking and scalable AI.';

const GitHubSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const LinkedInSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const ACTIONS = [
  { label: 'Resume',   href: PERSON.resume,   variant: 'primary',  Icon: () => <FileText  size={15} style={{ flexShrink: 0 }} aria-hidden="true" />, showArrow: true },
  { label: 'GitHub',   href: PERSON.github,   variant: 'glass',    Icon: GitHubSVG },
  { label: 'LinkedIn', href: PERSON.linkedin, variant: 'glass',    Icon: LinkedInSVG },
  { label: 'Articles', href: PERSON.articles, variant: 'outline',  Icon: () => <BookOpen  size={15} style={{ flexShrink: 0 }} aria-hidden="true" /> },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
const fade    = (d = 0) => ({
  hidden:  { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1], delay: d } },
});

export default function Hero() {
  /* Smooth mouse parallax fed into canvas */
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const mouseX = useSpring(rawX, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(rawY, { stiffness: 50, damping: 20 });

  const onMove = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width);
    rawY.set((e.clientY - r.top)  / r.height);
  }, [rawX, rawY]);

  const onLeave = useCallback(() => {
    rawX.set(0.5); rawY.set(0.5);
  }, [rawX, rawY]);

  return (
    <section
      id="home"
      className={styles.hero}
      aria-label="Introduction"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Deep navy base */}
      <div className={styles.baseBg} aria-hidden="true" />

      {/* Large ambient blobs — very low opacity */}
      <div className={styles.blobA} aria-hidden="true" />
      <div className={styles.blobB} aria-hidden="true" />
      <div className={styles.blobC} aria-hidden="true" />

      {/* Neural / aurora canvas */}
      <AuroraCanvas mouseX={mouseX} mouseY={mouseY} />

      {/* Text content — centered, full width */}
      <motion.div
        className={styles.content}
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className={styles.name} variants={fade(0)}>
          {PERSON.name}
        </motion.h1>

        <motion.p className={styles.title} variants={fade(0.07)}>
          {PERSON.title}
        </motion.p>

        <motion.p className={styles.headline} variants={fade(0.14)}>
          {HEADLINE}
        </motion.p>

        <motion.div className={styles.actions} variants={fade(0.21)}>
          {ACTIONS.map(({ label, href, variant, Icon, showArrow }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles[variant]}`}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              aria-label={`${label} (opens in new tab)`}
            >
              <Icon />
              <span>{label}</span>
              {showArrow && <ArrowRight size={13} className={styles.arrow} aria-hidden="true" />}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.7 }}
        aria-hidden="true"
      >
        <span className={styles.scrollLine} />
        <span className={styles.scrollLabel}>Scroll</span>
      </motion.div>
    </section>
  );
}
