import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, User, Code2, FolderOpen,
  Briefcase, GraduationCap, BadgeCheck, Trophy,
  GitCommitHorizontal, Mail,
} from 'lucide-react';
import styles from './Nav.module.css';
import { NAV_ITEMS } from '../../data/portfolioData';

const NAV_ICON_MAP = {
  home:           Home,
  about:          User,
  skills:         Code2,
  projects:       FolderOpen,
  experience:     Briefcase,
  education:      GraduationCap,
  certifications: BadgeCheck,
  achievements:   Trophy,
  journey:        GitCommitHorizontal,
  contact:        Mail,
};

export default function Nav() {
  const [activeId, setActiveId]   = useState('home');
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id); }),
      { rootMargin: '-25% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <nav className={styles.sidebar} aria-label="Site navigation">
      {NAV_ITEMS.map(({ id, label }) => {
        const Icon      = NAV_ICON_MAP[id] || Home;
        const isActive  = activeId  === id;
        const isHovered = hoveredId === id;
        const showPill  = isActive || isHovered;

        return (
          <a
            key={id}
            href={`#${id}`}
            className={`${styles.item} ${isActive ? styles.active : ''}`}
            aria-label={label}
            aria-current={isActive ? 'true' : undefined}
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Active glow bar on left edge */}
            {isActive && (
              <span className={styles.activeBar} aria-hidden="true" />
            )}

            {/* Icon — always 56×56, never moves */}
            <span className={styles.iconWrap} aria-hidden="true">
              <Icon size={20} strokeWidth={isActive ? 2.1 : 1.6} />
            </span>

            {/*
              Floating label pill:
              - Shows on hover OR when section is active
              - position: absolute; left: 68px — ONLY this item expands
              - Sidebar width never changes
              - No other items are affected
            */}
            <AnimatePresence>
              {showPill && (
                <motion.span
                  className={`${styles.pill} ${isActive ? styles.pillActive : styles.pillHover}`}
                  initial={{ opacity: 0, x: -10, scale: 0.88 }}
                  animate={{ opacity: 1, x: 0,   scale: 1    }}
                  exit={{    opacity: 0, x: -8,   scale: 0.9  }}
                  transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                  aria-hidden="true"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </a>
        );
      })}
    </nav>
  );
}
