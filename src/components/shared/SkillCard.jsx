import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SkillIcon from './SkillIcon';
import styles from './SkillCard.module.css';

export default function SkillCard({ name, icon }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 280, damping: 24 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 280, damping: 24 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.iconWrap}>
        <SkillIcon icon={icon} name={name} size={28} />
      </div>
      <span className={styles.name}>{name}</span>
    </motion.div>
  );
}
