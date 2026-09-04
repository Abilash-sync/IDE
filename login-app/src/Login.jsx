// ## This is from .github/copilot-instructions.md
// ## This is from .codestudio/codestudio-instructions.md

import { useState } from 'react';

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%)',
    fontFamily: "'Georgia', 'Times New Roman', serif",
  },
  card: {
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.10)',
    borderRadius: '4px',
    padding: '52px 48px 48px',
    width: '100%',
    maxWidth: '380px',
    boxShadow: '0 32px 80px rgba(0,0,0,0.55)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    position: 'relative',
  },
  accentBar: {
    position: 'absolute',
    top: 0,
    left: '48px',
    right: '48px',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #c8a96e, transparent)',
    borderRadius: '0 0 2px 2px',
  },
  heading: {
    margin: '0 0 6px 0',
    fontSize: '26px',
    fontWeight: '400',
    letterSpacing: '0.04em',
    color: '#f0ece4',
    textAlign: 'center',
  },
  subtext: {
    margin: '0 0 36px 0',
    fontSize: '12px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#c8a96e',
    textAlign: 'center',
  },
  fieldGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '11px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'rgba(240, 236, 228, 0.45)',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '3px',
    color: '#f0ece4',
    fontSize: '14px',
    letterSpacing: '0.02em',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  },
  inputFocus: {
    borderColor: '#c8a96e',
  },
  button: {
    width: '100%',
    padding: '13px',
    marginTop: '8px',
    background: 'linear-gradient(135deg, #c8a96e 0%, #a07840 100%)',
    border: 'none',
    borderRadius: '3px',
    color: '#0f0c29',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0.20em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'opacity 0.2s, transform 0.15s',
    fontFamily: 'inherit',
  },
  buttonHover: {
    opacity: 0.88,
    transform: 'translateY(-1px)',
  },
  statusMsg: {
    marginTop: '18px',
    textAlign: 'center',
    fontSize: '13px',
    letterSpacing: '0.02em',
    minHeight: '20px',
  },
  forgotRow: {
    textAlign: 'right',
    marginTop: '-10px',
    marginBottom: '24px',
  },
  forgotLink: {
    fontSize: '11px',
    letterSpacing: '0.08em',
    color: 'rgba(200, 169, 110, 0.7)',
    textDecoration: 'none',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    fontFamily: 'inherit',
  },
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setStatus('error');
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setStatus('error');
      setErrorMsg('Please enter your password.');
      return;
    }

    setStatus('loading');
    // Simulate async sign-in
    setTimeout(() => {
      if (email === 'demo@example.com' && password === 'password') {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg('Invalid credentials. Try demo@example.com / password');
      }
    }, 1100);
  };

  const statusColor = {
    success: '#6ee7b7',
    error: '#f87171',
    loading: 'rgba(240,236,228,0.5)',
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.accentBar} />
        <h1 style={styles.heading}>Welcome back</h1>
        <p style={styles.subtext}>Sign in to continue</p>

        <form onSubmit={handleSubmit} noValidate>
          <div style={styles.fieldGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              style={{
                ...styles.input,
                ...(emailFocused ? styles.inputFocus : {}),
              }}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              style={{
                ...styles.input,
                ...(passwordFocused ? styles.inputFocus : {}),
              }}
            />
          </div>

          <div style={styles.forgotRow}>
            <button type="button" style={styles.forgotLink}>Forgot password?</button>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            style={{
              ...styles.button,
              ...(btnHover && status !== 'loading' ? styles.buttonHover : {}),
              ...(status === 'loading' ? { opacity: 0.6, cursor: 'not-allowed' } : {}),
            }}
          >
            {status === 'loading' ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        {status && (
          <p style={{ ...styles.statusMsg, color: statusColor[status] }}>
            {status === 'success' && '✓ Signed in successfully'}
            {status === 'error' && errorMsg}
            {status === 'loading' && 'Authenticating…'}
          </p>
        )}
      </div>
    </div>
  );
}
