// This is from .github/copilot-instructions.md
// This is from .codestudio/codestudio-instructions.md
// AGENTS_MD_VERIFIED

import { useState } from 'react'

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
  },
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '48px 40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '8px',
  },
  logoCircle: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoSvg: {
    width: '26px',
    height: '26px',
    fill: 'none',
    stroke: '#fff',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  heading: {
    textAlign: 'center',
    fontSize: '26px',
    fontWeight: '700',
    color: '#111827',
    margin: '20px 0 6px',
  },
  subheading: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '32px',
  },
  fieldGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '6px',
    letterSpacing: '0.02em',
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '11px 14px',
    fontSize: '15px',
    border: '1.5px solid #d1d5db',
    borderRadius: '10px',
    outline: 'none',
    background: '#f9fafb',
    color: '#111827',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  inputFocus: {
    borderColor: '#6366f1',
    boxShadow: '0 0 0 3px rgba(99,102,241,0.15)',
    background: '#fff',
  },
  inputError: {
    borderColor: '#ef4444',
    boxShadow: '0 0 0 3px rgba(239,68,68,0.12)',
  },
  errorText: {
    fontSize: '12px',
    color: '#ef4444',
    marginTop: '5px',
  },
  forgotRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '-12px',
    marginBottom: '24px',
  },
  forgotLink: {
    fontSize: '13px',
    color: '#6366f1',
    textDecoration: 'none',
    fontWeight: '500',
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    padding: '13px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    letterSpacing: '0.02em',
    transition: 'opacity 0.2s, transform 0.1s',
  },
  buttonHover: {
    opacity: '0.92',
    transform: 'translateY(-1px)',
  },
  buttonDisabled: {
    opacity: '0.6',
    cursor: 'not-allowed',
    transform: 'none',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: '24px 0',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: '#e5e7eb',
  },
  dividerText: {
    fontSize: '12px',
    color: '#9ca3af',
    whiteSpace: 'nowrap',
  },
  signupRow: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#6b7280',
  },
  signupLink: {
    color: '#6366f1',
    fontWeight: '600',
    textDecoration: 'none',
    cursor: 'pointer',
    marginLeft: '4px',
  },
  successBanner: {
    background: '#f0fdf4',
    border: '1px solid #86efac',
    borderRadius: '10px',
    padding: '12px 16px',
    marginBottom: '20px',
    fontSize: '14px',
    color: '#15803d',
    textAlign: 'center',
  },
}

function validate(email, password) {
  const errors = {}
  if (!email) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!password) {
    errors.password = 'Password is required.'
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters.'
  }
  return errors
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [focusedField, setFocusedField] = useState(null)
  const [buttonHovered, setButtonHovered] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(email, password)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1200)
  }

  const emailInputStyle = {
    ...styles.input,
    ...(focusedField === 'email' ? styles.inputFocus : {}),
    ...(errors.email ? styles.inputError : {}),
  }

  const passwordInputStyle = {
    ...styles.input,
    ...(focusedField === 'password' ? styles.inputFocus : {}),
    ...(errors.password ? styles.inputError : {}),
  }

  const buttonStyle = {
    ...styles.button,
    ...(loading ? styles.buttonDisabled : {}),
    ...(buttonHovered && !loading ? styles.buttonHover : {}),
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logoWrapper}>
          <div style={styles.logoCircle}>
            <svg style={styles.logoSvg} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>

        <h1 style={styles.heading}>Welcome back</h1>
        <p style={styles.subheading}>Sign in to your account to continue</p>

        {success && (
          <div style={styles.successBanner} role="status">
            ✓ Signed in successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div style={styles.fieldGroup}>
            <label htmlFor="email" style={styles.label}>
              Email address
            </label>
            <div style={styles.inputWrapper}>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
                }}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                style={emailInputStyle}
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={!!errors.email}
              />
            </div>
            {errors.email && (
              <p id="email-error" style={styles.errorText} role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <div style={styles.inputWrapper}>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
                }}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                style={passwordInputStyle}
                aria-describedby={errors.password ? 'password-error' : undefined}
                aria-invalid={!!errors.password}
              />
            </div>
            {errors.password && (
              <p id="password-error" style={styles.errorText} role="alert">
                {errors.password}
              </p>
            )}
          </div>

          <div style={styles.forgotRow}>
            <a href="#" style={styles.forgotLink}>
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            style={buttonStyle}
            disabled={loading}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>Don't have an account?</span>
          <div style={styles.dividerLine} />
        </div>

        <p style={styles.signupRow}>
          New here?
          <a href="#" style={styles.signupLink}>
            Create an account
          </a>
        </p>
      </div>
    </div>
  )
}
