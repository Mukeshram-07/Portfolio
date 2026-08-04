import { motion } from 'framer-motion';
import SectionTitle from '../shared/SectionTitle';
import SkillCard from '../shared/SkillCard';
import styles from './Skills.module.css';
import { SKILL_GROUPS } from '../../data/portfolioData';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const groupVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] } },
};

export default function Skills() {
  return (
    <section id="skills" className="section" aria-label="Technical Skills">
      <SectionTitle title="Skills" subtitle="Technical Expertise" />
      <motion.div
        className={styles.wrapper}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px 0px' }}
      >
        {SKILL_GROUPS.map((group) => (
          <motion.div key={group.title} className={styles.group} variants={groupVariants}>
            <div className={styles.groupHeader}>
              <span className={styles.groupTitle}>{group.title}</span>
              <div className={styles.groupDivider} aria-hidden="true" />
            </div>
            <motion.div
              className={styles.grid}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.045 } } }}
            >
              {group.skills.map((skill) => (
                <motion.div key={skill.name} variants={cardVariants}>
                  <SkillCard name={skill.name} icon={skill.icon} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
