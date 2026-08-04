import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTitle from '../shared/SectionTitle';
import styles from './Journey.module.css';
import { JOURNEY_MILESTONES } from '../../data/portfolioData';

function JourneyNode({ milestone, index, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <div
      ref={ref}
      className={`${styles.node} ${milestone.year === 'Present' ? styles.present : ''}`}
    >
      {/* Animated connecting line */}
      {!isLast && (
        <motion.div
          className={styles.line}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
        />
      )}

      {/* Dot */}
      <motion.div
        className={styles.dot}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'backOut', delay: 0.05 }}
      >
        {milestone.year === 'Present' && (
          <span className={styles.dotPulse} aria-hidden="true" />
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
      >
        <div className={styles.card}>
          <span className={styles.year}>{milestone.year}</span>
          <h3 className={styles.mTitle}>{milestone.title}</h3>
          <p className={styles.mDesc}>{milestone.desc}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Journey() {
  return (
    <section id="journey" className="section" aria-label="Professional Journey">
      <SectionTitle title="Professional Journey" subtitle="Milestones" />
      <div className={styles.timeline} role="list">
        {JOURNEY_MILESTONES.map((m, i) => (
          <JourneyNode
            key={i}
            milestone={m}
            index={i}
            isLast={i === JOURNEY_MILESTONES.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
