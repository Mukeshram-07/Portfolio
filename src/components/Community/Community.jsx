import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, Building2,
  Globe, ExternalLink,
  FlaskConical, Award, CheckCircle2,
  FileText, ChevronDown, ChevronUp, Users,
} from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';
import styles from './Community.module.css';
import {
  LEADERSHIP_ROLES,
  COMMUNITY_CONTRIBUTIONS,
  RESEARCH_PAPERS,
  HACKATHONS,
} from '../../data/portfolioData';

/* ── GitHub SVG (lucide-react doesn't export 'Github' in this version) ── */
const GH_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

/* ── Tag chip ────────────────────────────────────────────── */
const TAG_COLORS = {
  AI:          'blue',
  ML:          'purple',
  Workshop:    'cyan',
  Leadership:  'amber',
  Event:       'blue',
  Research:    'purple',
  Community:   'green',
  Speaker:     'cyan',
  Organizer:   'amber',
};

function TagChip({ label }) {
  const color = TAG_COLORS[label] || 'blue';
  return <span className={`${styles.tag} ${styles[`tag_${color}`]}`}>{label}</span>;
}

/* ── Section header with divider ────────────────────────── */
function SubHeading({ icon: Icon, title }) {
  return (
    <div className={styles.subHeading}>
      <div className={styles.subHeadingIcon}><Icon size={15} aria-hidden="true" /></div>
      <h3 className={styles.subHeadingText}>{title}</h3>
      <div className={styles.subHeadingLine} aria-hidden="true" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 1 — Technical Leadership & Community
   ══════════════════════════════════════════════════════════ */

function LeadershipCard({ item }) {
  return (
    <motion.article
      className={`${styles.card} ${item.placeholder ? styles.cardPlaceholder : ''}`}
      variants={cardVariants}
      whileHover={!item.placeholder ? { y: -4, transition: { type: 'spring', stiffness: 300, damping: 22 } } : {}}
    >
      <div className={styles.borderGlow} aria-hidden="true" />
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          {item.date && (
            <span className={styles.metaItem}>
              <Calendar size={11} aria-hidden="true" />
              {item.date}
            </span>
          )}
          {item.org && (
            <span className={styles.metaItem}>
              <Building2 size={11} aria-hidden="true" />
              {item.org}
            </span>
          )}
        </div>
        <h4 className={styles.cardTitle}>{item.title}</h4>
        <p className={styles.cardDesc}>{item.desc}</p>
        {item.tags && item.tags.length > 0 && (
          <div className={styles.tagRow}>
            {item.tags.map(t => <TagChip key={t} label={t} />)}
          </div>
        )}
      </div>
    </motion.article>
  );
}

function TechnicalLeadership() {
  return (
    <section id="community" className="section" aria-label="Technical Leadership and Community">
      <SectionTitle title="Technical Leadership" subtitle="Community & Impact" />

      {/* Leadership Roles */}
      <SubHeading icon={Users} title="Leadership Roles" />
      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {LEADERSHIP_ROLES.map((item) => (
          <LeadershipCard key={item.title} item={item} />
        ))}
      </motion.div>

      {/* Community Contributions */}
      <SubHeading icon={Globe} title="Community Contributions" />
      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {COMMUNITY_CONTRIBUTIONS.map((item) => (
          <LeadershipCard key={item.title} item={item} />
        ))}
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 2 — Research & Publications
   ══════════════════════════════════════════════════════════ */

function ResearchCard({ paper }) {
  const [showAbstract, setShowAbstract] = useState(false);

  return (
    <motion.article
      className={`${styles.card} ${styles.researchCard} ${paper.placeholder ? styles.cardPlaceholder : ''}`}
      variants={cardVariants}
      whileHover={!paper.placeholder ? { y: -4, transition: { type: 'spring', stiffness: 300, damping: 22 } } : {}}
    >
      <div className={styles.borderGlow} aria-hidden="true" />
      <div className={styles.cardBody}>
        {/* Status + year row */}
        <div className={styles.cardMeta}>
          <span className={`${styles.statusBadge} ${paper.status === 'Published' ? styles.statusPublished : styles.statusProgress}`}>
            <CheckCircle2 size={10} aria-hidden="true" />
            {paper.status}
          </span>
          <span className={styles.metaItem}>
            <Calendar size={11} aria-hidden="true" />
            {paper.year}
          </span>
          <span className={styles.metaItem}>
            <FlaskConical size={11} aria-hidden="true" />
            {paper.domain}
          </span>
        </div>

        <div className={styles.researchType}>
          <FileText size={10} aria-hidden="true" />
          {paper.type}
        </div>

        <h4 className={styles.cardTitle}>{paper.title}</h4>
        <p className={styles.roleLabel}>{paper.role}</p>

        {/* Abstract toggle */}
        {paper.abstract && !paper.placeholder && (
          <>
            <motion.div
              className={styles.abstractBox}
              initial={false}
              animate={{ height: showAbstract ? 'auto' : 0, opacity: showAbstract ? 1 : 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <p className={styles.abstractText}>{paper.abstract}</p>
            </motion.div>
            <button
              className={styles.abstractBtn}
              onClick={() => setShowAbstract(v => !v)}
              aria-expanded={showAbstract}
            >
              {showAbstract ? <><ChevronUp size={12} /> Hide Abstract</> : <><ChevronDown size={12} /> View Abstract</>}
            </button>
          </>
        )}

        {/* Keywords */}
        {paper.keywords && paper.keywords.length > 0 && (
          <div className={styles.tagRow} style={{ marginTop: '0.65rem' }}>
            {paper.keywords.map(k => (
              <span key={k} className={styles.keyword}>{k}</span>
            ))}
          </div>
        )}

        {/* Tech */}
        {paper.tech && paper.tech.length > 0 && (
          <div className={styles.techRow}>
            {paper.tech.map(t => (
              <span key={t} className={styles.techChip}>{t}</span>
            ))}
          </div>
        )}

        {/* Link */}
        {paper.link && (
          <div className={styles.cardActions}>
            <a href={paper.link} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
              <ExternalLink size={12} aria-hidden="true" />
              View Paper
            </a>
          </div>
        )}
      </div>
    </motion.article>
  );
}

function ResearchPublications() {
  return (
    <section id="research" className={`section ${styles.subSection}`} aria-label="Research and Publications">
      <SectionTitle title="Research & Publications" subtitle="Academic Work" />
      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {RESEARCH_PAPERS.map(p => (
          <ResearchCard key={p.title} paper={p} />
        ))}
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 3 — Hackathons & Competitions
   ══════════════════════════════════════════════════════════ */

const RESULT_STYLES = {
  '2nd Place':  'gold',
  '3rd Place':  'bronze',
  'Participant': 'neutral',
  'TBD':         'neutral',
};

function HackathonCard({ item }) {
  const resultStyle = RESULT_STYLES[item.result] || 'neutral';
  return (
    <motion.article
      className={`${styles.card} ${item.placeholder ? styles.cardPlaceholder : ''}`}
      variants={cardVariants}
      whileHover={!item.placeholder ? { y: -4, transition: { type: 'spring', stiffness: 300, damping: 22 } } : {}}
    >
      <div className={styles.borderGlow} aria-hidden="true" />
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <span className={`${styles.resultBadge} ${styles[`result_${resultStyle}`]}`}>
            <Award size={10} aria-hidden="true" />
            {item.result}
          </span>
          <span className={styles.metaItem}>
            <Calendar size={11} aria-hidden="true" />
            {item.year}
          </span>
        </div>

        <h4 className={styles.cardTitle}>{item.title}</h4>
        <p className={styles.roleLabel}>{item.role}</p>
        <p className={styles.cardDesc}>{item.desc}</p>

        {item.tech && item.tech.length > 0 && (
          <div className={styles.techRow}>
            {item.tech.map(t => <span key={t} className={styles.techChip}>{t}</span>)}
          </div>
        )}

        {item.github && (
          <div className={styles.cardActions}>
            <a href={item.github} target="_blank" rel="noopener noreferrer" className={styles.ghBtn}>
              {GH_ICON}
              GitHub
            </a>
          </div>
        )}
      </div>
    </motion.article>
  );
}

function HackathonsCompetitions() {
  return (
    <section id="hackathons" className={`section ${styles.subSection}`} aria-label="Hackathons and Competitions">
      <SectionTitle title="Hackathons & Competitions" subtitle="Challenges & Results" />
      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {HACKATHONS.map(h => (
          <HackathonCard key={h.title} item={h} />
        ))}
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   DEFAULT EXPORT — Technical Leadership, Research, Hackathons
   ══════════════════════════════════════════════════════════ */
export default function Community() {
  return (
    <>
      <TechnicalLeadership />
      <ResearchPublications />
      <HackathonsCompetitions />
    </>
  );
}
