import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Tag, ArrowRight, X, ExternalLink, BookOpen } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';
import styles from './Projects.module.css';
import { PROJECTS } from '../../data/portfolioData';
import ProjectDetailModal from './ProjectDetailModal';

/* ── GitHub SVG icon ──────────────────────────────────── */
const GH_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

/* ── Featured projects (3 flagship) ──────────────────── */
const FEATURED_PROJECTS = [
  {
    title: 'Multimodal RAG System',
    category: 'Generative AI • RAG • LLM',
    overview: 'Production-ready multimodal Retrieval-Augmented Generation system with semantic search, citation-aware responses, and scalable FastAPI architecture.',
    highlights: ['PDF Ingestion', 'Semantic Search', 'ChromaDB', 'Citation-aware', 'FastAPI'],
    tech: ['Python', 'FastAPI', 'ChromaDB', 'Streamlit', 'Sentence Transformers', 'LLMs'],
    github: 'https://github.com/Mukeshram-07/multimodal-rag',
  },
  {
    title: 'AI Agent for Data Scientists',
    category: 'AI Agents • Machine Learning',
    overview: 'AI-powered assistant that automates data exploration, visualization, feature engineering, and machine learning workflows.',
    highlights: ['AI Agent', 'ML Automation', 'Data Analysis', 'Visualization', 'Intelligent Insights'],
    tech: ['React', 'FastAPI', 'Python', 'LLMs', 'Pandas', 'Plotly'],
    github: 'https://github.com/Mukeshram-07/ai-agent-ds',
  },
  {
    title: 'AlexVale Gmail MCP',
    category: 'AI • MCP • Gmail Automation',
    overview: 'Model Context Protocol server enabling AI assistants to securely search, summarize, and manage Gmail through intelligent automation.',
    highlights: ['MCP', 'Gmail API', 'OAuth', 'AI Summaries', 'Automation'],
    tech: ['Python', 'FastMCP', 'Gmail API', 'OAuth', 'Google Cloud'],
    github: 'https://github.com/Mukeshram-07/alexvale-gmail-mcp',
  },
];

/* ── All remaining projects ───────────────────────────── */
const ALL_OTHER_PROJECTS = PROJECTS.filter(
  (p) => !FEATURED_PROJECTS.some((f) => f.title === p.title)
);

/* ── Animation variants ───────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const drawerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: 40, transition: { duration: 0.25 } },
};

/* ── Featured Card ────────────────────────────────────── */
function FeaturedCard({ proj, onViewDetails }) {
  return (
    <motion.article
      className={styles.card}
      variants={cardVariants}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
    >
      {/* Gradient glow border */}
      <div className={styles.borderGlow} aria-hidden="true" />

      <div className={styles.body}>
        {/* Category */}
        <div className={styles.category}>
          <Tag size={10} aria-hidden="true" />
          <span>{proj.category}</span>
        </div>

        {/* Title */}
        <h3 className={styles.title}>{proj.title}</h3>

        {/* Description */}
        <p className={styles.overview}>{proj.overview}</p>

        {/* Highlight badges */}
        <div className={styles.highlights} aria-label="Project highlights">
          {proj.highlights.map((h) => (
            <span key={h} className={styles.highlight}>
              <Sparkles size={9} aria-hidden="true" />
              {h}
            </span>
          ))}
        </div>

        {/* Tech chips — pushed to bottom */}
        <div className={styles.chips} aria-label="Technologies">
          {proj.tech.map((t) => (
            <span key={t} className={styles.chip}>{t}</span>
          ))}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          {proj.github && (
            <motion.a
              href={proj.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnGh}
              whileHover={{ y: -1 }}
              aria-label={`${proj.title} on GitHub`}
            >
              {GH_ICON}
              <span>GitHub</span>
            </motion.a>
          )}
          <motion.button
            className={styles.btnDetails}
            whileHover={{ y: -1 }}
            onClick={() => onViewDetails(proj)}
            aria-label={`View details for ${proj.title}`}
          >
            <BookOpen size={12} aria-hidden="true" />
            <span>View Details</span>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Other Project Card (in modal) ───────────────────── */
function OtherCard({ proj, onViewDetails }) {
  return (
    <motion.article
      className={`${styles.card} ${styles.otherCard}`}
      variants={cardVariants}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
    >
      <div className={styles.borderGlow} aria-hidden="true" />
      <div className={styles.body}>
        {proj.category && (
          <div className={styles.category}>
            <Tag size={10} aria-hidden="true" />
            <span>{proj.category}</span>
          </div>
        )}
        <h3 className={styles.title}>{proj.title}</h3>
        <p className={styles.overview}>{proj.overview}</p>

        <div className={styles.chips} aria-label="Technologies">
          {proj.tech.map((t) => (
            <span key={t} className={styles.chip}>{t}</span>
          ))}
        </div>

        <div className={styles.actions}>
          {proj.github && (
            <motion.a
              href={proj.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnGh}
              whileHover={{ y: -1 }}
              aria-label={`${proj.title} on GitHub`}
            >
              {GH_ICON}
              <span>GitHub</span>
            </motion.a>
          )}
          {proj.demo && (
            <motion.a
              href={proj.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnDemo}
              whileHover={{ y: -1 }}
              aria-label={`View ${proj.title}`}
            >
              <ExternalLink size={12} />
              <span>View</span>
            </motion.a>
          )}
          <motion.button
            className={styles.btnToggle}
            whileHover={{ y: -1 }}
            onClick={() => onViewDetails(proj)}
            aria-label={`View details for ${proj.title}`}
          >
            <BookOpen size={12} />
            <span>Details</span>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

/* ── All Projects Overlay ─────────────────────────────── */
function AllProjectsOverlay({ onClose, onViewDetails }) {
  // Lock body scroll when overlay is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlayBg}
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label="All Projects"
      >
        <motion.div
          className={styles.overlayPanel}
          variants={drawerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={styles.overlayHeader}>
            <div>
              <p className={styles.overlaySubtitle}>All Work</p>
              <h2 className={styles.overlayTitle}>All Projects</h2>
            </div>
            <button
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close all projects"
            >
              <X size={18} />
            </button>
          </div>

          {/* Grid of remaining projects */}
          <motion.div
            className={styles.overlayGrid}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {ALL_OTHER_PROJECTS.map((proj) => (
              <OtherCard key={proj.title} proj={proj} onViewDetails={onViewDetails} />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Main Projects Section ────────────────────────────── */
export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [detailProj, setDetailProj] = useState(null);

  const handleViewDetails = (proj) => {
    setDetailProj(proj);
  };

  const handleCloseDetail = () => {
    setDetailProj(null);
  };

  return (
    <>
      <section id="projects" className="section" aria-label="Projects">
        <SectionTitle title="Projects" subtitle="Featured Work" />

        {/* 3 Featured Cards */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px 0px' }}
        >
          {FEATURED_PROJECTS.map((proj) => (
            <FeaturedCard key={proj.title} proj={proj} onViewDetails={handleViewDetails} />
          ))}
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          className={styles.viewAllWrapper}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <motion.button
            className={styles.viewAllBtn}
            onClick={() => setShowAll(true)}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            aria-label="View all projects"
          >
            <span>View All Projects</span>
            <ArrowRight size={16} aria-hidden="true" />
          </motion.button>
        </motion.div>
      </section>

      {/* All Projects Overlay */}
      <AnimatePresence>
        {showAll && (
          <AllProjectsOverlay
            onClose={() => setShowAll(false)}
            onViewDetails={handleViewDetails}
          />
        )}
      </AnimatePresence>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {detailProj && (
          <ProjectDetailModal
            key={detailProj.title}
            proj={detailProj}
            onClose={handleCloseDetail}
          />
        )}
      </AnimatePresence>
    </>
  );
}
