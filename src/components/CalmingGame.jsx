import React, { useState } from 'react'

export default function CalmingGame({ onClose }){
  const [currentThought, setCurrentThought] = useState('')
  const [released, setReleased] = useState([])

  function releaseThought(){
    if (currentThought.trim()) {
      setReleased([...released, { text: currentThought, ts: Date.now() }])
      setCurrentThought('')
    }
  }

  return (
    <div style={{ padding: '32px 24px' }}>
      <h3 style={{ marginBottom: '8px', textAlign: 'center' }}>Release & Reflect</h3>
      <p className="muted" style={{ marginBottom: '24px', textAlign: 'center' }}>
        Write a worry and let it go
      </p>

      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div className="form-group">
          <label>What's on your mind?</label>
          <textarea
            value={currentThought}
            onChange={e => setCurrentThought(e.target.value)}
            placeholder="Write something you want to release..."
            style={{ minHeight: '80px' }}
          ></textarea>
        </div>

        <div className="actions">
          <button
            className="btn secondary"
            style={{ flex: 1 }}
            onClick={releaseThought}
            disabled={!currentThought.trim()}
          >
            Release 🌬️
          </button>
        </div>

        {released.length > 0 && (
          <div style={{ marginTop: '24px' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Thoughts released ({released.length}):
            </p>
            <div style={{
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
              {released.map((r, i) => (
                <div
                  key={i}
                  style={{
                    padding: '8px 12px',
                    background: 'rgba(52, 211, 153, 0.1)',
                    border: '1px solid var(--success)',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    fontSize: '0.85rem',
                    opacity: 0.8
                  }}
                >
                  ✓ {r.text}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="actions" style={{ marginTop: '24px' }}>
          <button className="btn ghost" style={{ flex: 1 }} onClick={onClose}>
            {released.length > 0 ? 'Done - Feel Better!' : 'Exit'}
          </button>
        </div>
      </div>
    </div>
  )
}
