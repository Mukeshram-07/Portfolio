import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, FileText, Globe } from 'lucide-react';

import './App.css';

import Nav from './components/Nav/Nav';
import Background from './components/Background/Background';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Education from './components/Education/Education';
import Skills from './components/Skills/Skills';
import Stats from './components/Stats/Stats';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Certifications from './components/Certifications/Certifications';
import Achievements from './components/Achievements/Achievements';
import Journey from './components/Journey/Journey';
import Community from './components/Community/Community';
import Exploring from './components/Exploring/Exploring';
import Contact from './components/Contact/Contact';

const Intro = lazy(() => import('./components/Intro/Intro'));

/* Official brand SVGs for footer */
const GH_SVG = (size = 15) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const LI_SVG = (size = 15) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const FOOTER_LINKS = [
  { svg: LI_SVG,    href: 'https://linkedin.com/in/mukeshram-s',           label: 'LinkedIn' },
  { svg: GH_SVG,    href: 'https://github.com/Mukeshram-07',               label: 'GitHub'   },
  { Icon: FileText, href: 'https://drive.google.com/file/d/1FVeMv8ZmxI0KycH5mXR8wj7XsVcwmRzn/view', label: 'Resume' },
  { Icon: Globe,    href: 'https://mukeshramdatascience.blogspot.com/',     label: 'Blog'     },
];

const iconBtnStyle = {
  width: '34px', height: '34px',
  borderRadius: '9px',
  background: 'var(--surface3)',
  border: '1px solid var(--border)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: 'var(--text3)',
  transition: 'color 0.2s ease, border-color 0.2s ease, background 0.2s ease',
  flexShrink: 0,
};

function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{
      position: 'relative', zIndex: 1,
      borderTop: '1px solid var(--border)',
      padding: '2.5rem 2rem',
      background: 'var(--bg)',
    }}>
      <div style={{
        maxWidth: '1120px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
        gap: '2rem', alignItems: 'center',
      }}>
        {/* Branding */}
        <div>
          <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.3rem', letterSpacing: '-0.01em' }}>
            Mukeshram S
          </p>
          <p style={{ fontSize: '0.78rem', color: 'var(--text3)', lineHeight: 1.55 }}>
            Machine Learning Engineer<br/>Building AI that solves real-world problems.
          </p>
        </div>

        {/* Quick links */}
        <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[['Projects','#projects'],['Experience','#experience'],['Contact','#contact']].map(([label, href]) => (
            <a key={label} href={href} style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text3)', transition: 'color 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--blue-light)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
            >{label}</a>
          ))}
        </div>

        {/* Social icons + back to top */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          {FOOTER_LINKS.map(({ svg, Icon, href, label }) => (
            <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
              aria-label={label} whileHover={{ y: -2 }}
              style={iconBtnStyle}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--blue-light)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; e.currentTarget.style.background = 'rgba(99,102,241,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface3)'; }}
            >
              {svg ? svg(15) : <Icon size={15} strokeWidth={1.75} />}
            </motion.a>
          ))}

          <motion.button onClick={scrollTop} aria-label="Back to top"
            whileHover={{ y: -2 }}
            style={{
              width: '34px', height: '34px', borderRadius: '9px',
              background: 'var(--grad2)', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(79,70,229,0.35)',
            }}
          >
            <ArrowUp size={15} strokeWidth={2.5} aria-hidden="true" />
          </motion.button>
        </div>
      </div>

      {/* Copyright */}
      <div style={{
        maxWidth: '1120px', margin: '1.5rem auto 0',
        paddingTop: '1.25rem', borderTop: '1px solid var(--border)',
        display: 'flex', justifyContent: 'center',
      }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>
          © 2026 Mukeshram S — Machine Learning Engineer. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('introSeen')) {
      setIntroDone(true);
    }
    // Always force dark mode
    document.body.classList.remove('light');
    localStorage.removeItem('theme');
  }, []);

  const handleIntroDone = () => {
    sessionStorage.setItem('introSeen', '1');
    setIntroDone(true);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!introDone && (
          <Suspense fallback={null}>
            <Intro key="intro" onDone={handleIntroDone} />
          </Suspense>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {introDone && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }}
          >
            <ScrollProgress />
            <Background />
            <Nav />

            <main id="main-content">
              <Hero />
              <About />
              <Skills />
              <Stats />
              <Projects />
              <Experience />
              <Education />
              <Certifications />
              <Achievements />
              <Journey />
              <Community />
              <Exploring />
              <Contact />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
