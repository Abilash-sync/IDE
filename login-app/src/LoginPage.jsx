// ## This is from .github/copilot-instructions.md
// ## This is from .codestudio/codestudio-instructions.md

import { useState } from 'react'

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0f0f0f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Georgia', 'Times New Roman', serif",
    padding: '24px',
    position: 'relative',
    overflow: 'hidden',
  },
  noise: {
    position: 'fixed',
    inset: 0,
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'repeat',
    backgroundSize: '200px 200px',
    pointerEvents: 'none',
    zIndex: 0,
  },
  glow: {
    position: 'fixed',
    top: '-30%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '600px',
    height: '400px',
    background: 'radial-gradient(ellipse, rgba(207,160,90,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  card: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '420px',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '4px',
    padding: '56px 48px 48px',
    background: 'rgba(18,18,18,0.95)',
    boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.04) inset',
  },
  eyebrow: {
    fontSize: '10px',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: '#cf9e4e',
    marginBottom: '20px',
    display: 'block',
  },
  heading: {
    fontSize: '30px',
    fontWeight: '400',
    color: '#f0ebe2',
    margin: '0 0 6px',
    lineHeight: '1.15',
    letterSpacing: '-0.02em',
  },
  subheading: {
    fontSize: '14px',
    color: 'rgba(240,235,226,0.38)',
    margin: '0 0 44px',
    lineHeight: '1.5',
  },
  divider: {
    width: '32px',
    height: '1px',
    background: 'rgba(207,160,90,0.4)',
    margin: '20px 0 32px',
    border: 'none',
  },
  fieldWrap: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(240,235,226,0.5)',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '3px',
    padding: '12px 14px',
    fontSize: '14px',
    color: '#f0ebe2',
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
    letterSpacing: '0.01em',
  },
  inputFocus: {
    borderColor: 'rgba(207,160,90,0.6)',
    borderTopColor: '#cf9e4e',
    background: 'rgba(207,160,90,0.04)',
  },
  forgotRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '6px',
  },
  forgotLink: {
    fontSize: '12px',
    color: 'rgba(207,160,90,0.65)',
    textDecoration: 'none',
    letterSpacing: '0.02em',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  },
  button: {
    marginTop: '32px',
    width: '100%',
    padding: '13px 0',
    background: '#cf9e4e',
    color: '#0f0f0f',
    border: 'none',
    borderRadius: '3px',
    fontSize: '12px',
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontWeight: '700',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'background 0.18s, transform 0.1s',
  },
  buttonHover: {
    background: '#ddb060',
  },
  buttonActive: {
    transform: 'scale(0.985)',
  },
  footer: {
    marginTop: '32px',
    textAlign: 'center',
    fontSize: '13px',
    color: 'rgba(240,235,226,0.28)',
  },
  footerLink: {
    color: 'rgba(207,160,90,0.75)',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  errorBanner: {
    background: 'rgba(220,60,60,0.12)',
    border: '1px solid rgba(220,60,60,0.3)',
    borderRadius: '3px',
    color: '#e07070',
    fontSize: '13px',
    padding: '10px 14px',
    marginBottom: '20px',
    lineHeight: '1.5',
  },
  successBanner: {
    background: 'rgba(80,180,120,0.12)',
    border: '1px solid rgba(80,180,120,0.3)',
    borderRadius: '3px',
    color: '#70c898',
    fontSize: '13px',
    padding: '10px 14px',
    marginBottom: '20px',
    lineHeight: '1.5',
    textAlign: 'center',
  },
  spinner: {
    display: 'inline-block',
    width: '14px',
    height: '14px',
    border: '2px solid rgba(15,15,15,0.3)',
    borderTopColor: '#0f0f0f',
    borderRadius: '50%',
    animation: 'spin 0.7s linear infinite',
    verticalAlign: 'middle',
    marginRight: '8px',
  },
}

function Field({ label, type, value, onChange, placeholder, id, autoComplete }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={styles.fieldWrap}>
      <label htmlFor={id} style={styles.label}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...styles.input,
          ...(focused ? styles.inputFocus : {}),
        }}
      />
    </div>
  )
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [btnHover, setBtnHover] = useState(false)
  const [btnActive, setBtnActive] = useState(false)

  const validate = () => {
    if (!email.trim()) return 'Email is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address.'
    if (!password) return 'Password is required.'
    if (password.length < 6) return 'Password must be at least 6 characters.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }
    setLoading(true)
    // Simulate async sign-in (replace with real auth call)
    await new Promise((r) => setTimeout(r, 1400))
    setLoading(false)
    setSuccess(true)
  }

  return (
    <div style={styles.page}>
      {/* Atmospheric layers */}
      <div style={styles.noise} aria-hidden="true" />
      <div style={styles.glow} aria-hidden="true" />

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <main style={styles.card} role="main">
        <span style={styles.eyebrow}>Welcome back</span>
        <h1 style={styles.heading}>Sign In</h1>
        <p style={styles.subheading}>Access your account to continue.</p>
        <hr style={styles.divider} />

        {error && <div role="alert" style={styles.errorBanner}>{error}</div>}
        {success && (
          <div role="status" style={styles.successBanner}>
            ✓ &nbsp;Signed in successfully.
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} noValidate>
            <Field
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
            <Field
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <div style={styles.forgotRow}>
              <button type="button" style={styles.forgotLink}>Forgot password?</button>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                ...(btnHover && !loading ? styles.buttonHover : {}),
                ...(btnActive ? styles.buttonActive : {}),
                ...(loading ? { opacity: 0.75, cursor: 'not-allowed' } : {}),
              }}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => { setBtnHover(false); setBtnActive(false) }}
              onMouseDown={() => setBtnActive(true)}
              onMouseUp={() => setBtnActive(false)}
            >
              {loading ? (
                <>
                  <span style={styles.spinner} aria-hidden="true" />
                  Signing in…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        )}

        <p style={styles.footer}>
          Don't have an account?{' '}
          <button type="button" style={styles.footerLink}>Create one</button>
        </p>
      </main>
    </div>
  )
}
