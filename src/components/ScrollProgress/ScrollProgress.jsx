import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const spring = useSpring(progress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const update = () => {
      const st = document.documentElement.scrollTop;
      const sh =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setProgress(sh > 0 ? st / sh : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)',
        transformOrigin: '0%',
        scaleX: spring,
        zIndex: 9999,
        boxShadow: '0 0 8px rgba(167,139,250,0.5)',
      }}
    />
  );
}
