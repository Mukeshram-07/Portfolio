import { motion } from 'framer-motion';
import { Cpu, Layers, FlaskConical, Database, BookOpen, Lightbulb } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';
import styles from './About.module.css';

const SHORT_BIO =
  "Final-year AI & Data Science student building production-ready ML systems. I specialize in end-to-end AI development — from data pipelines to deployed models — with a strong focus on LLMs, RAG, and intelligent automation.";

const STRENGTHS = [
  {
    Icon: Lightbulb,
    title: 'Logical Problem Solver',
    desc: 'Breaks down complex real-world problems through structured thinking and data-driven analysis.',
  },
  {
    Icon: Layers,
    title: 'End-to-End AI Development',
    desc: 'Builds complete AI pipelines — from raw data collection and feature engineering to model deployment.',
  },
  {
    Icon: Cpu,
    title: 'Production ML',
    desc: 'Focused on scalable, production-ready systems with proper MLOps practices and performance optimization.',
  },
  {
    Icon: Database,
    title: 'Data Engineering',
    desc: 'Designs ETL pipelines, data cleaning workflows, and preprocessing systems for large-scale datasets.',
  },
  {
    Icon: FlaskConical,
    title: 'Research Mindset',
    desc: 'Stays current with AI research, applies state-of-the-art techniques, and contributes to open source.',
  },
];

const SPECIALIZATIONS = [
  'Machine Learning', 'Generative AI', 'LLMs & RAG',
  'AI Agents', 'Data Engineering', 'AI Automation',
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden:   { opacity: 0, y: 20 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

export default function About() {
  return (
    <section id="about" className="section" aria-label="About">
      <SectionTitle title="About Me" subtitle="Who I Am" />

      <div className={styles.layout}>
        {/* ── Left: Bio ─────────────────────────────── */}
        <motion.div
          className={styles.bio}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px 0px' }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className={styles.bioAccent} aria-hidden="true" />

          <p className={styles.quickIntro}>Quick Introduction</p>
          <p className={styles.bioText}>{SHORT_BIO}</p>

          <div className={styles.specsLabel}>Specializations</div>
          <div className={styles.specs} role="list" aria-label="Specializations">
            {SPECIALIZATIONS.map((s) => (
              <span key={s} className={styles.specTag} role="listitem">{s}</span>
            ))}
          </div>
        </motion.div>

        {/* ── Right: Strength cards ─────────────────── */}
        <motion.div
          className={styles.strengthGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px 0px' }}
        >
          {STRENGTHS.map(({ Icon, title, desc }) => (
            <motion.div
              key={title}
              className={styles.strengthCard}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 320, damping: 22 } }}
            >
              <div className={styles.sIcon} aria-hidden="true">
                <Icon size={18} strokeWidth={1.75} />
              </div>
              <h3 className={styles.sTitle}>{title}</h3>
              <p className={styles.sDesc}>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
