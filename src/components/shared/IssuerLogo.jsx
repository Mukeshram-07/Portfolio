const SI_BASE = 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/';

/* Custom inline fallback icons for issuers without CDN logos */
const CUSTOM_LOGOS = {
  /* Business Analyst → Briefcase */
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="12"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  ),
  /* Leadership & Management → Award */
  award: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6"/>
      <path d="M8 14.5L6 22l6-2 6 2-2-7.5"/>
    </svg>
  ),
  /* Data Analytics → Bar Chart */
  barchart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" y1="20" x2="4" y2="10"/>
      <line x1="10" y1="20" x2="10" y2="4"/>
      <line x1="16" y1="20" x2="16" y2="14"/>
      <line x1="22" y1="20" x2="22" y2="8"/>
      <line x1="2" y1="20" x2="24" y2="20"/>
    </svg>
  ),
  /* Generic fallback */
  fallback: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3"/>
      <path d="M9 12h6M12 9v6"/>
    </svg>
  ),
};

/* Map issuer names → custom icon keys */
const ISSUER_CUSTOM_MAP = {
  'Grow AI':                        'barchart',
  'Agile Enterprise, London':       'briefcase',
  'MTF Institute':                  'award',
};

export default function IssuerLogo({ icon, issuer, size = 20 }) {
  /* Check if this issuer has a custom inline icon */
  const customKey = issuer ? ISSUER_CUSTOM_MAP[issuer] : null;

  if (customKey) {
    const CustomIcon = CUSTOM_LOGOS[customKey];
    return (
      <span
        style={{
          width: size,
          height: size,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: 'var(--text3)',
        }}
        aria-hidden="true"
      >
        <svg
          viewBox={CustomIcon.props.viewBox}
          fill={CustomIcon.props.fill}
          stroke={CustomIcon.props.stroke}
          strokeWidth={CustomIcon.props.strokeWidth}
          strokeLinecap={CustomIcon.props.strokeLinecap}
          strokeLinejoin={CustomIcon.props.strokeLinejoin}
          aria-hidden="true"
          style={{ width: size, height: size }}
        >
          {CustomIcon.props.children}
        </svg>
      </span>
    );
  }

  /* No icon slug → generic fallback */
  if (!icon) {
    const FallbackIcon = CUSTOM_LOGOS.fallback;
    return (
      <span
        style={{
          width: size,
          height: size,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: 'var(--text3)',
        }}
        aria-hidden="true"
      >
        <svg
          viewBox={FallbackIcon.props.viewBox}
          fill={FallbackIcon.props.fill}
          stroke={FallbackIcon.props.stroke}
          strokeWidth={FallbackIcon.props.strokeWidth}
          strokeLinecap={FallbackIcon.props.strokeLinecap}
          aria-hidden="true"
          style={{ width: size, height: size }}
        >
          {FallbackIcon.props.children}
        </svg>
      </span>
    );
  }

  /* Use Simple Icons CDN */
  return (
    <img
      src={`${SI_BASE}${icon}.svg`}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      aria-hidden="true"
      style={{ filter: 'brightness(0) invert(0.7)', opacity: 0.88, flexShrink: 0 }}
    />
  );
}
