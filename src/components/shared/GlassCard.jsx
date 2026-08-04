import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', style = {}, hover = true }) {
  return (
    <motion.div
      className={`glass-card ${className}`}
      style={style}
      whileHover={hover ? { y: -8 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
