import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';
import styles from './Experience.module.css';
import { EXPERIENCE } from '../../data/portfolioData';

const dotVariants = {
  hidden:  { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: 'backOut' } },
};

export default function Experience() {
  return (
    <section id="experience" className="section" aria-label="Work Experience">
      <SectionTitle title="Experience" subtitle="Professional Journey" />
      <div className={styles.timeline}>
        {EXPERIENCE.map((exp, i) => (
          <motion.div
            key={i}
            className={styles.item}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px 0px' }}
          >
            <motion.div className={styles.dot} variants={dotVariants} aria-hidden="true" />
            <div className={styles.conn} aria-hidden="true" />

            <motion.article
              className={styles.card}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px 0px' }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
              whileHover={{
                y: -4,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
            >
              {/* Card top: company + badge + duration */}
              <div className={styles.cardTop}>
                <div className={styles.cardMeta}>
                  <p className={styles.company}>{exp.company}</p>
                  <div className={styles.titleRow}>
                    <h3 className={styles.expTitle}>{exp.title}</h3>
                    {exp.badge && (
                      <span className={styles.roleBadge} aria-label={`Role: ${exp.badge}`}>
                        {exp.badge}
                      </span>
                    )}
                  </div>
                </div>
                <span className={styles.dur}>{exp.duration}</span>
              </div>

              {/* Responsibilities */}
              <ul className={styles.list} aria-label="Responsibilities">
                {exp.points.map((pt, j) => (
                  <li key={j}>{pt}</li>
                ))}
              </ul>

              {/* Footer: tech chips + optional certificate button */}
              <div className={styles.cardFooter}>
                {exp.tech && exp.tech.length > 0 && (
                  <div className={styles.techRow} aria-label="Technologies">
                    {exp.tech.map((t) => (
                      <span key={t} className={styles.techBadge}>{t}</span>
                    ))}
                  </div>
                )}

                {exp.certificate && (
                  <motion.a
                    href={exp.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.certBtn}
                    whileHover={{ y: -1 }}
                    aria-label={`View certificate for ${exp.title} at ${exp.company}`}
                  >
                    <ExternalLink size={12} strokeWidth={2} aria-hidden="true" />
                    View Certificate
                  </motion.a>
                )}
              </div>
            </motion.article>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
