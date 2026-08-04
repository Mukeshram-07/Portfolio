import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  X, ArrowLeft, ExternalLink, CheckCircle2,
  FileText, Scissors, Cpu, Database, Search, Brain,
  MessageSquare, User, Code, BarChart2, TrendingUp,
  Server, Shield, Cloud, Mail, Inbox, Bot,
  Calendar, Tag, Zap,
} from 'lucide-react';
import styles from './ProjectDetailModal.module.css';
import { getProjectDetail } from '../../data/projectDetails';

/* ── Icon map for architecture nodes ─────────────────────── */
const ICON_MAP = {
  FileText, Scissors, Cpu, Database, Search, Brain,
  MessageSquare, User, Code, BarChart2, TrendingUp,
  Server, Shield, Cloud, Mail, Inbox, Bot, Zap,
};

const GH_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

/* ── Count-Up hook ────────────────────────────────────────── */
function useCountUp(target, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);
  return count;
}

/* ── Animated stat card ───────────────────────────────────── */
function StatCard({ value, suffix, label, delay = 0, started }) {
  const count = useCountUp(value, 1600, started);
  return (
    <motion.div
      className={styles.statCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
    >
      <div className={styles.statValue}>
        {count}
        <span className={styles.statSuffix}>{suffix}</span>
      </div>
      <div className={styles.statLabel}>{label}</div>
    </motion.div>
  );
}

/* ── Architecture diagram ─────────────────────────────────── */
function ArchitectureDiagram({ arch }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className={styles.archWrap}>
      <p className={styles.archLabel}>{arch.label}</p>
      <div className={styles.archFlow}>
        {arch.steps.map((step, i) => {
          const IconComp = ICON_MAP[step.icon] ?? Cpu;
          return (
            <motion.div
              key={step.label}
              className={styles.archRow}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className={styles.archNode}>
                <div className={styles.archIcon}>
                  <IconComp size={16} aria-hidden="true" />
                </div>
                <span className={styles.archNodeLabel}>{step.label}</span>
              </div>
              {i < arch.steps.length - 1 && (
                <motion.div
                  className={styles.archConnector}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={inView ? { scaleY: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: i * 0.1 + 0.25 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Section title inside modal ───────────────────────────── */
function ModalSection({ label, children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.section
      ref={ref}
      className={styles.modalSection}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      <h2 className={styles.sectionLabel}>{label}</h2>
      {children}
    </motion.section>
  );
}

/* ── Simple modal for projects without rich detail ───────── */
function SimpleDetailModal({ proj, onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label={proj.title}
    >
      <motion.div
        className={styles.simplePanel}
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 30 }}
        transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        {proj.category && (
          <div className={styles.simpleCat}>
            <Tag size={10} aria-hidden="true" />
            {proj.category}
          </div>
        )}
        <h2 className={styles.simpleTitle}>{proj.title}</h2>
        <p className={styles.simpleOverview}>{proj.overview}</p>

        {proj.problem && (
          <div className={styles.simplePsBlock}>
            <span className={styles.simplePsLabel}>Problem</span>
            <p className={styles.simplePsText}>{proj.problem}</p>
          </div>
        )}
        {proj.solution && (
          <div className={styles.simplePsBlock}>
            <span className={styles.simplePsLabel}>Solution</span>
            <p className={styles.simplePsText}>{proj.solution}</p>
          </div>
        )}

        <div className={styles.simpleChips}>
          {proj.tech.map((t) => (
            <span key={t} className={styles.simpleChip}>{t}</span>
          ))}
        </div>

        <div className={styles.simpleActions}>
          {proj.github && (
            <a href={proj.github} target="_blank" rel="noopener noreferrer" className={styles.simpleBtnGh}>
              {GH_SVG} GitHub
            </a>
          )}
          {proj.demo && (
            <a href={proj.demo} target="_blank" rel="noopener noreferrer" className={styles.simpleBtnDemo}>
              <ExternalLink size={14} /> View Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   RICH DETAIL MODAL (flagship projects)
   ══════════════════════════════════════════════════════════ */
function RichDetailModal({ detail, onClose }) {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-40px' });

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label={detail.title}
    >
      <motion.div
        className={styles.richPanel}
        initial={{ opacity: 0, scale: 0.96, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 40 }}
        transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Scrollable inner ──────────────────────────── */}
        <div className={styles.richScroll}>

          {/* ── Hero ──────────────────────────────────── */}
          <div className={styles.hero}>
            {/* Top bar */}
            <div className={styles.heroTopBar}>
              <button className={styles.backBtn} onClick={onClose} aria-label="Back to projects">
                <ArrowLeft size={15} />
                <span>Projects</span>
              </button>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            {/* Glow orb */}
            <div className={styles.heroGlow} aria-hidden="true" />

            {/* Meta row */}
            <motion.div
              className={styles.heroMeta}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className={styles.heroCat}>
                <Tag size={10} aria-hidden="true" />
                {detail.category}
              </span>
              <span className={styles.heroStatus}>
                <CheckCircle2 size={11} aria-hidden="true" />
                {detail.status}
              </span>
              <span className={styles.heroYear}>
                <Calendar size={11} aria-hidden="true" />
                {detail.year}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
            >
              {detail.title}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className={styles.heroTagline}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
            >
              {detail.tagline}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className={styles.heroCtas}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.34 }}
            >
              {detail.github && (
                <a
                  href={detail.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaBtnGh}
                  aria-label={`${detail.title} on GitHub`}
                >
                  {GH_SVG}
                  <span>GitHub</span>
                </a>
              )}
              {detail.demo && (
                <a
                  href={detail.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaBtnDemo}
                  aria-label={`Live demo for ${detail.title}`}
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  <span>Live Demo</span>
                </a>
              )}
            </motion.div>
          </div>

          {/* ── Content ───────────────────────────────── */}
          <div className={styles.content}>

            {/* Overview */}
            <ModalSection label="Overview">
              <div className={styles.overviewText}>
                {detail.overview.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </ModalSection>

            {/* Problem + Solution side by side */}
            <ModalSection label="Problem & Solution" delay={0.05}>
              <div className={styles.psGrid}>
                <div className={styles.psCard}>
                  <div className={styles.psCardIcon} data-type="problem">
                    <Zap size={16} aria-hidden="true" />
                  </div>
                  <h3 className={styles.psCardTitle}>Problem Statement</h3>
                  <p className={styles.psCardText}>{detail.problem}</p>
                </div>
                <div className={styles.psCard}>
                  <div className={styles.psCardIcon} data-type="solution">
                    <Brain size={16} aria-hidden="true" />
                  </div>
                  <h3 className={styles.psCardTitle}>Solution</h3>
                  <p className={styles.psCardText}>{detail.solution}</p>
                </div>
              </div>
            </ModalSection>

            {/* Architecture */}
            <ModalSection label="Architecture" delay={0.05}>
              <ArchitectureDiagram arch={detail.architecture} />
            </ModalSection>

            {/* Tech Stack */}
            <ModalSection label="Tech Stack" delay={0.05}>
              <div className={styles.techGrid}>
                {Object.entries(detail.techStack).map(([group, items]) => (
                  <div key={group} className={styles.techGroup}>
                    <span className={styles.techGroupLabel}>{group}</span>
                    <div className={styles.techChips}>
                      {items.map((t) => (
                        <span key={t} className={styles.techChip}>{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ModalSection>

            {/* Key Features */}
            <ModalSection label="Key Features" delay={0.05}>
              <div className={styles.featuresGrid}>
                {detail.features.map((f, i) => (
                  <motion.div
                    key={f.title}
                    className={styles.featureCard}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    whileHover={{ y: -3, transition: { type: 'spring', stiffness: 320, damping: 22 } }}
                  >
                    <CheckCircle2 size={15} className={styles.featureCheck} aria-hidden="true" />
                    <div>
                      <p className={styles.featureTitle}>{f.title}</p>
                      <p className={styles.featureDesc}>{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ModalSection>

            {/* Development Timeline */}
            <ModalSection label="Development Process" delay={0.05}>
              <div className={styles.timeline}>
                {detail.timeline.map((t, i) => (
                  <motion.div
                    key={t.phase}
                    className={styles.timelineItem}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className={styles.timelineDot} />
                    {i < detail.timeline.length - 1 && <div className={styles.timelineLine} />}
                    <div className={styles.timelineBody}>
                      <span className={styles.timelinePhase}>{t.phase}</span>
                      <p className={styles.timelineDesc}>{t.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ModalSection>

            {/* Challenges */}
            <ModalSection label="Challenges & Learnings" delay={0.05}>
              <div className={styles.challengesList}>
                {detail.challenges.map((c, i) => (
                  <motion.div
                    key={i}
                    className={styles.challengeCard}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className={styles.challengeRow}>
                      <span className={styles.challengeTag}>Challenge</span>
                      <p className={styles.challengeText}>{c.challenge}</p>
                    </div>
                    <div className={styles.challengeRow}>
                      <span className={styles.challengeTag} data-type="solution">Solution</span>
                      <p className={styles.challengeText}>{c.solution}</p>
                    </div>
                    <div className={styles.challengeRow}>
                      <span className={styles.challengeTag} data-type="lesson">Lesson</span>
                      <p className={styles.challengeText}>{c.lesson}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ModalSection>

            {/* Results */}
            <ModalSection label="Results & Metrics" delay={0.05}>
              <div ref={statsRef} className={styles.statsGrid}>
                {detail.results.map((r, i) => (
                  <StatCard
                    key={r.label}
                    value={r.value}
                    suffix={r.suffix}
                    label={r.label}
                    delay={i * 0.1}
                    started={statsInView}
                  />
                ))}
              </div>
            </ModalSection>

            {/* Repository CTA */}
            <ModalSection label="Repository" delay={0.05}>
              <div className={styles.repoCta}>
                <div className={styles.repoInfo}>
                  <div className={styles.repoIconWrap}>
                    {GH_SVG}
                  </div>
                  <div>
                    <p className={styles.repoTitle}>{detail.title}</p>
                    <p className={styles.repoUrl}>{detail.github?.replace('https://github.com/', '')}</p>
                  </div>
                </div>
                <a
                  href={detail.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.repoBtnGh}
                  aria-label={`Open ${detail.title} on GitHub`}
                >
                  {GH_SVG}
                  <span>View on GitHub</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </div>
            </ModalSection>

            {/* Bottom back button */}
            <div className={styles.bottomBack}>
              <button className={styles.backBtnBottom} onClick={onClose}>
                <ArrowLeft size={15} aria-hidden="true" />
                Back to Projects
              </button>
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   EXPORTED COMPONENT — auto-selects rich vs. simple
   ══════════════════════════════════════════════════════════ */
export default function ProjectDetailModal({ proj, onClose }) {
  const detail = getProjectDetail(proj.title);

  return (
    <AnimatePresence>
      {detail
        ? <RichDetailModal key="rich" detail={detail} onClose={onClose} />
        : <SimpleDetailModal key="simple" proj={proj} onClose={onClose} />
      }
    </AnimatePresence>
  );
}
