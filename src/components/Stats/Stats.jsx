import { motion } from 'framer-motion';
import AnimatedCounter from '../shared/AnimatedCounter';
import SectionTitle from '../shared/SectionTitle';
import styles from './Stats.module.css';
import { STATS } from '../../data/portfolioData';

const STAT_ICONS = {
  projects: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 6a2 2 0 012-2h5l2 3h9a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
    </svg>
  ),
  certs: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M8 14v8l4-2 4 2v-8" />
    </svg>
  ),
  exp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 3H8v4h8V3z" />
    </svg>
  ),
  events: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

export default function Stats() {
  return (
    <section id="stats" className="section" aria-label="Portfolio statistics">
      <SectionTitle title="Portfolio Stats" subtitle="By the Numbers" />
      <motion.div
        className={styles.row}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {STATS.map((stat) => (
          <motion.div
            key={stat.id}
            className={styles.card}
            variants={cardVariants}
            whileHover={{
              y: -6,
              transition: { type: 'spring', stiffness: 300, damping: 18 },
            }}
          >
            <div className={styles.iconWrap} aria-hidden="true">
              {STAT_ICONS[stat.id]}
            </div>
            <span className={styles.num} aria-label={`${stat.value} ${stat.label}`}>
              <AnimatedCounter target={stat.value} />
            </span>
            <p className={styles.label}>{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
