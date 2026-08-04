const SIMPLE_ICONS_BASE = 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/';

/* Custom inline SVGs — used for icons that are broken/unavailable on CDN
   or need special rendering */
const CUSTOM_ICONS = {
  /* ── Broken on CDN → replaced with reliable inline SVGs ── */
  langchain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
    </svg>
  ),
  huggingface: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8.5" cy="9.5" r="1.2" fill="currentColor"/>
      <circle cx="15.5" cy="9.5" r="1.2" fill="currentColor"/>
      <path d="M8 14.5c1 1.5 2.5 2 4 2s3-0.5 4-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <path d="M9 8c0-1 0.5-1.8 1.5-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M15 8c0-1-0.5-1.8-1.5-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),

  /* ── C++ (not in simple-icons as cplusplus) ── */
  cplusplus: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M10.5 15.97l.41 2.44c-.26.14-.68.27-1.24.39-.57.13-1.24.2-2.01.2-2.21-.04-3.87-.7-4.98-1.96C1.57 15.77 1 14.16 1 12.21c.05-2.31.72-4.08 2-5.32C4.32 5.64 5.96 5 7.94 5c.75 0 1.4.07 1.94.19s.9.25 1.06.4l-.58 2.49-1.08-.34c-.4-.1-.86-.15-1.39-.15-1.16-.01-2.12.36-2.87 1.1-.76.73-1.15 1.85-1.18 3.34 0 1.36.37 2.42 1.08 3.2.71.77 1.71 1.17 2.99 1.17.53 0 1.01-.05 1.44-.15l1.15-.28M13 11h2V9h2v2h2v2h-2v2h-2v-2h-2v-2M21 11h2v2h-2v-2z"/>
    </svg>
  ),

  /* ── Custom domain icons ── */
  'custom-rest': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M4 6h16M4 12h10M4 18h7"/>
      <circle cx="19" cy="12" r="2.5"/>
      <circle cx="19" cy="18" r="2.5"/>
    </svg>
  ),
  'custom-chroma': (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="7" rx="8" ry="3" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M4 7v5c0 1.66 3.58 3 8 3s8-1.34 8-3V7" stroke="currentColor" strokeWidth="1.6" fill="none"/>
      <path d="M4 12v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" stroke="currentColor" strokeWidth="1.6" fill="none"/>
    </svg>
  ),
  'custom-st': (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="8" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="14" y="8" width="8" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M10 12h4M10 16h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  'custom-matplotlib': (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polyline points="2,20 7,13 11,16 16,9 22,4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="2" y1="23" x2="22" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="2" y1="4" x2="2" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  ollama: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8.5" cy="10.5" r="1.5" fill="currentColor"/>
      <circle cx="15.5" cy="10.5" r="1.5" fill="currentColor"/>
      <path d="M8.5 15.5c.8.8 2 1.2 3.5 1.2s2.7-.4 3.5-1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  'custom-rag': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      <line x1="9" y1="10" x2="15" y2="10"/>
      <line x1="9" y1="13" x2="13" y2="13"/>
    </svg>
  ),
  'custom-prompt': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <polyline points="4 17 10 11 4 5"/>
      <line x1="12" y1="19" x2="20" y2="19"/>
    </svg>
  ),
  'custom-etl': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="3" width="6" height="6" rx="1"/>
      <rect x="15" y="15" width="6" height="6" rx="1"/>
      <path d="M9 6h3a3 3 0 013 3v1M15 18h-3a3 3 0 01-3-3v-1"/>
    </svg>
  ),
  'custom-datacleaning': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M3 6h18M3 12h12M3 18h8"/>
      <path d="M17 14l2 2 4-4"/>
    </svg>
  ),
  'custom-dataprocessing': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  ),
  'custom-feature': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <rect x="2" y="3" width="9" height="7" rx="1"/>
      <rect x="13" y="3" width="9" height="7" rx="1"/>
      <rect x="2" y="14" width="9" height="7" rx="1"/>
      <rect x="13" y="14" width="9" height="7" rx="1"/>
    </svg>
  ),
};

export default function SkillIcon({ icon, name, size = 16 }) {
  if (CUSTOM_ICONS[icon]) {
    const IconSvg = CUSTOM_ICONS[icon];
    return (
      <span
        style={{
          width: size,
          height: size,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: 'var(--text2)',
        }}
        aria-hidden="true"
      >
        <svg
          viewBox={IconSvg.props.viewBox}
          fill={IconSvg.props.fill}
          stroke={IconSvg.props.stroke}
          strokeWidth={IconSvg.props.strokeWidth}
          strokeLinecap={IconSvg.props.strokeLinecap}
          strokeLinejoin={IconSvg.props.strokeLinejoin}
          aria-hidden="true"
          style={{ width: size, height: size }}
        >
          {IconSvg.props.children}
        </svg>
      </span>
    );
  }

  return (
    <img
      src={`${SIMPLE_ICONS_BASE}${icon}.svg`}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      aria-hidden="true"
      style={{
        filter: 'brightness(0) invert(0.75)',
        opacity: 0.9,
        flexShrink: 0,
      }}
    />
  );
}
