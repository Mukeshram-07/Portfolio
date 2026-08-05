import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Building2, Award, Trophy } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';
import styles from './Achievements.module.css';
import { LEADERSHIP_EVENTS, ACHIEVEMENTS } from '../../data/portfolioData';

/* ── Tag colors ─────────────────────────────────────────── */
const TAG_COLORS = {
  AI: 'blue', ML: 'purple', Workshop: 'cyan', Leadership: 'amber',
  Event: 'blue', Research: 'purple', Community: 'green', Speaker: 'cyan',
  Organizer: 'amber', Hackathon: 'purple', Winner: 'gold', Healthcare: 'green',
  Innovation: 'cyan', MedTech: 'cyan', Teamwork: 'amber', Analytics: 'blue',
  'Power BI': 'purple', Coding: 'blue', Competition: 'amber',
  'Open Source': 'green', Frontend: 'blue', Backend: 'purple',
  'Project Expo': 'cyan', Engineering: 'blue', AR: 'purple', VR: 'cyan',
  Unity: 'green', Training: 'amber',
};

function TagChip({ label }) {
  const color = TAG_COLORS[label] || 'blue';
  return <span className={`${styles.tag} ${styles[`tag_${color}`]}`}>{label}</span>;
}

/* ── Result badge colors ────────────────────────────────── */
const RESULT_MAP = {
  '1st Place': 'gold',
  '2nd Place': 'silver',
  '3rd Place': 'bronze',
  'Active':    'green',
};

/* ══════════════════════════════════════════════════════════
   InfiniteCarousel — auto-scroll ONLY when visible in viewport
   ══════════════════════════════════════════════════════════ */
function InfiniteCarousel({ items, renderCard, speed = 28000 }) {
  const wrapRef     = useRef(null);        // outer wrapper for IntersectionObserver
  const trackRef    = useRef(null);
  const animRef     = useRef(null);
  const posRef      = useRef(0);
  const pausedRef   = useRef(true);        // start PAUSED — wait until visible
  const visibleRef  = useRef(false);       // is section in viewport?
  const lastTsRef   = useRef(null);
  const resumeTimer = useRef(null);
  const isDragging  = useRef(false);
  const dragStart   = useRef(0);
  const dragPos     = useRef(0);

  /* ── measure half-width (one set of items) ────────────── */
  const halfWidth = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 0;
    return el.scrollWidth / 2;
  }, []);

  /* ── animation loop ───────────────────────────────────── */
  const animate = useCallback((ts) => {
    if (!trackRef.current) { animRef.current = requestAnimationFrame(animate); return; }
    if (!lastTsRef.current) lastTsRef.current = ts;
    const dt = ts - lastTsRef.current;
    lastTsRef.current = ts;

    if (!pausedRef.current && !isDragging.current && visibleRef.current) {
      const hw = halfWidth();
      if (hw > 0) {
        const pxPerMs = hw / speed;
        posRef.current -= pxPerMs * dt;
        if (Math.abs(posRef.current) >= hw) posRef.current += hw;
        trackRef.current.style.transform = `translateX(${posRef.current}px)`;
      }
    }
    animRef.current = requestAnimationFrame(animate);
  }, [halfWidth, speed]);

  /* ── start rAF loop once ──────────────────────────────── */
  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animate]);

  /* ── IntersectionObserver — start scroll when 30% visible */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          // start auto-scroll when section enters view
          pausedRef.current = false;
          lastTsRef.current = null;
        } else {
          // pause when scrolled out of view
          pausedRef.current = true;
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── pause / resume helpers ───────────────────────────── */
  const pause = useCallback(() => {
    pausedRef.current = true;
    clearTimeout(resumeTimer.current);
  }, []);

  const scheduleResume = useCallback(() => {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      if (visibleRef.current) {
        pausedRef.current = false;
        lastTsRef.current = null;
      }
    }, 3000);
  }, []);

  /* ── mouse drag ───────────────────────────────────────── */
  const onMouseDown = (e) => {
    isDragging.current = true;
    dragStart.current  = e.clientX;
    dragPos.current    = posRef.current;
    pause();
  };

  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    const delta = e.clientX - dragStart.current;
    const hw = halfWidth();
    let next = dragPos.current + delta;
    if (next > 0) next = next - hw;
    if (Math.abs(next) >= hw) next = next + hw;
    posRef.current = next;
    if (trackRef.current) trackRef.current.style.transform = `translateX(${next}px)`;
  }, [halfWidth]);

  const onMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    scheduleResume();
  }, [scheduleResume]);

  /* ── touch drag ───────────────────────────────────────── */
  const onTouchStart = (e) => {
    isDragging.current = true;
    dragStart.current  = e.touches[0].clientX;
    dragPos.current    = posRef.current;
    pause();
  };

  const onTouchMove = useCallback((e) => {
    if (!isDragging.current) return;
    const delta = e.touches[0].clientX - dragStart.current;
    const hw = halfWidth();
    let next = dragPos.current + delta;
    if (next > 0) next = next - hw;
    if (Math.abs(next) >= hw) next = next + hw;
    posRef.current = next;
    if (trackRef.current) trackRef.current.style.transform = `translateX(${next}px)`;
  }, [halfWidth]);

  const onTouchEnd = useCallback(() => {
    isDragging.current = false;
    scheduleResume();
  }, [scheduleResume]);

  /* ── wheel horizontal scroll ──────────────────────────── */
  const onWheel = useCallback((e) => {
    if (Math.abs(e.deltaX) < 5 && Math.abs(e.deltaY) < 5) return;
    e.preventDefault();
    const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
    const hw = halfWidth();
    let next = posRef.current - delta;
    if (next > 0) next = next - hw;
    if (Math.abs(next) >= hw) next = next + hw;
    posRef.current = next;
    if (trackRef.current) trackRef.current.style.transform = `translateX(${next}px)`;
    pause();
    scheduleResume();
  }, [halfWidth, scheduleResume]);

  /* ── attach passive:false wheel listener ─────────────── */
  useEffect(() => {
    const el = trackRef.current?.parentElement;
    if (!el) return;
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [onWheel]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

  /* duplicate items for infinite loop */
  const doubled = [...items, ...items];

  return (
    <div
      ref={wrapRef}
      className={styles.carouselWrap}
      onMouseEnter={pause}
      onMouseLeave={scheduleResume}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      aria-label="Scrolling carousel"
    >
      <div
        ref={trackRef}
        className={styles.carouselTrack}
        style={{ willChange: 'transform' }}
      >
        {doubled.map((item, i) => renderCard(item, i))}
      </div>
    </div>
  );
}

/* ── Event card ─────────────────────────────────────────── */
function EventCard({ item }) {
  return (
    <motion.article
      className={styles.card}
      whileHover={{
        scale: 1.025,
        y: -5,
        transition: { type: 'spring', stiffness: 300, damping: 22 },
      }}
    >
      <div className={styles.cardGlow} aria-hidden="true" />
      <div className={styles.cardInner}>
        <div className={styles.cardMeta}>
          <span className={styles.metaItem}>
            <Calendar size={11} aria-hidden="true" />
            {item.date || item.year}
          </span>
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

/* ── Achievement card ───────────────────────────────────── */
function AchievementCard({ item }) {
  const resultColor = RESULT_MAP[item.result] || 'blue';
  return (
    <motion.article
      className={`${styles.card} ${styles.achCard}`}
      whileHover={{
        scale: 1.025,
        y: -5,
        transition: { type: 'spring', stiffness: 300, damping: 22 },
      }}
    >
      <div className={styles.cardGlow} aria-hidden="true" />
      <div className={styles.cardInner}>
        <div className={styles.cardMeta}>
          {item.result && (
            <span className={`${styles.resultBadge} ${styles[`result_${resultColor}`]}`}>
              <Award size={10} aria-hidden="true" />
              {item.result}
            </span>
          )}
          <span className={styles.metaItem}>
            <Calendar size={11} aria-hidden="true" />
            {item.year}
          </span>
        </div>
        {item.org && (
          <span className={styles.metaItem} style={{ marginBottom: '0.35rem', display: 'flex' }}>
            <Building2 size={11} aria-hidden="true" />
            {item.org}
          </span>
        )}
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

/* ── Section sub-heading ────────────────────────────────── */
function SubHeading({ icon: Icon, title }) {
  return (
    <motion.div
      className={styles.subHeading}
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      <div className={styles.subHeadingIcon}><Icon size={15} aria-hidden="true" /></div>
      <h3 className={styles.subHeadingText}>{title}</h3>
      <div className={styles.subHeadingLine} aria-hidden="true" />
    </motion.div>
  );
}

/* ── Main export ────────────────────────────────────────── */
export default function Achievements() {
  return (
    <section id="achievements" className="section" aria-label="Events and Achievements">
      <SectionTitle title="Events & Achievements" subtitle="Leadership & Recognition" />

      <div className={styles.root}>
        {/* Events Conducted */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <SubHeading icon={Trophy} title="Events Conducted" />
          <InfiniteCarousel
            items={LEADERSHIP_EVENTS}
            speed={30000}
            renderCard={(item, i) => <EventCard key={`ev-${i}`} item={item} />}
          />
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SubHeading icon={Award} title="Achievements" />
          <InfiniteCarousel
            items={ACHIEVEMENTS}
            speed={25000}
            renderCard={(item, i) => <AchievementCard key={`ach-${i}`} item={item} />}
          />
        </motion.div>
      </div>
    </section>
  );
}
