import { motion } from 'framer-motion';
import SectionTitle from '../shared/SectionTitle';
import styles from './Education.module.css';
import { EDUCATION } from '../../data/portfolioData';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const GradIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 10L12 5 2 10l10 5 10-5z" />
    <path d="M6 12.5v4.5c3.5 2 8.5 2 12 0v-4.5" />
  </svg>
);

export default function Education() {
  return (
    <section id="education" className="section" aria-label="Education">
      <SectionTitle title="Education" subtitle="Academic Background" />
      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px 0px' }}
      >
        {EDUCATION.map((edu, i) => (
          <motion.article
            key={i}
            className={styles.card}
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: '0 16px 40px var(--glow)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className={styles.iconWrap}>
              <GradIcon />
            </div>
            <div className={styles.degree}>{edu.degree}</div>
            <div className={styles.duration}>{edu.duration}</div>
            <div className={styles.inst}>{edu.institution}</div>
            <div className={styles.loc}>{edu.location}</div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
