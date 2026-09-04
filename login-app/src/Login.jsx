// ## This is from .github/copilot-instructions.md
// ## This is from .codestudio/codestudio-instructions.md
// ## AGENTS_MD_VERIFIED ##

import { useState } from 'react';

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'radial-gradient(ellipse at 60% 40%, #1a1612 0%, #0d0b09 60%, #060504 100%)',
    fontFamily: "'Georgia', 'Times New Roman', serif",
    position: 'relative',
    overflow: 'hidden',
  },
  grain: {
    position: 'fixed',
    inset: 0,
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'repeat',
    backgroundSize: '180px',
    pointerEvents: 'none',
    zIndex: 0,
    opacity: 0.45,
  },
  glowLeft: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(184,143,72,0.07) 0%, transparent 70%)',
    top: '-100px',
    left: '-120px',
    pointerEvents: 'none',
  },
  glowRight: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(184,143,72,0.05) 0%, transparent 70%)',
    bottom: '-80px',
    right: '-80px',
    pointerEvents: 'none',
  },
  card: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '420px',
    margin: '0 20px',
    background: 'linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
    border: '1px solid rgba(184,143,72,0.18)',
    borderRadius: '6px',
    padding: '52px 48px 48px',
    boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03) inset',
    backdropFilter: 'blur(10px)',
  },
  monogram: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '36px',
  },
  monogramInner: {
    width: '48px',
    height: '48px',
    border: '1px solid rgba(184,143,72,0.5)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#b88f48',
    fontSize: '20px',
    letterSpacing: '2px',
    fontStyle: 'italic',
    background: 'rgba(184,143,72,0.06)',
  },
  heading: {
    color: '#f0e8d6',
    fontSize: '26px',
    fontWeight: 400,
    letterSpacing: '0.04em',
    textAlign: 'center',
    margin: '0 0 6px',
    fontStyle: 'italic',
  },
  subheading: {
    color: 'rgba(184,143,72,0.7)',
    fontSize: '11px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    textAlign: 'center',
    margin: '0 0 40px',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
  divider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(184,143,72,0.25), transparent)',
    margin: '0 0 36px',
  },
  fieldGroup: {
    marginBottom: '22px',
  },
  label: {
    display: 'block',
    color: 'rgba(184,143,72,0.8)',
    fontSize: '10px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    marginBottom: '8px',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '3px',
    padding: '13px 16px',
    color: '#f0e8d6',
    fontSize: '15px',
    fontFamily: "'Georgia', 'Times New Roman', serif",
    letterSpacing: '0.03em',
    outline: 'none',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease',
  },
  inputFocus: {
    borderColor: 'rgba(184,143,72,0.55)',
    background: 'rgba(184,143,72,0.04)',
    boxShadow: '0 0 0 3px rgba(184,143,72,0.08)',
  },
  forgotRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '8px',
    marginBottom: '32px',
  },
  forgotLink: {
    color: 'rgba(184,143,72,0.55)',
    fontSize: '11px',
    letterSpacing: '0.08em',
    textDecoration: 'none',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  button: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #b88f48 0%, #d4a84b 50%, #b88f48 100%)',
    backgroundSize: '200% 100%',
    border: 'none',
    borderRadius: '3px',
    color: '#0d0b09',
    fontSize: '12px',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-position 0.4s ease, transform 0.15s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 20px rgba(184,143,72,0.25)',
  },
  buttonHover: {
    backgroundPosition: '100% 0',
    boxShadow: '0 6px 28px rgba(184,143,72,0.4)',
    transform: 'translateY(-1px)',
  },
  buttonActive: {
    transform: 'translateY(0px)',
  },
  buttonLoading: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  footer: {
    marginTop: '28px',
    textAlign: 'center',
    color: 'rgba(240,232,214,0.3)',
    fontSize: '11px',
    letterSpacing: '0.12em',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif',",
  },
  footerLink: {
    color: 'rgba(184,143,72,0.65)',
    cursor: 'pointer',
    textDecoration: 'none',
    marginLeft: '4px',
  },
  successBanner: {
    background: 'rgba(72,184,100,0.12)',
    border: '1px solid rgba(72,184,100,0.25)',
    borderRadius: '3px',
    color: '#80e09a',
    fontSize: '12px',
    letterSpacing: '0.1em',
    textAlign: 'center',
    padding: '12px',
    marginBottom: '20px',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
  errorBanner: {
    background: 'rgba(184,72,72,0.12)',
    border: '1px solid rgba(184,72,72,0.25)',
    borderRadius: '3px',
    color: '#e08080',
    fontSize: '12px',
    letterSpacing: '0.1em',
    textAlign: 'center',
    padding: '12px',
    marginBottom: '20px',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [btnState, setBtnState] = useState('idle'); // idle | hover | active | loading
  const [status, setStatus] = useState(null); // null | 'success' | 'error'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setStatus('error');
      return;
    }
    setStatus(null);
    setBtnState('loading');
    setTimeout(() => {
      setBtnState('idle');
      setStatus('success');
    }, 1400);
  };

  const getInputStyle = (field) => ({
    ...styles.input,
    ...(focusedField === field ? styles.inputFocus : {}),
  });

  const getButtonStyle = () => ({
    ...styles.button,
    ...(btnState === 'hover' ? styles.buttonHover : {}),
    ...(btnState === 'active' ? styles.buttonActive : {}),
    ...(btnState === 'loading' ? styles.buttonLoading : {}),
  });

  return (
    <div style={styles.page}>
      <div style={styles.grain} aria-hidden="true" />
      <div style={styles.glowLeft} aria-hidden="true" />
      <div style={styles.glowRight} aria-hidden="true" />

      <div style={styles.card} role="main">
        <div style={styles.monogram}>
          <div style={styles.monogramInner}>A</div>
        </div>

        <h1 style={styles.heading}>Welcome back</h1>
        <p style={styles.subheading}>Sign in to continue</p>
        <div style={styles.divider} />

        {status === 'success' && (
          <div style={styles.successBanner} role="alert">
            ✓ &nbsp; Signed in successfully
          </div>
        )}
        {status === 'error' && (
          <div style={styles.errorBanner} role="alert">
            Please enter your email and password.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div style={styles.fieldGroup}>
            <label htmlFor="email" style={styles.label}>Email address</label>
            <div style={styles.inputWrapper}>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="you@example.com"
                style={getInputStyle('email')}
                aria-required="true"
              />
            </div>
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                placeholder="••••••••••"
                style={getInputStyle('password')}
                aria-required="true"
              />
            </div>
          </div>

          <div style={styles.forgotRow}>
            <a
              href="#"
              style={styles.forgotLink}
              onClick={(e) => e.preventDefault()}
              tabIndex={0}
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={btnState === 'loading'}
            style={getButtonStyle()}
            onMouseEnter={() => btnState === 'idle' && setBtnState('hover')}
            onMouseLeave={() => setBtnState('idle')}
            onMouseDown={() => setBtnState('active')}
            onMouseUp={() => setBtnState('hover')}
          >
            {btnState === 'loading' ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account?
          <a
            href="#"
            style={styles.footerLink}
            onClick={(e) => e.preventDefault()}
          >
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
