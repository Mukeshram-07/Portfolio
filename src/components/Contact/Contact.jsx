import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, FileText, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';
import styles from './Contact.module.css';
import { PERSON } from '../../data/portfolioData';

/* ── Google Apps Script endpoint ──────────────────────── */
const GAS_URL =
  'https://script.google.com/macros/s/AKfycbyw11msQusBBXyLm5BOtTv3-TvwE9648TBKDlTIqsx4jahc7xehV7s2eu9q9xiOba-b/exec';

const MAX_MSG = 1000;
const MIN_MSG = 20;

/* ── Official brand SVGs ────────────────────────────────── */
const GH_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);
const LI_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const SOCIAL_LINKS = [
  { svg: LI_SVG,    label: 'LinkedIn', href: PERSON.linkedin },
  { svg: GH_SVG,    label: 'GitHub',   href: PERSON.github   },
  { Icon: FileText, label: 'Resume',   href: PERSON.resume   },
];

/* ── Email regex ─────────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── validateForm() ─────────────────────────────────────── */
function validateForm({ name, email, subject, message }) {
  if (!name)                          return 'Name is required.';
  if (!email)                         return 'Email is required.';
  if (!EMAIL_RE.test(email))          return 'Please enter a valid email address.';
  if (!subject)                       return 'Subject is required.';
  if (!message)                       return 'Message is required.';
  if (message.length < MIN_MSG)       return `Message must be at least ${MIN_MSG} characters.`;
  if (message.length > MAX_MSG)       return `Message cannot exceed ${MAX_MSG} characters.`;
  return null; // valid
}

/* ── Simple premium input field ─────────────────────────── */
function Field({ id, label, type = 'text', name, value, onChange, isTextarea = false, disabled = false, autoComplete, hasError = false }) {
  return (
    <div className={`${styles.fieldGroup} ${hasError ? styles.hasError : ''}`}>
      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={label}
          required
          aria-required="true"
          aria-label={label}
          disabled={disabled}
          autoComplete="off"
          maxLength={MAX_MSG}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={label}
          required
          aria-required="true"
          aria-label={label}
          disabled={disabled}
          autoComplete={autoComplete}
        />
      )}
    </div>
  );
}

/* ── Spinner SVG ─────────────────────────────────────────── */
function Spinner() {
  return (
    <Loader2
      size={15}
      aria-hidden="true"
      className={styles.spinner}
    />
  );
}

/* ── Send button with ripple ─────────────────────────────── */
function SendButton({ loading, disabled }) {
  const [ripples, setRipples] = useState([]);
  const ref = useRef(null);

  const handleClick = (e) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const id = Date.now();
    setRipples(p => [...p, { id, x: e.clientX - rect.left - size / 2, y: e.clientY - rect.top - size / 2, size }]);
    setTimeout(() => setRipples(p => p.filter(r => r.id !== id)), 600);
  };

  return (
    <motion.button
      ref={ref}
      type="submit"
      disabled={disabled}
      className={styles.sendBtn}
      onClick={handleClick}
      whileHover={!disabled ? { y: -2, scale: 1.01 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      aria-label={loading ? 'Sending message…' : 'Send message'}
    >
      {ripples.map(r => (
        <span
          key={r.id}
          className={styles.ripple}
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
        />
      ))}
      <span className={styles.sendBtnInner}>
        {loading ? <Spinner /> : <Send size={15} aria-hidden="true" />}
        <span>{loading ? 'Sending…' : 'Send Message'}</span>
      </span>
    </motion.button>
  );
}

/* ── Toast component ─────────────────────────────────────── */
function Toast({ type, message, onDismiss }) {
  return (
    <motion.div
      className={`${styles.toast} ${type === 'ok' ? styles.toastOk : styles.toastErr}`}
      initial={{ opacity: 0, y: -12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0,   scale: 1    }}
      exit={{    opacity: 0, y: -10, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      role="status"
      aria-live="polite"
    >
      {type === 'ok'
        ? <CheckCircle size={17} aria-hidden="true" className={styles.toastIcon} />
        : <XCircle     size={17} aria-hidden="true" className={styles.toastIcon} />
      }
      <span className={styles.toastText}>{message}</span>
      <button
        className={styles.toastClose}
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >×</button>
    </motion.div>
  );
}

/* ── Main Contact component ──────────────────────────────── */
export default function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading]  = useState(false);
  const [toast, setToast]      = useState(null); // { type: 'ok'|'err', message: '' }
  const submittingRef = useRef(false); // duplicate-submit guard

  /* ── resetForm() ── */
  const resetForm = useCallback(() => {
    setFields({ name: '', email: '', subject: '', message: '' });
    setErrors({});
  }, []);

  /* ── Field change handler ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    // Clear field-level error on change
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  /* ── Dismiss toast ── */
  const dismissToast = useCallback(() => setToast(null), []);

  /* ── handleSubmit() ── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (submittingRef.current) return;

    // Trim all fields
    const trimmed = {
      name:    fields.name.trim(),
      email:   fields.email.trim(),
      subject: fields.subject.trim(),
      message: fields.message.trim(),
    };

    // Run validation
    const validationError = validateForm(trimmed);
    if (validationError) {
      // Map error back to specific field for inline display
      const fieldMap = { Name: 'name', Email: 'email', Subject: 'subject', Message: 'message' };
      const matchedField = Object.keys(fieldMap).find(k => validationError.toLowerCase().includes(k.toLowerCase()));
      if (matchedField) {
        setErrors({ [fieldMap[matchedField]]: validationError });
      } else {
        setToast({ type: 'err', message: validationError });
      }
      return;
    }

    submittingRef.current = true;
    setLoading(true);
    setToast(null);

    try {
      await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors',           // bypass CORS preflight — GAS doesn't send CORS headers
        headers: { 'Content-Type': 'text/plain' }, // avoid triggering preflight
        body: JSON.stringify(trimmed),
      });

      // With no-cors the response is opaque — assume success if no network error
      resetForm();
      setToast({
        type: 'ok',
        message: 'Message sent successfully. Thank you for reaching out.',
      });
      setTimeout(() => setToast(null), 6000);
    } catch {
      setToast({
        type: 'err',
        message: 'Unable to send message. Please try again.',
      });
      setTimeout(() => setToast(null), 6000);
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  const msgLen   = fields.message.length;
  const isDisabled = loading;

  return (
    <section id="contact" className="section" aria-label="Contact">
      <SectionTitle title="Get In Touch" subtitle="Let's Connect" />

      <div className={styles.wrap}>
        {/* ── Toast ── */}
        <AnimatePresence>
          {toast && (
            <Toast
              type={toast.type}
              message={toast.message}
              onDismiss={dismissToast}
            />
          )}
        </AnimatePresence>

        {/* ── Form ── */}
        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
          aria-label="Contact form"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Name + Email row */}
          <div className={styles.formRow}>
            <div>
              <Field
                id="cf-name"
                label="Your Name"
                name="name"
                value={fields.name}
                onChange={handleChange}
                disabled={isDisabled}
                autoComplete="name"
                hasError={!!errors.name}
              />
              {errors.name && <p className={styles.fieldErr} role="alert">{errors.name}</p>}
            </div>
            <div>
              <Field
                id="cf-email"
                label="Email Address"
                type="email"
                name="email"
                value={fields.email}
                onChange={handleChange}
                disabled={isDisabled}
                autoComplete="email"
                hasError={!!errors.email}
              />
              {errors.email && <p className={styles.fieldErr} role="alert">{errors.email}</p>}
            </div>
          </div>

          {/* Subject */}
          <div>
            <Field
              id="cf-subject"
              label="Subject"
              name="subject"
              value={fields.subject}
              onChange={handleChange}
              disabled={isDisabled}
              autoComplete="off"
              hasError={!!errors.subject}
            />
            {errors.subject && <p className={styles.fieldErr} role="alert">{errors.subject}</p>}
          </div>

          {/* Message + char counter */}
          <div>
            <Field
              id="cf-msg"
              label="Your Message"
              name="message"
              value={fields.message}
              onChange={handleChange}
              isTextarea
              disabled={isDisabled}
              hasError={!!errors.message}
            />
            {errors.message && <p className={styles.fieldErr} role="alert">{errors.message}</p>}
            <p
              className={`${styles.charCount} ${msgLen > MAX_MSG * 0.9 ? styles.charCountWarn : ''}`}
              aria-live="polite"
              aria-label={`${msgLen} of ${MAX_MSG} characters`}
            >
              {msgLen} / {MAX_MSG}
            </p>
          </div>

          <SendButton loading={loading} disabled={isDisabled} />
        </motion.form>

        {/* ── Social links ── */}
        <motion.div
          className={styles.socials}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {SOCIAL_LINKS.map(({ svg, Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              whileHover={{ y: -2 }}
              aria-label={`${label} (opens in new tab)`}
            >
              {svg || (Icon && <Icon size={15} strokeWidth={1.75} aria-hidden="true" />)}
              <span>{label}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
