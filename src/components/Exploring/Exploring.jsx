import { motion } from 'framer-motion';
import SectionTitle from '../shared/SectionTitle';
import SkillIcon from '../shared/SkillIcon';
import styles from './Exploring.module.css';
import { CURRENTLY_EXPLORING } from '../../data/portfolioData';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
};

export default function Exploring() {
  return (
    <section id="exploring" className="section" aria-label="Currently Exploring">
      <SectionTitle title="Currently Exploring" subtitle="Always Learning" />

      <motion.div
        className={styles.intro}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p>Technologies and concepts I'm actively diving into — pushing my skills toward the frontier of AI engineering.</p>
      </motion.div>

      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px 0px' }}
      >
        {CURRENTLY_EXPLORING.map((item) => (
          <motion.div
            key={item.name}
            className={styles.card}
            variants={cardVariants}
            whileHover={{ y: -5, transition: { type: 'spring', stiffness: 320, damping: 22 } }}
          >
            <div className={styles.iconWrap}>
              <SkillIcon icon={item.icon} name={item.name} size={26} />
            </div>
            <span className={styles.name}>{item.name}</span>
            <span className={styles.learningBadge} aria-label="Learning">
              <span className={styles.learningDot} aria-hidden="true" />
              Learning
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
