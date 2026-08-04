import { motion } from 'framer-motion';
import SectionTitle from '../shared/SectionTitle';
import IssuerLogo from '../shared/IssuerLogo';
import styles from './Certifications.module.css';
import { CERT_GROUPS } from '../../data/portfolioData';

const groupVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
};

export default function Certifications() {
  return (
    <section id="certifications" className="section" aria-label="Certifications">
      <SectionTitle title="Certifications" subtitle="Professional Development" />

      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px 0px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {CERT_GROUPS.map((group) => (
          <motion.div key={group.category} className={styles.categoryBlock} variants={groupVariants}>
            <div className={styles.categoryHeader}>
              <span className={styles.categoryBar} aria-hidden="true" />
              <h3 className={styles.categoryLabel}>{group.category}</h3>
              <span className={styles.countBadge}>{group.items.length}</span>
            </div>

            <motion.div
              className={styles.grid}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
            >
              {group.items.map((cert) => (
                <motion.article
                  key={cert.name}
                  className={styles.card}
                  variants={cardVariants}
                  whileHover={{ y: -4, transition: { type: 'spring', stiffness: 340, damping: 22 } }}
                >
                  <div className={styles.cardGlow} aria-hidden="true" />

                  <div className={styles.logoArea}>
                    <div className={styles.logoBox}>
                      <IssuerLogo icon={cert.icon} issuer={cert.issuer} size={22} />
                    </div>
                  </div>

                  <div className={styles.info}>
                    <h4 className={styles.certName} title={cert.name}>{cert.name}</h4>
                    <p className={styles.certIssuer}>{cert.issuer}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
