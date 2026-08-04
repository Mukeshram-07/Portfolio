import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import styles from './Intro.module.css';

const TERM_LINES = [
  { text: 'Initializing ML Environment...', type: '' },
  { text: 'Loading Python Runtime...', type: '' },
  { text: 'Importing Machine Learning Libraries...', type: '' },
  { text: 'Loading AI Models...', type: 'info' },
  { text: 'Optimizing Inference Pipeline...', type: '' },
  { text: 'Portfolio Ready.', type: 'success' },
  { text: 'Welcome.', type: 'welcome' },
];

function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const COUNT = 40;
    particlesRef.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Gradient mesh blobs
      const blobs = [
        { x: W * 0.2, y: H * 0.3, r: 300, c: 'rgba(96,165,250,0.04)' },
        { x: W * 0.8, y: H * 0.6, r: 350, c: 'rgba(167,139,250,0.04)' },
        { x: W * 0.5, y: H * 0.8, r: 250, c: 'rgba(103,232,249,0.03)' },
      ];
      blobs.forEach(b => {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, b.c);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      // Particles
      const pts = particlesRef.current;
      pts.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96,165,250,${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });

      // Data stream lines (vertical)
      for (let i = 0; i < 6; i++) {
        const x = (W / 7) * (i + 1);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.strokeStyle = `rgba(96,165,250,0.018)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}

export default function Intro({ onDone }) {
  const [lines, setLines] = useState(
    TERM_LINES.map(() => ({ text: '', done: false, visible: false }))
  );
  const [showCursorIdx, setShowCursorIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const lineRefs = useRef([]);
  const tl = useRef(null);

  const finish = useCallback(() => {
    setVisible(false);
    setTimeout(onDone, 700);
  }, [onDone]);

  useEffect(() => {
    // GSAP timeline for typing
    tl.current = gsap.timeline({ onComplete: () => setTimeout(finish, 400) });

    TERM_LINES.forEach((line, i) => {
      const delay = i === 0 ? 0.2 : 0;

      tl.current.add(() => {
        setLines(prev => {
          const n = [...prev];
          n[i] = { ...n[i], visible: true };
          return n;
        });
        setShowCursorIdx(i);
      });

      // Type each character
      const chars = line.text.split('');
      chars.forEach((_, ci) => {
        tl.current.add(() => {
          setLines(prev => {
            const n = [...prev];
            n[i] = { ...n[i], text: line.text.slice(0, ci + 1) };
            return n;
          });
        }, `+=${i === 6 ? 0.06 : 0.04}`);
      });

      tl.current.add(() => {
        setLines(prev => {
          const n = [...prev];
          n[i] = { ...n[i], done: true };
          return n;
        });
      }, `+=0.${i === 6 ? '3' : '15'}`);
    });

    return () => tl.current?.kill();
  }, [finish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
          role="dialog"
          aria-label="Portfolio loading"
          aria-live="polite"
        >
          <div className={styles.bg} aria-hidden="true" />
          <ParticleCanvas />

          <div className={styles.inner}>
            <div className={styles.terminal}>
              <div className={styles.termHeader} aria-hidden="true">
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.termTitle}>mukeshram@ml-studio ~ zsh</span>
              </div>
              <div className={styles.termBody} role="status">
                {lines.map((line, i) => {
                  if (!line.visible) return null;
                  const cfg = TERM_LINES[i];
                  return (
                    <div
                      key={i}
                      ref={el => (lineRefs.current[i] = el)}
                      className={`${styles.termLine} ${cfg.type ? styles[cfg.type] : ''}`}
                    >
                      {cfg.type === 'welcome' ? (
                        <span className={styles.promptHash}>#</span>
                      ) : (
                        <span className={styles.prompt}>❯</span>
                      )}
                      <span>{line.text}</span>
                      {!line.done && showCursorIdx === i && (
                        <span className={styles.cursor} aria-hidden="true" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            className={styles.skipBtn}
            onClick={finish}
            aria-label="Skip intro"
          >
            Skip →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
