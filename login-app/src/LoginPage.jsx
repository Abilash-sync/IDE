// ## This is from .github/copilot-instructions.md
// ## This is from .codestudio/codestudio-instructions.md
// ## AGENTS_MD_VERIFIED ##

import { useState } from "react";

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f0f13 0%, #1a1a24 50%, #0f0f13 100%)",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    position: "relative",
    overflow: "hidden",
  },
  noise: {
    position: "fixed",
    inset: 0,
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
    pointerEvents: "none",
    zIndex: 0,
  },
  glow: {
    position: "absolute",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: "400px",
    margin: "0 24px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "48px 40px 44px",
    boxShadow:
      "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)",
    backdropFilter: "blur(20px)",
  },
  eyebrow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "32px",
  },
  dot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#6366f1",
    boxShadow: "0 0 8px rgba(99,102,241,0.8)",
  },
  eyebrowText: {
    fontSize: "11px",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.35)",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "400",
    color: "#f0f0f5",
    marginBottom: "8px",
    letterSpacing: "-0.5px",
    lineHeight: 1.2,
  },
  subheading: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.3)",
    marginBottom: "36px",
    letterSpacing: "0.01em",
  },
  fieldWrap: {
    marginBottom: "18px",
  },
  label: {
    display: "block",
    fontSize: "12px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.4)",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "13px 16px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    color: "#e8e8f0",
    fontSize: "15px",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s, background 0.2s",
    letterSpacing: "0.01em",
  },
  inputFocused: {
    background: "rgba(99,102,241,0.07)",
    border: "1px solid rgba(99,102,241,0.5)",
  },
  forgotRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "28px",
    marginTop: "-6px",
  },
  forgotLink: {
    fontSize: "12px",
    color: "rgba(99,102,241,0.7)",
    cursor: "pointer",
    letterSpacing: "0.02em",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "15px",
    fontFamily: "inherit",
    fontWeight: "600",
    letterSpacing: "0.04em",
    cursor: "pointer",
    transition: "opacity 0.2s, transform 0.1s, box-shadow 0.2s",
    boxShadow: "0 4px 24px rgba(99,102,241,0.35)",
    position: "relative",
    overflow: "hidden",
  },
  buttonHovered: {
    opacity: 0.9,
    boxShadow: "0 6px 32px rgba(99,102,241,0.5)",
  },
  buttonActive: {
    transform: "scale(0.985)",
    opacity: 0.85,
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "28px 0",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "rgba(255,255,255,0.07)",
  },
  dividerText: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.2)",
    letterSpacing: "0.08em",
  },
  footer: {
    textAlign: "center",
    fontSize: "13px",
    color: "rgba(255,255,255,0.25)",
  },
  footerLink: {
    color: "#6366f1",
    cursor: "pointer",
    textDecoration: "none",
  },
  errorText: {
    fontSize: "12px",
    color: "#f87171",
    marginTop: "6px",
    letterSpacing: "0.02em",
  },
  successBanner: {
    background: "rgba(52,211,153,0.1)",
    border: "1px solid rgba(52,211,153,0.25)",
    borderRadius: "8px",
    padding: "12px 16px",
    marginBottom: "20px",
    fontSize: "13px",
    color: "#34d399",
    textAlign: "center",
    letterSpacing: "0.02em",
  },
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const errs = {};
    if (!email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Enter a valid email address.";
    }
    if (!password) {
      errs.password = "Password is required.";
    } else if (password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.noise} />
      <div style={styles.glow} />

      <div style={styles.card}>
        {/* Eyebrow */}
        <div style={styles.eyebrow}>
          <div style={styles.dot} />
          <span style={styles.eyebrowText}>Secure Access</span>
        </div>

        {/* Heading */}
        <h1 style={styles.heading}>Welcome back.</h1>
        <p style={styles.subheading}>Sign in to continue to your account.</p>

        {/* Success banner */}
        {submitted && (
          <div style={styles.successBanner}>
            ✓ Signed in successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div style={styles.fieldWrap}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setSubmitted(false); }}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              style={{
                ...styles.input,
                ...(emailFocused ? styles.inputFocused : {}),
                ...(errors.email ? { borderColor: "rgba(248,113,113,0.5)" } : {}),
              }}
            />
            {errors.email && <div style={styles.errorText}>{errors.email}</div>}
          </div>

          {/* Password */}
          <div style={styles.fieldWrap}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setSubmitted(false); }}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              style={{
                ...styles.input,
                ...(passwordFocused ? styles.inputFocused : {}),
                ...(errors.password ? { borderColor: "rgba(248,113,113,0.5)" } : {}),
              }}
            />
            {errors.password && <div style={styles.errorText}>{errors.password}</div>}
          </div>

          {/* Forgot password */}
          <div style={styles.forgotRow}>
            <a href="#" style={styles.forgotLink}>Forgot password?</a>
          </div>

          {/* Sign In button */}
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(btnHovered ? styles.buttonHovered : {}),
              ...(btnActive ? styles.buttonActive : {}),
            }}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => { setBtnHovered(false); setBtnActive(false); }}
            onMouseDown={() => setBtnActive(true)}
            onMouseUp={() => setBtnActive(false)}
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>OR</span>
          <div style={styles.dividerLine} />
        </div>

        {/* Footer */}
        <p style={styles.footer}>
          Don&apos;t have an account?{" "}
          <a href="#" style={styles.footerLink}>Create one</a>
        </p>
      </div>
    </div>
  );
}
