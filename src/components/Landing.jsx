import React from 'react'

export default function Landing({ onGetStarted }){
  return (
    <div className="page full center">
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(167, 139, 250, 0.1), transparent 50%)',
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.05), transparent 50%)',
        pointerEvents: 'none'
      }}></div>

      <div className="hero" style={{ zIndex: 1 }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '20px',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #a78bfa, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          ✨ MindMaze
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
          Your Safe Space for Emotions
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 32px' }}>
          Understand yourself better. Connect with others. Not therapy—just support.
        </p>

        <div style={{
          maxWidth: '500px',
          margin: '0 auto 32px',
          padding: '24px',
          background: 'rgba(167, 139, 250, 0.05)',
          border: '1px solid var(--border)',
          borderRadius: '12px'
        }}>
          <p style={{ margin: '8px 0', fontSize: '0.95rem' }}>
            <strong>🔒 Anonymous</strong> — Your privacy is sacred.<br />
            <strong>💜 Safe</strong> — Moderated with care.<br />
            <strong>🤝 Together</strong> — You're not alone.
          </p>
        </div>

        <div className="nav">
          <button className="btn secondary" onClick={onGetStarted} style={{ flex: 1 }}>
            Get Started
          </button>
        </div>

        <p style={{ marginTop: '32px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Not a therapy platform · For ages 13+
        </p>
      </div>
    </div>
  )
}
