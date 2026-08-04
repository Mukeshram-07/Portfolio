import { motion } from 'framer-motion';

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};

export default function SectionTitle({ title, subtitle }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px 0px' }}
      variants={fadeUp}
      style={{ textAlign: 'center', marginBottom: '3.5rem' }}
    >
      {subtitle && (
        <p
          style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--blue)',
            marginBottom: '0.6rem',
            fontFamily: 'var(--font-display)',
          }}
        >
          {subtitle}
        </p>
      )}
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.85rem, 4vw, 2.6rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          color: 'var(--text)',
        }}
      >
        {title}
      </h2>
    </motion.div>
  );
}
